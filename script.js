// 1. Pantalla de bienvenida con un tranvía que cruza la página.
const entrada = document.createElement('div');
entrada.id = 'entrada-tranvia';
entrada.innerHTML = `
  <div class="mensaje-entrada">
    <h2>¡Bienvenido al proyecto Trenvía!</h2>
    <p>Estudio de movilidad alternativa en el corredor del río Pasto</p>
    <button id="saltar-entrada" type="button">Entrar al sitio</button>
  </div>
  <div class="riel" aria-hidden="true"></div>
  <div class="tranvia" role="img" aria-label="Tranvía en movimiento">🚋</div>`;
document.body.prepend(entrada);
function cerrarEntrada() {
  entrada.classList.add('oculto');
  window.setTimeout(() => entrada.remove(), 800);
}
document.getElementById('saltar-entrada').addEventListener('click', cerrarEntrada);
window.setTimeout(cerrarEntrada, 4300);

// 2. Botón para cambiar entre modo claro y modo oscuro.
const botonTema = document.createElement('button');
botonTema.id = 'boton-tema';
botonTema.type = 'button';
botonTema.textContent = '🌙 Modo oscuro';
botonTema.setAttribute('aria-pressed', 'false');
document.body.appendChild(botonTema);
botonTema.addEventListener('click', () => {
  const oscuro = document.body.classList.toggle('modo-oscuro');
  botonTema.textContent = oscuro ? '☀️ Modo claro' : '🌙 Modo oscuro';
  botonTema.setAttribute('aria-pressed', String(oscuro));
});

// 3. Barra superior que indica cuánto se ha recorrido la página.
const barra = document.createElement('div');
barra.id = 'barra-progreso';
barra.setAttribute('aria-hidden', 'true');
document.body.appendChild(barra);
function actualizarProgreso() {
  const recorrido = document.documentElement.scrollHeight - window.innerHeight;
  const porcentaje = recorrido > 0 ? (window.scrollY / recorrido) * 100 : 0;
  barra.style.width = `${Math.min(100, porcentaje)}%`;
}
window.addEventListener('scroll', actualizarProgreso, { passive: true });
window.addEventListener('resize', actualizarProgreso);
actualizarProgreso();

// 4. Las secciones aparecen suavemente cuando entran en pantalla.
document.querySelectorAll('main section').forEach((seccion) => {
  seccion.classList.add('seccion-animada');
});
if ('IntersectionObserver' in window) {
  const observador = new IntersectionObserver((entradas, obs) => {
    entradas.forEach((entradaSeccion) => {
      if (entradaSeccion.isIntersecting) {
        entradaSeccion.target.classList.add('visible');
        obs.unobserve(entradaSeccion.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.seccion-animada').forEach((seccion) => observador.observe(seccion));
} else {
  document.querySelectorAll('.seccion-animada').forEach((seccion) => seccion.classList.add('visible'));
}

// 5. Botón para regresar rápidamente al inicio.
const botonArriba = document.createElement('button');
botonArriba.id = 'volver-arriba';
botonArriba.type = 'button';
botonArriba.textContent = '↑ Volver arriba';
botonArriba.setAttribute('aria-label', 'Volver al inicio de la página');
document.body.appendChild(botonArriba);
window.addEventListener('scroll', () => {
  botonArriba.style.display = window.scrollY > 350 ? 'block' : 'none';
}, { passive: true });
botonArriba.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
