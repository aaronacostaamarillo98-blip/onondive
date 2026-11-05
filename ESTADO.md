# Estado del proyecto Oñondive

## Etapa actual
Etapa 1: prototipo navegable para la reunión con el Ministerio de Salud.

## Link del prototipo
- Público: https://aaronacostaamarillo98-blip.github.io/onondive/
- Código: https://github.com/aaronacostaamarillo98-blip/onondive

## Plan aprobado (pantallas)
0. Inicio: elegir "Ver como profesional" o "Ver como paciente".
1. Mis pacientes (profesional).
2. Biblioteca de contenidos.
3. Asignar y enviar (link + vista del mensaje de WhatsApp).
4. Ficha del paciente (qué abrió, completó y sus registros).
5. Bienvenida del link (paciente).
6. Ejercicio paso a paso.
7. ¿Cómo te sentiste? (caritas 1 a 5 + una línea).
8. ¡Listo!

Tecnología: HTML, CSS y JavaScript simple, publicado gratis en GitHub Pages.
Lo que hace el paciente se guarda en el navegador: para la demo, hacer el recorrido
en un mismo dispositivo. Botón "Reiniciar demo" al pie.

## Hecho
- Instrucciones del proyecto (CLAUDE.md).
- Propuesta de presentación para el Ministerio (15 láminas).
- Plan del prototipo aprobado.
- Paso 1 — Base: colores, tipografías, logo, selector castellano/guaraní,
  aviso de crisis (155 y 911) siempre visible, datos inventados
  (Lic. Ana Benítez, 5 pacientes, 5 contenidos de ejemplo).
- Paso 2 — Pantalla 0, Inicio.
- Publicado en GitHub Pages.
- Pantallas 5 a 8 (paciente): bienvenida con ejercicios para hacer y ya hechos,
  ejercicio paso a paso con barra de avance, caritas 1 a 5 + una línea, ¡Listo!.
  Link de prueba de paciente: .../onondive/#/p/rosa
- Rediseño visual sereno: fondo "aura" con luces suaves, bordes muy redondeados,
  tarjetas tipo vidrio, selector de idioma estilo Apple, halo que respira en el logo,
  títulos y espacios fluidos según la pantalla, aparición suave de cada elemento.
  Respeta "reducir movimiento" del celular.
- Paleta calma basada en investigación (elegida por Aaron): mismos tonos de la marca, más claros y menos
  saturados (Valdez y Mehrabian 1994; Jonauskaite et al. 2020; Elliot y Maier 2014).
  Botones durazno #F6BE94, verde #4FA89C, menta #DCEFEB, celeste niebla #E4EEF6,
  coral suave #E3907A. CLAUDE.md actualizado con estos colores.
- Letra base de 20 px, vibración suave al tocar y al confirmar, ✓ en la carita elegida.
- Pantalla 2 — Biblioteca (profesional): encabezado con la profesional y pestañas
  "Mis pacientes / Biblioteca", filtro por tema, tarjetas con tema, tipo, duración,
  etiqueta "ejemplo, a revisar", "Ver los pasos" y botón "Asignar".
  En las pantallas del profesional no se muestra el aviso de crisis (es para el paciente).
- Pantalla 3 — Asignar y enviar: elegir paciente y uno o más contenidos, crear el link,
  vista del mensaje como burbuja de WhatsApp (en castellano y guaraní, primero el que prefiere el paciente), botones
  "Abrir WhatsApp" (sin número: el profesional elige el contacto), "Copiar link" y
  "Ver lo que recibe el paciente". El link se abre en el idioma que prefiere el paciente.
- 5 contenidos nuevos de ejemplo (total 10), con 3 temas nuevos:
  Crianza y familia (Tiempo especial con tu hijo), Adicciones (¿Cuánto tomé esta
  semana?, Las ganas vienen como una ola, Cuando aparecen las ganas de fumar) y
  Estrés postraumático (Volver al presente). Avisos de cuidado: en alcohol, no dejar
  de golpe si se toma mucho; en estrés postraumático, solo estabilización (lo que pasó
  se trabaja en consulta).
- Pantalla 1 — Mis pacientes (inicio del profesional): resumen (pacientes, ejercicios
  hechos, por hacer), tarjeta por paciente con último contenido, estado (enviado,
  abierto, hecho), cómo se sintió en su último registro, alerta suave si se sintió mal
  (1 o 2), y botones "Ver ficha" y "Asignar" (con el paciente ya elegido).
  Aviso "Solo ves a tus propios pacientes".
- Pantalla 4 — Ficha del paciente: datos mínimos (alias, teléfono, idioma), alerta suave,
  resumen (enviados, abiertos, hechos), "Cómo se viene sintiendo" (caritas en el tiempo),
  historial con fechas, carita y lo que escribió, botones "Asignar contenido" y
  "Reenviar link". Aclara que no es historia clínica.
- Recorrido completo probado: el profesional asigna → el paciente completa → el
  profesional ve el registro en la ficha.
- Revisión final: sin errores de accesibilidad automáticos (WCAG 2.2 AA) en todas las
  pantallas, en castellano y guaraní; botones de al menos 44 px; título de pestaña por
  pantalla para lectores de pantalla. Peso: ~35 KB comprimido de app + ~89 KB de tipografías.
- Aviso de ayuda con colores del entorno (celeste y menta) y la Línea 155 como botón
  principal.
- Guion de la demo: GUION-DEMO.md.
- 8 ejercicios nuevos (total 18): TCC — Otra forma de verlo, Resolver un problema paso
  a paso, Enfrentar de a poco (con aviso "armala con tu profesional"), Un rato para
  preocuparse. Familia — Escuchar sin interrumpir, Reunión familiar de 15 minutos,
  Reglas claras en casa, Cuando discutimos: pausa y volver (con aviso de violencia).
- 7 ejercicios más (total 25): ¿Qué es la depresión?, Tomar mi medicación (aviso: no
  cambiar sin el médico), Relajar el cuerpo por partes, Cuando perdemos a alguien,
  Mis señales de alerta, Cuidar al que cuida, Cuando me enojo. Temas nuevos:
  Medicación y Duelo.
- Plan de seguridad: borrador en BORRADOR-PLAN-SEGURIDAD.md (solo local, no se sube).
  Pasos aprobados por Aaron sin cambios. Decidido: va en la Etapa 2, no en la demo.
- Auditoría y mejoras institucionales: franja "Prototipo · Propuesta para la red
  pública de salud mental (MSPBS)", inicio con "Cómo funciona" y "Garantías", páginas
  Privacidad y seguridad y Sobre los contenidos (tabla con la base técnica de cada uno,
  en línea con la guía mhGAP de la OMS), botón "‹ Atrás" fijo arriba en todas las
  pantallas, búsqueda en la Biblioteca, botón "Probar" para ver cada contenido como el
  paciente, y apoyo con la Línea 155 si el paciente marca "mal" o "muy mal".
  Revisión de accesibilidad otra vez sin errores.
- Tema nuevo Salud sexual (total 29 contenidos, 10 temas): Infecciones de transmisión
  sexual, PrEP, PEP (antes de las 72 horas, con aviso de violencia sexual y 911) y
  Anticoncepción. Psicoeducación general con aviso de consultar en el servicio de salud.
- "Nuevo paciente": la profesional carga alias, celular (10 números, empieza con 09) e
  idioma; avisa que no se cargue cédula, nombre completo ni diagnóstico; no deja repetir
  celular; al guardar va directo a asignarle contenido.
- Nota de voz del paciente: en "¿Cómo te sentiste?" puede grabar hasta 30 segundos,
  escucharla y borrarla antes de guardar (opcional). La profesional la escucha en la
  ficha; en Mis pacientes se marca 🎙️. Pesa ~3 KB por segundo. En la demo queda en el
  navegador; en la Etapa 2 hay que guardarla cifrada y definir cuánto tiempo se conserva.
- Los archivos llevan número de versión (?v=24) para que el navegador no muestre
  copias viejas. Subirlo en cada cambio.

- Auditoría app-premium (4/11/2026): benchmark con PTSD Coach, Step-by-Step, Doing What
  Matters (OMS), CONEMO y MindShift. El punto más débil era el contenido psicoeducativo
  (2/5). Mejoras aplicadas (rama worktree-mejoras-contenido):
  1. Franja de crisis compacta dentro del ejercicio: 155 y 911 a un toque y "Siguiente"
     visible en un celular de 360x640. El aviso completo sigue en la bienvenida y vuelve si
     el paciente marca mal o muy mal.
  2. Portada de cada contenido: ícono propio por tema (10 SVG, sin emojis), Aprender o
     Practicar, duración, pasos, "Por qué puede ayudarte" y aviso de cuidado.
  3. "¿Cómo estás ahora?" antes de empezar. Si marca 1 o 2: apoyo con la Línea 155 y elige
     si sigue. En la ficha: "Registro del paciente", Antes y Después.
  Revisión: 0 errores de axe (WCAG 2.2 AA) en castellano y guaraní, sin errores de consola.
  Peso real: ~35 KB comprimido + tipografías.

## Falta
- Pasar la rama de mejoras a main (así se publica en GitHub Pages).
- Con la letra del sistema al 200 % en celular, el selector de idioma y algunos botones se
  salen de la pantalla (ya pasaba antes de las mejoras).

## Pendiente de revisión
- "Por qué puede ayudarte" en guaraní (js/datos.js, PORQUE): los 29 son borrador, a revisar
  por un hablante nativo. Se marcan en la Biblioteca y en la vista previa en guaraní. Cuando
  estén revisados, poner PORQUE_GN_REVISADO = true. (El castellano ya es el texto final de Aaron.)
- Textos en guaraní: borrador, a revisar por un hablante nativo.
- Los 29 contenidos de ejemplo: a revisar por Aaron. Salud sexual: revisión médica y
  confirmar dónde se consiguen PrEP, PEP y anticonceptivos en Paraguay (¿PRONASIDA?).
- Línea de ayuda por violencia en Paraguay: confirmar número antes de sumarla.

## Decisiones pendientes
- Condición del piloto: gratis o pago para el centro (definir con Alex).

## Próximo paso
Pasar la rama de mejoras a main (PR #1) y ensayar la demo con GUION-DEMO.md.
