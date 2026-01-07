// Sea Life Gallery Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize gallery filter
    initGalleryFilter();
    
    // Initialize image modal
    initImageModal();
    
    // Initialize fade-in animations
    initFadeInAnimations();
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
                    setTimeout(() => {
                        item.style.animation = 'fadeIn 0.6s ease forwards';
                    }, 10);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Image Modal Functionality
function initImageModal() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modalElement = document.getElementById('imageModal');
    const modal = new bootstrap.Modal(modalElement);
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');
    const modalTags = document.getElementById('modalTags');
    
    // Handle modal hidden event to clean up
    modalElement.addEventListener('hidden.bs.modal', function() {
        // Remove any lingering backdrop
        const backdrops = document.querySelectorAll('.modal-backdrop');
        backdrops.forEach(backdrop => {
            backdrop.remove();
        });
        
        // Ensure body classes are removed
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
        
        // Enable scrolling
        document.body.style.overflow = 'auto';
    });
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const card = this.querySelector('.gallery-card');
            const img = card.querySelector('.gallery-img');
            const title = card.querySelector('.gallery-card-title').textContent;
            const description = card.querySelector('.gallery-card-text').textContent;
            const category = card.querySelector('.gallery-category-tag').textContent;
            
            // Set modal content
            modalTitle.textContent = title;
            modalImage.src = img.src;
            modalImage.alt = img.alt;
            modalDescription.textContent = description;
            
            // Clear and add tags
            modalTags.innerHTML = '';
            
            const categoryTag = document.createElement('span');
            categoryTag.className = 'badge bg-primary me-2';
            categoryTag.style.backgroundColor = 'var(--blue-600)';
            categoryTag.style.padding = '8px 15px';
            categoryTag.style.borderRadius = '15px';
            categoryTag.textContent = category;
            modalTags.appendChild(categoryTag);
            
            // Show modal
            modal.show();
        });
    });
    
    // Add close button functionality
    const closeButtons = modalElement.querySelectorAll('[data-bs-dismiss="modal"], .btn-close');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            modal.hide();
        });
    });
    
    // Close modal when clicking outside the modal content
    modalElement.addEventListener('click', function(e) {
        if (e.target === this) {
            modal.hide();
        }
    });
    
    // Handle ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalElement.classList.contains('show')) {
            modal.hide();
        }
    });
}

// Fix for Bootstrap modal backdrop issue
function fixModalBackdrop() {
    // Remove any stuck modal backdrops
    const stuckBackdrops = document.querySelectorAll('.modal-backdrop');
    stuckBackdrops.forEach(backdrop => {
        backdrop.remove();
    });
    
    // Reset body classes
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
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
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe gallery items for fade-in animation
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        observer.observe(item);
    });
}

// Add hover effects to gallery items
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        const card = this.querySelector('.gallery-card');
        if (card) {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 15px 30px rgba(59, 130, 246, 0.2)';
        }
    });
    
    item.addEventListener('mouseleave', function() {
        const card = this.querySelector('.gallery-card');
        if (card) {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';
        }
    });
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

// Fix for stuck modal issues
function checkForStuckModal() {
    // Check if there's a modal backdrop that shouldn't be there
    if (!document.querySelector('#imageModal.show')) {
        fixModalBackdrop();
    }
}

// Add a global click handler to fix stuck modals
document.addEventListener('click', function() {
    setTimeout(checkForStuckModal, 100);
});

// Add a global key handler for ESC to close any modal
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modalElement = document.getElementById('imageModal');
        if (modalElement && modalElement.classList.contains('show')) {
            const modal = bootstrap.Modal.getInstance(modalElement);
            if (modal) {
                modal.hide();
            } else {
                fixModalBackdrop();
            }
        }
    }
});

// Call preload function after page loads
window.addEventListener('load', preloadImages);

// Update active filter based on URL hash
function updateActiveFilterFromHash() {
    const hash = window.location.hash.substring(1);
    if (hash) {
        const filterBtn = document.querySelector(`.filter-btn[data-filter="${hash}"]`);
        if (filterBtn) {
            filterBtn.click();
        }
    }
}

// Initialize hash-based filtering
window.addEventListener('load', updateActiveFilterFromHash);
window.addEventListener('hashchange', updateActiveFilterFromHash);

// Add fix for when page becomes visible again (tab switching)
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        checkForStuckModal();
    }
});