// ===== Navigation Scroll Effect =====
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// ===== Mobile Menu Toggle =====
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('show');
    });
}

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            navLinks.classList.remove('show');
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Fight Scene Animation =====
const arena = document.querySelector(".arena");
// FIXED: Added .fighter before the class names
const leftLayer = document.querySelector(".fighter.creativity .sword-layer");
const rightLayer = document.querySelector(".fighter.technology .sword-layer");

// Schwert-Referenzen global verfügbar machen
let swordL, swordR;

function createSword(container, side) {
  const sword = document.createElement("div");
  sword.classList.add("sword");

  const handle = document.createElement("div");
  handle.classList.add("handle");

  const pommel = document.createElement("div");
  pommel.classList.add("pommel");

  sword.appendChild(handle);
  sword.appendChild(pommel);

  if (side === "left") {
    sword.style.left = "120px";
  } else {
    sword.style.right = "120px";
  }

  container.appendChild(sword);
  return sword;
}

function createSpark() {
  if (!arena) return;
  
  const spark = document.createElement("div");
  spark.classList.add("spark");

  const angle = Math.random() * Math.PI * 2;
  const distance = 40 + Math.random() * 20;

  spark.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
  spark.style.setProperty("--y", `${Math.sin(angle) * distance}px`);

  spark.style.left = "50%";
  spark.style.top = "50%";

  arena.appendChild(spark);
  setTimeout(() => spark.remove(), 600);
}

function clash() {
  if (!swordL || !swordR) return;
  
  swordL.classList.remove("clash-left");
  swordR.classList.remove("clash-right");

  // Erzwingt Reflow → garantiert Neustart der Animation
  void swordL.offsetWidth;

  swordL.classList.add("clash-left");
  swordR.classList.add("clash-right");

  setTimeout(() => {
    for (let i = 0; i < 8; i++) createSpark();
  }, 400);
}

// Initialize fight scene only if elements exist
if (arena && leftLayer && rightLayer) {
  swordL = createSword(leftLayer, "left");
  swordR = createSword(rightLayer, "right");
  
  // Start animation
  clash();
  setInterval(clash, 2200);
  
  console.log("Fight scene initialized. Swords created:", swordL, swordR);
} else {
  console.log("Fight scene elements not found:", {
    arena: !!arena,
    leftLayer: !!leftLayer,
    rightLayer: !!rightLayer
  });
}
