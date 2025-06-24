// Mobile Navigation Toggle - Fixed
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")
const body = document.body

if (hamburger && navMenu) {
  // Toggle mobile menu
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation()
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
    body.classList.toggle("menu-open")

    console.log("Menu toggled:", navMenu.classList.contains("active"))
  })

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
      body.classList.remove("menu-open")
      console.log("Menu closed via link click")
    })
  })

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    const isClickInsideNav = navMenu.contains(e.target)
    const isClickOnHamburger = hamburger.contains(e.target)

    if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains("active")) {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
      body.classList.remove("menu-open")
      console.log("Menu closed via outside click")
    }
  })

  // Close menu on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navMenu.classList.contains("active")) {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
      body.classList.remove("menu-open")
      console.log("Menu closed via escape key")
    }
  })

  // Handle window resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
      body.classList.remove("menu-open")
    }
  })
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const offsetTop = target.offsetTop - 120 // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (navbar) {
    if (window.scrollY > 100) {
      navbar.style.background = "rgba(255, 255, 255, 0.95)"
      navbar.style.backdropFilter = "blur(10px)"
    } else {
      navbar.style.background = "white"
      navbar.style.backdropFilter = "none"
    }
  }
})

// Iframe button functionality
document.querySelectorAll(".iframe-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (btn.textContent.includes("Remove iframe")) {
      const iframeHeader = document.querySelector(".iframe-header")
      const navbar = document.querySelector(".navbar")
      if (iframeHeader) iframeHeader.style.display = "none"
      if (navbar) navbar.style.top = "0"
    } else if (btn.textContent.includes("Go Back")) {
      alert("Redirecting to download page...")
    }
  })
})

// Contact button functionality
function handleContactClick() {
  console.log("Contact button clicked")
  alert("Thank you for your interest! Contact functionality would be implemented here!")
}

// Contact Form Handling
const contactForm = document.getElementById("contactForm")

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form data
    const formData = new FormData(contactForm)
    const fullName = formData.get("fullName")
    const email = formData.get("email")
    const phone = formData.get("phone")
    const message = formData.get("message")

    // Simple validation
    if (!fullName || !email || !message) {
      alert("Please fill in all required fields.")
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.")
      return
    }

    // Show loading state
    const sendButton = contactForm.querySelector(".send-button")
    const originalText = sendButton.textContent
    sendButton.textContent = "Sending..."
    sendButton.disabled = true

    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
      alert(`Thank you, ${fullName}! Your message has been sent successfully. We'll get back to you soon.`)

      // Reset form
      contactForm.reset()

      // Reset button
      sendButton.textContent = originalText
      sendButton.disabled = false

      console.log("Contact form submitted:", {
        fullName,
        email,
        phone,
        message,
      })
    }, 2000)
  })

  // Add real-time validation feedback
  const inputs = contactForm.querySelectorAll("input, textarea")
  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      if (this.hasAttribute("required") && !this.value.trim()) {
        this.style.borderColor = "#ef4444"
      } else if (this.type === "email" && this.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(this.value)) {
          this.style.borderColor = "#ef4444"
        } else {
          this.style.borderColor = "#10b981"
        }
      } else if (this.value.trim()) {
        this.style.borderColor = "#10b981"
      } else {
        this.style.borderColor = "#e2e8f0"
      }
    })

    input.addEventListener("focus", function () {
      this.style.borderColor = "#6b46c1"
    })
  })
}

// Skills Animation
function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress")

  skillBars.forEach((bar, index) => {
    const percentage = bar.getAttribute("data-percentage")

    setTimeout(() => {
      bar.style.width = percentage + "%"
    }, 200 * index)
  })
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.3,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate")

      // Trigger skills animation if it's the skills section
      if (entry.target.id === "skills") {
        animateSkillBars()
      }

      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

// Initialize observers when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Observe skills section
  const skillsSection = document.getElementById("skills")
  if (skillsSection) {
    observer.observe(skillsSection)
  }

  // Observe other sections for animations
  const sections = document.querySelectorAll("section")
  sections.forEach((section) => {
    observer.observe(section)
  })

  // Add scroll animations
  const animatedElements = document.querySelectorAll(".service-item, .work-item, .skill-item")

  const animationObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = "fadeInUp 0.6s ease forwards"
          animationObserver.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  )

  animatedElements.forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(30px)"
    animationObserver.observe(element)
  })
})

// Testimonials Slider
const testimonialsWrapper = document.getElementById("testimonialsWrapper")
const testimonialSlides = document.querySelectorAll(".testimonial-slide")
const testimonialDots = document.querySelectorAll(".testimonial-dots .dot")
const prevBtn = document.getElementById("prevBtn")
const nextBtn = document.getElementById("nextBtn")

if (testimonialsWrapper && testimonialSlides.length > 0) {
  let currentSlide = 0
  const totalSlides = testimonialSlides.length

  function showSlide(index) {
    // Hide all slides
    testimonialSlides.forEach((slide) => {
      slide.classList.remove("active")
    })

    // Remove active class from all dots
    testimonialDots.forEach((dot) => {
      dot.classList.remove("active")
    })

    // Show current slide
    testimonialSlides[index].classList.add("active")
    testimonialDots[index].classList.add("active")
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides
    showSlide(currentSlide)
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides
    showSlide(currentSlide)
  }

  // Event listeners
  if (nextBtn) nextBtn.addEventListener("click", nextSlide)
  if (prevBtn) prevBtn.addEventListener("click", prevSlide)

  // Dot navigation
  testimonialDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlide = index
      showSlide(currentSlide)
    })
  })

  // Auto-play testimonials
  setInterval(nextSlide, 5000)

  // Initialize first slide
  showSlide(0)
}

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Apply debounce to scroll event
const debouncedScrollHandler = debounce(() => {
  const navbar = document.querySelector(".navbar")
  if (navbar) {
    if (window.scrollY > 100) {
      navbar.style.background = "rgba(255, 255, 255, 0.95)"
      navbar.style.backdropFilter = "blur(10px)"
    } else {
      navbar.style.background = "white"
      navbar.style.backdropFilter = "none"
    }
  }
}, 10)

window.addEventListener("scroll", debouncedScrollHandler)
