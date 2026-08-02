# Auditoría técnica del sitio qselmer.github.io

Fecha de auditoría: 2026-08-01  
Rama de trabajo: `codex/site-audit-cleanup`  
Base inspeccionada: `c212bf8`

## 1. Resumen ejecutivo

El sitio contiene información científica real y una estructura de navegación principal coherente, pero su presentación depende de una cascada de estilos acumulados que hace difícil predecir y mantener el resultado. El `head` carga 17 hojas CSS propias después de `main.css`; en conjunto, `assets/css/` contiene 998 declaraciones `!important`. Los mismos componentes globales (`body`, `#main`, navegación, sidebar, tipografía, tarjetas y portada) se redefinen repetidamente.

La auditoría también encontró Markdown que se publica literalmente en páginas `.html`, HTML inválido en un componente de archivo, una animación global que crea 210 nodos decorativos en todas las páginas, Mermaid cargado dos veces, MathJax y un polyfill cargados globalmente aunque solo una nota real usa fórmulas, páginas y recursos de demostración heredados de AcademicPages, y controles de navegación sin estado accesible.

No se detectaron enlaces internos rotos en el contenido fuente ni imágenes referenciadas ausentes. El formulario de contacto y la suscripción están correctamente desactivados mientras no existe un proveedor configurado. El PDF del CV existe (`files/CV.pdf`, 226 488 bytes) y las URLs públicas principales tienen permalinks estables.

La corrección propuesta conserva las secciones Research, Projects, Publications, Conferences, Software, Teaching, Data, Blog, CV y Contact; no altera contenido científico sustantivo ni inventa metadatos. La prioridad es consolidar estilos, corregir errores verificables, conservar URLs y reducir trabajo innecesario en el navegador.

## 2. Problemas críticos

No se identificaron hallazgos `Critical` que impliquen pérdida de datos, exposición de credenciales o caída completa del sitio. Los problemas de mayor impacto se clasifican como `High` porque el sitio puede compilar y servir, aunque con deuda técnica y defectos visibles.

## 3. Problemas importantes

| Severidad | Archivo y líneas aproximadas | Descripción | Impacto | Corrección propuesta |
|---|---|---|---|---|
| High | `_includes/head.html:20-36`; `assets/css/*.css` | Se cargan 17 hojas CSS propias en serie; hay 998 usos de `!important` y redefiniciones repetidas de layout, navegación, sidebar y portada. | Regresiones difíciles de localizar, CSS bloqueante, comportamiento responsive impredecible. | Sustituir la cascada por `site-base.css`, `site-layout.css`, `site-components.css`, `site-responsive.css` y cuatro hojas específicas de página. Mantener `main.css` como base del tema. |
| High | `_pages/software.html:28,39,46`; `_pages/teaching.html:37,50`; `_pages/talks.html:50` | Encabezados Markdown aparecen dentro de archivos `.html`; Jekyll trata esos cuerpos como HTML y puede mostrarlos literalmente. | Jerarquía visual y semántica rota en tres secciones principales. | Convertirlos a `<h2>` y convertir las listas Markdown afectadas a HTML válido. |
| High | `_includes/archive-single.html:49-53` | El modo `read_more` genera elementos `<p>` anidados. | HTML inválido y comportamiento inconsistente en lectores de pantalla y CSS. | Renderizar un único párrafo y retirar etiquetas producidas por `markdownify`. |
| High | `_layouts/default.html:16-50`; `assets/css/marine-home.css:75-178` | Todas las páginas crean 210 partículas animadas y fondos decorativos, aunque el diseño solicitado debe ser blanco, sobrio y sin animaciones innecesarias. | Trabajo de DOM y pintura en cada carga; distracción visual; peor experiencia con movimiento reducido. | Eliminar partículas y script inline; conservar una portada estática y ligera basada en contenido real. |
| High | `_includes/masthead.html:5-25`; `assets/js/plugins/jquery.greedy-navigation.js` | El botón del menú no tiene nombre accesible, `aria-expanded` ni asociación explícita con el menú oculto. El selector de tema es un enlace sin `href`. | Navegación ambigua por teclado y lector de pantalla. | Añadir atributos ARIA y sincronizar el estado desde JavaScript; retirar el control de tema para mantener la presentación blanca solicitada. |
| High | `_layouts/talk.html:38` | Etiqueta `<p>` condicional sin cierre y uso de `talk_type` mientras los registros usan `type`. | HTML inválido y metadatos de conferencia omitidos. | Usar `page.type`, cerrar el párrafo y mostrar venue/location solo si existen. |
| High | `_pages/publications.html:13-47`; `_data/publication_taxonomy.yml:81-87`; `_publications/2022-09-01-anchoveta-biomass-variability.md:4` | La taxonomía visible admite alias heredados, pero el registro `category: conference` se incorpora como `conference-paper`; el título/extracto lo describen como contribución de conferencia, no demuestran que sea un paper publicado en proceedings. | Riesgo de mezclar presentación/abstract con publicaciones formales, contrario a la política editorial solicitada. | No reclasificar ni eliminar automáticamente. Mantener el registro y señalarlo como riesgo editorial pendiente de verificación humana. |

## 4. Mejoras recomendadas

| Severidad | Archivo y líneas aproximadas | Descripción | Impacto | Corrección propuesta |
|---|---|---|---|---|
| Medium | `_includes/footer/custom.html:5-14`; `assets/js/_main.js:181-196` | Mermaid se importa en dos sitios; MathJax y el polyfill ES6 se cargan en todas las páginas. | Solicitudes y ejecución duplicadas o innecesarias. | Mantener la carga diferida de Mermaid en un solo módulo y cargar MathJax solo con `page.mathjax: true`; marcar la nota técnica real con esa propiedad. |
| Medium | `_pages/about.md:16-102`; `_pages/cv.md:54-128` | CSS inline de página duplica responsabilidades de las hojas globales. | Dificulta reutilización, caché y auditoría. | Migrar a `page-specific/home.css` y estilos de componente/layout. |
| Medium | `_pages/projects.html:21-26`; `_pages/software.html:21-25`; `_pages/teaching.html:22-27`; `_pages/data.md:24-30` | Varias páginas muestran contadores cero; Teaching muestra cuatro ceros cuando no hay registros. | Ruido visual y listas largas de ceros. | Mostrar resúmenes solo cuando la colección tenga registros y omitir métricas cuyo valor sea cero. |
| Medium | `_includes/author-profile.html:9-24` | La imagen recibe la misma clase que su contenedor; el botón “Follow” carece de `aria-expanded` y `aria-controls`. | Selectores ambiguos y estado accesible incompleto. | Retirar la clase duplicada del `<img>`, añadir dimensiones y estado ARIA. |
| Medium | `_includes/archive-single-publication.html:11`; `_includes/seo.html:90-155` | Las entradas de publicaciones se tipan genéricamente como `CreativeWork`. | Datos estructurados académicos menos precisos. | Usar `ScholarlyArticle` de forma segura para registros de artículos y conservar tipos genéricos para otros productos. |
| Medium | `_config.yml:15,152-155` | La descripción es genérica y `social.type/name/links` están vacíos pese a existir datos verificados del autor. | Metadatos sociales y Person menos informativos. | Mejorar la descripción con campos ya presentes y rellenar solo datos verificados del autor. |
| Medium | `images/home/statistical-modelling-workflow.png`; `images/profile.png`; `images/talks/*.png` | Hay PNG de 1,56 MB, 742 KB, 653 KB y una foto de perfil de 313 KB. | Transferencia y decodificación innecesarias. | Optimizar sin cambiar dimensiones visuales ni contenido; conservar originales solo si están referenciados como material completo. |
| Medium | `.github/workflows/scrape_talks.yml:33-39` | El workflow usa `git add .` y puede incluir cambios no relacionados generados por el notebook. | Commits automatizados de alcance excesivo. | Limitar rutas generadas conocidas o documentar el riesgo si no puede demostrarse el conjunto exacto. |
| Low | `_config.yml:84-95`; `_data/publication_taxonomy.yml` | Existen dos definiciones de categorías, una antigua y otra canónica. | Confusión para mantenimiento y sincronización. | Retirar `publication_category` de `_config.yml` si ningún template la usa. |
| Low | `_includes/head/custom.html:8`; `images/manifest.json` | El comentario del favicon proviene de la plantilla y el manifest no referencia todos los tamaños disponibles. | Mantenibilidad y PWA incompleta, sin impacto funcional mayor. | Actualizar comentario/manifest solo con archivos existentes. |

## 5. Archivos redundantes

Hallazgos confirmados por búsqueda de referencias:

- `assets/css/academicons.min.css`: duplicado no cargado de `academicons.css`.
- `assets/css/collapse.css` y `assets/js/collapse.js`: no tienen referencias.
- `assets/css/cv-style.css`: no tiene referencias.
- `assets/css/cv-layout.css` y `_layouts/cv-layout.html`: el layout no se usa en ningún front matter actual.
- `images/500x300.png`, `images/editing-talk.png` e `images/themes/homepage-*.png`: recursos de demostración sin referencias en contenido real.
- `markdown_generator/publications.csv`, `markdown_generator/publications.tsv` y notebooks asociados: contienen publicaciones ficticias de la plantilla. Son herramientas históricas, no contenido publicado, pero su eliminación se considera de riesgo medio porque podrían formar parte de un flujo manual no documentado.
- `_pages/markdown.md`, `_pages/archive-layout-with-content.md` y `_pages/non-menu-page.md`: páginas de demostración de AcademicPages; contienen enlaces `#`, ejemplos y referencias a `academicpages.github.io`.
- `_pages/portfolio.html` duplica conceptualmente Projects bajo otra URL.

Se eliminarán únicamente los CSS/JS/imágenes demostrablemente sin referencia. Las páginas antiguas conservarán sus URLs mediante redirecciones ligeras. `markdown_generator/` se conservará por ahora y se documentará como pendiente para no destruir un posible flujo manual.

## 6. CSS duplicado o contradictorio

Métricas iniciales:

- 22 archivos bajo `assets/css/` (incluido `main.scss`).
- 17 hojas propias cargadas desde `_includes/head.html`, más `main.css` y `academicons.css`.
- 998 apariciones de `!important`.
- Los selectores `body`, `#main`, `.masthead`, `.greedy-nav`, `.sidebar`, `.author__avatar`, `.author__name`, `.author__bio`, `.author__urls`, `.page`, `.archive`, `.page__inner-wrap`, `.archive__item`, `.home-card` y `.follow-floating-button` aparecen en múltiples capas posteriores a `main.css`.
- `academic-refinement.css`, `clean-academic-layout.css`, `homepage-mobile.css`, `layout-corrections.css`, `light-professional.css`, `marine-home.css`, `sidebar-layout-fix.css` y `site-metrics-accessibility.css` concentran la mayoría de las sobreescrituras.

Arquitectura elegida:

```text
assets/css/
├── main.scss                    # entrada SCSS de AcademicPages
├── site-base.css                # tokens, tipografía, foco y elementos base
├── site-layout.css              # masthead, contenedor, sidebar y footer
├── site-components.css          # botones, archivos, métricas, formularios, CV
├── site-responsive.css          # breakpoints y reducción de movimiento
└── page-specific/
    ├── home.css
    ├── publications.css
    ├── research.css
    └── data.css
```

Esta separación reduce la cascada sin introducir un framework, mantiene estilos específicos fuera del núcleo y permite comprobar cada componente por responsabilidad.

## 7. JavaScript sin uso o redundante

- `assets/js/collapse.js`: sin referencias; se eliminará.
- `assets/js/theme.js`: solo alimenta el tema oscuro de Plotly. Al adoptar un sitio blanco y retirar el selector de tema, puede sustituirse por un layout Plotly claro mucho más pequeño dentro de `_main.js`.
- `_includes/footer/custom.html:10-14` duplica `initializeMermaid()` de `_main.js`; se eliminará la segunda carga.
- `_layouts/default.html:19-50` crea decoración global; se eliminará.
- jQuery se conserva porque la navegación greedy y el comportamiento existente dependen de él; retirarlo sería una reescritura fuera de alcance.

## 8. Problemas de navegación

- La estructura principal pedida está presente y en el orden correcto en `_data/navigation.yml`.
- El botón compacto carece de texto accesible y estado expandido.
- En escritorio, las numerosas correcciones CSS compiten sobre el ancho del menú; la consolidación fijará un único breakpoint coherente.
- Las páginas de demostración no aparecen en el menú, pero siguen indexables y diluyen la identidad académica.
- `portfolio.html` publica una segunda entrada conceptual para Projects. Se conservará `/portfolio/` como redirección a `/projects/`.

## 9. Problemas responsive

- `sidebar-layout-fix.css` redefine el layout en tres breakpoints con decenas de `!important`; indica que la base y los parches no comparten un modelo de caja estable.
- El CV usa CSS inline, altura mínima fija de 720 px y fondo oscuro; en móvil puede dominar la pantalla.
- El menú depende de mediciones JS y estilos distribuidos en cuatro hojas.
- Las grids usan reglas repartidas entre estilos inline y archivos globales.
- No se detectaron reglas `overflow-y` que creen scroll interno en la sidebar; existe una única regla correctiva `overflow-y: visible !important`.

La validación final comprobará 375, 430, 768, 1024, 1366 y 1920 px mediante navegador aislado y detección automatizada de `scrollWidth > clientWidth`.

## 10. Problemas de accesibilidad

- Falta nombre y estado ARIA en el botón de navegación móvil.
- Falta estado ARIA en el botón de enlaces del autor.
- El selector de tema es un pseudo-botón basado en `<a>` sin `href`.
- Las animaciones globales no aportan información y aumentan movimiento.
- Algunos iconos Academicons no tienen `aria-hidden`.
- La imagen teaser genérica usa `alt=""`; es aceptable solo si es decorativa. Las imágenes científicas de talks sí tienen texto alternativo en sus registros y deben conservarlo.
- Los formularios reales tienen labels; el honeypot necesita ocultarse también de tecnologías de asistencia.
- La jerarquía de encabezados está rota por Markdown literal en HTML.

## 11. Enlaces o recursos rotos

- El comprobador de rutas del contenido fuente no encontró enlaces internos cuyo permalink/archivo objetivo falte.
- No se encontraron imágenes referenciadas ausentes.
- El formulario Contact está intencionalmente desactivado en `_data/contact.yml` y muestra un fallback `mailto:`; no simula envíos.
- La suscripción está desactivada en `_data/newsletter.yml` y muestra RSS como alternativa.
- Quedan por validar respuestas HTTP de enlaces externos; algunos proveedores bloquean `HEAD` o automatización, por lo que los fallos se distinguirán entre rotura real y bloqueo del verificador.

## 12. Riesgos por componente

| Componente | Riesgo | Mitigación |
|---|---|---|
| CSS global | Alto: una cascada tan parcheada puede ocultar dependencias visuales. | Sustituirla como bloque coherente, compilar y revisar seis anchos y páginas representativas. |
| Navegación greedy | Medio: cambios de ancho pueden mover enlaces antes o después. | Conservar el plugin, simplificar estilos y probar teclado/ARIA y 1024/1366 px. |
| Sidebar | Medio: AcademicPages cambia su estructura según breakpoint. | Mantener el markup y aplicar un único modelo desktop/móvil sin posición sticky ni scroll interno. |
| Publicaciones | Alto editorial: el registro de 2022 puede ser abstract/presentación y no paper publicado. | No reclasificar automáticamente; documentar para revisión del autor. |
| Páginas demo | Bajo técnico, medio por URL histórica. | Reemplazar contenido por redirecciones, sin cambiar las URLs conocidas. |
| Recursos sin referencia | Bajo. | Eliminar solo los confirmados por búsqueda global; listar cada archivo eliminado. |
| Optimización de imágenes | Bajo si es sin pérdida o con inspección visual. | Comparar dimensiones, formato y render; no modificar material científico completo sin necesidad. |
| Workflow de talks | Medio: no está documentado qué salidas son esperadas. | No cambiar `git add .` hasta identificar exhaustivamente sus productos. |

## 13. Lista exacta de cambios a implementar

1. Reemplazar las 17 cargas CSS personalizadas por la arquitectura documentada y retirar archivos antiguos una vez migradas las reglas necesarias.
2. Eliminar partículas/fondo animado global y selector oscuro; conservar una portada clara, compacta y estática con el flujo Observations → Data → Models → Decision support.
3. Migrar CSS inline de Home y CV a archivos mantenibles.
4. Corregir Markdown literal en `software.html`, `teaching.html` y `talks.html`.
5. Corregir HTML inválido en `archive-single.html` y `talk.html`.
6. Añadir nombres, estados y relaciones ARIA a navegación y perfil; mantener foco visible y áreas táctiles adecuadas.
7. Cargar MathJax únicamente en la nota que contiene fórmulas; eliminar la carga duplicada de Mermaid.
8. Ocultar bloques de métricas cuando una colección esté vacía y no mostrar métricas cero innecesarias.
9. Mejorar descripción y datos Person solo con información ya verificada en `_config.yml`.
10. Mantener categorías amplias de Publications y un único sistema de contadores; no mostrar categorías vacías.
11. Convertir páginas de demostración a redirecciones preservando URLs; redirigir `/portfolio/` a `/projects/`.
12. Eliminar CSS, JS e imágenes sin referencias confirmadas; conservar `markdown_generator/` como riesgo pendiente.
13. Añadir `package-lock.json` para reproducir el pipeline JS y regenerar `main.min.js` con las dependencias fijadas.
14. Optimizar imágenes de interfaz seguras y añadir dimensiones/lazy loading donde corresponda.
15. Ejecutar `npm test`, `bundle exec jekyll build`, búsquedas solicitadas, comprobación de enlaces internos, validación HTML, overflow horizontal y revisión visual de los seis anchos.

## 14. Resultados de implementación y validación

- La arquitectura CSS quedó reducida de 22 archivos a 10 y las hojas personalizadas cargadas pasaron de 998 usos de `!important` a 0. Las hojas globales se limitan a base, layout, componentes y responsive; Home, Publications, Research y Data conservan hojas específicas.
- `npm test` pasa: validación sintáctica y regeneración minificada de JavaScript.
- `bundle install` y el build Jekyll de producción pasan con `github-pages` 232. Se añadió `tzinfo-data` solo para plataformas Windows; el pipeline JavaScript queda fijado en `package-lock.json` y Bundler resolvió el grafo local sin cambiar la política existente que excluye `Gemfile.lock`.
- `scripts/validate_site.py` validó 50 archivos HTML generados: objetivos internos, atributos `alt`, nombres accesibles de botones e IDs duplicados, sin errores.
- Chrome headless validó Home en 375, 430, 768, 1024, 1366 y 1920 px, y todas las secciones principales en los extremos 375/1920 px: 26 casos únicos, sin overflow horizontal ni fallos de estructura básica.
- El menú móvil cambia `aria-expanded` de `false` a `true` y `aria-hidden` de los enlaces ocultos a `false`. La prueba detectó y permitió corregir una incompatibilidad inicial entre `display:flex` y el algoritmo de medición de greedy navigation.
- La revisión visual cubrió Home en escritorio/móvil, Publications en escritorio y CV en móvil. No se observaron fondos transparentes accidentales, scroll interno de sidebar, solapamientos o bloques vacíos dominantes.
- Se optimizaron sin pérdida 10 PNG, verificando igualdad de píxeles. El peso total bajó de 3,854,031 a 3,594,707 bytes (259,324 bytes; 6.7%).
- La comprobación HTTP distinguió bloqueos de automatización de roturas reales. Se retiraron tres enlaces directos 404 de PICES y se conservaron las páginas oficiales verificadas como fuente estable.
- Riesgo editorial pendiente: el registro de conferencia de 2022 no se reclasificó automáticamente como publicación revisada por pares porque la evidencia del repositorio no basta para hacerlo con seguridad.
