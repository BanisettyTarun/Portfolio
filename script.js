document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Mobile menu toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navMenu = document.querySelector('nav');
    
    if (menuBtn) {
      menuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
      });
    }
    
    // Active nav link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a');
    
    function updateActiveLink() {
      const scrollPosition = window.scrollY + 100;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Initialize on page load
    
    // Handle form submission
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Disable button and show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="loading"></span> Sending...';
        
        // Simulate form submission (in a real app, you'd send this to a server)
        setTimeout(() => {
          // For demo purposes, we'll simulate a successful submission
          console.log('Form submitted:', { name, email, message });
          
          // Reset form
          contactForm.reset();
          
          // Show success message
          formStatus.className = 'form-status success';
          formStatus.textContent = 'Thank you! Your message has been sent successfully. I\'ll get back to you as soon as possible.';
          
          // Reset button
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Message';
          
          // Hide success message after 5 seconds
          setTimeout(() => {
            formStatus.style.display = 'none';
          }, 5000);
        }, 1500);
      });
    }
    
    // Optional: Add fade-in animations for elements
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const fadeElements = document.querySelectorAll('.hero-content, .about-content, .project-card, .contact-content');
    
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-visible');
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);
      
      fadeElements.forEach(element => {
        element.classList.add('fade-element');
        observer.observe(element);
      });
    }
  });
  
  // Add CSS for fade animations
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    .fade-element {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-visible {
      opacity: 1;
      transform: translateY(0);
    }
    
    .loading {
      display: inline-block;
      width: 1rem;
      height: 1rem;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: white;
      animation: spin 1s ease-in-out infinite;
      margin-right: 0.5rem;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    /* Mobile menu active states */
    .menu-btn.active span:nth-child(1) {
      transform: translateY(7px) rotate(45deg);
    }
    
    .menu-btn.active span:nth-child(2) {
      opacity: 0;
    }
    
    .menu-btn.active span:nth-child(3) {
      transform: translateY(-7px) rotate(-45deg);
    }
    
    nav.active {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      background-color: white;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      padding: 1rem 0;
    }
    
    nav.active ul {
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }
  `;
  document.head.appendChild(styleSheet);
  