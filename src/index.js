import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Initialize animation for sections on page load
document.addEventListener('DOMContentLoaded', function() {
  document.body.classList.add('loading-fade');
  
  // Prepare sections for animation
  const animatedSections = document.querySelectorAll('section');
  animatedSections.forEach(section => {
    section.classList.add('section-animate');
  });
  
  // Apply animation to sections visible on initial load
  checkSectionVisibility();
});

// Check which sections are visible and animate them
function checkSectionVisibility() {
  const animatedSections = document.querySelectorAll('.section-animate');
  const windowHeight = window.innerHeight;
  
  animatedSections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop < windowHeight * 0.8) {
      section.classList.add('visible');
    }
  });
}

// Add scroll event listener for section animations
window.addEventListener('scroll', checkSectionVisibility);