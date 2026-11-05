# Oñondive — acompañamiento entre consultas

**Oñondive** significa *juntos* en guaraní. Es un prototipo navegable que ayuda a psicólogos de la red pública de salud mental a acompañar a sus pacientes entre una consulta y la otra.

🔗 **Demo en vivo:** https://aaronacostaamarillo98-blip.github.io/onondive/

> Prototipo con datos inventados, preparado como propuesta para la red pública de salud mental (MSPBS, Paraguay). No es un servicio de emergencia ni una historia clínica.

## Qué resuelve

Entre consulta y consulta pueden pasar semanas, y el profesional no sabe si el paciente practicó lo trabajado ni cómo se sintió. Oñondive le permite enviar ejercicios breves por WhatsApp y ver cómo le fue a cada paciente.

## Cómo funciona

1. **El profesional** elige un paciente y uno o más contenidos de la biblioteca.
2. Oñondive arma un **link** y un mensaje listo para enviar por **WhatsApp**, en castellano o guaraní.
3. **El paciente** abre el link sin instalar nada, hace el ejercicio paso a paso y marca cómo se sintió (caritas del 1 al 5, una línea de texto o una nota de voz).
4. **El profesional** ve en la ficha qué abrió, qué completó y cómo se viene sintiendo. Si el paciente se sintió mal, aparece un aviso suave para que lo mire primero. La app no diagnostica.

## Funcionalidades

- Vista de profesional y vista de paciente.
- Biblioteca de **29 contenidos breves** en 10 temas (ansiedad, emociones, ánimo, sueño, duelo, medicación, crianza y familia, adicciones, estrés postraumático y salud sexual, esta última revisada por una médica), basados en TCC y terapia familiar, alineados con la guía **mhGAP de la OMS**.
- **Bilingüe castellano / guaraní**, con el idioma preferido de cada paciente.
- **Aviso de crisis siempre visible** para el paciente: Línea 155 y 911.
- Datos mínimos: solo alias, celular e idioma. No se cargan cédula, nombre completo ni diagnóstico.
- **Accesibilidad:** sin errores automáticos WCAG 2.2 AA, botones de al menos 44 px, letra base de 20 px y respeto de "reducir movimiento".
- Liviana: unos 22 KB de código de la app.

## Tecnología

HTML, CSS y JavaScript sin frameworks, publicado en GitHub Pages. En la demo, lo que hace el paciente se guarda en el navegador. Desarrollado con asistencia de IA (Claude).

## Próximos pasos

- Etapa 2: backend con datos cifrados, plan de seguridad para el paciente y revisión de contenidos por profesionales.
- Revisión de los textos en guaraní por un hablante nativo.

## Autor

**Aaron Acosta** — Psicólogo clínico y desarrollador de productos digitales · Paraguay
[LinkedIn](https://www.linkedin.com/in/aaron-acosta-amarillo-85944a26a)
