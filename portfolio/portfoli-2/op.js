// Mobile Navigation Toggle
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Add scroll effect to navbar
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.background = 'white';
                navbar.style.backdropFilter = 'none';
            }
        });

        // Iframe button functionality
        document.querySelectorAll('.iframe-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (btn.textContent.includes('Remove iframe')) {
                    document.querySelector('.iframe-header').style.display = 'none';
                    document.querySelector('.navbar').style.top = '0';
                } else if (btn.textContent.includes('Go Back')) {
                    alert('Redirecting to download page...');
                }
            });
        });


         // Contact button functionality
        function handleContactClick() {
            // Add your contact logic here
            console.log('Contact button clicked');
            
            alert('Contact functionality would be implemented here!');
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe the about section
        document.addEventListener('DOMContentLoaded', () => {
            const aboutSection = document.querySelector('.about-section');
            if (aboutSection) {
                observer.observe(aboutSection);
            }
        });

        // Add parallax effect to background
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const aboutContent = document.querySelector('.about-content');
            if (aboutContent) {
                aboutContent.style.transform = `translateY(${scrolled * 0.1}px)`;
            }
        });

         // Animate progress bars based on exact percentage
        function animateSkillBars() {
            const skillBars = document.querySelectorAll('.skill-progress');
            
            skillBars.forEach((bar, index) => {
                const percentage = bar.getAttribute('data-percentage');
                
                // Delay animation for each bar
                setTimeout(() => {
                    // Set width to exact percentage
                    bar.style.width = percentage + '%';
                    
                    // Optional: Log the percentage for debugging
                    console.log(`Skill ${index + 1}: ${percentage}% filled`);
                }, 200 * index);
            });
        }

        // Intersection Observer for scroll-triggered animation
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    animateSkillBars();
                    observer.unobserve(entry.target); // Only animate once
                }
            });
        }, observerOptions);

        // Start observing when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            const skillsSection = document.getElementById('skills-section');
            if (skillsSection) {
                observer.observe(skillsSection);
            }
        });

        // Function to update skill percentage dynamically
        function updateSkill(skillIndex, newPercentage) {
            const skillBars = document.querySelectorAll('.skill-progress');
            const skillPercentages = document.querySelectorAll('.skill-percentage');
            
            if (skillBars[skillIndex] && skillPercentages[skillIndex]) {
                // Update the visual bar
                skillBars[skillIndex].style.width = newPercentage + '%';
                skillBars[skillIndex].setAttribute('data-percentage', newPercentage);
                
                // Update the percentage text
                skillPercentages[skillIndex].textContent = newPercentage + '%';
                
                console.log(`Updated skill ${skillIndex + 1} to ${newPercentage}%`);
            }
        }

        // Example usage: updateSkill(0, 98) - updates first skill to 98%

        // Reset and replay animation
        function resetSkillBars() {
            const skillBars = document.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                bar.style.width = '0%';
            });
            setTimeout(animateSkillBars, 500);
        }

        // Keyboard shortcut to reset (Ctrl + R)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'r' && e.ctrlKey) {
                e.preventDefault();
                resetSkillBars();
            }
        });


        




        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        // Observe work items
        document.addEventListener('DOMContentLoaded', () => {
            const workItems = document.querySelectorAll('.work-item');
            workItems.forEach(item => {
                observer.observe(item);
            });
        });

        // Add click handlers for work items
        document.querySelectorAll('.work-item').forEach(item => {
            item.addEventListener('click', (e) => {
                if (!e.target.classList.contains('work-link')) {
                    const title = item.querySelector('.work-title').textContent;
                    console.log(`Clicked on project: ${title}`);
                    // Add your project navigation logic here
                }
            });
        });

        // Parallax effect for work items
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const workItems = document.querySelectorAll('.work-item');
            
            workItems.forEach((item, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(scrolled * speed);
                item.style.transform += ` translateY(${yPos}px)`;
            });
        });

        // Random floating animation
        function addFloatingAnimation() {
            const workItems = document.querySelectorAll('.work-item');
            
            workItems.forEach((item, index) => {
                setInterval(() => {
                    const randomX = Math.random() * 4 - 2; // -2 to 2
                    const randomY = Math.random() * 4 - 2; // -2 to 2
                    
                    item.style.transform += ` translate(${randomX}px, ${randomY}px)`;
                    
                    setTimeout(() => {
                        item.style.transform = item.style.transform.replace(` translate(${randomX}px, ${randomY}px)`, '');
                    }, 2000);
                }, 3000 + (index * 500));
            });
        }

        // Start floating animation after page load
        setTimeout(addFloatingAnimation, 2000);



        const slider = document.getElementById("slider");
const dots = document.querySelectorAll(".dot");

let currentSlide = 0;
const totalSlides = dots.length;

function updateSlider() {
  const containerWidth = document.querySelector(".slider-container").offsetWidth;
  slider.style.transform = `translateX(-${currentSlide * containerWidth}px)`;

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentSlide);
  });
}

function goToSlide(index) {
  currentSlide = index;
  updateSlider();
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlider();
}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => goToSlide(index));
});

setInterval(nextSlide, 4000);

// Resize listener in case screen size changes
window.addEventListener("resize", updateSlider);

// Initial slide position
updateSlider();




const wrapper = document.getElementById("testimonialWrapper");
    const dots = document.querySelectorAll(".dot");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    let currentSlide = 0;

    function updateSlider() {
      const isMobile = window.innerWidth <= 768;
      const totalGroups = isMobile ? 6 : 2;
      const translateX = -(currentSlide * 100);
      wrapper.style.transform = `translateX(${translateX}%)`;

      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentSlide);
      });
    }

    function goToSlide(index) {
      const maxIndex = window.innerWidth <= 768 ? 5 : 1;
      currentSlide = index < 0 ? maxIndex : index > maxIndex ? 0 : index;
      updateSlider();
    }

    function nextSlide() {
      goToSlide(currentSlide + 1);
    }

    function prevSlide() {
      goToSlide(currentSlide - 1);
    }

    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);
    dots.forEach(dot => {
      dot.addEventListener("click", () => goToSlide(parseInt(dot.dataset.index)));
    });

    // Auto-play every 4 seconds
    setInterval(nextSlide, 4000);

    // Responsive adjustment
    window.addEventListener("resize", updateSlider);
    updateSlider();