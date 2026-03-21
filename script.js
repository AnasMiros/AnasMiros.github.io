// ===== Navigation Scroll Effect =====
// Adds a background/shadow effect to the navigation bar when user scrolls down more than 50px
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');    // Add scrolled class when scrolled past 50px
    } else {
        nav.classList.remove('scrolled'); // Remove scrolled class when at top
    }
});

// ===== Mobile Menu Toggle =====
// Handles opening/closing the mobile navigation menu when hamburger icon is clicked
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('show'); // Toggle visibility of navigation links on mobile
    });
}

// ===== Smooth Scrolling =====
// Enables smooth scrolling when clicking anchor links (links that start with #)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default jump behavior
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return; // Exit if link is just "#" with no target
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if it was open
            navLinks.classList.remove('show');
            
            // Scroll smoothly to the target element, offset by 70px to account for fixed header
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Fight Scene Animation =====
// Creates and animates sword fight scene between creativity and technology characters
const arena = document.querySelector(".arena");
// FIXED: Added .fighter before the class names
const leftLayer = document.querySelector(".fighter.creativity .sword-layer");
const rightLayer = document.querySelector(".fighter.technology .sword-layer");

// Make sword references globally available
let swordL, swordR;

// Function to create a sword element and attach it to the specified container
function createSword(container, side) {
  const sword = document.createElement("div");
  sword.classList.add("sword");

  const guard = document.createElement("div");
  guard.classList.add("guard");      // Sword crossguard/hilt component

  const handle = document.createElement("div");
  handle.classList.add("handle");    // Sword grip component

  const pommel = document.createElement("div");
  pommel.classList.add("pommel");    // Sword end cap component

  sword.appendChild(guard);
  sword.appendChild(handle);
  sword.appendChild(pommel);

  // Position sword on left or right side of fighter
  if (side === "left") {
    sword.style.left = "90px";
  } else {
    sword.style.right = "90px";
  }

  container.appendChild(sword);
  return sword;
}

// Function to create visual spark effect when swords clash
function createSpark() {
  if (!arena) return;
  
  const spark = document.createElement("div");
  spark.classList.add("spark");

  // Random angle and distance for spark explosion
  const angle = Math.random() * Math.PI * 2;
  const distance = 30 + Math.random() * 15;

  // Set CSS custom properties for spark animation direction
  spark.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
  spark.style.setProperty("--y", `${Math.sin(angle) * distance}px`);

  spark.style.left = "50%";
  spark.style.top = "50%";

  arena.appendChild(spark);
  setTimeout(() => spark.remove(), 600); // Remove spark after animation completes
}

// Function to trigger sword clash animation and sparks
function clash() {
  if (!swordL || !swordR) return;
  
  swordL.classList.remove("clash-left");
  swordR.classList.remove("clash-right");

  // Force reflow to ensure animation restarts properly
  void swordL.offsetWidth;

  swordL.classList.add("clash-left");   // Animate left sword
  swordR.classList.add("clash-right");  // Animate right sword

  // Create multiple sparks after a short delay, timed with the clash impact
  setTimeout(() => {
    for (let i = 0; i < 6; i++) createSpark();
  }, 400);
}

// Initialize fight scene only if all required elements exist
if (arena && leftLayer && rightLayer) {
  swordL = createSword(leftLayer, "left");
  swordR = createSword(rightLayer, "right");
  
  // Start animation with initial clash
  clash();
  setInterval(clash, 2200); // Repeat clash every 2.2 seconds
  
  console.log("Fight scene initialized. Swords created:", swordL, swordR);
} else {
  console.log("Fight scene elements not found:", {
    arena: !!arena,
    leftLayer: !!leftLayer,
    rightLayer: !!rightLayer
  });
}
