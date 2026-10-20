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
  {
    id: "crianza",
    icono: "🧸",
    tipo: "ejercicio",
    duracion: 10,
    es: {
      titulo: "Tiempo especial con tu hijo",
      tema: "Crianza y familia",
      pasos: [
        "Elegí 10 minutos para estar a solas con tu hijo o hija.",
        "Apagá el celular y la tele.",
        "Que elija el juego. Vos acompañás, sin mandar.",
        "Decí en voz alta lo que hace: «Estás armando una torre».",
        "Elogiá algo concreto: «Me gustó cómo compartiste».",
        "Repetilo todos los días, aunque sea un ratito.",
      ],
    },
    gn: {
      titulo: "Aravo especial nde memby ndive",
      tema: "Ñemongakuaa ha ogaygua",
      pasos: [
        "Eiporavo 10 minuto reime hag̃ua nde memby ndive añoite.",
        "Embogue nde celular ha tele.",
        "Taiporavo ha'e pe ñembosarái. Nde reñemoirũnte, ani remanda.",
        "Ere hatãme mba'épa ojapo: «Rejapohína peteĩ torre».",
        "Emomba'e peteĩ mba'e ojapo porãva: «Ahecha porã reme'ẽ haguére».",
        "Ejapo jey ára ha ára, sapy'aitépe jepe.",
      ],
    },
  },
  {
    id: "alcohol",
    icono: "📅",
    tipo: "ejercicio",
    duracion: 3,
    es: {
      titulo: "¿Cuánto tomé esta semana?",
      tema: "Adicciones",
      aviso: "Si tomás mucho todos los días, no dejes de golpe: puede ser peligroso. Hablalo con tu profesional.",
      pasos: [
        "Esta semana, anotá cada vez que tomás.",
        "Contá los vasos. Una lata o un vaso es una medida.",
        "Fijate cuándo tomás más: ¿con quién? ¿dónde?",
        "Elegí una meta pequeña. Por ejemplo, un día sin tomar.",
        "Llevá tu registro a la próxima consulta.",
      ],
    },
    gn: {
      titulo: "Mboýpa ha'u ko semana?",
      tema: "Adicciones",
      aviso: "Re'úramo heta alcohol ára ha ára, ani rehejapa sapy'a: ikatu ivaipa. Eñe'ẽ nde profesional ndive.",
      pasos: [
        "Ko semana, ehai ára ha ára re'u jave.",
        "Eipapa vaso. Peteĩ lata térã peteĩ vaso ha'e peteĩ medida.",
        "Ehecha araka'épa re'uve: máva ndive? moõpe?",
        "Eiporavo peteĩ meta michĩ. Techapyrã: peteĩ ára re'u'ỹre.",
        "Egueraha nde registro próxima consulta-pe.",
      ],
    },
  },
  {
    id: "ola",
    icono: "🌊",
    tipo: "ejercicio",
    duracion: 4,
    es: {
      titulo: "Las ganas vienen como una ola",
      tema: "Adicciones",
      pasos: [
        "Las ganas de consumir vienen como una ola.",
        "Suben, llegan a lo más alto y después bajan.",
        "Cuando vengan, frená. Sentate y respirá despacio.",
        "Notá dónde sentís las ganas en el cuerpo. No hagas nada.",
        "Mirá cómo la ola baja sola. Cada vez que lo lográs, se hace más fácil.",
      ],
    },
    gn: {
      titulo: "Ipotapy ou ola-icha",
      tema: "Adicciones",
      pasos: [
        "Pe ipotapy reconsumi hag̃ua ou peteĩ ola-icha.",
        "Ojupi, og̃uahẽ yvatevévo ha upéi oguejy.",
        "Ou jave, epyta. Eguapy ha embopytu mbeguekatu.",
        "Ehecha moõpa reñandu nde rete rehe. Ani rejapo mba'eve.",
        "Ehecha mba'éichapa ola oguejy ijeheguiete. Rehupyty jave, hasy'ive.",
      ],
    },
  },
  {
    id: "tabaco",
    icono: "🚭",
    tipo: "ejercicio",
    duracion: 3,
    es: {
      titulo: "Cuando aparecen las ganas de fumar",
      tema: "Adicciones",
      pasos: [
        "Las ganas fuertes de fumar duran unos pocos minutos.",
        "Esperá: mirá el reloj y dejá pasar 5 minutos.",
        "Respirá hondo tres veces.",
        "Tomá un vaso de agua.",
        "Hacé otra cosa con las manos: caminá, lavá algo o llamá a alguien.",
      ],
    },
    gn: {
      titulo: "Reipota jave repita",
      tema: "Adicciones",
      pasos: [
        "Pe ipotapy hatã repita hag̃ua opa mbovy minuto rire.",
        "Eha'arõ: ehecha aravopapaha ha ehasa 5 minuto.",
        "Embopytu pypuku mbohapy jey.",
        "Ey'u peteĩ vaso y.",
        "Ejapo ambue mba'e nde pópe: eguata, ejohéi mba'e térã ehenói peteĩ tapichápe.",
      ],
    },
  },
  {
    id: "presente",
    icono: "🖐️",
    tipo: "ejercicio",
    duracion: 3,
    es: {
      titulo: "Volver al presente",
      tema: "Estrés postraumático",
      aviso: "Este ejercicio te ayuda a calmarte. Lo que pasó lo trabajás con tu profesional, en la consulta.",
      pasos: [
        "Si un recuerdo te asusta, volvé al presente.",
        "Nombrá 5 cosas que ves.",
        "Nombrá 4 cosas que podés tocar.",
        "Nombrá 3 sonidos que escuchás.",
        "Respirá despacio. Estás acá, en el presente.",
      ],
    },
    gn: {
      titulo: "Ejevy ko'ágãme",
      tema: "Estrés postraumático",
      aviso: "Ko ejercicio nepytyvõ reñemopy'aguapy hag̃ua. Pe oikova'ekue rehesa'ỹijo nde profesional ndive, consulta-pe.",
      pasos: [
        "Peteĩ mandu'a nemondýirõ, ejevy ko'ágãme.",
        "Ere 5 mba'e rehecháva.",
        "Ere 4 mba'e ikatúva repoko.",
        "Ere 3 mba'e rehendúva.",
        "Embopytu mbeguekatu. Reime ko'ápe, ko'ágãme.",
      ],
    },
  },
  {
    id: "otra-mirada",
    icono: "🔍",
    tipo: "ejercicio",
    duracion: 5,
    es: {
      titulo: "Otra forma de verlo",
      tema: "Ánimo",
      pasos: [
        "Pensá en algo que te hizo sentir mal hoy.",
        "¿Qué pensaste en ese momento? Escribilo o decilo.",
        "¿Qué le dirías a un amigo que piensa eso?",
        "Buscá otra forma de verlo, más justa con vos.",
        "Fijate cómo te sentís ahora con esa nueva idea.",
      ],
    },
    gn: {
      titulo: "Ehecha ambue hendáicha",
      tema: "Py'a",
      pasos: [
        "Nemandu'a peteĩ mba'e nembyasyva'ekuére ko árape.",
        "Mba'épa repensa upérõ? Ehai térã ere.",
        "Mba'épa ere'íta nde amígope opensáramo upéva?",
        "Eheka ambue hendáicha rehecha hag̃ua, hekopeve ndéve g̃uarã.",
        "Ehecha mba'éichapa reñeñandu ko'ágã ko pensamiento pyahu reheve.",
      ],
    },
  },
  {
    id: "problema",
    icono: "🧩",
    tipo: "ejercicio",
    duracion: 5,
    es: {
      titulo: "Resolver un problema paso a paso",
      tema: "Ánimo",
      pasos: [
        "Elegí un solo problema. Que sea pequeño.",
        "Decilo en una frase: ¿qué es lo que pasa?",
        "Pensá en tres formas de resolverlo. Todas valen.",
        "Elegí la más fácil de probar esta semana.",
        "Probala y fijate qué pasó. Si no funcionó, probá otra.",
      ],
    },
    gn: {
      titulo: "Emoĩporã peteĩ apañuãi mbeguépe",
      tema: "Py'a",
      pasos: [
        "Eiporavo peteĩ apañuãi añoite. Michĩva.",
        "Ere peteĩ frase-pe: mba'épa oiko?",
        "Epensa mbohapy tape remoĩporã hag̃ua. Opavave oiko.",
        "Eiporavo pe ndahasyivéva reñeha'ã hag̃ua ko semana.",
        "Eñeha'ã ha ehecha mba'épa oiko. Ndoikóiramo, eñeha'ã ambuépe.",
      ],
    },
  },
  {
    id: "escalera",
    icono: "🪜",
    tipo: "ejercicio",
    duracion: 5,
    es: {
      titulo: "Enfrentar de a poco",
      tema: "Ansiedad",
      aviso: "Armá tu escalera junto con tu profesional. Andá a tu ritmo.",
      pasos: [
        "Pensá en algo que evitás porque te da miedo.",
        "Dividilo en pasos chicos, del más fácil al más difícil.",
        "Empezá por el paso más fácil.",
        "Quedate hasta que el miedo baje un poco. Respirá despacio.",
        "Cuando ese paso sea fácil, pasá al siguiente.",
      ],
    },
    gn: {
      titulo: "Embohovái mbeguépe",
      tema: "Ansiedad",
      aviso: "Ejapo nde escalera nde profesional ndive. Eho nde ritmo-pe.",
      pasos: [
        "Epensa peteĩ mba'e rehekýiva nekyhyje haguére.",
        "Emboja'o paso michĩme, ndahasyivévagui hasyvévape.",
        "Eñepyrũ pe paso ndahasyivévagui.",
        "Epyta kyhyje oguejy peve michĩmi. Embopytu mbeguekatu.",
        "Upe paso ndahasyivéma jave, eho ambuépe.",
      ],
    },
  },
  {
    id: "preocupacion",
    icono: "⏰",
    tipo: "ejercicio",
    duracion: 3,
    es: {
      titulo: "Un rato para preocuparse",
      tema: "Ansiedad",
      pasos: [
        "Elegí 15 minutos fijos por día para preocuparte.",
        "Si aparece una preocupación fuera de ese rato, anotala.",
        "Decite: «Lo pienso en mi rato».",
        "Volvé a lo que estabas haciendo.",
        "En tu rato, mirá la lista. Muchas ya no preocupan tanto.",
      ],
    },
    gn: {
      titulo: "Peteĩ aravo rejepy'apy hag̃ua",
      tema: "Ansiedad",
      pasos: [
        "Eiporavo 15 minuto ára ha ára rejepy'apy hag̃ua.",
        "Ou ramo peteĩ jepy'apy ambue aravópe, ehai.",
        "Ere ndejupe: «Apensáta che aravópe».",
        "Ejevy rejapohápe.",
        "Nde aravópe, ehecha nde lista. Heta mba'e ndanemopy'apyvéima.",
      ],
    },
  },
  {
    id: "escuchar",
    icono: "👂",
    tipo: "ejercicio",
    duracion: 10,
    es: {
      titulo: "Escuchar sin interrumpir",
      tema: "Crianza y familia",
      aviso: "Si en tu casa hay violencia, no lo hagas solo: hablalo con tu profesional.",
      pasos: [
        "Elijan un momento tranquilo para hablar.",
        "Habla una persona por vez. La otra solo escucha.",
        "Quien escucha repite lo que entendió: «Entendí que…».",
        "Después cambian. Sin gritos ni reproches.",
        "Agradezcan haberse escuchado.",
      ],
    },
    gn: {
      titulo: "Ehendu reñe'ẽ'ỹre",
      tema: "Ñemongakuaa ha ogaygua",
      aviso: "Nde rógape oĩramo violencia, ani rejapo nde año: eñe'ẽ nde profesional ndive.",
      pasos: [
        "Peiporavo peteĩ aravo py'aguapy peñemongeta hag̃ua.",
        "Oñe'ẽ peteĩ tapicha peteĩteĩ. Ambue ohendu añoite.",
        "Ohendúva he'i jey mba'épa ontende: «Antende…».",
        "Upéi pemoambue. Sapukái ha ñembohoja'o'ỹre.",
        "Peme'ẽ aguije pejohendu haguére.",
      ],
    },
  },
  {
    id: "reunion",
    icono: "🏡",
    tipo: "ejercicio",
    duracion: 15,
    es: {
      titulo: "Reunión familiar de 15 minutos",
      tema: "Crianza y familia",
      aviso: "Si en tu casa hay violencia, no lo hagas solo: hablalo con tu profesional.",
      pasos: [
        "Una vez por semana, siéntense juntos 15 minutos.",
        "Cada uno dice algo bueno que pasó en la semana.",
        "Elijan un solo problema de la casa.",
        "Busquen juntos un acuerdo pequeño.",
        "Terminen con algo lindo: un mate, un juego o un abrazo.",
      ],
    },
    gn: {
      titulo: "Ogaygua aty 15 minuto",
      tema: "Ñemongakuaa ha ogaygua",
      aviso: "Nde rógape oĩramo violencia, ani rejapo nde año: eñe'ẽ nde profesional ndive.",
      pasos: [
        "Peteĩ jey semana-pe, peguapy oñondive 15 minuto.",
        "Peteĩteĩ he'i peteĩ mba'e porã oikova'ekue semana-pe.",
        "Peiporavo peteĩ apañuãi añoite ógape g̃uarã.",
        "Peheka oñondive peteĩ ñe'ẽme'ẽ michĩ.",
        "Pemohu'ã peteĩ mba'e porãme: peteĩ mate, ñembosarái térã ñañuã.",
      ],
    },
  },
  {
    id: "reglas",
    icono: "📋",
    tipo: "ejercicio",
    duracion: 5,
    es: {
      titulo: "Reglas claras en casa",
      tema: "Crianza y familia",
      aviso: "Si en tu casa hay violencia, no lo hagas solo: hablalo con tu profesional.",
      pasos: [
        "Elijan pocas reglas: tres alcanzan.",
        "Díganlas en positivo: «Hablamos sin gritar».",
        "Expliquen las reglas a todos, también a los chicos.",
        "Acuerden qué pasa si no se cumplen. Sin golpes ni gritos.",
        "Feliciten cuando se cumplen.",
      ],
    },
    gn: {
      titulo: "Tekorã hesakãva ógape",
      tema: "Ñemongakuaa ha ogaygua",
      aviso: "Nde rógape oĩramo violencia, ani rejapo nde año: eñe'ẽ nde profesional ndive.",
      pasos: [
        "Peiporavo mbovymi tekorã: mbohapy oĩma.",
        "Peje porãme: «Ñañe'ẽ sapukái'ỹre».",
        "Pemyesakã tekorã opavavépe, mitãme avei.",
        "Pejokuaa mba'épa oiko ojejapo'ỹramo. Ñenupã ha sapukái'ỹre.",
        "Pemomba'e ojejapo jave.",
      ],
    },
  },
  {
    id: "pausa",
    icono: "⏸️",
    tipo: "ejercicio",
    duracion: 3,
    es: {
      titulo: "Cuando discutimos: pausa y volver",
      tema: "Crianza y familia",
      aviso: "Si en tu casa hay violencia, no lo hagas solo: hablalo con tu profesional.",
      pasos: [
        "Si la discusión sube de tono, pedí una pausa.",
        "Decí: «Necesito calmarme. Volvemos en 20 minutos».",
        "Separate un rato. Respirá despacio o caminá.",
        "Volvé a la hora acordada, más tranquilo.",
        "Hablen de a uno, sin buscar culpables.",
      ],
    },
    gn: {
      titulo: "Pejoavy jave: pytu'u ha jevy",
      tema: "Ñemongakuaa ha ogaygua",
      aviso: "Nde rógape oĩramo violencia, ani rejapo nde año: eñe'ẽ nde profesional ndive.",
      pasos: [
        "Ñemongeta ipochyvévo, ejerure peteĩ pytu'u.",
        "Ere: «Aikotevẽ ñemopy'aguapy. Jajevy 20 minuto rire».",
        "Eñemomombyry sapy'a. Embopytu mbeguekatu térã eguata.",
        "Ejevy pe aravo pejokuaápe, py'aguapyvépe.",
        "Peñe'ẽ peteĩteĩ, ani peheka máva kulpa.",
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
          { contenido: "respiracion", enviado: haceDias(14), abierto: haceDias(12, 23), completado: haceDias(12, 23), carita: 2, nota: "Ndaikatúi akera semana pukukue." },
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
