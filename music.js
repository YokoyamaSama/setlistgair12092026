/* Transposición cromática con escritura diatónica. Sin dependencias. */
(function (global) {
  'use strict';
  const LETTERS = 'CDEFGAB';
  const PITCH = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
  const KEYS = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
  const ALL_KEYS = ['C', 'C#', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B', 'Cb'];
  const mod = (n, m) => ((n % m) + m) % m;
  function parseNote(note) {
    const normalized = note.replace(/♯/g, '#').replace(/♭/g, 'b').replace(/𝄪|x/g, '##').replace(/𝄫/g, 'bb');
    const match = /^([A-G])(#{1,2}|b{1,2})?$/.exec(normalized);
    if (!match) throw new Error('Nota no válida: ' + note);
    const accidental = (match[2] || '').split('').reduce((sum, c) => sum + (c === '#' ? 1 : -1), 0);
    return { letter: LETTERS.indexOf(match[1]), pitch: mod(PITCH[match[1]] + accidental, 12) };
  }
  function transposeNote(note, from, to) {
    if (from === to) return note;
    const source = parseNote(from), target = parseNote(to), n = parseNote(note);
    const letter = LETTERS[mod(n.letter + target.letter - source.letter, 7)];
    const pitch = mod(n.pitch + target.pitch - source.pitch, 12);
    const alteration = mod(pitch - PITCH[letter] + 6, 12) - 6;
    return letter + (alteration > 0 ? '#'.repeat(alteration) : 'b'.repeat(-alteration));
  }
  function transposeChord(chord, from, to) {
    if (from === to || /^(N\.?C\.?|\||\/|—|-)$/.test(chord)) return chord;
    const match = /^([A-G](?:#{1,2}|b{1,2}|♯{1,2}|♭{1,2}|x|𝄪|𝄫)?)(.*)$/.exec(chord);
    if (!match) throw new Error('Acorde no reconocido: ' + chord);
    let suffix = match[2];
    // Only a slash followed by a note is a bass. The /9 in C6/9 is an extension.
    suffix = suffix.replace(/\/([A-G](?:#{1,2}|b{1,2}|♯{1,2}|♭{1,2}|x|𝄪|𝄫)?)$/, (_, bass) => '/' + transposeNote(bass, from, to));
    return transposeNote(match[1], from, to) + suffix;
  }
  function stepKey(key, direction) { return KEYS[mod(parseNote(key).pitch + direction, 12)]; }
  function display(chord, notation = 'letters') {
    let result = chord.replace(/#/g, '♯').replace(/b/g, '♭');
    if (notation === 'solfege') {
      const names = { C: 'Do', D: 'Re', E: 'Mi', F: 'Fa', G: 'Sol', A: 'La', B: 'Si' };
      result = result.replace(/^([A-G])/, (_, n) => names[n]).replace(/\/([A-G])/, (_, n) => '/' + names[n]);
    }
    return result;
  }
  const api = { transposeChord, transposeNote, parseNote, stepKey, display, KEYS, ALL_KEYS };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.GAIR_MUSIC = api;
})(typeof window !== 'undefined' ? window : globalThis);
