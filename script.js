// ===== Fight Scene Animation =====
const arena = document.querySelector(".arena");
const leftLayer = document.querySelector(".creativity .sword-layer");
const rightLayer = document.querySelector(".technology .sword-layer");

function createSword(container, side) {
  const sword = document.createElement("div");
  sword.classList.add("sword");

  const handle = document.createElement("div");
  handle.classList.add("handle");

  const pommel = document.createElement("div");
  pommel.classList.add("pommel");

  sword.appendChild(handle);
  sword.appendChild(pommel);

  if (side === "left") sword.style.left = "120px";
  else sword.style.right = "120px";

  container.appendChild(sword);
  return sword;
}

const swordL = createSword(leftLayer, "left");
const swordR = createSword(rightLayer, "right");

function createSpark() {
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

setInterval(clash, 2200);
clash();
