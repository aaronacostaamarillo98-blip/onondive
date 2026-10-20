// Oñondive: prototipo. Todo corre en el navegador; los datos se guardan en este dispositivo.

const CLAVE_DATOS = "onondive-demo-v3";
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
  <circle cx="42" cy="20" r="14" fill="none" style="stroke: var(--verde)" stroke-width="4"/>
</svg>`;

function pantallaInicio() {
  return `<section class="inicio">
    <span class="halo">${LOGO}</span>
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

// --- Vibración suave (si el celular la tiene) ---
function vibrar(patron) {
  try { if (navigator.vibrate) navigator.vibrate(patron); } catch (e) { /* sin vibración */ }
}
document.addEventListener("click", (e) => {
  if (e.target.closest(".boton, .ejercicio, .opcion")) vibrar(10);
});

// --- Utilidades ---
function tp(clave, vars) {
  return t(clave).replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? "");
}
function escapar(texto) {
  return String(texto).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function contenido(id) { return CONTENIDOS.find((c) => c.id === id); }
function paciente(id) { return datos.pacientes.find((p) => p.id === id); }
const CARITAS = ["😣", "🙁", "😐", "🙂", "😄"];

function noEncontrado() {
  return `<section class="tarjeta centrado">
    <p>${t("noEncontrado")}</p>
    <a class="boton boton-secundario" href="#/">${t("volverInicio")}</a>
  </section>`;
}

// --- Paciente ---
// 5. Bienvenida del link
function pantallaPaciente(p) {
  const pendientes = [], hechos = [];
  p.asignaciones.forEach((a, i) => (a.completado ? hechos : pendientes).push({ a, i, c: contenido(a.contenido)[idioma] }));

  const item = ({ i, c }, hecho) => {
    const cont = contenido(p.asignaciones[i].contenido);
    const interior = `<span class="ej-icono" aria-hidden="true">${hecho ? "✅" : cont.icono}</span>
      <span class="ej-texto"><strong>${c.titulo}</strong><span>${cont.duracion} ${t("minutos")}</span></span>`;
    return hecho
      ? `<li class="ejercicio hecho">${interior}</li>`
      : `<li><a class="ejercicio" href="#/p/${p.id}/c/${i}/1">${interior}<span class="ej-flecha" aria-hidden="true">›</span></a></li>`;
  };

  return `<section class="paciente">
    <h1>${tp("hola", { alias: escapar(p.alias) })} 👋</h1>
    <p class="suave">${tp("deTuProfesional", { nombre: PROFESIONAL.nombre })}</p>
    <h2>${t("paraHacer")}</h2>
    ${pendientes.length
      ? `<ul class="lista-ejercicios">${pendientes.map((x) => item(x, false)).join("")}</ul>`
      : `<p class="tarjeta">${t("nada")}</p>`}
    ${hechos.length ? `<h2>${t("yaHiciste")}</h2>
      <ul class="lista-ejercicios">${hechos.map((x) => item(x, true)).join("")}</ul>` : ""}
  </section>`;
}

// 6. Ejercicio paso a paso
function pantallaPaso(p, i, n) {
  const a = p.asignaciones[i];
  const cont = contenido(a.contenido);
  const c = cont[idioma];
  const total = c.pasos.length;
  if (!(n >= 1 && n <= total)) return noEncontrado();

  if (!a.abierto) { a.abierto = new Date().toISOString(); guardarDatos(); }

  const base = `#/p/${p.id}/c/${i}`;
  const atras = n > 1 ? `${base}/${n - 1}` : `#/p/${p.id}`;
  const adelante = n < total
    ? `<a class="boton" href="${base}/${n + 1}">${t("siguiente")} <span aria-hidden="true">›</span></a>`
    : `<a class="boton" href="${base}/sentir">${t("termine")} <span aria-hidden="true">✓</span></a>`;

  return `<section class="paciente">
    <p class="suave titulo-ejercicio"><span aria-hidden="true">${cont.icono}</span> ${c.titulo}</p>
    <p class="progreso-texto">${tp("paso", { n, total })}</p>
    <div class="progreso" aria-hidden="true"><span style="width:${(n / total) * 100}%"></span></div>
    ${c.aviso && n === 1 ? `<p class="cuidado"><span aria-hidden="true">💛</span> ${c.aviso}</p>` : ""}
    <div class="tarjeta paso">
      <p class="paso-numero" aria-hidden="true">${n}</p>
      <h1 class="paso-texto">${c.pasos[n - 1]}</h1>
    </div>
    <div class="acciones">
      <a class="boton boton-secundario" href="${atras}"><span aria-hidden="true">‹</span> ${t("anterior")}</a>
      ${adelante}
    </div>
  </section>`;
}

// 7. ¿Cómo te sentiste?
function pantallaSentir(p, i) {
  const caritas = CARITAS.map((emoji, k) => `
    <label class="carita">
      <input type="radio" name="carita" value="${k + 1}">
      <span class="carita-emoji" aria-hidden="true">${emoji}</span>
      <span class="carita-texto">${t("caritas")[k]}</span>
    </label>`).join("");

  return `<section class="paciente">
    <form id="form-sentir" novalidate>
      <fieldset class="caritas">
        <legend><h1>${t("comoTeSentiste")}</h1><span class="suave">${t("tocaCarita")}</span></legend>
        <div class="caritas-fila">${caritas}</div>
      </fieldset>
      <p id="falta-carita" class="aviso" role="alert" hidden>${t("faltaCarita")}</p>
      <label class="nota-etiqueta" for="nota">${t("escribir")}</label>
      <input id="nota" class="nota" type="text" maxlength="140" autocomplete="off" placeholder="${t("notaEjemplo")}">
      <p class="suave chico"><span aria-hidden="true">🔒</span> ${t("soloProfesional")}</p>
      <button class="boton boton-ancho" type="submit">${t("guardar")}</button>
    </form>
  </section>`;
}

function activarSentir(p, i) {
  const form = document.getElementById("form-sentir");
  if (!form) return;
  form.addEventListener("change", () => {
    document.getElementById("falta-carita").hidden = true;
    // Marca la carita elegida (también en celulares viejos sin :has)
    form.querySelectorAll(".carita").forEach((l) => l.classList.toggle("elegida", l.querySelector("input").checked));
    vibrar(15);
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const elegida = form.querySelector("input[name=carita]:checked");
    if (!elegida) {
      document.getElementById("falta-carita").hidden = false;
      vibrar([80, 50, 80]); // atención
      return;
    }
    const a = p.asignaciones[i];
    a.carita = Number(elegida.value);
    a.nota = document.getElementById("nota").value.trim();
    a.completado = new Date().toISOString();
    if (!a.abierto) a.abierto = a.completado;
    guardarDatos();
    vibrar([30, 60, 30]); // confirmación: "listo"
    location.hash = `#/p/${p.id}/c/${i}/listo`;
  });
}

// 8. ¡Listo!
function pantallaListo(p) {
  return `<section class="paciente centrado">
    <p class="listo-icono" aria-hidden="true">🌱</p>
    <h1>${t("listoTitulo")}</h1>
    <p>${t("listoTexto")}</p>
    <a class="boton boton-ancho" href="#/p/${p.id}">${t("volverEjercicios")}</a>
  </section>`;
}

// --- Profesional ---
function encabezadoPro(activa) {
  const iniciales = PROFESIONAL.nombre.replace(/^Lic\.\s*/, "").split(" ").map((x) => x[0]).join("");
  const tab = (id, href, texto) =>
    `<a href="${href}" ${activa === id ? 'aria-current="page"' : ""}>${texto}</a>`;
  return `<div class="pro-encabezado">
    <div class="pro-quien">
      <span class="avatar" aria-hidden="true">${iniciales}</span>
      <span><strong>${PROFESIONAL.nombre}</strong><span class="suave chico">${PROFESIONAL.servicio}</span></span>
    </div>
    <nav class="pro-tabs" aria-label="Profesional">
      ${tab("pacientes", "#/pro/pacientes", t("tabPacientes"))}
      ${tab("biblioteca", "#/pro/biblioteca", t("tabBiblioteca"))}
    </nav>
  </div>`;
}

// Fecha en palabras: "hoy", "ayer", "hace 3 días"
function cuando(iso) {
  const dia = (d) => { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; };
  const n = Math.round((dia(new Date()) - dia(iso)) / 86400000);
  return n <= 0 ? t("hoy") : n === 1 ? t("ayer") : tp("haceDias", { n });
}

function estadoAsignacion(a) {
  if (a.completado) return { clave: "completado", fecha: a.completado, icono: "✓" };
  if (a.abierto) return { clave: "abierto", fecha: a.abierto, icono: "◐" };
  return { clave: "enviado", fecha: a.enviado, icono: "➤" };
}

// La fecha más reciente en que pasó algo con esa asignación
function ultimaActividad(a) { return a.completado || a.abierto || a.enviado; }

// 1. Mis pacientes
function pantallaPacientes() {
  const todas = datos.pacientes.flatMap((p) => p.asignaciones);
  const hechos = todas.filter((a) => a.completado).length;
  const porHacer = todas.filter((a) => !a.completado).length;

  const resumen = datos.pacientes.map((p) => {
    const orden = [...p.asignaciones].sort((x, y) => ultimaActividad(y).localeCompare(ultimaActividad(x)));
    const ultima = orden[0] || null;
    const ultimoRegistro = orden.find((a) => a.completado) || null;
    const alerta = ultimoRegistro && ultimoRegistro.carita <= 2;
    return { p, ultima, ultimoRegistro, alerta, fecha: ultima ? ultimaActividad(ultima) : "" };
  }).sort((x, y) => (y.alerta - x.alerta) || y.fecha.localeCompare(x.fecha));

  const tarjeta = ({ p, ultima, ultimoRegistro, alerta }) => {
    let detalle;
    if (!ultima) {
      detalle = `<p class="suave chico">${t("sinContenidos")}</p>`;
    } else {
      const est = estadoAsignacion(ultima);
      detalle = `<p class="paciente-ultimo">
          <span class="suave">${t("ultimo")}</span> ${contenido(ultima.contenido)[idioma].titulo}
        </p>
        <p class="paciente-estado">
          <span class="estado estado-${est.clave}"><span aria-hidden="true">${est.icono}</span> ${t("estado_" + est.clave)}</span>
          <span class="suave chico">${cuando(est.fecha)}</span>
        </p>
        ${ultimoRegistro ? `<p class="paciente-registro">
          <span class="suave">${t("comoSeSintio")}</span>
          <span class="carita-mini">
            <span aria-hidden="true">${CARITAS[ultimoRegistro.carita - 1]}</span>
            <span class="chico">${t("caritas")[ultimoRegistro.carita - 1]}</span></span>
          <span class="suave chico">${cuando(ultimoRegistro.completado)}</span>
        </p>` : ""}`;
    }
    return `<article class="tarjeta paciente-tarjeta${alerta ? " con-alerta" : ""}">
      ${alerta ? `<p class="alerta"><span aria-hidden="true">●</span> ${t("alertaMal")}</p>` : ""}
      <div class="paciente-cabeza">
        <span class="avatar avatar-chico" aria-hidden="true">${escapar(p.alias[0])}</span>
        <div>
          <h2>${escapar(p.alias)}</h2>
          <p class="suave chico">${t(p.idioma === "gn" ? "hablaGuarani" : "hablaCastellano")}</p>
        </div>
      </div>
      ${detalle}
      <div class="paciente-acciones">
        <a class="boton boton-secundario" href="#/pro/paciente/${p.id}">${t("verFicha")}</a>
        <a class="boton" href="#/pro/asignar-a/${p.id}">${t("asignar")} <span aria-hidden="true">›</span></a>
      </div>
    </article>`;
  };

  return `<section class="pro">
    ${encabezadoPro("pacientes")}
    <h1>${t("tabPacientes")}</h1>
    <p class="suave">${t("pacientesDesc")}</p>
    <div class="stats">
      <div class="stat"><strong>${datos.pacientes.length}</strong><span>${t("statPacientes")}</span></div>
      <div class="stat"><strong>${hechos}</strong><span>${t("statCompletados")}</span></div>
      <div class="stat"><strong>${porHacer}</strong><span>${t("statEsperando")}</span></div>
    </div>
    <div class="grilla-contenidos">${resumen.map(tarjeta).join("")}</div>
    <p class="centrado chico suave privado"><span aria-hidden="true">🔒</span> ${t("soloTuyos")}</p>
  </section>`;
}

// 2. Biblioteca de contenidos
let filtroTema = "todos";

function pantallaBiblioteca() {
  const temas = [...new Set(CONTENIDOS.map((c) => c.es.tema))];
  const lista = CONTENIDOS.filter((c) => filtroTema === "todos" || c.es.tema === filtroTema);
  const nombreTema = (temaEs) => CONTENIDOS.find((c) => c.es.tema === temaEs)[idioma].tema;

  const chip = (valor, texto) =>
    `<button type="button" class="chip" data-tema="${valor}" aria-pressed="${filtroTema === valor}">${texto}</button>`;

  const tarjeta = (cont) => {
    const c = cont[idioma];
    return `<article class="tarjeta contenido">
      <div class="contenido-cabeza">
        <span class="ej-icono" aria-hidden="true">${cont.icono}</span>
        <div>
          <h2>${c.titulo}</h2>
          <p class="suave chico">${c.tema} · ${t(cont.tipo)} · ${cont.duracion} ${t("minutos")}</p>
        </div>
      </div>
      <p class="contenido-meta">
        <span class="etiqueta-ejemplo">${t("ejemplo")}</span>
        <span class="chico suave"><span aria-hidden="true">🌐</span> ${t("idiomas")}</span>
      </p>
      ${c.aviso ? `<p class="cuidado"><span aria-hidden="true">💛</span> ${c.aviso}</p>` : ""}
      <details class="pasos">
        <summary>${t("verPasos")}</summary>
        <ol>${c.pasos.map((x) => `<li>${x}</li>`).join("")}</ol>
      </details>
      <a class="boton boton-ancho" href="#/pro/asignar/${cont.id}">${t("asignar")} <span aria-hidden="true">›</span></a>
    </article>`;
  };

  return `<section class="pro">
    ${encabezadoPro("biblioteca")}
    <h1>${t("bibliotecaTitulo")}</h1>
    <p class="suave">${t("bibliotecaDesc")}</p>
    <div class="chips" role="group" aria-label="${t("filtrarTema")}">
      ${chip("todos", t("todos"))}
      ${temas.map((x) => chip(x, nombreTema(x))).join("")}
    </div>
    <p class="chico suave" aria-live="polite">${tp("cantidad", { n: lista.length })}</p>
    <div class="grilla-contenidos">${lista.map(tarjeta).join("")}</div>
  </section>`;
}

function activarBiblioteca() {
  document.querySelectorAll(".chip").forEach((b) => {
    b.addEventListener("click", () => {
      filtroTema = b.dataset.tema;
      vibrar(10);
      const main = document.getElementById("contenido");
      main.dataset.quieto = "1"; // sin animación de entrada al filtrar
      mostrar();
      document.querySelector(`.chip[data-tema="${filtroTema}"]`)?.focus();
    });
  });
}

// 3. Asignar y enviar
const asignacion = { paciente: null, contenidos: new Set() };
let ultimoEnvio = null;

function linkPaciente(p) {
  return `${location.origin}${location.pathname}#/p/${p.id}`;
}

// Mensaje en castellano y guaraní: primero el idioma que prefiere el paciente
function mensajeWhatsapp(p, ids) {
  const orden = p.idioma === "gn" ? ["gn", "es"] : ["es", "gn"];
  const bloque = (lang) => {
    const tx = TEXTOS[lang];
    return [
      tx.msgHola.replace("{alias}", p.alias),
      tx.msgCuerpo,
      ...ids.map((id) => {
        const c = contenido(id);
        return `• ${c[lang].titulo} (${c.duracion} min)`;
      }),
      tx.msgAbrir,
    ].join("\n");
  };
  return [
    ...orden.map(bloque).join("\n\n").split("\n"),
    "",
    `👉 ${linkPaciente(p)}`,
    "",
    `— ${PROFESIONAL.nombre}`,
  ].join("\n");
}

function pantallaAsignar(idInicial, desdePacientes = false) {
  if (idInicial && contenido(idInicial)) asignacion.contenidos.add(idInicial);

  const pacientes = datos.pacientes.map((p) => `
    <label class="eleccion${asignacion.paciente === p.id ? " elegida" : ""}">
      <input type="radio" name="paciente" value="${p.id}" ${asignacion.paciente === p.id ? "checked" : ""}>
      <span class="avatar avatar-chico" aria-hidden="true">${escapar(p.alias[0])}</span>
      <span class="eleccion-texto"><strong>${escapar(p.alias)}</strong>
        <span class="chico suave">${p.telefono} · ${t(p.idioma === "gn" ? "hablaGuarani" : "hablaCastellano")}</span></span>
    </label>`).join("");

  const contenidos = CONTENIDOS.map((cont) => {
    const c = cont[idioma];
    const marcado = asignacion.contenidos.has(cont.id);
    return `
    <label class="eleccion${marcado ? " elegida" : ""}">
      <input type="checkbox" name="contenido" value="${cont.id}" ${marcado ? "checked" : ""}>
      <span class="ej-icono" aria-hidden="true">${cont.icono}</span>
      <span class="eleccion-texto"><strong>${c.titulo}</strong>
        <span class="chico suave">${c.tema} · ${cont.duracion} ${t("minutos")}</span></span>
    </label>`;
  }).join("");

  return `<section class="pro pro-angosto">
    ${encabezadoPro("")}
    <a class="volver" href="${desdePacientes ? "#/pro/pacientes" : "#/pro/biblioteca"}"><span aria-hidden="true">‹</span> ${t(desdePacientes ? "tabPacientes" : "volverBiblioteca")}</a>
    <h1>${t("asignarTitulo")}</h1>
    <form id="form-asignar" novalidate>
      <fieldset class="grupo">
        <legend><h2>${t("elegiPaciente")}</h2></legend>
        <div class="lista-elecciones">${pacientes}</div>
      </fieldset>
      <fieldset class="grupo">
        <legend><h2>${t("elegiContenidos")}</h2></legend>
        <div class="lista-elecciones">${contenidos}</div>
      </fieldset>
      <p id="aviso-asignar" class="aviso" role="alert" hidden></p>
      <button class="boton boton-ancho boton-whatsapp" type="submit"><span aria-hidden="true">💬</span> ${t("crearLink")}</button>
    </form>
  </section>`;
}

function activarAsignar() {
  const form = document.getElementById("form-asignar");
  const aviso = document.getElementById("aviso-asignar");
  form.addEventListener("change", (e) => {
    const input = e.target;
    if (input.name === "paciente") asignacion.paciente = input.value;
    if (input.name === "contenido") {
      if (input.checked) asignacion.contenidos.add(input.value);
      else asignacion.contenidos.delete(input.value);
    }
    form.querySelectorAll(".eleccion").forEach((l) => l.classList.toggle("elegida", l.querySelector("input").checked));
    aviso.hidden = true;
    vibrar(10);
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const falta = !asignacion.paciente ? "faltaPaciente" : asignacion.contenidos.size === 0 ? "faltaContenido" : null;
    if (falta) {
      aviso.textContent = t(falta);
      aviso.hidden = false;
      vibrar([80, 50, 80]);
      return;
    }
    const p = paciente(asignacion.paciente);
    const ahora = new Date().toISOString();
    const ids = [...asignacion.contenidos];
    ids.forEach((id) => {
      // Si ya tiene ese contenido pendiente, no se duplica
      const pendiente = p.asignaciones.some((a) => a.contenido === id && !a.completado);
      if (!pendiente) p.asignaciones.push({ contenido: id, enviado: ahora, abierto: null, completado: null, carita: null, nota: "" });
    });
    guardarDatos();
    ultimoEnvio = { paciente: p.id, contenidos: ids };
    asignacion.paciente = null;
    asignacion.contenidos.clear();
    vibrar([30, 60, 30]);
    location.hash = `#/pro/enviado/${p.id}`;
  });
}

function pantallaEnviado(p) {
  const ids = ultimoEnvio && ultimoEnvio.paciente === p.id
    ? ultimoEnvio.contenidos
    : p.asignaciones.filter((a) => !a.completado).map((a) => a.contenido);
  const mensaje = mensajeWhatsapp(p, ids);
  const link = linkPaciente(p);

  return `<section class="pro pro-angosto">
    ${encabezadoPro("")}
    <div class="centrado">
      <p class="listo-icono" aria-hidden="true">✓</p>
      <h1>${t("enviadoTitulo")}</h1>
      <p class="suave">${tp("enviadoDesc", { alias: escapar(p.alias) })}</p>
    </div>
    <h2 class="subtitulo">${t("asiLlega")}</h2>
    <div class="whatsapp" aria-label="${t("asiLlega")}">
      <div class="burbuja">${escapar(mensaje).replace(/\n/g, "<br>").replace(escapar(link), `<span class="burbuja-link">${escapar(link)}</span>`)}</div>
    </div>
    <div class="acciones-envio">
      <a class="boton boton-whatsapp" href="https://wa.me/?text=${encodeURIComponent(mensaje)}" target="_blank" rel="noopener"><span aria-hidden="true">💬</span> ${t("abrirWhatsapp")}</a>
      <button type="button" class="boton boton-secundario" id="copiar"><span aria-hidden="true">🔗</span> ${t("copiarLink")}</button>
    </div>
    <p id="copiado" class="centrado chico suave" aria-live="polite"></p>
    <div class="acciones-envio">
      <a class="boton boton-secundario" href="#/p/${p.id}"><span aria-hidden="true">📱</span> ${t("verComoPaciente")}</a>
      <a class="boton boton-secundario" href="#/pro/biblioteca">${t("asignarOtro")}</a>
    </div>
  </section>`;
}

function activarEnviado(p) {
  document.getElementById("copiar").addEventListener("click", async () => {
    const link = linkPaciente(p);
    try {
      await navigator.clipboard.writeText(link);
    } catch (e) {
      const campo = document.createElement("textarea");
      campo.value = link;
      document.body.appendChild(campo);
      campo.select();
      try { document.execCommand("copy"); } catch (e2) { /* sin copiar */ }
      campo.remove();
    }
    document.getElementById("copiado").textContent = t("copiado");
    vibrar(15);
  });
}

// --- Navegación por #ruta ---
// #/                     inicio
// #/p/:id                paciente: bienvenida
// #/p/:id/c/:i/:paso     paciente: paso del ejercicio
// #/p/:id/c/:i/sentir    paciente: ¿cómo te sentiste?
// #/p/:id/c/:i/listo     paciente: listo
const idiomaDelLink = new Set();

function mostrar() {
  aplicarIdioma();
  const partes = (location.hash.replace(/^#\/?/, "") || "").split("/").filter(Boolean);
  const main = document.getElementById("contenido");
  let html;
  let despues = null;
  let modoPro = false;

  if (partes.length === 0) {
    html = pantallaInicio();
  } else if (partes[0] === "p") {
    const p = paciente(partes[1]);
    const i = Number(partes[3]);
    const a = p && partes[2] === "c" ? p.asignaciones[i] : null;
    if (!p) html = noEncontrado();
    else if (partes.length === 2) {
      // La primera vez que se abre el link, se muestra en el idioma que prefiere el paciente
      if (!idiomaDelLink.has(p.id)) {
        idiomaDelLink.add(p.id);
        idioma = p.idioma;
        aplicarIdioma();
      }
      html = pantallaPaciente(p);
    }
    else if (!a) html = noEncontrado();
    else if (partes[4] === "sentir") { html = pantallaSentir(p, i); despues = () => activarSentir(p, i); }
    else if (partes[4] === "listo") html = pantallaListo(p);
    else html = pantallaPaso(p, i, Number(partes[4]));
  } else if (partes[0] === "pro") {
    modoPro = true;
    const seccion = partes[1] || "pacientes";
    if (seccion === "pacientes") html = pantallaPacientes();
    else if (seccion === "biblioteca") { html = pantallaBiblioteca(); despues = activarBiblioteca; }
    else if (seccion === "asignar-a" && paciente(partes[2])) {
      asignacion.paciente = partes[2];
      html = pantallaAsignar(null, true);
      despues = activarAsignar;
    }
    else if (seccion === "asignar") { html = pantallaAsignar(partes[2]); despues = activarAsignar; }
    else if (seccion === "enviado" && paciente(partes[2])) {
      const p = paciente(partes[2]);
      html = pantallaEnviado(p);
      despues = () => activarEnviado(p);
    }
    else html = encabezadoPro("pacientes") + pantallaEnConstruccion();
  } else {
    html = pantallaEnConstruccion();
  }

  // El aviso de crisis es para el paciente; en las pantallas del profesional no se muestra
  document.body.classList.toggle("modo-pro", modoPro);
  main.innerHTML = html;
  if (despues) despues();
  document.title = "Oñondive";
}

window.addEventListener("hashchange", () => {
  delete document.getElementById("contenido").dataset.quieto;
  mostrar();
  document.getElementById("contenido").focus();
  window.scrollTo(0, 0);
});

guardarDatos();
mostrar();
