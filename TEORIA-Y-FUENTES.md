# Criterio de transposición y fuentes

Investigación aplicada a las cinco canciones, consultada el 10 de septiembre de 2026. Esta aplicación trabaja con cifrado de acordes en temperamento igual de doce semitonos. No infiere una nueva armonización ni cambia las melodías.

## Altura y escritura

Transportar una canción desplaza todas las fundamentales y bajos el mismo número de semitonos. Se conserva la calidad del acorde: mayor, menor, suspendido, disminuido, aumentado, séptimas y otras extensiones. Por ejemplo, al subir C–Am7–Fsus4–G dos semitonos, se obtiene D–Bm7–Gsus4–A. El sufijo no se transpone como si fuera una nota independiente.

La altura cromática no basta para escribir correctamente la música tonal. También se conserva la distancia entre nombres de notas. Así, al transportar de F a F♯, el acorde C/E se convierte en C♯/E♯. Escribir F como bajo produciría el mismo sonido en temperamento igual, pero ocultaría que el bajo es la tercera de C♯. Esta diferencia importa para leer la función de los acordes.

El motor usa ambos desplazamientos: el cromático, módulo 12, y el de letras, módulo 7. El resultado puede incluir E♯, B♯, C♭, F♭ y dobles alteraciones cuando corresponden. No fuerza indiscriminadamente todos los sonidos a sostenidos ni todos a bemoles.

Las tonalidades seleccionables son las quince armaduras mayores habituales. Los botones por semitono recorren doce opciones prácticas: C, D♭, D, E♭, E, F, F♯, G, A♭, A, B♭, B. El selector también permite las alternativas enarmónicas C♯, G♭ y C♭. Elegir F♯ o G♭ no altera la altura, pero sí su escritura. Las cinco tonalidades base suministradas son mayores; el carácter menor de acordes como Em, Fm o G♯m se conserva.

## Bajos, préstamos y extensiones

En un acorde con barra, la parte izquierda indica el acorde y la derecha la nota más grave. Ambas notas se transportan. No todo bajo con barra tiene que ser una nota de la tríada. Una barra seguida de un número, como en C6/9, pertenece a una extensión y se conserva.

| Ejemplo | Transporte | Resultado |
| --- | --- | --- |
| C/E | C → D | D/F♯ |
| F/A | F → G♭ | G♭/B♭ |
| B♭/D | F → E | A/C♯ |
| C/E | F → F♯ | C♯/E♯ |
| G♯m | B → C | Am |
| Fm | C → D | Gm |
| Csus4 | F → G | Dsus4 |
| C7(b9,#11)/E | C → D♭ | D♭7(b9,#11)/F |
| C6/9 | C → D | D6/9 |

El Fm de Cantaré de tu amor se conserva como acorde menor al transportarlo. No se “corrige” a mayor por quedar fuera de la escala diatónica: los préstamos y alteraciones forman parte de la armonía original.

La aplicación muestra los acordes resultantes de la tonalidad elegida. No aplica una cejilla de guitarra ni incorpora una transposición adicional para instrumentos transpositores.

## Fuentes musicales

- [Open Music Theory · Intervals and dyads](https://openmusictheory.github.io/intervals.html): diferencia entre distancia cromática y diatónica, calidad de intervalos y equivalencia de octavas.
- [Open Music Theory · Pitch class](https://openmusictheory.github.io/pitch%28Class%29): equivalencia enarmónica y diferencia entre altura y función tonal.
- [University of Puget Sound · Lead-Sheet Symbols](https://musictheory.pugetsound.edu/mt21c/LeadSheetSymbols.html): fundamentales y calidad del acorde en cifrado.
- [University of Puget Sound · Inverted Triads](https://musictheory.pugetsound.edu/mt21c/InvertedTriads.html): diferencia entre fundamental y bajo; acordes con barra.
- [MuseScore · Chord symbols](https://musescore.org/en/handbook/2/chord-symbols): extensiones, alteraciones, acordes con barra y transposición del cifrado.

## Fuentes técnicas

- [MDN · localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage): persistencia por origen; limitaciones en modo privado, almacenamiento bloqueado y archivos locales.
- [MDN · getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia): permiso de micrófono, errores de disponibilidad y necesidad de contexto seguro. Los archivos locales dependen del navegador; la presentación se verificó por `file://` en Edge.
- [GitHub · Crear un sitio Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site): publicación estática desde una rama.

## Referencias bíblicas

Los fragmentos fueron cotejados en RVR1960. Las relaciones con cada canción son una selección temática editorial. Los extractos y sus direcciones también quedan integrados en `songs.js`.

| Tema | Referencia |
| --- | --- |
| Salvación por gracia | [Efesios 2:8](https://www.biblegateway.com/passage/?search=Efesios+2%3A8&version=RVR1960) |
| El amor de Dios precede al nuestro | [1 Juan 4:19](https://www.biblegateway.com/passage/?search=1+Juan+4%3A19&version=RVR1960) |
| Misericordia permanente | [Salmos 136:1](https://www.biblegateway.com/passage/?search=Salmos+136%3A1&version=RVR1960) |
| Fidelidad | [2 Timoteo 2:13](https://www.biblegateway.com/passage/?search=2+Timoteo+2%3A13&version=RVR1960) |
| Vasijas y poder de Dios | [2 Corintios 4:7](https://www.biblegateway.com/passage/?search=2+Corintios+4%3A7&version=RVR1960) |
| Perdón | [Salmos 130:4](https://www.biblegateway.com/passage/?search=Salmos+130%3A4&version=RVR1960) |
| Antes ciego, ahora ve | [Juan 9:25](https://www.biblegateway.com/passage/?search=Juan+9%3A25&version=RVR1960) |
| Libertad en el Hijo | [Juan 8:36](https://www.biblegateway.com/passage/?search=Juan+8%3A36&version=RVR1960) |
| Digno es el Cordero | [Apocalipsis 5:12](https://www.biblegateway.com/passage/?search=Apocalipsis+5%3A12&version=RVR1960) |
| Sufrimiento por nuestros pecados | [Isaías 53:5](https://www.biblegateway.com/passage/?search=Isaiah+53%3A5-6&version=RVR1960) |
| Presencia de Dios ante el temor | [Isaías 41:10](https://www.biblegateway.com/passage/?search=isaias+41%3A10&version=RVR1960) |
