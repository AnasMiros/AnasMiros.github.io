document.addEventListener("DOMContentLoaded", function () {
    var toggle = document.querySelector(".menu-toggle");
    var nav = document.querySelector(".nav-links");

    toggle.addEventListener("click", function () {
        nav.classList.toggle("show");
    });
    
    // Scroll effect for navigation
    window.addEventListener("scroll", function() {
        var nav = document.querySelector("nav");
        if (window.scrollY > 50) {
            nav.classList.add("scrolled");
        } else {
            nav.classList.remove("scrolled");
        }
    });
});
