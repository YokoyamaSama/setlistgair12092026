const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const m=require('../music.js');
const box={window:{}};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../songs.js'),'utf8'),box);
const examples=[
 ['C/E','C','D','D/F#'],['F/A','F','Gb','Gb/Bb'],['C/E','F','F#','C#/E#'],
 ['G#m','B','C','Am'],['Bb/D','F','E','A/C#'],['Csus4','F','G','Dsus4'],
 ['Fm','C','D','Gm'],['Bdim','C','F#','E#dim'],['G#dim7','Am'.slice(0,1),'Bb','Adim7'],
 ['C7(b9,#11)/E','C','Db','Db7(b9,#11)/F'],['C6/9','C','D','D6/9'],
 ['E#maj7/B#','C#','Db','Fmaj7/C'],['F##dim/A#','G#','Ab','Gdim/Bb'],
 ['N.C.','C','E','N.C.'],['Bb','F','F','Bb']
];
for(const [c,a,b,expected] of examples)assert.equal(m.transposeChord(c,a,b),expected,`${c}: ${a} → ${b}`);
const mod=n=>(n%12+12)%12;
let count=0;
for(const song of box.window.GAIR_DATA.songs){
 for(const target of m.ALL_KEYS){
  for(const sec of song.sections)for(const line of sec.lines)for(const {symbol} of line.chords){
   const result=m.transposeChord(symbol,song.key,target);
   const root=symbol.match(/^([A-G][#b]*)/)[1],out=result.match(/^([A-G][#b]*)/)[1];
   assert.equal(m.parseNote(out).pitch,mod(m.parseNote(root).pitch+m.parseNote(target).pitch-m.parseNote(song.key).pitch));
   assert.equal(m.transposeChord(result,target,song.key),symbol,'Round trip spelling: '+symbol);
   assert.equal(result.replace(/^([A-G][#b]*)/,'').replace(/\/[A-G][#b]*$/,''),symbol.replace(/^([A-G][#b]*)/,'').replace(/\/[A-G][#b]*$/,''));
   const bass=/\/([A-G][#b]*)$/.exec(symbol);
   if(bass){const ob=/\/([A-G][#b]*)$/.exec(result);assert.equal(m.parseNote(ob[1]).pitch,mod(m.parseNote(bass[1]).pitch+m.parseNote(target).pitch-m.parseNote(song.key).pitch));}
   count++;
  }
 }
}
assert.equal(m.stepKey('B',1),'C');assert.equal(m.stepKey('C',-1),'B');
assert.equal(m.display('C#/E#','solfege'),'Do♯/Mi♯');
console.log(`OK · ${count} transposiciones de acordes reales a 15 tonalidades; ${examples.length} casos de inversión, alteraciones, extensiones y enarmonía.`);
