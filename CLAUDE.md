# PROYECTO: Oñondive — acompañamiento entre consultas

## Qué es
Una app web que ayuda a psicólogos y psiquiatras de los servicios públicos de salud
de Paraguay (Ministerio de Salud Pública y Bienestar Social, MSPBS) a acompañar a sus
pacientes entre una consulta y la siguiente. El profesional le asigna al paciente
contenidos breves (psicoeducación y ejercicios) y ve cómo le fue antes de la próxima
consulta. "Oñondive" significa "juntos" en guaraní.

## El problema
Entre una consulta y la siguiente pasan semanas o meses. Los profesionales tienen
mucha carga y sesiones breves; entre sesiones, el paciente queda sin acompañamiento
y el profesional no sabe cómo está.

## Usuarios
- **Profesional:** psicólogo o psiquiatra de un servicio público de salud.
- **Paciente:** adulto en situación de vulnerabilidad. Puede tener baja
  alfabetización, hablar guaraní o castellano y usar un celular básico con pocos datos.

## Etapas
### Etapa 1 — Prototipo para la reunión con el Ministerio (AHORA)
- Navegable, con datos inventados. Sin servidor, sin base de datos, sin login real.
- Debe poder mostrarse desde una computadora y desde un celular.
- Muestra el recorrido completo: el profesional asigna un contenido → el paciente lo
  recibe y lo completa → el profesional ve el registro.
- Prioridad: que se vea profesional, claro y creíble.

### Etapa 2 — App real para el piloto (DESPUÉS de la reunión)
- Datos reales, cuentas de profesionales, links privados para pacientes.
- Se planifica recién cuando la Etapa 1 esté aprobada.

## MVP (las 3 funciones)
1. **Biblioteca de contenidos:** psicoeducación y ejercicios breves, en castellano y
   guaraní, con textos muy cortos y simples. Cada contenido tiene título, tema,
   duración estimada y los pasos del ejercicio.
2. **Asignar y enviar:** el profesional elige un paciente (alias) y uno o más
   contenidos, y genera un link para enviárselo por WhatsApp. El paciente abre el link
   sin instalar nada y sin crear cuenta.
3. **Registro del paciente y panel del profesional:** al terminar cada ejercicio, el
   paciente marca cómo se sintió (escala de 1 a 5 con caritas) y, si quiere, escribe
   una línea. El profesional ve, por paciente, qué contenidos abrió, cuáles completó y
   sus registros.

## Fuera del MVP (NO construir)
- Chat entre paciente y profesional.
- IA que responda o hable con el paciente.
- Diagnósticos, historia clínica o notas de sesión.
- Agenda de turnos.
- Integración con sistemas del MSPBS o del IPS.
- Pagos.

## Cómo sabemos que funciona
- Un profesional asigna y envía un contenido en menos de 1 minuto.
- Un paciente abre el link desde un celular básico y completa un ejercicio sin ayuda.
- El profesional ve el registro del paciente antes de la próxima consulta.

## Accesibilidad (obligatorio)
- Castellano y guaraní (selector de idioma visible).
- Textos muy cortos, botones grandes, íconos claros; usable con poca lectura.
- Liviana: carga rápido con datos móviles en celulares básicos.
- Compatible con lectores de pantalla y buen contraste.

## Seguridad y datos (obligatorio)
- Son datos de salud: tratarlos como datos sensibles.
- Nunca usar datos reales de pacientes: solo datos inventados.
- Datos mínimos del paciente: alias y teléfono. Sin cédula ni diagnóstico.
- Cada profesional ve solo a sus propios pacientes.
- La app no diagnostica ni da consejos clínicos; el profesional elige los contenidos.
- Mostrar siempre al paciente, en un lugar visible, qué hacer en crisis:
  Línea 155 (salud mental, 24 h, gratuita) y 911. Aclarar que la app no es un
  servicio de emergencia.

## Contenidos de ejemplo
Crear 5 contenidos de ejemplo basados en psicoeducación y TCC (por ejemplo:
respiración para calmarse, registro de emociones, rutina de sueño, activación con
pequeñas actividades, qué es la ansiedad). Marcarlos como "ejemplo, a revisar por un
profesional". Los definitivos los redacta y revisa Aaron.

## Identidad visual
- Colores (paleta calma, basada en investigación de psicología del color: tonos claros
  y poco saturados; azul y verde para calma; cálidos intensos solo para alertas.
  Valdez y Mehrabian 1994; Jonauskaite et al. 2020; Elliot y Maier 2014):
  - Azul profundo #1D3557: textos y confianza.
  - Verde azulado suave #4FA89C: acentos, salud y calma.
  - Verde oscuro #1F7268: texto verde y foco del teclado (contraste suficiente).
  - Menta #DCEFEB: fondos suaves.
  - Celeste niebla #E4EEF6: luces suaves del fondo.
  - Durazno #F6BE94: botones de acción (texto azul encima).
  - Coral suave #E3907A: solo alertas.
  - Fondo #F6F9F9.
- Estilo premium siempre: sereno tipo Apple, fondo "aura" con luces suaves, bordes muy
  redondeados, espacios y títulos fluidos, letra base de 20 px, vibración suave al
  confirmar.
- Tipografías: Poppins (títulos) y Lora (textos).
- Motivo: dos círculos entrelazados (el logo de Oñondive).
- Estilo cálido, sereno y profesional. Nada de colores chillones.

## Tecnología
Para la Etapa 1, proponé la opción más simple que se pueda publicar gratis y mostrar
con un link. Proponé opciones y esperá mi OK antes de elegir.

## Prioridades
simple > completo · claro > lindo · accesible primero · costo mínimo

## Cómo trabajamos
- Antes de construir algo nuevo, proponé un plan y esperá mi OK.
- Una pantalla o función por vez. Al terminar, decime cómo probarla.
- No me expliques el código salvo que te lo pida.
- Si algo del pedido no está claro, preguntá antes de suponer.
- Si ves una forma más simple de hacerlo, decímelo.
- Guardá cada avance que funcione en GitHub.
- Al cerrar cada sesión, actualizá ESTADO.md: qué hicimos, qué falta y el próximo paso.
