// You can add custom JavaScript here for more interactivity,
// but for a static site, Bootstrap's JS covers most common needs
// like navigation toggles and carousels.

// Example: Smooth scrolling for navigation links (optional, Bootstrap 5 handles some of this)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});