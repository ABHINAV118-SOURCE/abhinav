// Main JavaScript file for Abhinav's Portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Set data-text attribute for 3D logo effect
    const navbarLogo = document.querySelector('.navbar-logo');
    if (navbarLogo) {
        navbarLogo.setAttribute('data-text', navbarLogo.textContent);
    }

    // Logo Animation and Navbar Reveal
    const logoAnimation = document.getElementById('logoAnimation');
    const navbar = document.getElementById('navbar');
    
    // Make sure navbar exists
    if (!navbar) {
        console.error('Navbar element not found!');
        return;
    }
    
    // Ensure navbar is visible by default
    navbar.classList.remove('hidden');
    
    // Handle logo animation if present
    if (logoAnimation) {
        // Hide logo animation after delay
        setTimeout(() => {
            logoAnimation.classList.add('hidden');
            
            // Ensure navbar is visible after logo animation
            navbar.classList.remove('hidden');
            navbar.classList.add('visible');
            document.body.classList.add('navbar-visible');
            
            // Add scrolled class only if user has scrolled down
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            }
        }, 3000); // 3 seconds for the logo animation
    } else {
        // No logo animation, ensure navbar is visible immediately
        navbar.classList.remove('hidden');
        navbar.classList.add('visible');
        document.body.classList.add('navbar-visible');
    }
    
    // Initialize interactive tech background
    initTechBackground();
    
    // Show navbar on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('visible');
            navbar.classList.add('scrolled');
            document.body.classList.add('navbar-visible');
        } else if (window.scrollY < 50 && !logoAnimation.classList.contains('hidden')) {
            navbar.classList.remove('visible');
            navbar.classList.remove('scrolled');
            document.body.classList.remove('navbar-visible');
        } else if (window.scrollY < 50 && logoAnimation.classList.contains('hidden')) {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Check scroll position on page load
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    }

    // Interactive Tech Background Function
    function initTechBackground() {
        const techBackground = document.getElementById('techBackground');
        if (!techBackground) return;
        
        // Clear existing tech background before adding new icons
        techBackground.innerHTML = '';
        
        // Tech and language icons to display
        const techIcons = [
            { name: 'html5', class: 'fab fa-html5', color: '#E44D26' },
            { name: 'css3', class: 'fab fa-css3-alt', color: '#264DE4' },
            { name: 'js', class: 'fab fa-js', color: '#F7DF1E' },
            { name: 'react', class: 'fab fa-react', color: '#61DAFB' },
            { name: 'node-js', class: 'fab fa-node-js', color: '#68A063' },
            { name: 'python', class: 'fab fa-python', color: '#3776AB' },
            { name: 'java', class: 'fab fa-java', color: '#ED8B00' },
            { name: 'git-alt', class: 'fab fa-git-alt', color: '#F05032' },
            { name: 'github', class: 'fab fa-github', color: '#ffffff' },
            { name: 'npm', class: 'fab fa-npm', color: '#CB3837' },
            { name: 'database', class: 'fas fa-database', color: '#47A248' },
            { name: 'code', class: 'fas fa-code', color: '#007ACC' },
            { name: 'terminal', class: 'fas fa-terminal', color: '#4CAF50' },
            { name: 'angular', class: 'fab fa-angular', color: '#DD0031' },
            { name: 'vuejs', class: 'fab fa-vuejs', color: '#4FC08D' },
            { name: 'php', class: 'fab fa-php', color: '#777BB4' },
            { name: 'sass', class: 'fab fa-sass', color: '#CC6699' }
        ];
        
        // Responsive icon count based on screen width - reduce count on mobile
        const isMobile = window.innerWidth < 768;
        const iconCount = Math.min(isMobile ? 40 : 65, Math.floor(window.innerWidth / 20));
        
        // Define grid for better distribution
        const gridCols = Math.ceil(Math.sqrt(iconCount));
        const gridRows = Math.ceil(iconCount / gridCols);
        const cellWidth = 100 / gridCols;
        const cellHeight = 100 / gridRows;
        
        // Arrays to hold icons and GSAP timeline
        const iconElements = [];
        
        // Kill any existing GSAP animations on tech icons to prevent conflicts
        gsap.killTweensOf(".tech-icon");
        
        // Create main timeline with a slight delay to let hero content animate first
        const mainTimeline = gsap.timeline({delay: 0.8});
        
        for (let i = 0; i < iconCount; i++) {
            const randomIcon = techIcons[Math.floor(Math.random() * techIcons.length)];
            const icon = document.createElement('i');
            icon.className = `tech-icon ${randomIcon.class}`;
            icon.style.color = randomIcon.color;
            
            // Grid-based positioning with some randomness
            const col = i % gridCols;
            const row = Math.floor(i / gridCols);
            
            // Add some randomness within the cell
            const randomOffsetX = (Math.random() * 0.6 - 0.3) * cellWidth;
            const randomOffsetY = (Math.random() * 0.6 - 0.3) * cellHeight;
            
            const x = col * cellWidth + randomOffsetX + cellWidth/2;
            const y = row * cellHeight + randomOffsetY + cellHeight/2;
            
            icon.style.left = `${Math.max(0, Math.min(100, x))}%`;
            icon.style.top = `${Math.max(0, Math.min(100, y))}%`;
            
            // Random size - slightly increased sizes
            const size = 1.2 + Math.random() * 3.2;
            icon.style.fontSize = `${size}rem`;
            
            // Set initial styles for GSAP animation
            gsap.set(icon, {
                rotation: Math.random() * 360,
                scale: 0,
                opacity: 0,
                transformOrigin: "center center"
            });
            
            // Data attributes for tracking
            icon.dataset.x = x;
            icon.dataset.y = y;
            icon.dataset.size = size;
            icon.dataset.rotation = Math.random() * 360;
            icon.dataset.color = randomIcon.color;
            
            // Add to background
            techBackground.appendChild(icon);
            iconElements.push(icon);
        }
        
        // Create staggered entrance animation with GSAP
        mainTimeline.to(iconElements, {
            scale: 1,
            opacity: 0.15,
            rotation: "random(-30, 30)",
            duration: 1.5,
            ease: "elastic.out(1, 0.5)",
            stagger: {
                amount: 1.8,
                grid: [gridRows, gridCols],
                from: "center"
            }
        });
        
        // Add floating animation with GSAP - with reduced motion for better performance
        // Delay this until after the entrance animation completes
        mainTimeline.add(() => {
            iconElements.forEach(icon => {
                const size = parseFloat(icon.dataset.size);
                // Smaller icons move more
                const moveAmount = 8 + (4 / size);
                
                gsap.to(icon, {
                    y: `random(${-moveAmount}, ${moveAmount})`,
                    x: `random(${-moveAmount}, ${moveAmount})`,
                    rotation: `+=${Math.random() * 40 - 20}`,
                    duration: 3 + Math.random() * 3,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: Math.random() * 2
                });
            });
        });
        
        // Add mouse movement tracking with improved performance
        const hero = document.getElementById('hero');
        const icons = document.querySelectorAll('.tech-icon');
        
        // Create throttled mousemove handler for better performance
        let lastTime = 0;
        hero.addEventListener('mousemove', function(e) {
            const now = Date.now();
            // Throttle to max 30 updates per second
            if (now - lastTime < 33) return;
            lastTime = now;
            
            // Get mouse position relative to the container
            const rect = hero.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            // Calculate center
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate direction from center
            const directionX = (mouseX - centerX) / centerX;
            const directionY = (mouseY - centerY) / centerY;
            
            // Apply movement to each icon with GSAP for smoother motion
            icons.forEach(icon => {
                // Get icon's base position and other properties
                const x = parseFloat(icon.dataset.x);
                const y = parseFloat(icon.dataset.y);
                const size = parseFloat(icon.dataset.size);
                const color = icon.dataset.color;
                
                // Calculate distance factor (icons farther from cursor move less)
                const iconCenterX = (x / 100) * rect.width;
                const iconCenterY = (y / 100) * rect.height;
                const distance = Math.sqrt(
                    Math.pow(mouseX - iconCenterX, 2) + 
                    Math.pow(mouseY - iconCenterY, 2)
                );
                
                // Normalize distance (0 to 1, where 0 is far and 1 is close)
                const maxDistance = Math.sqrt(Math.pow(rect.width, 2) + Math.pow(rect.height, 2)) * 0.7;
                const distanceFactor = 1 - Math.min(1, (distance / maxDistance));
                
                // Calculate movement amount - bigger icons move less
                const moveFactorX = directionX * (40 / size) * distanceFactor;
                const moveFactorY = directionY * (40 / size) * distanceFactor;
                
                // Apply GSAP animation for smoother movement - use quickTo for better performance
                gsap.to(icon, {
                    x: moveFactorX,
                    y: moveFactorY,
                    rotation: parseFloat(icon.dataset.rotation) + (distanceFactor * 45),
                    scale: 1 + distanceFactor * 0.4,
                    opacity: 0.15 + distanceFactor * 0.45,
                    duration: 0.8,
                    ease: "power2.out",
                    overwrite: "auto" // Prevent animation conflicts
                });
                
                // Make icons close to cursor more visible with class and change color
                if (distanceFactor > 0.25) {
                    icon.classList.add('active');
                } else {
                    icon.classList.remove('active');
                }
            });
        });
        
        // Reset positions when mouse leaves
        hero.addEventListener('mouseleave', function() {
            icons.forEach(icon => {
                const rotation = parseFloat(icon.dataset.rotation);
                gsap.to(icon, {
                    x: 0,
                    y: 0,
                    rotation: rotation,
                    scale: 1,
                    opacity: 0.15,
                    duration: 1.2,
                    ease: "elastic.out(1, 0.5)",
                    overwrite: "auto" // Prevent animation conflicts
                });
                icon.classList.remove('active');
            });
        });
    }

    // Typing animation
    const typed = new Typed('#typed-text', {
        strings: [
            'Computer Science Engineering Student',
            'Web Developer',
            'UI/UX Enthusiast',
            'Technology Lover',
            'Creating with passion...',
            'Coding with heart...'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 1500,
        startDelay: 500,
        loop: true
    });
    
    // Loader animation
    const loader = document.getElementById('loader');
    const progressBar = document.getElementById('progressBar');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += 2;
        progressBar.style.width = `${progress}%`;
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loader.style.opacity = 0;
                setTimeout(() => {
                    loader.style.display = 'none';
                    initAnimations();
                }, 500);
            }, 500);
        }
    }, 30);
    
    // Custom cursor
    const cursor = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursorFollower');
    
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 100);
        });
        
        document.addEventListener('mousedown', () => {
            cursor.classList.add('click');
            cursorFollower.classList.add('click');
        });
        
        document.addEventListener('mouseup', () => {
            cursor.classList.remove('click');
            cursorFollower.classList.remove('click');
        });
        
        // Interactive elements
        const interactiveElements = document.querySelectorAll('a, button, input, textarea, .project-card, .bento-item');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
                cursorFollower.classList.add('hover');
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
                cursorFollower.classList.remove('hover');
            });
        });
    }
    
    // Scroll progress indicator
    const scrollIndicator = document.getElementById('scrollIndicator');
    
    window.addEventListener('scroll', () => {
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const progress = (window.pageYOffset / totalHeight) * 100;
        scrollIndicator.style.width = `${progress}%`;
        
        // Add pulsing effect when scrolling stops
        clearTimeout(window.scrollFinished);
        window.scrollFinished = setTimeout(() => {
            scrollIndicator.classList.add('pulse');
            setTimeout(() => {
                scrollIndicator.classList.remove('pulse');
            }, 600);
        }, 200);
    });
    
    // Back to top button
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    // Smooth scroll behavior for the entire page
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Back to top click event
    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        if (hero && scrollPosition < window.innerHeight) {
            hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        }
    });
    
    // Reveal elements on scroll
    const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    
    // Particle background effect
    const createParticles = () => {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        document.body.appendChild(particlesContainer);
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random position
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            // Random size
            const size = Math.random() * 15 + 5;
            
            // Random opacity
            const opacity = Math.random() * 0.5 + 0.1;
            
            // Random animation duration
            const duration = Math.random() * 20 + 10;
            
            // Apply styles
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.opacity = opacity;
            particle.style.animationDuration = `${duration}s`;
            
            particlesContainer.appendChild(particle);
        }
    };
    
    // Hover effects for project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -20,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    });
    
    // Magnetic effect for buttons
    const buttons = document.querySelectorAll('.btn-custom');
    
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const moveX = (x - centerX) / 10;
            const moveY = (y - centerY) / 10;
            
            gsap.to(btn, {
                x: moveX,
                y: moveY,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });
    
    // GSAP Animations
    function initAnimations() {
        // Set flag that GSAP is handling animations
        window.gsapInitialized = true;
        
        // Create particles
        createParticles();
        
        // Register GSAP plugins
        gsap.registerPlugin(ScrollTrigger);
        
        // Kill any existing animations to prevent conflicts
        gsap.killTweensOf(".navbar, .hero-content, .hero-content h1, .hero-content p, .btn-custom, .scroll-indicator, .navbar-logo");
        
        // Create a master timeline for better coordination
        const masterTimeline = gsap.timeline();
        
        // Get navbar element
        const navbar = document.getElementById('navbar');
        
        // Ensure navbar is visible for animations
        if (navbar) {
            // Remove any classes that might hide the navbar
            navbar.classList.remove('hidden');
            navbar.classList.add('visible');
            
            // Add GSAP animation for navbar
            masterTimeline.from(navbar, {
                y: -100,
                opacity: 0,
                duration: 1.2,
                ease: 'power3.out',
                clearProps: "y,opacity" // Clear properties after animation
            });
        } else {
            console.warn("Navbar element not found for GSAP animation");
        }
        
        // Hero section animations with improved timing and effects
        const heroTimeline = gsap.timeline();
        
        heroTimeline
            .from('.hero-content', {
                opacity: 0,
                y: 50,
                duration: 1.2,
                ease: 'power3.out'
            })
            .from('.hero-content h1', {
                opacity: 0,
                y: 30,
                duration: 1,
                ease: 'back.out(1.7)'
            }, '-=0.8')
            .from('.hero-content p', {
                opacity: 0,
                y: 20,
                duration: 0.8,
                ease: 'power2.out'
            }, '-=0.6')
            .from('.btn-custom', {
                scale: 0.8,
                opacity: 0,
                duration: 0.6,
                ease: 'elastic.out(1, 0.5)'
            }, '-=0.4')
            .from('.scroll-indicator', {
                opacity: 0,
                y: -20,
                duration: 0.8,
                ease: 'power2.out'
            }, '-=0.2');
        
        // Add hero timeline to master timeline, slightly delayed after navbar animation
        masterTimeline.add(heroTimeline, 0.3);
        
        // Add continuous animations after the initial animations complete
        masterTimeline.add(() => {
            // Apply a gentle floating animation to the hero content
            gsap.to('.hero-content', {
                y: '-10px',
                duration: 2.5,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                clearProps: "all" // Clear initial animation props
            });
            
            // Animate logo with a custom effect
            const logoTimeline = gsap.timeline({repeat: -1, repeatDelay: 20});
            logoTimeline
                .to('.navbar-logo', {
                    rotation: 5,
                    duration: 0.5,
                    ease: 'power2.inOut'
                })
                .to('.navbar-logo', {
                    rotation: -5,
                    duration: 0.5,
                    ease: 'power2.inOut'
                })
                .to('.navbar-logo', {
                    rotation: 0,
                    duration: 0.5,
                    ease: 'elastic.out(1, 0.5)'
                });
        });
        
        // About section animations
        gsap.from('.reveal-left', {
            scrollTrigger: {
                trigger: '.reveal-left',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            x: -100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
        
        gsap.from('.reveal-right', {
            scrollTrigger: {
                trigger: '.reveal-right',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            x: 100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
        
        gsap.from('.reveal-up', {
            scrollTrigger: {
                trigger: '.reveal-up',
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
        
        // Bento grid animations
        gsap.from('.bento-item', {
            scrollTrigger: {
                trigger: '.bento-grid',
                start: 'top 75%',
                toggleActions: 'play none none none'
            },
            scale: 0.8,
            opacity: 0,
            duration: 0.8,
            stagger: {
                amount: 1,
                grid: 'auto',
                from: 'center'
            },
            ease: 'back.out(1.7)'
        });
        
        // Skills section - animated entrance for each skill
        gsap.from('.skill-item', {
            scrollTrigger: {
                trigger: '.skills-grid',
                start: 'top 70%',
                toggleActions: 'play none none none'
            },
            scale: 0,
            rotation: -15,
            opacity: 0,
            duration: 0.6,
            stagger: {
                amount: 1.5,
                grid: 'auto',
                from: 'random'
            },
            ease: 'back.out(1.7)'
        });
        
        // Project cards animation - modified to not hide cards initially
        const projectsSection = document.querySelector('.projects-section');
        if (projectsSection) {
            // Ensure the projects section is visible
            projectsSection.style.display = 'block';
            projectsSection.style.visibility = 'visible';
            projectsSection.style.opacity = '1';
            
            gsap.from('.project-card-new', {
                scrollTrigger: {
                    trigger: '.projects-section',
                    start: 'top 75%',
                    toggleActions: 'play none none none'
                },
                y: 50, // Reduced from 100 to be less dramatic
                opacity: 0.5, // Start with some opacity
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out',
                onComplete: function() {
                    // Ensure all cards are fully visible after animation
                    document.querySelectorAll('.project-card-new').forEach(card => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    });
                }
            });
        }
        
        // Contact section entrance animation
        const contactTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '.contact-grid',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
        
        contactTimeline
            .from('.contact-email-item', {
                x: -50,
                opacity: 0,
                duration: 0.8,
                ease: 'back.out(1.2)'
            })
            .from('.contact-hire-item', {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'back.out(1.2)'
            }, '-=0.6')
            .from('.contact-social-item', {
                scale: 0.8,
                opacity: 0,
                duration: 0.8,
                ease: 'back.out(1.2)'
            }, '-=0.6')
            .from('.contact-location-item', {
                x: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'back.out(1.2)'
            }, '-=0.6')
            .from('.social-icon', {
                scale: 0,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: 'back.out(1.7)'
            }, '-=0.4');
        
        // Footer animation
        gsap.from('.footer-section', {
            scrollTrigger: {
                trigger: '.footer-section',
                start: 'top 95%',
                toggleActions: 'play none none none'
            },
            y: 30,
            opacity: 0,
            duration: 1
        });
        
        // Initialize Framer Motion animations for interactive elements
        initFramerMotionAnimations();
    }
    
    // New function to add Framer Motion animations to interactive elements
    function initFramerMotionAnimations() {
        // Check if Framer Motion is available
        if (typeof motion === 'undefined') return;
        
        // Add custom hover animations to buttons
        document.querySelectorAll('.btn-custom').forEach(button => {
            button.addEventListener('mouseenter', () => {
                motion.animate(button, {
                    scale: 1.05,
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)'
                }, { 
                    duration: 0.3,
                    ease: 'easeOut'
                });
            });
            
            button.addEventListener('mouseleave', () => {
                motion.animate(button, {
                    scale: 1,
                    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)'
                }, { 
                    duration: 0.3,
                    ease: 'easeOut'
                });
            });
        });
        
        // Add spring animation to social icons
        document.querySelectorAll('.social-icon').forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                motion.animate(icon, {
                    scale: 1.2,
                    rotate: [0, -10, 10, 0],
                    transition: {
                        rotate: { duration: 0.5, ease: 'easeInOut' }
                    }
                }, { 
                    duration: 0.5,
                    ease: 'spring(200, 15, 0, 1)'
                });
            });
            
            icon.addEventListener('mouseleave', () => {
                motion.animate(icon, {
                    scale: 1,
                    rotate: 0
                }, { 
                    duration: 0.4,
                    ease: 'easeOut'
                });
            });
        });
        
        // Add enhanced hover effect to project cards
        document.querySelectorAll('.project-card-new').forEach(card => {
            card.addEventListener('mouseenter', () => {
                const img = card.querySelector('img');
                const overlay = card.querySelector('.project-overlay');
                const buttons = card.querySelectorAll('.project-btn');
                
                if (img) {
                    motion.animate(img, {
                        scale: 1.1
                    }, { 
                        duration: 0.5,
                        ease: 'easeOut'
                    });
                }
                
                if (overlay) {
                    motion.animate(overlay, {
                        opacity: 1
                    }, { 
                        duration: 0.3,
                        ease: 'easeOut'
                    });
                }
                
                buttons.forEach((btn, index) => {
                    motion.animate(btn, {
                        opacity: 1,
                        y: 0
                    }, { 
                        duration: 0.3,
                        delay: 0.1 * index,
                        ease: 'easeOut'
                    });
                });
            });
            
            card.addEventListener('mouseleave', () => {
                const img = card.querySelector('img');
                const overlay = card.querySelector('.project-overlay');
                const buttons = card.querySelectorAll('.project-btn');
                
                if (img) {
                    motion.animate(img, {
                        scale: 1
                    }, { 
                        duration: 0.5,
                        ease: 'easeOut'
                    });
                }
                
                if (overlay) {
                    motion.animate(overlay, {
                        opacity: 0
                    }, { 
                        duration: 0.3,
                        ease: 'easeOut'
                    });
                }
                
                buttons.forEach(btn => {
                    motion.animate(btn, {
                        opacity: 0,
                        y: 20
                    }, { 
                        duration: 0.2,
                        ease: 'easeOut'
                    });
                });
            });
        });
    }
    
    // Add CSS for particles
    const style = document.createElement('style');
    style.textContent = `
        .particles-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            overflow: hidden;
        }
        
        .particle {
            position: absolute;
            background: linear-gradient(45deg, rgba(72, 49, 212, 0.3), rgba(204, 243, 129, 0.3));
            border-radius: 50%;
            animation: float linear infinite;
        }
        
        @keyframes float {
            0% {
                transform: translateY(0) translateX(0) rotate(0deg);
            }
            25% {
                transform: translateY(-20px) translateX(10px) rotate(90deg);
            }
            50% {
                transform: translateY(-40px) translateX(0) rotate(180deg);
            }
            75% {
                transform: translateY(-20px) translateX(-10px) rotate(270deg);
            }
            100% {
                transform: translateY(0) translateX(0) rotate(360deg);
            }
        }
        
        .reveal-left, .reveal-right, .reveal-up {
            opacity: 0;
            transition: all 1s ease;
        }
        
        .reveal-left {
            transform: translateX(-100px);
        }
        
        .reveal-right {
            transform: translateX(100px);
        }
        
        .reveal-up {
            transform: translateY(100px);
        }
        
        .reveal-left.active, .reveal-right.active, .reveal-up.active {
            opacity: 1;
            transform: translate(0);
        }
    `;
    document.head.appendChild(style);

    // Force About section to be visible
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        aboutSection.style.display = 'block';
        aboutSection.style.visibility = 'visible';
    }

    // Ensure education cards are visible
    const educationCards = document.querySelectorAll('.education-card');
    educationCards.forEach(card => {
        card.style.display = 'block';
        card.style.visibility = 'visible';
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // Manually trigger reveal animations for about section
    const revealAboutElements = () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            // Force display of about section
            aboutSection.style.display = 'block';
            aboutSection.style.visibility = 'visible';
            aboutSection.style.opacity = '1';
            
            // Get all elements that need revealing in the about section
            const revealItems = aboutSection.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');
            
            revealItems.forEach(item => {
                // Force immediate visibility of key items
                if (item.classList.contains('photo-item') || 
                    item.classList.contains('who-item') || 
                    item.classList.contains('edu-item') || 
                    item.classList.contains('interests-item') || 
                    item.classList.contains('cv-item')) {
                    item.style.opacity = '1';
                    item.style.transform = 'translate(0)';
                    item.style.visibility = 'visible';
                    item.classList.add('active');
                }
            });
            
            // Make interest pills interactive with staggered animation
            const interestPills = aboutSection.querySelectorAll('.interests-item .skill-pill');
            interestPills.forEach((pill, index) => {
                pill.style.opacity = '0';
                setTimeout(() => {
                    pill.style.opacity = '1';
                    pill.style.transform = 'translateY(0)';
                }, 100 * index);
            });
            
            // Make education cards interactive
            const educationCards = aboutSection.querySelectorAll('.education-card');
            educationCards.forEach(card => {
                card.style.display = 'block';
                card.style.visibility = 'visible';
                card.style.opacity = '1';
                
                // Add hover effects
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateX(10px)';
                });
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateX(0)';
                });
            });
        }
    };

    // Call this function after the page is loaded
    setTimeout(() => {
        revealAboutElements();
    }, 500);
    
    // Also reveal on scroll
    window.addEventListener('scroll', revealAboutElements);

    // Initialize skills section with animated background and icons
    const initSkillsSection = () => {
        const skillsSection = document.querySelector('.skills-section');
        if (!skillsSection) {
            console.warn("Skills section not found");
            return;
        }
        
        // Force skills section to be visible
        skillsSection.style.display = 'block';
        skillsSection.style.visibility = 'visible';
        skillsSection.style.opacity = '1';
        
        // Ensure skills background is visible
        const skillsBg = document.querySelector('.skills-bg');
        if (skillsBg) {
            skillsBg.style.display = 'block';
            skillsBg.style.visibility = 'visible';
            skillsBg.style.opacity = '0.85';
            
            // Parallax effect for skills background
            if (typeof gsap !== 'undefined') {
                // Initial animation to ensure it's visible
                gsap.to(skillsBg, {
                    opacity: 0.85,
                    duration: 1,
                    ease: "power2.out"
                });
                
                // Add parallax effect on mouse move
                window.addEventListener('mousemove', e => {
                    const { clientX, clientY } = e;
                    const x = (clientX / window.innerWidth) - 0.5;
                    const y = (clientY / window.innerHeight) - 0.5;
                    
                    gsap.to(skillsBg, {
                        x: x * 30,
                        y: y * 30,
                        rotation: x * 5,
                        duration: 1,
                        ease: "power2.out"
                    });
                });
                
                console.log("Skills background parallax effect initialized");
            } else {
                console.warn("GSAP not loaded for skills background animation");
            }
        } else {
            console.warn("Skills background element not found");
        }
        
        // Set up code rain animation
        const codeRain = document.querySelector('.code-rain');
        if (codeRain) {
            // Clear any existing content
            codeRain.innerHTML = '';
            
            // Characters for code rain
            const chars = '01';
            const columns = 20; // Reduced for better performance
            
            for (let i = 0; i < columns; i++) {
                const column = document.createElement('div');
                column.className = 'code-column';
                
                // Random height and delay
                const height = 10 + Math.floor(Math.random() * 20);
                column.style.animationDelay = `${Math.random() * 5}s`;
                column.style.left = `${(i / columns) * 100}%`;
                column.style.animationDuration = `${15 + Math.random() * 10}s`;
                
                // Create random characters
                for (let j = 0; j < height; j++) {
                    const char = document.createElement('span');
                    char.textContent = chars.charAt(Math.floor(Math.random() * chars.length));
                    char.style.animationDelay = `${j * 0.1}s`;
                    char.style.opacity = j === height - 1 ? 1 : 0.5 + Math.random() * 0.5;
                    column.appendChild(char);
                }
                
                codeRain.appendChild(column);
            }
            
            console.log("Code rain animation initialized on page load");
        } else {
            console.warn("Code rain element not found");
        }
        
        // Skills items hover effect with GSAP
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach((item, index) => {
            // Force skill items to be visible
            item.style.visibility = 'visible';
            item.style.opacity = '1';
            
            const icon = item.querySelector('i');
            const skillFront = item.querySelector('.skill-front');
            const skillBack = item.querySelector('.skill-back');
            const skillProgress = item.querySelector('.skill-progress');
            
            // Initial setup for 3D effect
            if (typeof gsap !== 'undefined') {
                gsap.set(skillFront, { rotateY: 0, transformPerspective: 1000 });
                gsap.set(skillBack, { rotateY: -180, transformPerspective: 1000, opacity: 0 });
                
                // Create mouseover animation
                item.addEventListener('mouseenter', () => {
                    // Flip animation
                    gsap.to(skillFront, {
                        rotateY: 180,
                        opacity: 0,
                        duration: 0.5,
                        ease: "power2.out"
                    });
                    
                    gsap.to(skillBack, {
                        rotateY: 0,
                        opacity: 1,
                        duration: 0.5,
                        ease: "power2.out"
                    });
                    
                    // Animate skill progress bar
                    if (skillProgress) {
                        const width = skillProgress.getAttribute('data-progress') || '80%';
                        gsap.fromTo(skillProgress, 
                            { width: '0%' },
                            { 
                                width: width, 
                                duration: 1, 
                                ease: "power2.out",
                                delay: 0.2
                            }
                        );
                    }
                    
                    // Add pulse effect to icon
                    if (icon) {
                        gsap.to(icon, {
                            scale: 1.2,
                            color: icon.getAttribute('data-color') || 'currentColor',
                            boxShadow: '0 0 20px currentColor',
                            duration: 0.3,
                            repeat: 1,
                            yoyo: true,
                            ease: "power2.inOut"
                        });
                    }
                });
                
                // Create mouseout animation
                item.addEventListener('mouseleave', () => {
                    // Flip back
                    gsap.to(skillFront, {
                        rotateY: 0,
                        opacity: 1,
                        duration: 0.5,
                        ease: "power2.out"
                    });
                    
                    gsap.to(skillBack, {
                        rotateY: -180,
                        opacity: 0,
                        duration: 0.5,
                        ease: "power2.out"
                    });
                    
                    // Reset icon
                    if (icon) {
                        gsap.to(icon, {
                            scale: 1,
                            boxShadow: 'none',
                            duration: 0.3,
                            ease: "power2.out"
                        });
                    }
                });
                
                // Add scroll trigger for initially animating the progress
                gsap.from(item, {
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    },
                    y: 30,
                    opacity: 0,
                    rotation: -5,
                    duration: 0.8,
                    ease: "back.out(1.7)",
                    delay: index * 0.1
                });
            }
        });
        
        // Floating icons animation
        const floatingIcons = document.querySelectorAll('.floating-icon');
        if (typeof gsap !== 'undefined') {
            floatingIcons.forEach(icon => {
                const duration = 5 + Math.random() * 10;
                const xMovement = 10 + Math.random() * 20;
                const yMovement = 10 + Math.random() * 20;
                
                gsap.to(icon, {
                    x: `+=${xMovement}`,
                    y: `+=${yMovement}`,
                    rotation: "random(-20, 20)",
                    duration: duration,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: Math.random() * 5
                });
            });
        }
    };

    // Call the skills section initialization function when the DOM is loaded
    initSkillsSection();

    // Add a delayed check to ensure skills section is visible
    setTimeout(() => {
        // Force Skills section to be visible
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            skillsSection.style.display = 'block';
            skillsSection.style.visibility = 'visible';
            skillsSection.style.opacity = '1';
            
            // Also make skills background visible
            const skillsBg = skillsSection.querySelector('.skills-bg');
            if (skillsBg) {
                skillsBg.style.display = 'block';
                skillsBg.style.visibility = 'visible';
                skillsBg.style.opacity = '0.85';
            }
            
            // Initialize code rain
            const codeRain = skillsSection.querySelector('.code-rain');
            if (codeRain) {
                codeRain.style.display = 'block';
                codeRain.style.visibility = 'visible';
                
                // Clear any existing content
                codeRain.innerHTML = '';
                
                // Characters for code rain
                const chars = '01';
                const columns = 20; // Reduced for better performance
                
                for (let i = 0; i < columns; i++) {
                    const column = document.createElement('div');
                    column.className = 'code-column';
                    
                    // Random height and delay
                    const height = 10 + Math.floor(Math.random() * 20);
                    column.style.animationDelay = `${Math.random() * 5}s`;
                    column.style.left = `${(i / columns) * 100}%`;
                    column.style.animationDuration = `${15 + Math.random() * 10}s`;
                    
                    // Create random characters
                    for (let j = 0; j < height; j++) {
                        const char = document.createElement('span');
                        char.textContent = chars.charAt(Math.floor(Math.random() * chars.length));
                        char.style.animationDelay = `${j * 0.1}s`;
                        char.style.opacity = j === height - 1 ? 1 : 0.5 + Math.random() * 0.5;
                        column.appendChild(char);
                    }
                    
                    codeRain.appendChild(column);
                }
                
                console.log("Code rain animation initialized on page load");
            }
            
            console.log("Skills section visibility enforced after page load");
        }
    }, 1000);

    // Initialize Contact Section with subtle hover effects
    const initContactSection = () => {
        // Email reveal and copy functionality
        const revealEmailBtn = document.getElementById('reveal-email');
        const emailHidden = document.getElementById('email-hidden');
        const emailRevealed = document.getElementById('email-revealed');
        const copyEmailBtn = document.getElementById('copy-email');
        const emailText = document.getElementById('email-text');
        const copyNotification = document.getElementById('copy-notification');
        
        // Email reveal functionality
        if (revealEmailBtn && emailHidden && emailRevealed) {
            revealEmailBtn.addEventListener('click', () => {
                emailHidden.classList.remove('active');
                
                // Add a slight delay before showing the email
                setTimeout(() => {
                    emailRevealed.classList.add('active');
                }, 300);
            });
        }
        
        // Dynamic Island Email copy functionality
        if (copyEmailBtn && emailText) {
            copyEmailBtn.addEventListener('click', () => {
                // Copy the email
                const tempInput = document.createElement('input');
                document.body.appendChild(tempInput);
                tempInput.value = emailText.textContent;
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
                
                // Create vibration effect if supported by the device
                if (navigator.vibrate) {
                    navigator.vibrate([15, 10, 15]);
                }
                
                // Get the notification element
                const copyNotification = document.getElementById('copy-notification');
                
                // Reset any previous animation states
                copyNotification.classList.remove('hiding');
                
                // Force position and visibility
                copyNotification.style.position = 'fixed';
                copyNotification.style.top = '30px';
                copyNotification.style.left = '50%';
                copyNotification.style.transform = 'translateX(-50%)';
                copyNotification.style.zIndex = '9999';
                
                // Show Dynamic Island notification
                copyNotification.classList.add('show');
                
                // Add click sound effect
                const clickSound = new Audio('data:audio/mp3;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gQ29uZ3JhdHVsYXRpb25zIENsaWNrAFRYWFgAAAASAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tAwAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAAeAAAcmgAXFxcXJCQkJDExMTE+Pj4+TExMTFlZWVlnZ2dndHR0dIKCgoKPj4+PnZ2dnaurq6u4uLi4xsbGxtTU1NTi4uLi8PDw8P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/7UMQAAApkAX8wEAACbTLvZzGAAl2V6YSbzJdlXMytm5kthbQV4XwhClj/jKiBUo5Q4x+d8oc91LT2xBpilTL3OcO+YHLufd4+cNwBGfwXMDlTEooY9+YPcO//P/+0HD9//HXXH+MP/U9Qc/jZDQAAAIFGkVcMihi4DDHDgxaAzA4DEJwQxaEFLgHBOCYyBf5Q6YXGBJgIIAD/+1LEBAALCLmGswkAEhivs5hiLgBKrEBaABgA/YIGAQhgSYAuAiZIGAQgIIED4OAVBQwscnACjoASNghEIQHAFCw1f4FQgaAGmAIgDJgGICoYC+Ap+cN///1J+YFAAPIFgCGAgSGBFAB4pFBmHQDTQ0IwAMF/MH1P7MH/8wdJwCYwGCgRYDGYCgHmQIg4Aw/T90+gVQsX/4M//BdBgvp/QQF4wKIAIjArb/8GAf/7UsQEgApVb5NMhGlBNKs0PYeN4AQG4FMfvEUAQC9Tmc/AKIYAiAGsARQO4CAAwHVAJJi0E0TABA0QAAP5mD///NQcJQQOAYAAn/+YBAA5///sBWIJMCwBwMBABgSZGCIeAgZKQAPnMf+X/+Z3/8rBqQBYwAQAQ4Gj/rJaCKKmYAQABxgA4AEX/qg7//lYB1AC1RiBSoHkz/8EBGojBm3/8E3pK0TUgAIDIA1UASP/+1LEBIAJ6VmfzDxpQSarM/mMjSgqPQHX//bAZuBMG+MDl//+h//IAcwhfPvMHpmQKYAiDCGAXADeG4KBMYAsADz0nAwEUvqP6Cs4Ack4AuYAYAL8A3+jRXDoGbv/qg6t/y4Gs4B8YBYAAGBvqMgDH///0QiYAMB+YAQf9wP///7AGTAf4CiQKRkgN//MAT4FXA2P//4LrmV//5Ij///rIBZs+Jg7TCRZ//1UHU1r//t//i4JwwC0AcYeDAACgQhABP/7UsQGgAm5WZ/MhGlBMSs0PYeN4N1cUwBEUz3m8wALQJgwEIQLYwJ4AeykTb+sXEH+YAxMIuB7MAVAAdP6Kf//XB1xgB4ApI3R8XBMCMM/5+D//1sB13/LAFTAf3Egf//GQdPxcCgLgKhh5tVfMCZPUP//WwE45////1qB6/8MAWi4L4U/UDlP/+pA5MZQ2T/+H////zIDW///kDVwI///qQrVKL/G//8gf/+H//1IBcwETgAFIQBACnL/+1LECIAKIVmf7DxpQTCrM/2HjSnQ2jBAQFKC7g2DoARMS8DNPWBEDvMCDmBjAjTA8QCOwkAP///+lqQ6UAw0Df48AYMDBAP9Ax0DgIN9A4Zg7MBLA////+3B1QYALoD+QFM/w9JhTcBqAGcNBVNb//+CBk2H//4YFMMG//+XgxmBUALCYP//4wf+KAU///rYDm3/nGAYAF+YASABmPgwGO5wLgwDUAeYfiCwVyAU4FrYGJgFYAZGAIg2ZjBMBugP//tSxAkACjFZn+w8aUFCqzQ9h43osH/t//+oAQAA9oNP/3MFfwbYBswFIAyf/5QBPQH3HY0CgAR4AQAADf//5ADYAQw0NQBoHoI8oIrgIkATgBeAM0wQcAqUD1EI9AQtQezAcAJ/A4kDAEAaGH//+TgaQB9GJA01cA2EGXwL//+XgxaBjCkJg//1gW2Bzn5ACxgJQAcIGHKX//7mB4oFciBQAT7AtNYGswJ8ANcA5RZ2QFZiC9DQUDoIRP/7UsQIAAAAX8AAAAIAAAv4AAAAQkDUYLgLygbZhq8BUoCyAQQB/KA0CnCgZqDI4MGAFBC9YQJAIWA9eBYAB4EFkCA8BIIEqDQ5NQIwAHuAD+UpJCNKEE0JooIpQQxARjBT/FJJSQzThCYCKUEP8UkMySQiSkJApyAiDCNKSGaQEQQJJKQzJDNOd5JSSGaQEIQJQw=');
                clickSound.volume = 0.3;
                clickSound.play().catch(e => console.log("Audio playback error:", e));
                
                // Add shimmer animation to the notification
                const notificationContent = copyNotification.querySelector('.notification-content');
                if (notificationContent) {
                    notificationContent.classList.add('shimmer');
                    setTimeout(() => {
                        notificationContent.classList.remove('shimmer');
                    }, 1500);
                }
                
                // Animate out with a contraction phase
                setTimeout(() => {
                    copyNotification.classList.add('hiding');
                    copyNotification.classList.remove('show');
                    
                    // Announce for screen readers
                    const ariaLive = document.createElement('div');
                    ariaLive.setAttribute('aria-live', 'polite');
                    ariaLive.classList.add('sr-only');
                    ariaLive.textContent = 'Email copied to clipboard!';
                    document.body.appendChild(ariaLive);
                    setTimeout(() => document.body.removeChild(ariaLive), 1000);
                }, 3000);
            });
        }
        
        // Subtle hover effects for contact elements
        const contactItems = document.querySelectorAll('.contact-email-item, .contact-hire-item, .contact-social-item, .contact-location-item');
        contactItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                const beforeElement = this.querySelector('::before');
                if (beforeElement) {
                    beforeElement.style.opacity = '1';
                }
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = '';
                const beforeElement = this.querySelector('::before');
                if (beforeElement) {
                    beforeElement.style.opacity = '0';
                }
            });
        });
        
        // Ensure social icons are visible
        const socialIconsContainer = document.querySelector('.social-icons');
        const socialIcons = document.querySelectorAll('.social-icon');
        
        if (socialIconsContainer) {
            socialIconsContainer.style.display = 'flex';
            socialIconsContainer.style.visibility = 'visible';
            socialIconsContainer.style.opacity = '1';
            
            console.log('Social icons container found and made visible');
        } else {
            console.warn('Social icons container not found');
        }
        
        if (socialIcons.length > 0) {
            socialIcons.forEach((icon, index) => {
                // Force visibility
                icon.style.display = 'flex';
                icon.style.visibility = 'visible';
                icon.style.opacity = '1';
                
                // Ensure icon element is visible
                const iconElement = icon.querySelector('i');
                if (iconElement) {
                    iconElement.style.visibility = 'visible';
                    iconElement.style.opacity = '1';
                    iconElement.style.color = 'var(--text-color)';
                }
                
                // Add specific brand colors on hover
                icon.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-5px)';
                    if (iconElement) {
                        iconElement.style.color = 'white';
                        iconElement.style.animation = 'socialPulse 0.5s infinite alternate';
                    }
                });
                
                icon.addEventListener('mouseleave', function() {
                    this.style.transform = '';
                    if (iconElement) {
                        iconElement.style.color = 'var(--text-color)';
                        iconElement.style.animation = '';
                    }
                });
                
                console.log(`Social icon ${index + 1} initialized`);
            });
        } else {
            console.warn('No social icons found');
        }
        
        // Observer for revealing items
        const contactObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    contactObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        contactItems.forEach(item => {
            contactObserver.observe(item);
        });
    };

    // Call the function when DOM is loaded
    initContactSection();

    // Update date, time and year in footer
    const updateDateTime = () => {
        const datetimeElement = document.getElementById('current-datetime');
        const yearElement = document.getElementById('current-year');
        const footerSection = document.querySelector('.footer-section');
        
        // Ensure footer is visible
        if (footerSection) {
            footerSection.style.display = 'block';
            footerSection.style.visibility = 'visible';
            footerSection.style.opacity = '1';
        }
        
        if (datetimeElement) {
            // Make text more visible
            datetimeElement.style.color = 'white';
            datetimeElement.style.textShadow = '0 0 5px rgba(255, 255, 255, 0.3)';
            
            // Update date and time with formatting
            const updateTime = () => {
                const now = new Date();
                const options = { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                };
                datetimeElement.textContent = now.toLocaleDateString('en-US', options);
                
                // Update every second
                setTimeout(updateTime, 1000);
            };
            updateTime();
        }
        
        if (yearElement) {
            // Set current year
            yearElement.textContent = new Date().getFullYear() + ' ';
        }
    };
    
    // Call the date/time update function
    updateDateTime();

    // Initialize all animations and interactions
    initLoader();
    initCursor();
    initNavigation();
    initTypewriter();
    initTechBackground();
    initScrollIndicator();
    initBackToTop();
    initAnimations();
    initRevealOnScroll();
    revealAboutElements();
    initProjectCards();
    initSkillsSection();
    initContactSection();
    updateDateTime();
    
    // Final animation polish and performance optimization
    optimizeAnimations();

    // Add a delayed check to ensure projects section is visible
    setTimeout(() => {
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
            projectsSection.style.display = 'block';
            projectsSection.style.visibility = 'visible';
            projectsSection.style.opacity = '1';
            
            const projectCards = document.querySelectorAll('.project-card-new');
            projectCards.forEach(card => {
                card.style.display = 'block';
                card.style.visibility = 'visible';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            });
            
            console.log('Projects section visibility enforced after delay');
        }
    }, 1000); // Check after 1 second

    // Add a delayed check to ensure social icons are visible
    setTimeout(() => {
        const socialIconsContainer = document.querySelector('.social-icons');
        const socialIcons = document.querySelectorAll('.social-icon');
        
        if (socialIconsContainer) {
            socialIconsContainer.style.display = 'flex';
            socialIconsContainer.style.visibility = 'visible';
            socialIconsContainer.style.opacity = '1';
            
            socialIcons.forEach(icon => {
                icon.style.display = 'flex';
                icon.style.visibility = 'visible';
                icon.style.opacity = '1';
                
                const iconElement = icon.querySelector('i');
                if (iconElement) {
                    iconElement.style.visibility = 'visible';
                    iconElement.style.opacity = '1';
                    iconElement.style.color = 'var(--text-color)';
                }
            });
            
            console.log('Social icons visibility enforced after delay');
        }
    }, 1500);
});

// Optimize and finalize animations for performance
function optimizeAnimations() {
    // Check if GSAP is loaded
    if (typeof gsap === 'undefined') {
        console.warn('GSAP is not loaded, some animations may not work properly.');
        return;
    }
    
    // Kill any running animations that might be causing conflicts
    gsap.killTweensOf(".tech-icon");
    
    // Set defaults for better performance
    gsap.defaults({
        overwrite: "auto",
        ease: "power2.out"
    });
    
    // Optimize animations by batching similar animations
    gsap.ticker.lagSmoothing(1000, 16); // Help with performance issues
    
    // Add GSAP force3D for better performance
    gsap.config({
        force3D: true
    });
    
    // Check if device is low-powered or prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isLowPowered = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (prefersReducedMotion || isLowPowered) {
        // Slow down and simplify animations for better performance
        gsap.globalTimeline.timeScale(0.7);
        
        // Reduce the number of tech icons on mobile/low-power devices
        const techBackground = document.getElementById('techBackground');
        if (techBackground) {
            // Reinitialize with fewer icons
            initTechBackground();
        }
        
        console.log('Reduced motion settings applied for better performance.');
    }
    
    // Add resize handler with proper debouncing to ensure animations work on different screen sizes
    window.addEventListener('resize', debounce(() => {
        // Reinitialize tech background on resize for better responsiveness
        if (document.getElementById('techBackground')) {
            // Only reinitialize if significant width change
            const widthChange = Math.abs(window.innerWidth - lastWindowWidth) > 100;
            if (widthChange) {
                initTechBackground();
                lastWindowWidth = window.innerWidth;
            }
        }
        
        // Update parallax effects on resize
        initScrollParallax();
    }, 250));
    
    // Store current window width for resize comparison
    let lastWindowWidth = window.innerWidth;
    
    // Apply Framer Motion optimizations if available
    if (typeof motion !== 'undefined') {
        // Configure framer motion for better performance
        const frameRate = isLowPowered ? 30 : 60;
        try {
            motion.fps(frameRate);
        } catch (e) {
            console.warn('Could not set Framer Motion framerate:', e);
        }
    }
    
    // Ensure projects section is visible
    const projectsSection = document.querySelector('.projects-section');
    if (projectsSection) {
        projectsSection.style.display = 'block';
        projectsSection.style.visibility = 'visible';
        projectsSection.style.opacity = '1';
    }
    
    console.log('Animation optimizations complete.');
}

// Helper function for debouncing frequent events like resize
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}

// Add subtle parallax scrolling effects
function initScrollParallax() {
    const parallaxElements = document.querySelectorAll('.hero-content, .about-image-wrapper, .project-card-new');
    
    parallaxElements.forEach(element => {
        gsap.to(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            },
            y: (i, el) => {
                // Calculate a unique parallax amount based on element position
                const directionFactor = el.classList.contains('hero-content') ? -1 : 1;
                return (el.offsetHeight * 0.1) * directionFactor;
            },
            ease: 'none'
        });
    });
}

// Initialize navigation behavior
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navbarLinks = document.querySelectorAll('.navbar-links a');
    const sections = document.querySelectorAll('section[id]');
    
    // Make sure navbar exists
    if (!navbar) {
        console.error('Navbar element not found in initNavigation!');
        return;
    }
    
    // Ensure navbar is visible
    navbar.classList.remove('hidden');
    navbar.classList.add('visible');
    document.body.classList.add('navbar-visible');
    
    // Smooth scroll for navbar links
    navbarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Smooth scroll to section
                window.scrollTo({
                    top: targetSection.offsetTop - 80, // Account for navbar height
                    behavior: 'smooth'
                });
                
                // Update active link
                navbarLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Highlight active section in navbar on scroll
    function highlightNavigation() {
        const scrollPosition = window.scrollY + 100; // Offset for navbar
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navbarLinks.forEach(link => {
                    link.classList.remove('active');
                    
                    // Add active class to current section link
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Add fixed navbar effect on scroll
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Events for scroll effects
    window.addEventListener('scroll', () => {
        handleNavbarScroll();
        highlightNavigation();
    });
    
    // Initialize navbar state on page load
    handleNavbarScroll();
    highlightNavigation();
}

// Function to ensure project section is visible
function initProjectCards() {
    const projectsSection = document.querySelector('.projects-section');
    const projectCards = document.querySelectorAll('.project-card-new');
    
    if (projectsSection) {
        // Force display of projects section
        projectsSection.style.display = 'block';
        projectsSection.style.visibility = 'visible';
        projectsSection.style.opacity = '1';
        
        // Force display of all project cards
        projectCards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.style.visibility = 'visible';
        });
        
        console.log('Project cards initialized and made visible');
    }
}