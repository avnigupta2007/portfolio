// script.js - Portfolio Interactivity & Cat Companion Engine

document.addEventListener('DOMContentLoaded', () => {
    // --- Preloader Fade Out ---
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('fade-out');
            }, 1000); // Show off the ripple animation
        });
        // Fallback safety timeout
        setTimeout(() => {
            preloader.classList.add('fade-out');
        }, 2000);
    }

    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // --- Setup Static Background Tech Grid ---
    const techGrid = document.createElement('div');
    techGrid.className = 'tech-grid';
    document.body.insertBefore(techGrid, document.body.firstChild);

    // Track cursor positioning for subtle background orb movement (faint parallax)
    const orb1 = document.getElementById('glowOrb1');
    const orb2 = document.getElementById('glowOrb2');

    document.addEventListener('mousemove', (e) => {
        const xPercent = (e.clientX / window.innerWidth - 0.5) * 25; // Subtle shift
        const yPercent = (e.clientY / window.innerHeight - 0.5) * 25;

        if (orb1) orb1.style.transform = `translate(${xPercent}px, ${yPercent}px)`;
        if (orb2) orb2.style.transform = `translate(${-xPercent}px, ${-yPercent}px)`;
    });



    // --- Mobile Menu Toggle ---
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileNavToggle && mobileMenu) {
        mobileNavToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            const icon = mobileNavToggle.querySelector('i');
            if (icon) {
                if (mobileMenu.classList.contains('active')) {
                    icon.setAttribute('data-lucide', 'x');
                } else {
                    icon.setAttribute('data-lucide', 'menu');
                }
                lucide.createIcons();
            }
        });

        // Close mobile menu when a link is clicked
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                const icon = mobileNavToggle.querySelector('i');
                if (icon) {
                    icon.setAttribute('data-lucide', 'menu');
                    lucide.createIcons();
                }
            });
        });
    }

    // --- Profile Status Message ---
    const statusMessage = document.getElementById('statusMessage');
    if (statusMessage) {
        statusMessage.textContent = "Designing interfaces & coding full-stack apps...";
    }

    // --- Project Filters ---
    const filterTabs = document.querySelectorAll('.filter-tab');
    const projectCards = document.querySelectorAll('.project-card');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filterValue = tab.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = (card.getAttribute('data-category') || '').split(' ');
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'flex';
                    // Trigger fade-in
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.transition = 'opacity 0.4s ease';
                        card.style.opacity = '1';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- Interactive Cat Companion (Codey) Engine ---
    const pixelCat = document.getElementById('pixelCat');
    const catSittingSvg = document.getElementById('catSittingSvg');
    const catCodingSvg = document.getElementById('catCodingSvg');
    const catSleepingSvg = document.getElementById('catSleepingSvg');
    const catBubbleText = document.getElementById('catBubbleText');
    const particlesContainer = document.getElementById('particlesContainer');

    // Cat actions buttons
    const btnCode = document.getElementById('catActionCode');
    const btnPet = document.getElementById('catActionPet');
    const btnNap = document.getElementById('catActionNap');
    const btnWiggle = document.getElementById('catActionWiggle');

    const catQuotes = {
        sitting: [
            "Meow! Welcome to Avni's portfolio. Look around!",
            "I help Avni debug. Well, mostly I just sit on the keyboard.",
            "Did you know Avni's favorite color is lavender (#bab7e3)?",
            "Avni is currently learning full-stack web development. Exciting!",
            "If you click the 'Get in Touch' button, I'll send a meow to Avni!"
        ],
        coding: [
            "Avni is teaching me how to code React components!",
            "Furious typing in progress! 💻",
            "We are fixing a bug in the Express backend right now!",
            "npm install cute-cat-companion --save",
            "Designing beautiful UX wireframes and writing Node servers!"
        ],
        sleeping: [
            "Zzz... Codey is taking a quick power nap... Zzz",
            "Shhh... Codey is dreaming about coding logic.",
            "Meow... sleeping on a warm laptop charger is the best.",
            "Zzz... 5 more minutes, please..."
        ],
        petted: [
            "Purrrrrr... That feels so nice! ❤️",
            "Meow! You are very friendly!",
            "Purr... Avni is super creative!",
            "Happy cat noises! Meow! 💕"
        ],
        wiggle: [
            "Whoa! That tickles! 😸",
            "Boop! Cat.exe has encountered a wiggle!",
            "Wiggle wiggle! Let's build something awesome!"
        ]
    };

    let catState = 'sitting'; // sitting, coding, sleeping

    function getRandQuote(state) {
        const quotes = catQuotes[state];
        return quotes[Math.floor(Math.random() * quotes.length)];
    }

    function triggerCatState(state) {
        catState = state;
        
        // Remove active class from all cat SVGs
        catSittingSvg.classList.remove('active');
        catCodingSvg.classList.remove('active');
        catSleepingSvg.classList.remove('active');
        catSittingSvg.classList.remove('cat-walking');

        // Reset visual animations
        pixelCat.classList.remove('cat-wiggle-anim');

        if (state === 'sitting' || state === 'petted' || state === 'wiggle') {
            catSittingSvg.classList.add('active');
            if (state === 'sitting') {
                catSittingSvg.classList.add('cat-walking');
            }
            if (state === 'wiggle') {
                pixelCat.classList.add('cat-wiggle-anim');
            }
        } else if (state === 'coding') {
            catCodingSvg.classList.add('active');
        } else if (state === 'sleeping') {
            catSleepingSvg.classList.add('active');
        }

        // Update bubble text
        catBubbleText.textContent = `"${getRandQuote(state)}"`;
    }

    // Event listeners for cat controls
    if (btnCode) {
        btnCode.addEventListener('click', () => {
            triggerCatState('coding');
            createParticles('sparkle');
        });
    }

    if (btnPet) {
        btnPet.addEventListener('click', () => {
            triggerCatState('petted');
            createParticles('heart');
        });
    }

    if (btnNap) {
        btnNap.addEventListener('click', () => {
            triggerCatState('sleeping');
            createParticles('zzz');
        });
    }

    if (btnWiggle) {
        btnWiggle.addEventListener('click', () => {
            triggerCatState('wiggle');
            createParticles('star');
        });
    }

    // Clicking the cat directly wiggles it
    if (pixelCat) {
        pixelCat.addEventListener('click', () => {
            // Randomly choose a state between wiggle and pet
            const randomChance = Math.random();
            if (randomChance < 0.4) {
                triggerCatState('wiggle');
                createParticles('star');
            } else if (randomChance < 0.8) {
                triggerCatState('petted');
                createParticles('heart');
            } else {
                triggerCatState('coding');
                createParticles('sparkle');
            }
        });
    }

    // Particle generator
    function createParticles(type) {
        if (!particlesContainer) return;
        particlesContainer.innerHTML = ''; // Clear old ones
        
        let char = '❤️';
        if (type === 'sparkle') char = '✨';
        if (type === 'zzz') char = '💤';
        if (type === 'star') char = '⭐';

        for (let i = 0; i < 6; i++) {
            const particle = document.createElement('span');
            particle.className = 'particle';
            particle.textContent = char;
            
            // Randomize position details
            const leftOffset = 40 + Math.random() * 40; // centered-ish
            const xOffset = (Math.random() - 0.5) * 60; // wiggle left/right as they rise
            
            particle.style.left = `${leftOffset}%`;
            particle.style.setProperty('--x-offset', `${xOffset}px`);
            particle.style.animationDelay = `${i * 0.1}s`;
            
            particlesContainer.appendChild(particle);
        }
    }

    // --- Cat Bottom-Right Widget Interactivity ---
    const catWidget = document.getElementById('catWidget');
    const catWidgetBubble = document.getElementById('catWidgetBubble');

    const widgetMessages = [
        "Need a hand? Meow!",
        "Did you scroll all the way down here?",
        "Avni is ready to build your next website!",
        "Double click me for a secret jump!",
        "Avni's UX portfolio is premium stuff!",
        "Have a lovely day!"
    ];

    if (catWidget) {
        catWidget.addEventListener('click', () => {
            const randomMsg = widgetMessages[Math.floor(Math.random() * widgetMessages.length)];
            showWidgetBubble(randomMsg);
            
            // Trigger animation on widget icon
            const icon = catWidget.querySelector('.cat-widget-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(-10deg)';
                setTimeout(() => {
                    icon.style.transform = '';
                }, 300);
            }
        });

        // Double click fun
        catWidget.addEventListener('dblclick', () => {
            const icon = catWidget.querySelector('.cat-widget-icon');
            if (icon) {
                icon.style.transform = 'translateY(-30px) scale(1.1)';
                showWidgetBubble("Boing! High jump!");
                setTimeout(() => {
                    icon.style.transform = '';
                }, 400);
            }
        });
    }

    function showWidgetBubble(text) {
        if (!catWidgetBubble) return;
        catWidgetBubble.textContent = text;
        catWidgetBubble.style.opacity = '1';
        catWidgetBubble.style.transform = 'translateY(0)';

        // Auto hide after 3 seconds
        clearTimeout(catWidgetBubble.timeoutId);
        catWidgetBubble.timeoutId = setTimeout(() => {
            catWidgetBubble.style.opacity = '0';
            catWidgetBubble.style.transform = 'translateY(10px)';
        }, 3000);
    }

    // First welcome message
    setTimeout(() => {
        showWidgetBubble("Hi! Let's design!");
    }, 1500);


    // --- Contact Form Handling ---
    const contactForm = document.getElementById('contactForm');
    const formSuccessMessage = document.getElementById('formSuccessMessage');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm && formSuccessMessage) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Visual submit state
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = 'Sending... <i data-lucide="loader" class="animate-spin"></i>';
                lucide.createIcons();
            }

            // Simulate server request delay
            setTimeout(() => {
                contactForm.reset();
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'Send Message <i data-lucide="send"></i>';
                    lucide.createIcons();
                }
                
                // Show success message
                formSuccessMessage.style.display = 'flex';
                
                // Trigger cat widget reaction
                showWidgetBubble("Yay! Message sent!");
                triggerCatState('wiggle');
                createParticles('heart');

                // Hide success message after 5 seconds
                setTimeout(() => {
                    formSuccessMessage.style.display = 'none';
                }, 5000);
            }, 1500);
        });
    }

    // --- MOTION GRAPHICS: SCROLL REVEAL (IntersectionObserver) ---
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Once revealed, we can unobserve if we want it to stay
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // triggers slightly before coming fully into view
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- modular setup for future compatibility (21st.dev components) ---
    // Expose helpers globally so the user can easily re-run animations
    // on dynamically loaded components in the future.
    window.initPortfolioAnimations = () => {
        const newReveals = document.querySelectorAll('.reveal:not(.active), .reveal-left:not(.active), .reveal-right:not(.active)');
        newReveals.forEach(el => revealObserver.observe(el));
        
        // rebind lucide icons if any
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    };

    // --- Interactive Wave Path Component ---
    const wavePathEl = document.getElementById('wavePath');
    const waveTrigger = document.querySelector('.wave-path-trigger');
    const waveLine = document.querySelector('.wave-path-line');

    if (wavePathEl && waveTrigger && waveLine) {
        let progress = 0;
        let x = 0.2;
        let time = Math.PI / 2;
        let reqId = null;

        const setPath = (prog) => {
            const width = waveLine.getBoundingClientRect().width;
            wavePathEl.setAttribute(
                'd',
                `M0 100 Q${width * x} ${100 + prog * 0.6}, ${width} 100`
            );
        };

        const initPath = () => {
            setPath(0);
        };
        initPath();
        window.addEventListener('resize', initPath);

        const lerp = (xVal, yVal, a) => xVal * (1 - a) + yVal * a;

        const resetAnimation = () => {
            time = Math.PI / 2;
            progress = 0;
        };

        const animateOut = () => {
            const newProgress = progress * Math.sin(time);
            progress = lerp(progress, 0, 0.025);
            time += 0.2;
            setPath(newProgress);

            if (Math.abs(progress) > 0.75) {
                reqId = requestAnimationFrame(animateOut);
            } else {
                resetAnimation();
                setPath(0);
            }
        };

        waveTrigger.addEventListener('mouseenter', () => {
            if (reqId) {
                cancelAnimationFrame(reqId);
                resetAnimation();
            }
        });

        waveTrigger.addEventListener('mousemove', (e) => {
            const rect = waveLine.getBoundingClientRect();
            x = (e.clientX - rect.left) / rect.width;
            progress += e.movementY;
            setPath(progress);
        });

        waveTrigger.addEventListener('mouseleave', () => {
            animateOut();
        });
    }
});


