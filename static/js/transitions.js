document.addEventListener('DOMContentLoaded', () => {
    // Create loader element
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    document.body.appendChild(loader);

    // Add transition handling to all internal links
    document.addEventListener('click', e => {
        const link = e.target.closest('a');
        if (!link) return;
        
        // Only handle internal links
        if (
            link.hostname === window.location.hostname && 
            !link.hasAttribute('data-no-transition')
        ) {
            e.preventDefault();
            handlePageTransition(link.href);
        }
    });
});

function handlePageTransition(url) {
    const mainContent = document.querySelector('.main-content');
    const loader = document.querySelector('.page-loader');
    
    // Don't transition if already transitioning
    if (mainContent.classList.contains('transitioning')) return;
    
    // Start transition
    mainContent.classList.add('transitioning', 'fade-out');
    loader.classList.add('active');
    
    // Wait for fade out
    setTimeout(() => {
        // Load new page
        fetch(url)
            .then(response => response.text())
            .then(html => {
                // Parse the new page content
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const newContent = doc.querySelector('.main-content');
                
                // Update the page title
                document.title = doc.title;
                
                // Update URL
                window.history.pushState({}, '', url);
                
                // Replace content
                mainContent.innerHTML = newContent.innerHTML;
                
                // Start fade in
                mainContent.classList.remove('fade-out');
                mainContent.classList.add('fade-in');
                
                // Hide loader
                loader.classList.remove('active');
                
                // Clean up classes after animation
                setTimeout(() => {
                    mainContent.classList.remove('transitioning', 'fade-in');
                }, 500);
            })
            .catch(error => {
                console.error('Page transition failed:', error);
                window.location.href = url; // Fallback to normal navigation
            });
    }, 500); // Match the CSS transition duration
}

// Handle browser back/forward buttons
window.addEventListener('popstate', () => {
    handlePageTransition(window.location.href);
}); 