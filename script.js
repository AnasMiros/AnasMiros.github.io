document.addEventListener("DOMContentLoaded", () => {

  // ===== Mobile Navigation =====
  const toggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  toggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });

  // ===== Scroll Effect =====
  const nav = document.querySelector("nav");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });

  // ===== Fight Scene Animation =====
  const arena = document.querySelector(".arena");
  const leftLayer = document.querySelector(".creativity .sword-layer");
  const rightLayer = document.querySelector(".technology .sword-layer");

  function createSword(container, side) {
    const sword = document.createElement("div");
    sword.classList.add("sword");

    if (side === "left") sword.style.left = "100px";
    else sword.style.right = "100px";

    container.appendChild(sword);
    return sword;
  }

  const swordL = createSword(leftLayer, "left");
  const swordR = createSword(rightLayer, "right");

  function createSpark() {
    const spark = document.createElement("div");
    spark.classList.add("spark");

    const angle = Math.random() * Math.PI * 2;
    const distance = 30 + Math.random() * 20;

    spark.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
    spark.style.setProperty("--y", `${Math.sin(angle) * distance}px`);

    spark.style.left = "50%";
    spark.style.top = "50%";

    arena.appendChild(spark);
    setTimeout(() => spark.remove(), 600);
  }

  function clash() {
    swordL.style.animation = "none";
    swordR.style.animation = "none";

    setTimeout(() => {
      swordL.style.animation = "clashLeft 0.8s ease-in-out";
      swordR.style.animation = "clashRight 0.8s ease-in-out";

      setTimeout(() => {
        for (let i = 0; i < 5; i++) createSpark();
      }, 400);
    }, 10);
  }

  clash();
  setInterval(clash, 2500);
});
