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
    <h2 class="subtitulo">${t("comoFunciona")}</h2>
    <ol class="como-funciona">
      ${[1, 2, 3].map((n) => `<li class="tarjeta">
        <span class="paso-numero" aria-hidden="true">${n}</span>
        <strong>${t("paso" + n + "Titulo")}</strong>
        <span class="suave chico">${t("paso" + n + "Desc")}</span>
      </li>`).join("")}
    </ol>
    <h2 class="subtitulo">${t("garantias")}</h2>
    <ul class="garantias">
      ${[["🔒", "g1"], ["🌐", "g2"], ["📶", "g3"], ["♿", "g4"], ["🧠", "g5"], ["🆘", "g6"]]
        .map(([i, k]) => `<li><span aria-hidden="true">${i}</span> ${t(k)}</li>`).join("")}
    </ul>
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
    <h1>${tp("hola", { alias: escapar(p.alias) })} <span aria-hidden="true">👋</span></h1>
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
function pantallaListo(p, a) {
  const mal = a && a.carita && a.carita <= 2;
  return `<section class="paciente centrado">
    <p class="listo-icono" aria-hidden="true">${mal ? "🤝" : "🌱"}</p>
    <h1>${t(mal ? "apoyoTitulo" : "listoTitulo")}</h1>
    <p>${t("listoTexto")}</p>
    ${mal ? `<div class="apoyo">
      <p>${t("apoyoTexto")}</p>
      <a class="boton boton-ancho boton-155" href="tel:155"><span aria-hidden="true">📞</span> ${t("llamar155")}</a>
    </div>` : ""}
    <a class="boton boton-ancho" href="#/p/${p.id}">${t("volverEjercicios")}</a>
  </section>`;
}

// --- Información ---
function pantallaPrivacidad() {
  return `<section class="pro-angosto info">
    <h1>${t("privacidad")}</h1>
    <p class="suave">${t("privIntro")}</p>
    <ul class="info-lista">
      ${t("privSecciones").map(([i, titulo, texto]) => `<li class="tarjeta">
        <span class="ej-icono" aria-hidden="true">${i}</span>
        <div><h2>${titulo}</h2><p>${texto}</p></div>
      </li>`).join("")}
    </ul>
  </section>`;
}

function pantallaSobreContenidos() {
  const temas = [...new Set(CONTENIDOS.map((c) => c.es.tema))];
  return `<section class="pro-angosto info">
    <h1>${t("sobreContenidos")}</h1>
    <p>${t("contP1")}</p>
    <p>${t("contP2")}</p>
    <p class="suave">${t("contP3")}</p>
    <p class="chico suave">${tp("contResumen", { n: CONTENIDOS.length, t: temas.length })}</p>
    <div class="tabla-envoltura" tabindex="0" role="region" aria-label="${t("sobreContenidos")}">
      <table class="tabla">
        <thead><tr><th scope="col">${t("colContenido")}</th><th scope="col">${t("colTema")}</th><th scope="col">${t("colDuracion")}</th><th scope="col">${t("colBase")}</th></tr></thead>
        <tbody>
          ${CONTENIDOS.map((c) => `<tr>
            <th scope="row"><span aria-hidden="true">${c.icono}</span> ${c[idioma].titulo}</th>
            <td>${c[idioma].tema}</td>
            <td>${c.duracion} ${t("minutos")}</td>
            <td>${BASES[c.id]}</td>
          </tr>`).join("")}
        </tbody>
      </table>
    </div>
  </section>`;
}

// Vista previa de un contenido (para el profesional): igual que lo ve el paciente
function pantallaVistaPrevia(cont, n) {
  const c = cont[idioma];
  const total = c.pasos.length;
  if (!(n >= 1 && n <= total)) return noEncontrado();
  const base = `#/vista/${cont.id}`;
  const atras = n > 1 ? `${base}/${n - 1}` : "#/pro/biblioteca";
  const adelante = n < total
    ? `<a class="boton" href="${base}/${n + 1}">${t("siguiente")} <span aria-hidden="true">›</span></a>`
    : `<a class="boton" href="#/pro/biblioteca">${t("terminarVista")} <span aria-hidden="true">✓</span></a>`;
  return `<section class="paciente">
    <p class="vista-previa"><span aria-hidden="true">👁️</span> ${t("vistaPrevia")}</p>
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
    <div class="titulo-con-accion">
      <div>
        <h1>${t("tabPacientes")}</h1>
        <p class="suave">${t("pacientesDesc")}</p>
      </div>
      <a class="boton" href="#/pro/nuevo"><span aria-hidden="true">＋</span> ${t("nuevoPaciente")}</a>
    </div>
    <div class="stats">
      <div class="stat"><strong>${datos.pacientes.length}</strong><span>${t("statPacientes")}</span></div>
      <div class="stat"><strong>${hechos}</strong><span>${t("statCompletados")}</span></div>
      <div class="stat"><strong>${porHacer}</strong><span>${t("statEsperando")}</span></div>
    </div>
    <div class="grilla-contenidos">${resumen.map(tarjeta).join("")}</div>
    <p class="centrado chico suave privado"><span aria-hidden="true">🔒</span> ${t("soloTuyos")}</p>
  </section>`;
}

// 4. Ficha del paciente
function pantallaFicha(p) {
  const asig = p.asignaciones;
  const registros = asig.filter((a) => a.completado).sort((x, y) => x.completado.localeCompare(y.completado));
  const ultimo = registros[registros.length - 1];
  const alerta = ultimo && ultimo.carita <= 2;

  const animo = registros.length
    ? `<ol class="animo">${registros.map((a) => `
        <li>
          <span class="animo-carita nivel-${a.carita}" aria-hidden="true">${CARITAS[a.carita - 1]}</span>
          <span class="chico">${t("caritas")[a.carita - 1]}</span>
          <span class="chico suave">${cuando(a.completado)}</span>
        </li>`).join("")}</ol>`
    : `<p class="suave">${t("sinRegistros")}</p>`;

  const historial = [...asig].sort((x, y) => ultimaActividad(y).localeCompare(ultimaActividad(x))).map((a) => {
    const cont = contenido(a.contenido);
    const est = estadoAsignacion(a);
    const fechas = [
      tp("enviadoCuando", { cuando: cuando(a.enviado) }),
      a.abierto ? tp("abiertoCuando", { cuando: cuando(a.abierto) }) : t("noAbierto"),
      a.completado ? tp("hechoCuando", { cuando: cuando(a.completado) }) : "",
    ].filter(Boolean);
    return `<li class="tarjeta registro">
      <div class="contenido-cabeza">
        <span class="ej-icono" aria-hidden="true">${cont.icono}</span>
        <div>
          <h3>${cont[idioma].titulo}</h3>
          <span class="estado estado-${est.clave}"><span aria-hidden="true">${est.icono}</span> ${t("estado_" + est.clave)}</span>
        </div>
      </div>
      <p class="chico suave registro-fechas">${fechas.join(" · ")}</p>
      ${a.completado ? `<div class="registro-sentir">
        <span class="carita-mini"><span aria-hidden="true">${CARITAS[a.carita - 1]}</span>
          <span class="chico">${t("caritas")[a.carita - 1]}</span></span>
        ${a.nota ? `<blockquote><span class="suave chico">${t("escribio")}</span> «${escapar(a.nota)}»</blockquote>` : ""}
      </div>` : ""}
    </li>`;
  }).join("");

  const n = (f) => asig.filter(f).length;

  return `<section class="pro pro-angosto">
    ${encabezadoPro("pacientes")}
    <div class="ficha-cabeza">
      <span class="avatar" aria-hidden="true">${escapar(p.alias[0])}</span>
      <div>
        <h1>${escapar(p.alias)}</h1>
        <p class="suave chico">${p.telefono} · ${t(p.idioma === "gn" ? "hablaGuarani" : "hablaCastellano")}</p>
      </div>
    </div>
    ${alerta ? `<p class="alerta"><span aria-hidden="true">●</span> ${t("alertaMal")}</p>` : ""}
    <div class="stats">
      <div class="stat"><strong>${asig.length}</strong><span>${t("statEnviados")}</span></div>
      <div class="stat"><strong>${n((a) => a.abierto)}</strong><span>${t("statAbiertos")}</span></div>
      <div class="stat"><strong>${n((a) => a.completado)}</strong><span>${t("statHechos")}</span></div>
    </div>
    <h2 class="subtitulo">${t("comoVieneSintiendo")}</h2>
    ${animo}
    <h2 class="subtitulo">${t("historial")}</h2>
    ${asig.length ? `<ul class="lista-registros">${historial}</ul>` : `<p class="suave">${t("sinAsignar")}</p>`}
    <div class="acciones-envio">
      <a class="boton" href="#/pro/asignar-a/${p.id}">${t("asignarContenido")} <span aria-hidden="true">›</span></a>
      ${asig.some((a) => !a.completado) ? `<a class="boton boton-secundario" href="#/pro/enviado/${p.id}"><span aria-hidden="true">💬</span> ${t("reenviar")}</a>` : ""}
    </div>
    <p class="centrado chico suave privado"><span aria-hidden="true">🔒</span> ${t("noHistoria")}</p>
  </section>`;
}

// Nuevo paciente (solo alias, celular e idioma)
function pantallaNuevo() {
  const opcionIdioma = (valor, texto, marcado) => `
    <label class="eleccion${marcado ? " elegida" : ""}">
      <input type="radio" name="idioma" value="${valor}" ${marcado ? "checked" : ""}>
      <span class="eleccion-texto"><strong>${texto}</strong></span>
    </label>`;
  return `<section class="pro pro-angosto">
    ${encabezadoPro("pacientes")}
    <h1>${t("nuevoPaciente")}</h1>
    <p class="cuidado"><span aria-hidden="true">🔒</span> ${t("nuevoDesc")}</p>
    <form id="form-nuevo" novalidate>
      <div class="campo">
        <label for="alias">${t("campoAlias")}</label>
        <p class="chico suave" id="ayuda-alias">${t("ayudaAlias")}</p>
        <input class="nota" id="alias" name="alias" type="text" maxlength="30" autocomplete="off"
          aria-describedby="ayuda-alias error-alias">
        <p class="error-campo" id="error-alias" hidden></p>
      </div>
      <div class="campo">
        <label for="celular">${t("campoCelular")}</label>
        <p class="chico suave" id="ayuda-celular">${t("ayudaCelular")}</p>
        <input class="nota" id="celular" name="celular" type="tel" inputmode="numeric" maxlength="14" autocomplete="off"
          aria-describedby="ayuda-celular error-celular">
        <p class="error-campo" id="error-celular" hidden></p>
      </div>
      <fieldset class="grupo">
        <legend><h2>${t("campoIdioma")}</h2></legend>
        <div class="lista-elecciones dos-columnas">
          ${opcionIdioma("es", t("castellano"), true)}
          ${opcionIdioma("gn", t("guarani"), false)}
        </div>
      </fieldset>
      <button class="boton boton-ancho" type="submit">${t("guardarPaciente")} <span aria-hidden="true">›</span></button>
    </form>
  </section>`;
}

function activarNuevo() {
  const form = document.getElementById("form-nuevo");
  const error = (campo, clave) => {
    const p = document.getElementById("error-" + campo);
    const input = document.getElementById(campo);
    p.textContent = clave ? t(clave) : "";
    p.hidden = !clave;
    input.setAttribute("aria-invalid", clave ? "true" : "false");
  };
  form.addEventListener("input", (e) => { if (e.target.id) error(e.target.id, null); });
  form.addEventListener("change", () => {
    form.querySelectorAll(".eleccion").forEach((l) => l.classList.toggle("elegida", l.querySelector("input").checked));
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const alias = document.getElementById("alias").value.trim();
    const numeros = document.getElementById("celular").value.replace(/\D/g, "");
    const celular = numeros.replace(/^(\d{4})(\d{3})(\d{3})$/, "$1 $2 $3");
    const errAlias = alias ? null : "errAlias";
    const errCel = !/^09\d{8}$/.test(numeros) ? "errCelular"
      : datos.pacientes.some((p) => p.telefono.replace(/\D/g, "") === numeros) ? "errCelularRepetido" : null;
    error("alias", errAlias);
    error("celular", errCel);
    if (errAlias || errCel) {
      document.getElementById(errAlias ? "alias" : "celular").focus();
      vibrar([80, 50, 80]);
      return;
    }
    // Identificador simple a partir del alias, sin repetir
    const baseId = sinTildes(alias).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "paciente";
    let id = baseId, n = 2;
    while (paciente(id)) id = `${baseId}-${n++}`;
    datos.pacientes.push({
      id, alias, telefono: celular,
      idioma: form.querySelector("input[name=idioma]:checked").value,
      asignaciones: [],
    });
    guardarDatos();
    vibrar([30, 60, 30]);
    location.hash = `#/pro/asignar-a/${id}`;
  });
}

// 2. Biblioteca de contenidos
let filtroTema = "todos";
let textoBusqueda = "";
function cantidadTexto(n) { return n === 1 ? t("cantidadUno") : tp("cantidad", { n }); }
function sinTildes(x) { return x.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase(); }

function aplicarBusqueda() {
  const q = sinTildes(textoBusqueda.trim());
  let visibles = 0;
  document.querySelectorAll(".contenido").forEach((c) => {
    const ok = !q || c.dataset.buscar.includes(q);
    c.hidden = !ok;
    if (ok) visibles++;
  });
  document.getElementById("cantidad").textContent = cantidadTexto(visibles);
  document.getElementById("sin-resultados").hidden = visibles > 0;
}

function pantallaBiblioteca() {
  const temas = [...new Set(CONTENIDOS.map((c) => c.es.tema))];
  const lista = CONTENIDOS.filter((c) => filtroTema === "todos" || c.es.tema === filtroTema);
  const nombreTema = (temaEs) => CONTENIDOS.find((c) => c.es.tema === temaEs)[idioma].tema;

  const chip = (valor, texto) =>
    `<button type="button" class="chip" data-tema="${valor}" aria-pressed="${filtroTema === valor}">${texto}</button>`;

  const tarjeta = (cont) => {
    const c = cont[idioma];
    const buscable = sinTildes(`${c.titulo} ${c.tema} ${BASES[cont.id]} ${cont.es.titulo}`);
    return `<article class="tarjeta contenido" data-buscar="${escapar(buscable)}">
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
      <p class="chico suave base"><strong>${t("base")}</strong> ${BASES[cont.id]}</p>
      <div class="paciente-acciones">
        <a class="boton boton-secundario" href="#/vista/${cont.id}/1"><span aria-hidden="true">▶</span> ${t("probar")}</a>
        <a class="boton" href="#/pro/asignar/${cont.id}">${t("asignar")} <span aria-hidden="true">›</span></a>
      </div>
    </article>`;
  };

  return `<section class="pro">
    ${encabezadoPro("biblioteca")}
    <h1>${t("bibliotecaTitulo")}</h1>
    <p class="suave">${t("bibliotecaDesc")}</p>
    <label class="buscador">
      <span aria-hidden="true">🔍</span>
      <span class="solo-lector">${t("buscar")}</span>
      <input type="search" id="buscar" placeholder="${t("buscar")}" value="${escapar(textoBusqueda)}" autocomplete="off">
    </label>
    <div class="chips" role="group" aria-label="${t("filtrarTema")}">
      ${chip("todos", t("todos"))}
      ${temas.map((x) => chip(x, nombreTema(x))).join("")}
    </div>
    <p class="chico suave" id="cantidad" aria-live="polite">${cantidadTexto(lista.length)}</p>
    <div class="grilla-contenidos">${lista.map(tarjeta).join("")}</div>
    <p class="suave centrado" id="sin-resultados" hidden>${t("sinResultados")}</p>
  </section>`;
}

function activarBiblioteca() {
  const buscar = document.getElementById("buscar");
  buscar.addEventListener("input", () => { textoBusqueda = buscar.value; aplicarBusqueda(); });
  if (textoBusqueda) aplicarBusqueda();
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

  // El paciente ya elegido aparece primero
  const ordenados = [...datos.pacientes].sort((x, y) => (y.id === asignacion.paciente) - (x.id === asignacion.paciente));
  const pacientes = ordenados.map((p) => `
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
    <div class="whatsapp">
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

// A dónde lleva el botón "Atrás" de arriba (siempre el mismo lugar)
function destinoAtras(partes) {
  const [a, b, c, d, e] = partes;
  if (!a) return null;
  if (a === "p") {
    if (!c) return null; // la bienvenida es el inicio del paciente
    if (e === "sentir" || e === "listo") return `#/p/${b}`;
    const n = Number(e);
    return n > 1 ? `#/p/${b}/c/${d}/${n - 1}` : `#/p/${b}`;
  }
  if (a === "vista") return "#/pro/biblioteca";
  if (a === "pro") {
    if (!b || b === "pacientes") return "#/";
    if (b === "asignar") return "#/pro/biblioteca";
    return "#/pro/pacientes";
  }
  return "#/";
}

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
    else if (partes[4] === "listo") html = pantallaListo(p, a);
    else html = pantallaPaso(p, i, Number(partes[4]));
  } else if (partes[0] === "privacidad") {
    html = pantallaPrivacidad();
  } else if (partes[0] === "contenidos") {
    html = pantallaSobreContenidos();
  } else if (partes[0] === "vista" && contenido(partes[1])) {
    modoPro = true;
    html = pantallaVistaPrevia(contenido(partes[1]), Number(partes[2] || 1));
  } else if (partes[0] === "pro") {
    modoPro = true;
    const seccion = partes[1] || "pacientes";
    if (seccion === "pacientes") html = pantallaPacientes();
    else if (seccion === "paciente" && paciente(partes[2])) html = pantallaFicha(paciente(partes[2]));
    else if (seccion === "biblioteca") { html = pantallaBiblioteca(); despues = activarBiblioteca; }
    else if (seccion === "nuevo") { html = pantallaNuevo(); despues = activarNuevo; }
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

  const atras = document.getElementById("atras");
  const destino = destinoAtras(partes);
  atras.hidden = !destino;
  if (destino) atras.setAttribute("href", destino);

  // El aviso de crisis es para el paciente; en las pantallas del profesional no se muestra
  document.body.classList.toggle("modo-pro", modoPro);
  main.innerHTML = html;
  if (despues) despues();
  // Título de la pestaña según la pantalla (lo anuncia el lector de pantalla)
  const h1 = main.querySelector("h1");
  let titulo = "";
  if (h1) {
    const copia = h1.cloneNode(true);
    copia.querySelectorAll("[aria-hidden]").forEach((x) => x.remove());
    titulo = copia.textContent.replace(/\s+/g, " ").trim();
  }
  document.title = titulo && titulo !== "Oñondive" ? `${titulo} · Oñondive` : "Oñondive";
}

window.addEventListener("hashchange", () => {
  delete document.getElementById("contenido").dataset.quieto;
  mostrar();
  document.getElementById("contenido").focus();
  window.scrollTo(0, 0);
});

guardarDatos();
mostrar();
