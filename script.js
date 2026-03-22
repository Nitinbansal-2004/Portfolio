// script.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.querySelector('i').classList.remove('fa-times');
                hamburger.querySelector('i').classList.add('fa-bars');
            }
        });
    });

    // 2. Typing Effect for Hero Section
    const typeWriterElement = document.querySelector('.typing-text');
    if (typeWriterElement) {
        const textArray = ["Software Engineer", "Competitive Programmer", "AI Enthusiast"];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function type() {
            const currentText = textArray[textIndex];
            
            if (isDeleting) {
                typeWriterElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typeWriterElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let typingSpeed = 100;
            
            if (isDeleting) {
                typingSpeed /= 2;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                typingSpeed = 2000; // Pause at end of word
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % textArray.length;
                typingSpeed = 500; // Pause before typing new word
            }
            
            setTimeout(type, typingSpeed);
        }
        
        // Start typing effect
        setTimeout(type, 1000);
    }

    // 3. Scroll Reveal Animation
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply fade-in class to major sections/elements and observe them
    const animatedElements = document.querySelectorAll('.section-title, .glass-panel, .education-card');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // 4. Update Copyright Year automatically
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 5. Active Link Highlighting on Scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
        
        // Add shadow to navbar on scroll
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (scrollY > 50) {
                navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
                navbar.style.padding = '0.5rem 0';
            } else {
                navbar.style.boxShadow = 'none';
                navbar.style.padding = '1rem 0';
            }
        }
    });
});
