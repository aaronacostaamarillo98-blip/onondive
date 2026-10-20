// Oñondive: prototipo. Todo corre en el navegador; los datos se guardan en este dispositivo.

const CLAVE_DATOS = "onondive-demo-v1";
const CLAVE_IDIOMA = "onondive-idioma";

// --- Guardado (protegido por si el navegador bloquea el almacenamiento) ---
function leer(clave) {
  try { return localStorage.getItem(clave); } catch (e) { return null; }
}
function guardar(clave, valor) {
  try { localStorage.setItem(clave, valor); } catch (e) { /* sin guardado */ }
}

let datos = (() => {
  try { return JSON.parse(leer(CLAVE_DATOS)) || datosIniciales(); }
  catch (e) { return datosIniciales(); }
})();
function guardarDatos() { guardar(CLAVE_DATOS, JSON.stringify(datos)); }

// --- Idioma ---
let idioma = leer(CLAVE_IDIOMA) === "gn" ? "gn" : "es";
function t(clave) { return TEXTOS[idioma][clave] ?? TEXTOS.es[clave] ?? clave; }

function aplicarIdioma() {
  document.documentElement.lang = idioma;
  document.querySelectorAll("[data-t]").forEach((el) => { el.textContent = t(el.dataset.t); });
  document.querySelectorAll("[data-idioma]").forEach((b) => {
    b.setAttribute("aria-pressed", String(b.dataset.idioma === idioma));
  });
}

document.querySelectorAll("[data-idioma]").forEach((b) => {
  b.addEventListener("click", () => {
    idioma = b.dataset.idioma;
    guardar(CLAVE_IDIOMA, idioma);
    mostrar();
  });
});

document.getElementById("reiniciar").addEventListener("click", () => {
  if (!confirm(t("reiniciarConfirmar"))) return;
  datos = datosIniciales();
  guardarDatos();
  location.hash = "#/";
  mostrar();
});

// --- Pantallas ---
const LOGO = `<svg class="logo-grande" viewBox="0 0 64 40" aria-hidden="true">
  <circle cx="22" cy="20" r="14" fill="none" stroke="currentColor" stroke-width="4"/>
  <circle cx="42" cy="20" r="14" fill="none" stroke="#2A9D8F" stroke-width="4"/>
</svg>`;

function pantallaInicio() {
  return `<section class="inicio">
    ${LOGO}
    <h1>Oñondive</h1>
    <p class="lema">${t("lema")}</p>
    <div class="inicio-opciones">
      <a class="tarjeta opcion" href="#/pro">
        <span class="icono" aria-hidden="true">🩺</span>
        <strong>${t("verProfesional")}</strong>
        <span class="desc">${t("verProfesionalDesc")}</span>
      </a>
      <a class="tarjeta opcion" href="#/p/rosa">
        <span class="icono" aria-hidden="true">📱</span>
        <strong>${t("verPaciente")}</strong>
        <span class="desc">${t("verPacienteDesc")}</span>
      </a>
    </div>
  </section>`;
}

function pantallaEnConstruccion() {
  return `<section class="tarjeta" style="text-align:center">
    <p>${t("enConstruccion")}</p>
    <a class="boton boton-secundario" href="#/">${t("volverInicio")}</a>
  </section>`;
}

// --- Navegación por #ruta ---
function mostrar() {
  aplicarIdioma();
  const ruta = location.hash.replace(/^#/, "") || "/";
  const main = document.getElementById("contenido");
  main.innerHTML = ruta === "/" ? pantallaInicio() : pantallaEnConstruccion();
  document.title = "Oñondive";
}

window.addEventListener("hashchange", () => {
  mostrar();
  document.getElementById("contenido").focus();
  window.scrollTo(0, 0);
});

guardarDatos();
mostrar();
