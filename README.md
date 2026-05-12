# Campana Medica Solidaria - GitHub Pages

Sitio web de recaudacion de fondos estilo crowdfunding medico, optimizado para SEO, accesibilidad, rendimiento y conversion de donaciones.

## Estructura del proyecto

- index.html
- style.css
- script.js
- sitemap.xml
- robots.txt
- .nojekyll
- assets/favicon.svg
- assets/images/case-main.svg
- assets/images/evidence-1.svg
- assets/images/evidence-2.svg
- assets/images/evidence-3.svg
- en/index.html

## Como subir a GitHub

1. Crea un repositorio nuevo en GitHub.
2. Sube todos los archivos de esta carpeta (rama main).
3. Confirma que index.html quede en la raiz del repositorio.

## Como activar GitHub Pages

1. Ve a Settings > Pages en tu repositorio.
2. En Source selecciona Deploy from a branch.
3. Elige branch main y carpeta /(root).
4. Guarda y espera la URL publica.
5. Si usas rutas limpias, manten el archivo .nojekyll para evitar procesamiento innecesario.

## Como cambiar imagenes

1. Reemplaza archivos dentro de assets/images.
2. Conserva los mismos nombres o actualiza las rutas en index.html.
3. Usa formatos livianos para mejor performance (WebP recomendado para fotos reales).

## Como editar textos

1. Abre index.html.
2. Ajusta historia, actualizaciones, FAQ y transparencia.
3. Mantiene un tono humano, verificable y honesto.

## Como cambiar el enlace de PayPal

1. En script.js edita CAMPAIGN_CONFIG.paypalUrl.
2. En index.html actualiza el valor inicial de href del boton principal.
3. Publica cambios.

## Como mejorar el SEO

1. Reemplaza URL canonica y Open Graph con tu dominio final en index.html.
2. Personaliza title y description con datos reales del caso.
3. Actualiza sitemap.xml con URL final.
4. Verifica robots.txt y habilita indexacion.
5. Agrega Google Search Console y envia sitemap.
6. Incorpora datos estructurados reales en el bloque JSON-LD.
7. Mantiene consistencia entre version en espanol (/) y version en ingles (/en/).

## Google Analytics y Search Console

- En index.html hay espacios listos para:
  - meta de verificacion de Search Console.
  - script de Google Analytics 4.
- Reemplaza codigos de ejemplo por tus IDs reales.

## Dominio personalizado en GitHub Pages

1. Compra o usa un dominio propio.
2. En Settings > Pages agrega Custom domain.
3. Crea registros DNS segun GitHub (A, AAAA o CNAME).
4. Cuando este activo, actualiza canonical, og:url, sitemap.xml y robots.txt.

## Recomendaciones para indexar rapido en Google

1. Publica version final con contenido completo y evidencia real.
2. Envia sitemap.xml desde Search Console.
3. Solicita indexacion manual de la URL principal.
4. Consigue compartidos y enlaces legitimos (redes, prensa local, comunidad).
5. Mantiene actualizaciones frecuentes para que Google detecte actividad.

## Accesibilidad y rendimiento

- Estructura semantica HTML5.
- Navegacion por teclado y focus visible.
- Imagenes con loading lazy en evidencias.
- CSS y JS ligeros, sin frameworks pesados.
- Compatible con GitHub Pages.

## Nota de uso etico

Utiliza este sitio solo con informacion real y verificable. Protege datos medicos sensibles y evita publicar documentos con informacion privada completa.
