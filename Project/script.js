// Maritime Learning Hub - Main JavaScript File

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    
    // Initialize popovers
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
    
    // Set active nav link based on current page
    setActiveNavLink();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Search functionality
    initSearch();
    
    // Career explorer functionality
    initCareerExplorer();
    
    // Safety equipment info
    initSafetyInfo();
    
    // Form validation for contact page
    initFormValidation();
});

// Set active navigation link
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Initialize scroll animations
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    if (fadeElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        fadeElements.forEach(element => {
            observer.observe(element);
        });
    }
}

// Search functionality
function initSearch() {
    const searchForm = document.querySelector('form.d-flex');
    const searchInput = document.querySelector('input[type="search"]');
    
    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = searchInput.value.trim();
            
            if (query) {
                // In a real application, this would search the database
                // For now, we'll just show an alert
                alert(`Searching for: "${query}"\n\nThis functionality would connect to a backend search system in a production environment.`);
                searchInput.value = '';
                
                // Store search in localStorage for demo purposes
                const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
                recentSearches.unshift({
                    query: query,
                    timestamp: new Date().toISOString()
                });
                
                // Keep only last 5 searches
                if (recentSearches.length > 5) {
                    recentSearches.pop();
                }
                
                localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
            }
        });
    }
}

// Career explorer functionality
function initCareerExplorer() {
    const careerCards = document.querySelectorAll('.career-card');
    
    careerCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('.card-title').textContent;
            const description = this.querySelector('.card-text').textContent;
            
            // Show modal with career details
            showCareerModal(title, description);
        });
    });
}

// Show career modal
function showCareerModal(title, description) {
    // Create modal HTML
    const modalHTML = `
        <div class="modal fade" id="careerModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <p>${description}</p>
                        <div class="mt-4">
                            <h6>Education Requirements:</h6>
                            <p>Varies by position - typically requires maritime academy training, university degree, or on-the-job training.</p>
                            
                            <h6>Salary Range:</h6>
                            <p>Entry-level: $30,000 - $50,000 | Experienced: $60,000 - $120,000+</p>
                            
                            <h6>Job Outlook:</h6>
                            <p>Growing demand for maritime professionals with expected 5-10% growth over the next decade.</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save Career</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Show modal
    const careerModal = new bootstrap.Modal(document.getElementById('careerModal'));
    careerModal.show();
    
    // Remove modal from DOM after hidden
    document.getElementById('careerModal').addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
}

// Safety equipment information
function initSafetyInfo() {
    const equipmentItems = document.querySelectorAll('.equipment-item');
    
    equipmentItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.15)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.08)';
        });
        
        // Add click event for more info
        item.addEventListener('click', function() {
            const title = this.querySelector('h5').textContent;
            const description = this.querySelector('p').textContent;
            
            alert(`Safety Equipment: ${title}\n\n${description}\n\nThis equipment is essential for maritime safety and is required on all commercial vessels.`);
        });
    });
}

// Form validation for contact page
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Simple validation
            let isValid = true;
            let errorMessage = '';
            
            if (!name) {
                isValid = false;
                errorMessage += 'Name is required.\n';
            }
            
            if (!email) {
                isValid = false;
                errorMessage += 'Email is required.\n';
            } else if (!isValidEmail(email)) {
                isValid = false;
                errorMessage += 'Please enter a valid email address.\n';
            }
            
            if (!message) {
                isValid = false;
                errorMessage += 'Message is required.\n';
            }
            
            if (isValid) {
                // In a real application, this would submit to a server
                alert('Thank you for your message! We will respond within 2-3 business days.\n\nThis is a demo form. In a production environment, this would send an email to the site administrator.');
                contactForm.reset();
                
                // Log contact for demo purposes
                const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
                contacts.unshift({
                    name: name,
                    email: email,
                    message: message,
                    timestamp: new Date().toISOString()
                });
                
                localStorage.setItem('contacts', JSON.stringify(contacts));
            } else {
                alert('Please fix the following errors:\n\n' + errorMessage);
            }
        });
    }
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Topic progress tracker (for learning modules)
function updateProgress(topicId, percentage) {
    const progressData = JSON.parse(localStorage.getItem('progressData') || '{}');
    progressData[topicId] = percentage;
    localStorage.setItem('progressData', JSON.stringify(progressData));
    
    // Update UI if element exists
    const progressBar = document.querySelector(`[data-topic="${topicId}"] .progress-bar`);
    if (progressBar) {
        progressBar.style.width = `${percentage}%`;
        progressBar.textContent = `${percentage}% Complete`;
    }
}

// Get progress for a topic
function getProgress(topicId) {
    const progressData = JSON.parse(localStorage.getItem('progressData') || '{}');
    return progressData[topicId] || 0;
}

// Initialize progress bars on page load
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
        const topicId = bar.closest('[data-topic]')?.getAttribute('data-topic');
        if (topicId) {
            const progress = getProgress(topicId);
            if (progress > 0) {
                bar.style.width = `${progress}%`;
                bar.textContent = `${progress}% Complete`;
            }
        }
    });
}

// Add to window object for global access
window.MaritimeLearningHub = {
    updateProgress,
    getProgress,
    initProgressBars
};

// Call initProgressBars on DOMContentLoaded
document.addEventListener('DOMContentLoaded', initProgressBars);

// Sea Life Gallery Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize gallery filter
    initGalleryFilter();
    
    // Initialize image modal
    initImageModal();
    
    // Initialize category navigation
    initCategoryNavigation();
    
    // Initialize fade-in animations
    initFadeInAnimations();
    
    // Initialize scroll to top button
    initScrollToTop();
    
    // Initialize smooth scrolling for anchor links
    initSmoothScrolling();
});

// Gallery Filter Functionality
function initGalleryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === category) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.6s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Scroll to gallery section
            document.getElementById('sea-life-gallery').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
    });
}

// Category Navigation Functionality
function initCategoryNavigation() {
    const categoryLinks = document.querySelectorAll('.category-link');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const category = this.getAttribute('data-category');
            const targetId = this.getAttribute('href');
            
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Activate corresponding filter button
            let filterBtn;
            switch(category) {
                case 'coral':
                    filterBtn = document.getElementById('coral-filter-btn');
                    break;
                case 'mammals':
                    filterBtn = document.getElementById('mammals-filter-btn');
                    break;
                case 'conservation':
                    filterBtn = document.querySelector('.filter-btn[data-filter="conservation"]');
                    break;
                case 'environment':
                    filterBtn = document.querySelector('.filter-btn[data-filter="environment"]');
                    break;
                default:
                    filterBtn = document.querySelector('.filter-btn[data-filter="all"]');
            }
            
            if (filterBtn) {
                filterBtn.classList.add('active');
                
                // Filter gallery items
                const galleryItems = document.querySelectorAll('.gallery-item');
                galleryItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    
                    if (category === 'all' || category === itemCategory) {
                        item.style.display = 'block';
                        item.style.animation = 'fadeIn 0.6s ease forwards';
                    } else {
                        item.style.display = 'none';
                    }
                });
            }
            
            // Scroll to the target section
            setTimeout(() => {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Add highlight effect
                    targetElement.style.animation = 'none';
                    setTimeout(() => {
                        targetElement.style.animation = 'highlightSection 2s ease';
                    }, 10);
                }
            }, 300); // Small delay to allow filter animation
        });
    });
}

// Image Modal Functionality
function initImageModal() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = new bootstrap.Modal(document.getElementById('imageModal'));
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');
    const modalTags = document.getElementById('modalTags');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const card = this.querySelector('.gallery-card');
            const img = card.querySelector('.gallery-img');
            const title = card.querySelector('h5').textContent;
            const description = card.querySelector('p').textContent;
            const tags = card.querySelectorAll('.gallery-tag');
            
            // Set modal content
            modalTitle.textContent = title;
            modalImage.src = img.src;
            modalImage.alt = img.alt;
            modalDescription.textContent = description;
            
            // Clear and add tags
            modalTags.innerHTML = '';
            tags.forEach(tag => {
                const span = document.createElement('span');
                span.className = 'badge bg-primary me-2 mb-2';
                span.style.backgroundColor = 'var(--blue-600)';
                span.style.padding = '8px 15px';
                span.style.borderRadius = '15px';
                span.textContent = tag.textContent;
                modalTags.appendChild(span);
            });
            
            // Show modal
            modal.show();
        });
    });
    
    // Close modal when clicking outside
    document.getElementById('imageModal').addEventListener('click', function(e) {
        if (e.target === this) {
            modal.hide();
        }
    });
}

// Fade-in Animations
function initFadeInAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
            }
        });
    }, observerOptions);
    
    // Observe gallery items for fade-in animation
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        observer.observe(item);
    });
    
    // Observe section titles
    const sectionTitles = document.querySelectorAll('.gallery-section-title');
    sectionTitles.forEach(title => {
        observer.observe(title);
    });
}

// Scroll to Top Button
function initScrollToTop() {
    const backToTopBtn = document.createElement('div');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(backToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth Scrolling for Anchor Links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal anchor links
            if (href.startsWith('#') && href !== '#') {
                e.preventDefault();
                
                const targetId = href;
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Add hover effects to gallery items
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        const overlay = this.querySelector('.gallery-overlay');
        const content = this.querySelector('.gallery-content');
        
        if (overlay && content) {
            overlay.style.opacity = '1';
            content.style.transform = 'translateY(0)';
        }
    });
    
    item.addEventListener('mouseleave', function() {
        const overlay = this.querySelector('.gallery-overlay');
        const content = this.querySelector('.gallery-content');
        
        if (overlay && content) {
            overlay.style.opacity = '0';
            content.style.transform = 'translateY(20px)';
        }
    });
});

// Keyboard navigation for modal
document.addEventListener('keydown', function(e) {
    const modal = document.getElementById('imageModal');
    
    if (modal.classList.contains('show')) {
        if (e.key === 'Escape') {
            bootstrap.Modal.getInstance(modal).hide();
        }
    }
});

// Preload images for better performance
function preloadImages() {
    const images = document.querySelectorAll('.gallery-img');
    images.forEach(img => {
        const src = img.getAttribute('src');
        if (src) {
            const image = new Image();
            image.src = src;
        }
    });
}

// Call preload function after page loads
window.addEventListener('load', preloadImages);

// Add category counter to filter buttons
function updateCategoryCounts() {
    const categories = ['all', 'coral', 'mammals', 'fish', 'conservation', 'environment'];
    
    categories.forEach(category => {
        const count = document.querySelectorAll(`.gallery-item[data-category="${category}"]`).length;
        const filterBtn = document.querySelector(`.filter-btn[data-filter="${category}"]`);
        
        if (filterBtn && category !== 'all') {
            // Update button text to include count
            const originalText = filterBtn.textContent;
            filterBtn.innerHTML = `${originalText} <span class="badge bg-white text-primary ms-1">${count}</span>`;
        }
    });
}

// Initialize category counts after page loads
window.addEventListener('load', updateCategoryCounts);