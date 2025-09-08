1	// Smooth scrolling and interactive functionality for Body Recomposition site
     2	
     3	document.addEventListener('DOMContentLoaded', function() {
     4	    // Initialize all functionality
     5	    initializeNavigation();
     6	    initializeScrollEffects();
     7	    initializeGalleryTabs();
     8	    initializeAnimations();
     9	    initializeProgressBars();
    10	});
    11	
    12	// Navigation functionality
    13	function initializeNavigation() {
    14	    const navbar = document.getElementById('navbar');
    15	    const hamburger = document.getElementById('hamburger');
    16	    const navMenu = document.getElementById('nav-menu');
    17	    const navLinks = document.querySelectorAll('.nav-link');
    18	
    19	    // Mobile menu toggle
    20	    hamburger.addEventListener('click', function() {
    21	        hamburger.classList.toggle('active');
    22	        navMenu.classList.toggle('active');
    23	    });
    24	
    25	    // Close mobile menu when clicking on a link
    26	    navLinks.forEach(link => {
    27	        link.addEventListener('click', function() {
    28	            hamburger.classList.remove('active');
    29	            navMenu.classList.remove('active');
    30	        });
    31	    });
    32	
    33	    // Close mobile menu when clicking outside
    34	    document.addEventListener('click', function(e) {
    35	        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
    36	            hamburger.classList.remove('active');
    37	            navMenu.classList.remove('active');
    38	        }
    39	    });
    40	
    41	    // Smooth scrolling for navigation links
    42	    navLinks.forEach(link => {
    43	        link.addEventListener('click', function(e) {
    44	            e.preventDefault();
    45	            const targetId = this.getAttribute('href').substring(1);
    46	            const targetSection = document.getElementById(targetId);
    47	            
    48	            if (targetSection) {
    49	                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
    50	                window.scrollTo({
    51	                    top: offsetTop,
    52	                    behavior: 'smooth'
    53	                });
    54	            }
    55	        });
    56	    });
    57	
    58	    // Update active navigation link based on scroll position
    59	    window.addEventListener('scroll', function() {
    60	        let current = '';
    61	        const sections = document.querySelectorAll('section[id]');
    62	        const scrollPos = window.scrollY + 100;
    63	
    64	        sections.forEach(section => {
    65	            const sectionTop = section.offsetTop;
    66	            const sectionHeight = section.offsetHeight;
    67	            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
    68	                current = section.getAttribute('id');
    69	            }
    70	        });
    71	
    72	        navLinks.forEach(link => {
    73	            link.classList.remove('active');
    74	            if (link.getAttribute('href') === `#${current}`) {
    75	                link.classList.add('active');
    76	            }
    77	        });
    78	
    79	        // Add/remove scrolled class to navbar
    80	        if (window.scrollY > 50) {
    81	            navbar.classList.add('scrolled');
    82	        } else {
    83	            navbar.classList.remove('scrolled');
    84	        }
    85	    });
    86	}
    87	
    88	// Scroll effects and animations
    89	function initializeScrollEffects() {
    90	    // Intersection Observer for fade-in animations
    91	    const observerOptions = {
    92	        threshold: 0.1,
    93	        rootMargin: '0px 0px -50px 0px'
    94	    };
    95	
    96	    const observer = new IntersectionObserver(function(entries) {
    97	        entries.forEach(entry => {
    98	            if (entry.isIntersecting) {
    99	                entry.target.classList.add('fade-in');
   100	            }
   101	        });
   102	    }, observerOptions);
   103	
   104	    // Observe elements for animation
   105	    const animateElements = document.querySelectorAll(
   106	        '.section-header, .profile-content, .info-card, .timeline-item, ' +
   107	        '.nutrition-card, .training-card, .supplement-card, .quote-card, ' +
   108	        '.why-item, .photo-item'
   109	    );
   110	
   111	    animateElements.forEach(el => {
   112	        observer.observe(el);
   113	    });
   114	
   115	    // Add CSS for fade-in animation
   116	    const style = document.createElement('style');
   117	    style.textContent = `
   118	        .section-header, .profile-content, .info-card, .timeline-item,
   119	        .nutrition-card, .training-card, .supplement-card, .quote-card,
   120	        .why-item, .photo-item {
   121	            opacity: 0;
   122	            transform: translateY(30px);
   123	            transition: opacity 0.6s ease, transform 0.6s ease;
   124	        }
   125	        .fade-in {
   126	            opacity: 1 !important;
   127	            transform: translateY(0) !important;
   128	        }
   129	    `;
   130	    document.head.appendChild(style);
   131	}
   132	
   133	// Gallery tabs functionality
   134	function initializeGalleryTabs() {
   135	    const tabButtons = document.querySelectorAll('.tab-button');
   136	    const tabContents = document.querySelectorAll('.tab-content');
   137	
   138	    tabButtons.forEach(button => {
   139	        button.addEventListener('click', function() {
   140	            const targetTab = this.getAttribute('data-tab');
   141	
   142	            // Remove active class from all buttons and contents
   143	            tabButtons.forEach(btn => btn.classList.remove('active'));
   144	            tabContents.forEach(content => content.classList.remove('active'));
   145	
   146	            // Add active class to clicked button and corresponding content
   147	            this.classList.add('active');
   148	            document.getElementById(targetTab).classList.add('active');
   149	        });
   150	    });
   151	}
   152	
   153	// Initialize animations
   154	function initializeAnimations() {
   155	    // Counter animation for hero stats
   156	    animateCounters();
   157	    
   158	    // Progress bars animation
   159	    window.addEventListener('scroll', function() {
   160	        const progressBars = document.querySelectorAll('.progress-fill');
   161	        progressBars.forEach(bar => {
   162	            const rect = bar.getBoundingClientRect();
   163	            if (rect.top < window.innerHeight && rect.bottom > 0) {
   164	                bar.style.animation = 'fillProgress 2s ease-out forwards';
   165	            }
   166	        });
   167	    });
   168	
   169	    // Add CSS for progress bar animation
   170	    const style = document.createElement('style');
   171	    style.textContent = `
   172	        @keyframes fillProgress {
   173	            from {
   174	                width: 0;
   175	            }
   176	            to {
   177	                width: var(--target-width);
   178	            }
   179	        }
   180	    `;
   181	    document.head.appendChild(style);
   182	}
   183	
   184	// Counter animation for statistics
   185	function animateCounters() {
   186	    const counters = document.querySelectorAll('.stat .number');
   187	    
   188	    const observer = new IntersectionObserver(function(entries) {
   189	        entries.forEach(entry => {
   190	            if (entry.isIntersecting) {
   191	                const counter = entry.target;
   192	                const target = counter.textContent;
   193	                const isYear = target.includes('2024');
   194	                const isNegative = target.includes('-');
   195	                const isPositive = target.includes('+');
   196	                
   197	                if (isYear) {
   198	                    animateNumber(counter, 2020, 2024, 2000);
   199	                } else if (isNegative) {
   200	                    const num = parseInt(target.replace(/[^0-9]/g, ''));
   201	                    animateNumber(counter, 0, num, 1500, '-', 'kg');
   202	                } else if (isPositive) {
   203	                    const num = parseInt(target.replace(/[^0-9]/g, ''));
   204	                    animateNumber(counter, 0, num, 1500, '+', 'kg');
   205	                }
   206	                
   207	                observer.unobserve(counter);
   208	            }
   209	        });
   210	    }, { threshold: 0.5 });
   211	
   212	    counters.forEach(counter => observer.observe(counter));
   213	}
   214	
   215	// Animate number function
   216	function animateNumber(element, start, end, duration, prefix = '', suffix = '') {
   217	    const startTimestamp = performance.now();
   218	    
   219	    function updateNumber(timestamp) {
   220	        const elapsed = timestamp - startTimestamp;
   221	        const progress = Math.min(elapsed / duration, 1);
   222	        
   223	        // Easing function
   224	        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
   225	        const current = Math.floor(start + (end - start) * easeOutCubic);
   226	        
   227	        element.textContent = prefix + current + suffix;
   228	        
   229	        if (progress < 1) {
   230	            requestAnimationFrame(updateNumber);
   231	        }
   232	    }
   233	    
   234	    requestAnimationFrame(updateNumber);
   235	}
   236	
   237	// Initialize progress bars with proper widths
   238	function initializeProgressBars() {
   239	    const progressBars = document.querySelectorAll('.progress-fill');
   240	    progressBars.forEach(bar => {
   241	        const width = bar.style.width;
   242	        bar.style.setProperty('--target-width', width);
   243	        bar.style.width = '0';
   244	    });
   245	}
   246	
   247	// Parallax effect for hero section
   248	window.addEventListener('scroll', function() {
   249	    const heroImage = document.querySelector('.hero-image img');
   250	    const scrolled = window.pageYOffset;
   251	    const rate = scrolled * -0.5;
   252	    
   253	    if (heroImage) {
   254	        heroImage.style.transform = `translateY(${rate}px)`;
   255	    }
   256	});
   257	
   258	// Add hover effects for cards
   259	document.addEventListener('DOMContentLoaded', function() {
   260	    // Add tilt effect to cards on hover
   261	    const cards = document.querySelectorAll('.info-card, .nutrition-card, .training-card, .supplement-card, .quote-card, .why-item, .photo-item');
   262	    
   263	    cards.forEach(card => {
   264	        card.addEventListener('mouseenter', function() {
   265	            this.style.transform = 'translateY(-5px) scale(1.02)';
   266	        });
   267	        
   268	        card.addEventListener('mouseleave', function() {
   269	            this.style.transform = 'translateY(0) scale(1)';
   270	        });
   271	    });
   272	});
   273	
   274	// Smooth scroll for CTA button
   275	document.querySelector('.cta-button')?.addEventListener('click', function(e) {
   276	    e.preventDefault();
   277	    const target = document.querySelector(this.getAttribute('href'));
   278	    if (target) {
   279	        const offsetTop = target.offsetTop - 80;
   280	        window.scrollTo({
   281	            top: offsetTop,
   282	            behavior: 'smooth'
   283	        });
   284	    }
   285	});
   286	
   287	// Add loading animation
   288	window.addEventListener('load', function() {
   289	    document.body.classList.add('loaded');
   290	    
   291	    const style = document.createElement('style');
   292	    style.textContent = `
   293	        body {
   294	            opacity: 0;
   295	            transition: opacity 0.5s ease;
   296	        }
   297	        body.loaded {
   298	            opacity: 1;
   299	        }
   300	    `;
   301	    document.head.appendChild(style);
   302	});
   303	
   304	// Photo gallery lightbox effect
   305	function initializeLightbox() {
   306	    const galleryImages = document.querySelectorAll('.photo-item img, .comparison-item img');
   307	    
   308	    galleryImages.forEach(img => {
   309	        img.style.cursor = 'pointer';
   310	        img.addEventListener('click', function() {
   311	            openLightbox(this.src, this.alt);
   312	        });
   313	    });
   314	}
   315	
   316	function openLightbox(src, alt) {
   317	    // Create lightbox overlay
   318	    const lightbox = document.createElement('div');
   319	    lightbox.style.cssText = `
   320	        position: fixed;
   321	        top: 0;
   322	        left: 0;
   323	        width: 100%;
   324	        height: 100%;
   325	        background: rgba(0, 0, 0, 0.9);
   326	        display: flex;
   327	        justify-content: center;
   328	        align-items: center;
   329	        z-index: 10000;
   330	        cursor: pointer;
   331	        opacity: 0;
   332	        transition: opacity 0.3s ease;
   333	    `;
   334	    
   335	    const img = document.createElement('img');
   336	    img.src = src;
   337	    img.alt = alt;
   338	    img.style.cssText = `
   339	        max-width: 90%;
   340	        max-height: 90%;
   341	        object-fit: contain;
   342	        border-radius: 10px;
   343	        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
   344	    `;
   345	    
   346	    lightbox.appendChild(img);
   347	    document.body.appendChild(lightbox);
   348	    
   349	    // Fade in
   350	    setTimeout(() => {
   351	        lightbox.style.opacity = '1';
   352	    }, 10);
   353	    
   354	    // Close on click
   355	    lightbox.addEventListener('click', function() {
   356	        lightbox.style.opacity = '0';
   357	        setTimeout(() => {
   358	            document.body.removeChild(lightbox);
   359	        }, 300);
   360	    });
   361	    
   362	    // Close on escape
   363	    const closeOnEscape = function(e) {
   364	        if (e.key === 'Escape') {
   365	            lightbox.click();
   366	            document.removeEventListener('keydown', closeOnEscape);
   367	        }
   368	    };
   369	    document.addEventListener('keydown', closeOnEscape);
   370	}
   371	
   372	// Initialize lightbox after DOM is loaded
   373	document.addEventListener('DOMContentLoaded', function() {
   374	    setTimeout(initializeLightbox, 1000); // Delay to ensure images are loaded
   375	});
   376	
   377	// Add smooth reveal animation for timeline items
   378	function initializeTimelineAnimation() {
   379	    const timelineItems = document.querySelectorAll('.timeline-item');
   380	    
   381	    const observer = new IntersectionObserver(function(entries) {
   382	        entries.forEach((entry, index) => {
   383	            if (entry.isIntersecting) {
   384	                setTimeout(() => {
   385	                    entry.target.style.opacity = '1';
   386	                    entry.target.style.transform = 'translateX(0)';
   387	                }, index * 200);
   388	                observer.unobserve(entry.target);
   389	            }
   390	        });
   391	    }, { threshold: 0.3 });
   392	    
   393	    timelineItems.forEach((item, index) => {
   394	        item.style.opacity = '0';
   395	        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
   396	        
   397	        if (index % 2 === 0) {
   398	            item.style.transform = 'translateX(-50px)';
   399	        } else {
   400	            item.style.transform = 'translateX(50px)';
   401	        }
   402	        
   403	        observer.observe(item);
   404	    });
   405	}
   406	
   407	// Initialize timeline animation
   408	document.addEventListener('DOMContentLoaded', function() {
   409	    setTimeout(initializeTimelineAnimation, 500);
   410	});
   411	
   412	// Add typing effect for hero title
   413	function initializeTypingEffect() {
   414	    const heroTitle = document.querySelector('.hero-title');
   415	    if (!heroTitle) return;
   416	    
   417	    const text = heroTitle.textContent;
   418	    heroTitle.textContent = '';
   419	    heroTitle.style.opacity = '1';
   420	    
   421	    let i = 0;
   422	    function typeWriter() {
   423	        if (i < text.length) {
   424	            heroTitle.textContent += text.charAt(i);
   425	            i++;
   426	            setTimeout(typeWriter, 100);
   427	        }
   428	    }
   429	    
   430	    // Start typing effect after a short delay
   431	    setTimeout(typeWriter, 1000);
   432	}
   433	
   434	// Initialize typing effect
   435	window.addEventListener('load', function() {
   436	    setTimeout(initializeTypingEffect, 500);
   437	});
   438	
   439	// Add dynamic gradient background for hero section
   440	function initializeDynamicBackground() {
   441	    const hero = document.querySelector('.hero');
   442	    if (!hero) return;
   443	    
   444	    let mouseX = 0;
   445	    let mouseY = 0;
   446	    
   447	    document.addEventListener('mousemove', function(e) {
   448	        mouseX = e.clientX / window.innerWidth;
   449	        mouseY = e.clientY / window.innerHeight;
   450	        
   451	        const overlay = hero.querySelector('.hero-overlay');
   452	        if (overlay) {
   453	            const gradientX = 50 + (mouseX - 0.5) * 20;
   454	            const gradientY = 50 + (mouseY - 0.5) * 20;
   455	            overlay.style.background = `radial-gradient(circle at ${gradientX}% ${gradientY}%, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.7) 100%)`;
   456	        }
   457	    });
   458	}
   459	
   460	// Initialize dynamic background
   461	document.addEventListener('DOMContentLoaded', function() {
   462	    setTimeout(initializeDynamicBackground, 1000);
   463	});
