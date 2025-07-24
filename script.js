// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }

    // Smooth scrolling for anchor links (only for same-page anchors)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Only prevent default for anchors that point to elements on the same page
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Newsletter form handling
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Simple email validation
            if (validateEmail(email)) {
                alert('Thank you for subscribing! You will receive updates about new blog posts.');
                this.querySelector('input[type="email"]').value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }

    // Event form handling (if admin section is enabled)
    const eventForm = document.querySelector('.event-form');
    if (eventForm) {
        eventForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                title: document.getElementById('event-title').value,
                date: document.getElementById('event-date').value,
                location: document.getElementById('event-location').value,
                description: document.getElementById('event-description').value,
                tags: document.getElementById('event-tags').value.split(',').map(tag => tag.trim()),
                image: document.getElementById('event-image').files[0]
            };
            
            // In a real application, you would send this data to a server
            console.log('New event data:', formData);
            alert('Event added successfully! (This is a demo - in a real application, this would be saved to a database)');
            
            // Reset form
            this.reset();
        });
    }

    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.project-card, .event-card, .blog-post, .timeline-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Image lazy loading for better performance
    const images = document.querySelectorAll('img[src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src; // This triggers loading
                img.style.opacity = '1';
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        imageObserver.observe(img);
    });
});

// Utility function for email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Function to toggle admin section (for adding events)
function toggleAdminSection() {
    const adminSection = document.querySelector('.add-event-section');
    if (adminSection) {
        adminSection.style.display = adminSection.style.display === 'block' ? 'none' : 'block';
    }
}

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Press 'A' to toggle admin section (for demo purposes)
    if (e.key === 'A' && e.shiftKey && e.ctrlKey) {
        toggleAdminSection();
    }
    
    // Press 'Escape' to close mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const mobileMenu = document.getElementById('mobile-menu');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    }
});

// Handle image upload preview for event form
function handleImageUpload(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // Create preview or update existing preview
            let preview = document.querySelector('.image-preview');
            if (!preview) {
                preview = document.createElement('div');
                preview.className = 'image-preview';
                input.parentNode.appendChild(preview);
            }
            preview.innerHTML = `<img src="${e.target.result}" alt="Preview" style="max-width: 200px; max-height: 200px; border-radius: 5px; margin-top: 10px;">`;
        };
        reader.readAsDataURL(input.files[0]);
    }
}

// Add event listener for image upload if the input exists
document.addEventListener('DOMContentLoaded', function() {
    const imageInput = document.getElementById('event-image');
    if (imageInput) {
        imageInput.addEventListener('change', function() {
            handleImageUpload(this);
        });
    }
});