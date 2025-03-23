// Mobile menu functionality
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.querySelector('.nav-links');
const nav = document.querySelector('nav');

mobileMenu.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Project slider functionality
const slider = document.getElementById('projectSlider');
const slides = slider.getElementsByClassName('project-slide');
const prevButton = document.getElementById('prevSlide');
const nextButton = document.getElementById('nextSlide');
let currentSlide = 0;

// Hide all slides except the first one
for (let i = 1; i < slides.length; i++) {
  slides[i].style.display = 'none';
}

function showSlide(n) {
  for (let slide of slides) slide.style.display = 'none';

  slides[n].style.display = 'block';
  slides[n].style.opacity = '0';

  slides[n].offsetHeight; // Trigger reflow

  slides[n].style.transition = 'opacity 0.5s ease-in-out';
  slides[n].style.opacity = '1';
}

prevButton.addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
});

nextButton.addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
});

// Auto advance slides
setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}, 5000);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      navLinks.classList.remove('active');
    }
  });
});

// Form submission handling with EmailJS
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const submitButton = contactForm.querySelector('button[type="submit"]');
  submitButton.classList.add('loading');

  const formData = new FormData(contactForm);
  const isValid = validateForm(formData);

  if (isValid) {
    try {
      const templateParams = {
        to_email: 'Trowersrenovations@gmail.com',
        title: 'Contact Us',
        name: formData.get('name'),
        time: new Date().toLocaleString(),
        email: formData.get('email'),
        phone: formData.get('phone') || 'Not provided',
        message: formData.get('message')
      };

      await emailjs.send('service_kwmy5cj', 'template_352jmcb', templateParams);
      alert('Thank you for your message! We will get back to you soon.');
      contactForm.reset();
    } catch (error) {
      console.error('Error:', error);
      alert('Sorry, there was an error sending your message. Please try again later.');
    }
  }

  submitButton.classList.remove('loading');
});

function validateForm(formData) {
  for (let [key, value] of formData.entries()) {
    if (!value.trim() && key !== 'phone') {
      alert('Please fill in all required fields.');
      return false;
    }

    if (key === 'email' && !isValidEmail(value)) {
      alert('Please enter a valid email address.');
      return false;
    }
  }
  return true;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Enhanced scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('section, .service-card, .project-slide').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Prevent scroll chaining on mobile
document.addEventListener('touchmove', (e) => {
  if (navLinks.classList.contains('active')) e.preventDefault();
}, { passive: false });

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (navLinks.classList.contains('active') && !e.target.closest('.nav-links, .mobile-menu')) {
    navLinks.classList.remove('active');
  }
});
