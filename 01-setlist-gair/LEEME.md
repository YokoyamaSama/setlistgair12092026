# Alabanza GAIR · Setlist

Abre `index.html` para ver la setlist. Para usarla desde el celular, publica **el contenido de esta carpeta** en GitHub Pages. No requiere instalar paquetes, compilar ni configurar un servidor.

## Publicar en GitHub Pages

1. Sube los archivos de esta carpeta a la raíz de tu repositorio, conservando sus nombres. Incluye `.nojekyll`.
2. En el repositorio abre **Settings → Pages**.
3. En **Build and deployment**, selecciona **Deploy from a branch**, la rama `main` y la carpeta **/(root)**. Guarda.
4. Cuando GitHub muestre la dirección del sitio, ábrela una vez con internet en cada celular. Esa primera carga prepara la copia sin conexión.

También puedes mantener esta carpeta dentro de un repositorio más grande; abre entonces la dirección que termine en `/01-setlist-gair/`. Todas las rutas son relativas. No hace falta subir la carpeta de proyección.

Guía oficial: [Crear un sitio de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site).

## Durante la alabanza

- Selecciona una canción. **− / +** bajan o suben un semitono; el selector permite elegir directamente la tonalidad, incluidas alternativas enarmónicas.
- **Original** restaura únicamente esa canción al tono del archivo compartido.
- Cada canción conserva su propio tono en el almacenamiento local del navegador. El tamaño de letra y la notación C/D/E o Do/Re/Mi también se recuerdan.
- **Opciones de lectura** permite cambiar la letra entre 16 y 24 px y solicitar que la pantalla permanezca encendida. Esta última función depende del navegador y de que la página continúe visible.
- **Ir a una parte** salta al verso, coro o puente deseado. Todos los controles se desplazan con la página: no hay elementos fijos ni sticky.
- Los acordes se anclan a la posición de la letra y viajan junto con su palabra cuando se ajusta el ancho. No dependen de una fila separada de espacios.

El guardado corresponde al mismo navegador, dirección y carpeta del sitio. Borrar sus datos, cambiar de navegador o cerrar una sesión privada puede eliminarlo. La primera visita sin internet todavía no puede descargar la aplicación. Si el navegador impide guardar, la canción sigue funcionando y muestra un aviso.

## Canciones y tonos base

| Orden | Canción | Versión | Tono del archivo |
| --- | --- | --- | --- |
| 1 | Gracia sublime es | En Espíritu y en Verdad | B / Si |
| 2 | Cantaré de tu amor | Danilo Montero | C / Do |
| 3 | Fiel | Majo y Dan | F / Fa |
| 4 | Vasijas rotas | Hillsong Worship | G / Sol |
| 5 | Sublime gracia | Blest, con “Ya libre soy” | F / Fa |

Vasijas rotas y Sublime gracia tienen el borde y los títulos dorados. Los fragmentos bíblicos son RVR1960; los puntos suspensivos indican que se muestra solo una parte del versículo. Las asociaciones bíblicas acompañan el sentido de la letra; no afirman que la canción cite literalmente ese pasaje.

## Fuentes y criterio musical

Las letras y los 316 símbolos de acordes se extrajeron de los cinco HTML aportados, conservando el orden y las ubicaciones de los acordes. Se desplegó el último “Coro 2” de Fiel usando el coro ya escrito en su archivo. El puente ×3 aparece indicado en la setlist y se repite explícitamente en la proyección.

El archivo de Blest contiene una etiqueta técnica `data-key="A"`, pero su encabezado y sus acordes visibles están en **F**. Se utilizó F como base, según lo acordado. Se conserva la redacción de las letras de los archivos. No se corrigieron por suposición las armonizaciones de las fuentes; por ejemplo, los Em sucesivos que aparecen al comienzo de Vasijas rotas permanecen como fueron aportados.

La página de Vasijas rotas ofrece secciones, sin detallar todas las posibles repeticiones de una interpretación. Se conserva ese orden; el selector permite volver a cualquier coro o parte.

- [Gracia sublime es · Cifra Club](https://www.cifraclub.com/en-espiritu-en-verdad/gracia-sublime-es/)
- [Cantaré de tu amor · Cifra Club](https://www.cifraclub.com/danilo-montero/cantare-de-tu-amor/)
- [Fiel · Director Creativo](https://directorcreativo.pro/acorde/fiel)
- [Vasijas rotas · Worship Together](https://www.worshiptogether.com/es/canciones/vasijas-rotas-sublime-gracia-hillsong-worship/)
- [Sublime gracia · uAkor](https://uakor.com/es/acorde/blest-sublime-gracia-chords-akorlar)

Consulta [TEORIA-Y-FUENTES.md](TEORIA-Y-FUENTES.md) para el criterio de transposición, ejemplos y bibliografía.

## Cambiar el contenido

`songs.js` contiene las canciones. Cada línea tiene un texto y acordes con la posición `at`, que cuenta caracteres desde cero dentro de ese texto. `symbol` es el nombre original del acorde. Si editas la letra, revisa también esas posiciones. La proyección es independiente y no se actualiza automáticamente al modificar la setlist.

Después de publicar una actualización, cambia el identificador de versión que termina en `v1` en `sw.js`; así se renueva la copia para uso sin conexión. Evita modificar el nombre de la clave de almacenamiento en `app.js` para conservar los tonos ya guardados.

## Comprobaciones realizadas

- 4.740 transposiciones de los acordes reales hacia 15 tonalidades, con regreso exacto a la escritura original, más 15 ejemplos específicos de inversiones y alteraciones.
- Las cinco canciones a 320, 390 y 768 px de ancho, con letra máxima y notación Do/Re/Mi: sin desborde horizontal, sin elementos fijos y sin separación entre los acordes y sus anclajes.
- Guardado por canción, restauración, recarga sin conexión y funcionamiento con almacenamiento bloqueado.
- Pruebas visuales en el navegador integrado y pruebas automatizadas locales en Microsoft Edge. Sin errores de JavaScript detectados.

Para repetir las pruebas del motor musical con Node.js: `node tests/music.test.cjs`.

Reina-Valera 1960 ® © Sociedades Bíblicas en América Latina, 1960. Renovado © Sociedades Bíblicas Unidas, 1988. Se incluyen fragmentos breves con sus referencias.
