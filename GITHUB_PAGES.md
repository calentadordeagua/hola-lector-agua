# Publicar en GitHub Pages

## Tamaños comprobados

La carpeta generada `out/` ocupa aproximadamente 728 MB, por debajo del máximo publicado de 1 GB de GitHub Pages. El repositorio fuente mantiene `public/books` (336 MB) y `public/content` (491 MB) en tu Mac, pero `.gitignore` evita incluirlos en los commits. `public/images` y `public/assets` sí se publican.

## Primera publicación

1. En GitHub Desktop, confirma y publica la rama `main` con el código fuente. `public/books` y `public/content` deben aparecer ignoradas.
2. En GitHub, abre **Settings → Pages → Build and deployment** y selecciona **Deploy from a branch**.
3. Elige la rama `gh-pages` y la carpeta `/(root)`. Guarda los cambios.
4. En Terminal, dentro de la carpeta local del repositorio, ejecuta `npm run deploy:pages`. Este comando vuelve a generar `out/` y lo publica en `gh-pages`.
5. Abre `https://calentadordeagua.github.io/hola-lector-agua/`.

La exportación ajusta las rutas de recursos para el prefijo `/hola-lector-agua/` y crea `.nojekyll` para que Pages sirva los archivos de Next.js. El contenido de `out/` se publica en la rama `gh-pages`, separado del código de `main`.

## Actualizar el sitio

Después de cambiar el código, confirma y sube los cambios de `main`; luego vuelve a ejecutar `npm run deploy:pages`.
