/* --------------------------
   CGP COMUNICACIONES
   INTERACTIVIDAD Y ANIMACIONES
--------------------------- */

// 🔵 Loader: desaparece automáticamente al iniciar
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.visibility = "hidden";
  }, 2000);
});

// 🎨 Header cambia al hacer scroll
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// 🧭 Smooth scroll en navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    target.scrollIntoView({ behavior: "smooth" });
  });
});

// ✨ Scroll Reveal: muestra secciones suavemente
const revealElements = document.querySelectorAll(".section, .plan, .aliado");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
    }
  });
}, { threshold: 0.2 });

revealElements.forEach(el => {
  el.style.opacity = 0;
  el.style.transform = "translateY(50px)";
  el.style.transition = "opacity 1s ease, transform 1s ease";
  observer.observe(el);
});


// 🌐 FONDO ANIMADO DE FLUJO DE SEÑALES (Canvas JS)
const canvas = document.getElementById('signal-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;
const numParticles = 30; // Número de puntos de datos que fluirán
let particles = [];
let heroSection;

class Particle {
  constructor(x, y, radius, velocityX) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.velocityX = velocityX;
    this.alpha = Math.random() * 0.7 + 0.3; // Opacidad semi-aleatoria para efecto 3D/profundidad
  }

  draw() {
    if (!ctx) return;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`; // Partículas blancas
    ctx.fill();
  }

  update() {
    // Mueve la partícula hacia la derecha (simulando flujo de la señal)
    this.x += this.velocityX;

    // Reinicia la partícula si sale por el lado derecho
    if (this.x - this.radius > canvas.width) {
      this.x = -this.radius;
      // Posiciona la nueva partícula en un punto aleatorio dentro de la altura del canvas
      this.y = Math.random() * canvas.height; 
      this.alpha = Math.random() * 0.7 + 0.3; 
    }
  }
}

function initCanvas() {
  if (!canvas) return;

  heroSection = document.getElementById('inicio');
  
  // Establece el tamaño del canvas igual al tamaño de la sección hero
  canvas.width = heroSection.offsetWidth;
  canvas.height = heroSection.offsetHeight;
  
  // Limpia y reinicia el array de partículas en caso de redimensionamiento
  particles = [];

  // Inicializa las partículas
  for (let i = 0; i < numParticles