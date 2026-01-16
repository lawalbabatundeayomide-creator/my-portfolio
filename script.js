/**
 * Lawal Babatunde Portfolio Script
 * Merged & Optimized Version
 */

// --- 1. CONFIGURATION & SELECTORS ---
const words = ["Full-Stack Developer", "Web Designer", "Freelancer"];
const typeTarget = document.querySelector('.typewriter');
const slides = document.querySelectorAll('.slide');
const header = document.querySelector('.header');
const scrollTopBtn = document.getElementById('scroll-top');
const menuToggle = document.getElementById('menu-toggle');
const navbar = document.getElementById('navbar');
const contactForm = document.getElementById('contact-form');

let wordIdx = 0, charIdx = 0, isDeleting = false;
let slideIndex = 0;

// --- 2. TYPEWRITER EFFECT ---
function typeEffect() {
    if (!typeTarget) return;
    const currentWord = words[wordIdx];
    
    typeTarget.textContent = isDeleting 
        ? currentWord.substring(0, charIdx--) 
        : currentWord.substring(0, charIdx++);

    let speed = isDeleting ? 100 : 200;
    
    if (!isDeleting && charIdx > currentWord.length) {
        isDeleting = true; speed = 1500; // Pause at end
    } else if (isDeleting && charIdx < 0) {
        isDeleting = false; 
        wordIdx = (wordIdx + 1) % words.length; 
        charIdx = 0;
    }
    setTimeout(typeEffect, speed);
}

// --- 3. BACKGROUND SLIDER ---
function showSlides() {
    if (slides.length === 0) return;
    slides.forEach(slide => slide.classList.remove('active'));
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    slides[slideIndex - 1].classList.add('active');
    setTimeout(showSlides, 5000);
}

// --- 4. SCROLL REVEAL (Intersection Observer) ---
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.15 });

// --- 5. INITIALIZATION & EVENTS ---
document.addEventListener('DOMContentLoaded', () => {
    // Start animations
    typeEffect();
    showSlides();
    document.querySelectorAll('.hidden').forEach(el => revealObserver.observe(el));

    // Mobile Menu Toggle
    if (menuToggle && navbar) {
        menuToggle.addEventListener('click', () => {
            navbar.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('bx-menu');
            icon.classList.toggle('bx-x');
        });
    }

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.add('bx-menu');
            icon.classList.remove('bx-x');
        });
    });
});

// --- 6. GLOBAL SCROLL HANDLER ---
window.addEventListener('scroll', () => {
    // Sticky Header
    if (header) header.classList.toggle('sticky', window.scrollY > 100);
    
    // Scroll Top Button
    if (scrollTopBtn) scrollTopBtn.classList.toggle('active', window.scrollY > 500);

    // Auto-close menu on scroll for better UX
    if (navbar && navbar.classList.contains('active')) {
        navbar.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.add('bx-menu');
        icon.classList.remove('bx-x');
    }
});

// --- 7. FORM HANDLING ---
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = document.getElementById('submit-btn');
        const plane = document.getElementById('plane');
        const toast = document.getElementById('toast');
        const toastMsg = document.getElementById('toast-msg');

        // UI State change
        const originalBtn = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            // Animation
            if (plane) plane.classList.add('plane-animate');

            // Success Handling
            setTimeout(() => {
                toastMsg.innerText = 'Message sent successfully!';
                toast.className = 'toast success show';
                
                contactForm.reset();
                submitBtn.innerHTML = originalBtn;
                submitBtn.disabled = false;

                setTimeout(() => {
                    toast.classList.remove('show');
                    if (plane) plane.classList.remove('plane-animate');
                }, 3000);
            }, 500);
        }, 1500);
    });
}