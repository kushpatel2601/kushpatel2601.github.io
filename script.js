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

// Optional: Ensure the testimonial carousel auto-advances
// document.addEventListener('DOMContentLoaded', function () {
//     var testimonialCarousel = document.getElementById('testimonialCarousel');
//     if (testimonialCarousel) {
//         var carousel = new bootstrap.Carousel(testimonialCarousel, {
//             interval: 5000, // Change slide every 5 seconds
//             wrap: true // Allow carousel to loop
//         });
//     }
// });
