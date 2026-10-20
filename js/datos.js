// Datos inventados para el prototipo. Ningún dato es real.
// Contenidos: ejemplos a revisar por un profesional. Guaraní: borrador a revisar.

const PROFESIONAL = {
  nombre: "Lic. Ana Benítez",
  servicio: "Unidad de Salud Mental (ejemplo)",
};

const CONTENIDOS = [
  {
    id: "respiracion",
    icono: "🌬️",
    tipo: "ejercicio",
    duracion: 3,
    es: {
      titulo: "Respirar para calmarte",
      tema: "Ansiedad",
      pasos: [
        "Sentate cómodo. Apoyá los pies en el piso.",
        "Poné una mano sobre tu panza.",
        "Tomá aire por la nariz. Contá 1, 2, 3, 4.",
        "Soltá el aire despacio por la boca. Contá hasta 6.",
        "Repetí 5 veces. Sentí cómo baja tu panza.",
      ],
    },
    gn: {
      titulo: "Embopytu reñemopy'aguapy hag̃ua",
      tema: "Ansiedad",
      pasos: [
        "Eguapy porã. Emoĩ nde py yvýre.",
        "Emoĩ nde po nde ryé ári.",
        "Embopytu pypuku nde tĩ rupi. Eipapa 1, 2, 3, 4.",
        "Emosẽ pytu mbeguekatu nde jurúgui. Eipapa 6 peve.",
        "Ejapo jey 5 jey. Ehendu mba'éichapa nde ryé oguejy.",
      ],
    },
  },
  {
    id: "ansiedad",
    icono: "💡",
    tipo: "psicoeducacion",
    duracion: 2,
    es: {
      titulo: "¿Qué es la ansiedad?",
      tema: "Ansiedad",
      pasos: [
        "La ansiedad es una alarma de tu cuerpo.",
        "Sirve para cuidarte del peligro.",
        "A veces suena aunque no haya peligro.",
        "Podés sentir el corazón rápido, tensión o nervios.",
        "No es peligrosa y pasa. Respirar despacio ayuda.",
      ],
    },
    gn: {
      titulo: "Mba'épa ha'e ansiedad?",
      tema: "Ansiedad",
      pasos: [
        "Ansiedad ha'e peteĩ alarma nde rete pegua.",
        "Nepytyvõ reñangareko hag̃ua ndejehe peligro-gui.",
        "Sapy'ánte osuena peligro'ỹre jepe.",
        "Ikatu reñandu nde korasõ opu pya'e, nde rete hatã térã nervio.",
        "Ndaha'éi ivaíva ha ohasa. Embopytu mbeguekatu nepytyvõ.",
      ],
    },
  },
  {
    id: "emociones",
    icono: "📝",
    tipo: "ejercicio",
    duracion: 3,
    es: {
      titulo: "Registro de emociones",
      tema: "Emociones",
      pasos: [
        "Pensá en un momento de hoy.",
        "¿Qué pasó? Recordalo con calma.",
        "¿Qué sentiste? Tristeza, enojo, miedo o alegría.",
        "¿Dónde lo sentiste en el cuerpo?",
        "Ponerle nombre a lo que sentís ayuda a entenderlo.",
      ],
    },
    gn: {
      titulo: "Ehai mba'épa reñandu",
      tema: "Ñeñandu",
      pasos: [
        "Nemandu'a peteĩ mba'e oikova'ekuére ko árape.",
        "Mba'épa oiko? Nemandu'a py'aguapýpe.",
        "Mba'épa reñandu? Ñembyasy, pochy, kyhyje térã vy'a.",
        "Moõpa reñandu nde rete rehe?",
        "Rerérõ mba'épa reñandu, reikuaa porãvéta.",
      ],
    },
  },
  {
    id: "sueno",
    icono: "🌙",
    tipo: "psicoeducacion",
    duracion: 3,
    es: {
      titulo: "Rutina para dormir mejor",
      tema: "Sueño",
      pasos: [
        "Acostate y levantate a la misma hora todos los días.",
        "Dejá el celular una hora antes de dormir.",
        "Evitá café o mate a la noche.",
        "Antes de dormir, hacé algo tranquilo: respirar o escuchar música suave.",
        "Si no te dormís en 20 minutos, levantate un rato y volvé.",
      ],
    },
    gn: {
      titulo: "Reke porãve hag̃ua",
      tema: "Ke",
      pasos: [
        "Eñeno ha epu'ã peteĩ aravópe ára ha ára.",
        "Ehejánte nde celular peteĩ aravo reke mboyve.",
        "Ani reu café térã mate pyharekue.",
        "Reke mboyve, ejapo peteĩ mba'e py'aguapýpe: embopytu térã ehendu purahéi mbegue.",
        "Ndereképairõ 20 minuto rire, epu'ã sapy'a ha eju jey.",
      ],
    },
  },
  {
    id: "actividades",
    icono: "🚶",
    tipo: "ejercicio",
    duracion: 4,
    es: {
      titulo: "Pequeñas actividades",
      tema: "Ánimo",
      pasos: [
        "Cuando estamos tristes, hacemos menos cosas.",
        "Hacer menos cosas nos pone más tristes.",
        "Elegí algo pequeño para hoy: caminar 10 minutos, regar una planta o llamar a alguien.",
        "Hacelo aunque no tengas ganas.",
        "Después, fijate cómo te sentís.",
      ],
    },
    gn: {
      titulo: "Mba'e michĩmi rejapo hag̃ua",
      tema: "Py'a",
      pasos: [
        "Ñañembyasy jave, sa'ive mba'e ñajapo.",
        "Sa'ive jajapóramo, ñañembyasyve.",
        "Eiporavo peteĩ mba'e michĩ ko árape: eguata 10 minuto, emoakỹ peteĩ ka'avo térã ehenói peteĩ tapichápe.",
        "Ejapo nderepotáiramo jepe.",
        "Upe rire, ehecha mba'éichapa reñeñandu.",
      ],
    },
  },
];

// Fecha relativa a hoy, para que la demo siempre se vea reciente.
function haceDias(dias, hora = 10) {
  const d = new Date();
  d.setDate(d.getDate() - dias);
  d.setHours(hora, 0, 0, 0);
  return d.toISOString();
}

// Estado inicial de la demo. Estados de una asignación: enviado → abierto → completado.
function datosIniciales() {
  return {
    pacientes: [
      {
        id: "rosa", alias: "Rosa M.", telefono: "0981 000 101", idioma: "es",
        asignaciones: [
          { contenido: "respiracion", enviado: haceDias(9), abierto: haceDias(8, 19), completado: haceDias(8, 19), carita: 3, nota: "Me costó concentrarme pero lo terminé." },
          { contenido: "ansiedad", enviado: haceDias(9), abierto: haceDias(7, 21), completado: haceDias(7, 21), carita: 4, nota: "" },
          { contenido: "emociones", enviado: haceDias(1), abierto: null, completado: null, carita: null, nota: "" },
        ],
      },
      {
        id: "ramon", alias: "Don Ramón", telefono: "0982 000 202", idioma: "gn",
        asignaciones: [
          { contenido: "sueno", enviado: haceDias(5), abierto: haceDias(4, 22), completado: null, carita: null, nota: "" },
        ],
      },
      {
        id: "lili", alias: "Lili", telefono: "0983 000 303", idioma: "es",
        asignaciones: [
          { contenido: "actividades", enviado: haceDias(12), abierto: haceDias(11, 9), completado: haceDias(11, 9), carita: 2, nota: "Caminé un poco. Igual me sentí cansada." },
          { contenido: "actividades", enviado: haceDias(4), abierto: haceDias(3, 18), completado: haceDias(3, 18), carita: 4, nota: "Hoy regué las plantas con mi hija." },
        ],
      },
      {
        id: "carlos", alias: "Carlos B.", telefono: "0984 000 404", idioma: "es",
        asignaciones: [
          { contenido: "emociones", enviado: haceDias(2), abierto: null, completado: null, carita: null, nota: "" },
        ],
      },
      {
        id: "mirta", alias: "Mirta", telefono: "0985 000 505", idioma: "gn",
        asignaciones: [],
      },
    ],
  };
}
