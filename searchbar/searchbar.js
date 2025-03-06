// searchbar javascript
// Search functionality
function initializeSearch() {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    // Search data (in a real application, this would come from your backend)
    const searchData = [
        {
            title: 'Luxury Suite',
            category: 'room',
            description: 'Experience unparalleled comfort and style.',
            url: '#rooms'
        },
        {
            title: 'Deluxe Room',
            category: 'room',
            description: 'Feel the thrill of high-end amenities.',
            url: '#rooms'
        },
        {
            title: 'Family Suite',
            category: 'room',
            description: 'Combine luxury with versatility.',
            url: '#rooms'
        },
        {
            title: 'Weekend Getaway',
            category: 'offer',
            description: 'Book a weekend stay and get 20% off + free breakfast',
            url: '#special-offers'
        },
        {
            title: 'Stay 3, Pay 2',
            category: 'offer',
            description: 'Book 3 nights and get 1 night absolutely free',
            url: '#special-offers'
        },
        {
            title: 'Reservations',
            category: 'service',
            description: 'Book your stay at AMASSAH LODGE',
            url: '../reservations/reservations.html'
        },
        {
            title: 'Reviews',
            category: 'service',
            description: 'See what our guests have to say about their stay',
            url: '../reviews/reviews.html'
        }
    ];
    
    // Function to perform search
    function performSearch(query) {
        if (!query) {
            searchResults.classList.remove('active');
            return;
        }
        
        const results = searchData.filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase())
        );
        
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="search-result-item">No results found</div>';
        } else {
            searchResults.innerHTML = results.map(result => `
                <div class="search-result-item" data-url="${result.url}">
                    <h4>${result.title} <span class="category-badge">${result.category}</span></h4>
                    <p>${result.description}</p>
                </div>
            `).join('');
            
            // Add click event to search results
            document.querySelectorAll('.search-result-item').forEach(item => {
                item.addEventListener('click', function() {
                    const url = this.dataset.url;
                    if (url) {
                        if (url.startsWith('#')) {
                            // Scroll to section
                            const targetSection = document.querySelector(url);
                            if (targetSection) {
                                targetSection.scrollIntoView({ behavior: 'smooth' });
                            }
                        } else {
                            // Navigate to page
                            window.location.href = url;
                        }
                        searchResults.classList.remove('active');
                        searchInput.value = '';
                    }
                });
            });
        }
        
        searchResults.classList.add('active');
    }
    
    // Search form submit event
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        performSearch(searchInput.value.trim());
    });
    
    // Search input keyup event (live search)
    searchInput.addEventListener('keyup', function() {
        performSearch(this.value.trim());
    });
    
    // Hide search results when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchForm.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.remove('active');
        }
    });
    
    // Focus event to show previous results
    searchInput.addEventListener('focus', function() {
        if (this.value.trim()) {
            performSearch(this.value.trim());
        }
    });
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
});
