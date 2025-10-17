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

// 🌐 Fondo animado de fibra óptica
let root = document.documentElement;
let pos = 0;
function animateBackground() {
  pos += 0.2;
  root.style.setProperty("--bg-offset", `${pos}px`);
  requestAnimationFrame(animateBackground);
}
animateBackground();