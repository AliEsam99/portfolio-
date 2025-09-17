// Advanced Portfolio JavaScript with Enhanced Animations

// Smooth scrolling with easing for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Custom smooth scrolling with easing
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 80;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 1000;
            let start = null;

            function animation(currentTime) {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const run = ease(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }

            // Easing function for smooth animation
            function ease(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }

            requestAnimationFrame(animation);
        }
    });
});

// Mobile menu toggle with animations
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');

    // Animate hamburger bars
    const bars = hamburger.querySelectorAll('.bar');
    if (hamburger.classList.contains('active')) {
        bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
    } else {
        bars[0].style.transform = 'rotate(0) translate(0, 0)';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'rotate(0) translate(0, 0)';
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');

        const bars = hamburger.querySelectorAll('.bar');
        bars[0].style.transform = 'rotate(0) translate(0, 0)';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'rotate(0) translate(0, 0)';
    });
});

// Enhanced navbar background on scroll
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 25px rgba(0, 0, 0, 0.15)';
        navbar.style.backdropFilter = 'blur(15px)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        navbar.style.backdropFilter = 'blur(10px)';
    }

    // Hide/show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 200) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScrollTop = scrollTop;
});

// Active navigation link highlighting with smooth transitions
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Advanced Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add visible class with staggered delay
            setTimeout(() => {
                entry.target.classList.add('visible');

                // Special animations for different elements
                if (entry.target.classList.contains('detail-item')) {
                    entry.target.style.setProperty('--i', index);
                }

                if (entry.target.classList.contains('skill-category')) {
                    const skillTags = entry.target.querySelectorAll('.skill-tag');
                    skillTags.forEach((tag, tagIndex) => {
                        tag.style.setProperty('--i', tagIndex);
                    });
                }

                if (entry.target.classList.contains('project-card')) {
                    entry.target.style.setProperty('--i', index);
                }

                if (entry.target.classList.contains('timeline-item')) {
                    entry.target.style.setProperty('--i', index);
                }

                if (entry.target.classList.contains('contact-item')) {
                    entry.target.style.setProperty('--i', index);
                }
            }, index * 100);
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Add animation delay variables to nav menu items
    const navMenuItems = document.querySelectorAll('.nav-menu li');
    navMenuItems.forEach((item, index) => {
        item.style.setProperty('--i', index);
    });

    // Observe all animated elements
    const animateElements = document.querySelectorAll(
        '.section-title, .about-intro, .detail-item, .skill-category, .project-card, .timeline-item, .contact-item, .contact-form'
    );

    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Typing animation for hero title
function typeWriter(element, text, speed = 50) {
    let i = 0;
    let isTag = false;
    let tagBuffer = '';
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            const char = text.charAt(i);

            if (char === '<') {
                isTag = true;
                tagBuffer = char;
            } else if (char === '>' && isTag) {
                isTag = false;
                element.innerHTML += tagBuffer + char;
                tagBuffer = '';
            } else if (isTag) {
                tagBuffer += char;
            } else {
                element.innerHTML += char;
            }

            i++;
            setTimeout(type, isTag ? 0 : speed);
        } else {
            // Add blinking cursor
            const cursor = document.createElement('span');
            cursor.className = 'cursor';
            cursor.style.cssText = `
                display: inline-block;
                width: 2px;
                height: 1.2em;
                background: #fbbf24;
                margin-left: 2px;
                animation: blink 1s infinite;
            `;
            element.querySelector('.highlight').appendChild(cursor);
        }
    }

    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = 'Hi, I\'m <span class="highlight">Ali Esam Ali Abdelazim</span>';
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 800);
    }
});

// Enhanced skill tags hover effect
document.addEventListener('DOMContentLoaded', () => {
    const skillCategories = document.querySelectorAll('.skill-category');

    skillCategories.forEach(category => {
        const skillTags = category.querySelectorAll('.skill-tag');

        skillTags.forEach((tag, index) => {
            tag.style.setProperty('--i', index);

            tag.addEventListener('mouseenter', () => {
                tag.style.transform = 'scale(1.15) rotate(5deg)';
                tag.style.boxShadow = '0 8px 25px rgba(37, 99, 235, 0.4)';
                tag.style.zIndex = '10';
            });

            tag.addEventListener('mouseleave', () => {
                tag.style.transform = 'scale(1) rotate(0deg)';
                tag.style.boxShadow = '0 5px 15px rgba(37, 99, 235, 0.2)';
                tag.style.zIndex = '1';
            });
        });
    });
});

// Enhanced contact form handling with animations
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Enhanced validation with animations
            const inputs = [
                { element: document.getElementById('name'), value: name, name: 'Name' },
                { element: document.getElementById('email'), value: email, name: 'Email' },
                { element: document.getElementById('subject'), value: subject, name: 'Subject' },
                { element: document.getElementById('message'), value: message, name: 'Message' }
            ];

            let isValid = true;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.element.style.borderColor = '#ef4444';
                    input.element.style.animation = 'shake 0.5s ease-in-out';

                    setTimeout(() => {
                        input.element.style.animation = '';
                        input.element.style.borderColor = '#e2e8f0';
                    }, 500);
                }
            });

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email && !emailRegex.test(email)) {
                isValid = false;
                document.getElementById('email').style.borderColor = '#ef4444';
                document.getElementById('email').style.animation = 'shake 0.5s ease-in-out';
            }

            if (!isValid) {
                // Show error message with animation
                showNotification('Please fill in all fields correctly!', 'error');
                return;
            }

            // Success animation
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                // Create mailto link
                const mailtoLink = `mailto:aesam9997@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

                // Open email client
                window.location.href = mailtoLink;

                // Show success message
                showNotification('Thank you! Your email client should open shortly.', 'success');

                // Reset form with animation
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
});

// Add shake animation for form validation
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(shakeStyle);

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        color: white;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        ${type === 'success' ? 'background: linear-gradient(45deg, #10b981, #059669);' : 'background: linear-gradient(45deg, #ef4444, #dc2626);'}
    `;

    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Animate out
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');

    if (hero && heroContent) {
        const rate = scrolled * -0.3;
        heroContent.style.transform = `translateY(${rate}px)`;
    }
});

// Cursor trail effect
let mouseTrail = [];
const trailLength = 10;

document.addEventListener('mousemove', (e) => {
    mouseTrail.push({ x: e.clientX, y: e.clientY });

    if (mouseTrail.length > trailLength) {
        mouseTrail.shift();
    }

    mouseTrail.forEach((point, index) => {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.cssText = `
            position: fixed;
            width: ${4 + (index * 2)}px;
            height: ${4 + (index * 2)}px;
            background: linear-gradient(45deg, #2563eb, #7c3aed);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: ${0.1 + (index * 0.1)};
            animation: trailFade 0.5s ease-out forwards;
            left: ${point.x - (2 + index)}px;
            top: ${point.y - (2 + index)}px;
        `;

        document.body.appendChild(trail);

        setTimeout(() => {
            if (trail.parentNode) {
                trail.parentNode.removeChild(trail);
            }
        }, 500);
    });
});

// Add trail fade animation
const trailStyle = document.createElement('style');
trailStyle.textContent = `
    @keyframes trailFade {
        0% {
            opacity: 0.8;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0);
        }
    }
`;
document.head.appendChild(trailStyle);

// Loading screen animation
document.addEventListener('DOMContentLoaded', () => {
    // Create loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';

    const spinner = document.createElement('div');
    spinner.className = 'spinner';

    const loadingText = document.createElement('div');
    loadingText.innerHTML = 'Loading Portfolio...';
    loadingText.style.cssText = `
        color: white;
        font-size: 1.2rem;
        margin-top: 2rem;
        animation: pulse 2s infinite;
    `;

    loadingOverlay.appendChild(spinner);
    loadingOverlay.appendChild(loadingText);
    document.body.appendChild(loadingOverlay);

    // Remove loading overlay after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                if (loadingOverlay.parentNode) {
                    loadingOverlay.parentNode.removeChild(loadingOverlay);
                }
            }, 500);
        }, 1200);
    });
});

// Page transition effects
function createPageTransition() {
    const transition = document.createElement('div');
    transition.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, #2563eb, #7c3aed);
        z-index: 10000;
        transform: translateY(-100%);
        transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    `;

    document.body.appendChild(transition);

    setTimeout(() => {
        transition.style.transform = 'translateY(0)';
    }, 10);

    setTimeout(() => {
        transition.style.transform = 'translateY(100%)';
        setTimeout(() => {
            if (transition.parentNode) {
                transition.parentNode.removeChild(transition);
            }
        }, 600);
    }, 800);
}

// Add smooth reveal animations for sections
const revealSections = () => {
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionVisible = 200;

        if (sectionTop < window.innerHeight - sectionVisible) {
            section.classList.add('visible');
        }
    });
};

// Initialize reveal on scroll and load
window.addEventListener('scroll', revealSections);
document.addEventListener('DOMContentLoaded', revealSections);

// Enhanced project card interactions
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            // Scale up surrounding cards slightly
            projectCards.forEach((otherCard, otherIndex) => {
                if (otherIndex !== index) {
                    otherCard.style.transform = 'scale(0.95)';
                    otherCard.style.opacity = '0.7';
                }
            });
        });

        card.addEventListener('mouseleave', () => {
            // Reset all cards
            projectCards.forEach(otherCard => {
                otherCard.style.transform = '';
                otherCard.style.opacity = '';
            });
        });
    });
});

console.log('Enhanced Portfolio JavaScript loaded successfully! 🚀');