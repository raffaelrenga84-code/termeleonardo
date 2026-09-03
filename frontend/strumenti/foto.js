#!/usr/bin/env node
/* ============================================================
   strumenti/foto.js — le fotografie del sito, in casa e in tre misure.

   PERCHE' ESISTE. Fino al 3 settembre 2026 la home prendeva le fotografie
   dal sito precedente (termeleonardo.com/img): JPEG da 300-400 KB l'uno,
   serviti uguali al telefono e al computer, e la piu' grande — quella a
   tutto schermo — era larga 650 px. Lighthouse da telefono contava 5 MB
   di pagina e 3,5 MB di foto risparmiabili.

   COSA FA. Legge strumenti/foto.json, prende ogni originale, lo taglia se
   richiesto e lo scrive in public/foto/ come WebP nelle larghezze
   indicate (mai piu' larghe dell'originale: non si inventa risoluzione).
   Il nome del file porta otto caratteri di impronta del contenuto:
   cambia la foto, cambia il nome, e il browser non puo' tenersi quella
   vecchia — per questo vercel.json puo' dire «tienila per un anno».
   Poi scrive src/foto.js: per ogni chiave, src, srcset, larghezza e
   altezza, pronti per il componente <Foto>.

   COME SI LANCIA, dalla cartella frontend/. sharp non sta fra le
   dipendenze del progetto apposta: e' un binario da decine di MB che
   Vercel scaricherebbe a ogni costruzione senza usarlo. Si installa in una
   cartella qualunque fuori dal progetto e la si indica con NODE_PATH
   (installarlo qui dentro con --no-save fallisce per i conflitti fra le
   dipendenze di react-scripts):
     mkdir C:\\sharp && cd C:\\sharp && npm init -y && npm i sharp
     cd <frontend>
     set NODE_PATH=C:\\sharp\\node_modules
     node strumenti/foto.js --proprieta "C:/Users/admin/Desktop/foto-leonardo"
   Le foto del sito precedente, se mancano, le scarica da sole in
   .foto-vecchio/ (cartella ignorata da git).
   ============================================================ */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

let sharp;
try { sharp = require('sharp'); }
catch { console.error('manca sharp: npm i --no-save sharp'); process.exit(1); }

const RADICE = path.resolve(__dirname, '..');
const MANIFESTO = path.join(__dirname, 'foto.json');
const USCITA = path.join(RADICE, 'public', 'foto');
const MODULO = path.join(RADICE, 'src', 'foto.js');
const VECCHIO_URL = 'https://www.termeleonardo.com/img/';
const VECCHIO_DIR = path.join(RADICE, '.foto-vecchio');

const arg = (nome, ripiego) => {
  const i = process.argv.indexOf(nome);
  return i > 0 ? process.argv[i + 1] : ripiego;
};
const DIR_PROPRIETA = arg('--proprieta', 'C:/Users/admin/Desktop/foto-leonardo');

const slug = (s) => s.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

async function sorgente(da) {
  const [tipo, ...resto] = da.split('/');
  const nome = resto.join('/');
  if (tipo === 'img') return path.join(RADICE, 'public', 'img', nome);
  if (tipo === 'proprieta') return path.join(DIR_PROPRIETA, nome);
  if (tipo === 'vecchio') {
    const p = path.join(VECCHIO_DIR, nome);
    if (!fs.existsSync(p)) {
      fs.mkdirSync(VECCHIO_DIR, { recursive: true });
      const r = await fetch(VECCHIO_URL + nome);
      if (!r.ok) throw new Error(`${VECCHIO_URL + nome}: ${r.status}`);
      fs.writeFileSync(p, Buffer.from(await r.arrayBuffer()));
      console.log('scaricata', nome);
    }
    return p;
  }
  throw new Error(`sorgente sconosciuta: ${da}`);
}

function rapporto(taglio) {
  if (!taglio) return null;
  const [w, h] = taglio.split(':').map(Number);
  if (!(w > 0 && h > 0)) throw new Error(`taglio non valido: ${taglio}`);
  return w / h;
}

async function main() {
  const man = JSON.parse(fs.readFileSync(MANIFESTO, 'utf8'));
  fs.mkdirSync(USCITA, { recursive: true });
  const prodotti = new Set();
  const modulo = {};

  for (const [chiave, f] of Object.entries(man.foto)) {
    const file = await sorgente(f.da);
    const bytes = fs.readFileSync(file);
    /* la qualita' si puo' abbassare per la singola foto: una grana fitta
       (la roccia della grotta, le chiome degli alberi dall'alto) pesa il
       doppio a parita' di qualita', e a occhio non si vede la differenza */
    const opzioni = { larghezze: f.larghezze || man.larghezze, taglio: f.taglio || null, qualita: f.qualita || man.qualita };
    const impronta = crypto.createHash('sha1').update(bytes).update(JSON.stringify(opzioni)).digest('hex').slice(0, 8);
    const base = sharp(bytes).rotate();
    const meta = await base.metadata();
    const r = rapporto(opzioni.taglio);
    /* larghezza massima disponibile dopo il taglio: un originale verticale
       tagliato in 3:2 non puo' dare piu' della sua larghezza */
    const maxW = meta.width;
    const larghezze = opzioni.larghezze.filter((w) => w <= maxW);
    if (!larghezze.length) larghezze.push(maxW);
    /* se l'originale e' piu' stretto della misura piu' grande chiesta, si
       aggiunge la sua larghezza vera: e' il meglio che c'e' */
    if (Math.max(...larghezze) < Math.max(...opzioni.larghezze) && !larghezze.includes(maxW)) larghezze.push(maxW);
    larghezze.sort((a, b) => a - b);

    const voci = [];
    let dimensioni = null;
    for (const w of larghezze) {
      const nome = `${slug(chiave)}.${impronta}.${w}.webp`;
      const dest = path.join(USCITA, nome);
      prodotti.add(nome);
      let img = base.clone();
      img = r ? img.resize(w, Math.round(w / r), { fit: 'cover', position: f.posizione || 'centre' })
              : img.resize(w, null, { withoutEnlargement: true });
      if (!fs.existsSync(dest)) {
        await img.webp({ quality: opzioni.qualita }).toFile(dest);
      }
      const m = await sharp(dest).metadata();
      voci.push({ nome, w: m.width, h: m.height });
      dimensioni = { width: m.width, height: m.height };
    }
    const media = voci[Math.min(voci.length - 1, Math.floor(voci.length / 2))];
    modulo[chiave] = {
      src: `/foto/${media.nome}`,
      srcset: voci.map((v) => `/foto/${v.nome} ${v.w}w`).join(', '),
      width: dimensioni.width,
      height: dimensioni.height,
    };
    console.log(chiave.padEnd(16), voci.map((v) => `${v.w}x${v.h} ${Math.round(fs.statSync(path.join(USCITA, v.nome)).size / 1024)}KB`).join('  '));
  }

  /* via i file che nessuna chiave produce piu' */
  for (const f of fs.readdirSync(USCITA)) {
    if (!prodotti.has(f)) { fs.unlinkSync(path.join(USCITA, f)); console.log('tolto', f); }
  }

  const righe = Object.entries(modulo).map(([k, v]) =>
    `  ${k}: {\n    src: "${v.src}",\n    srcset:\n      "${v.srcset}",\n    width: ${v.width},\n    height: ${v.height},\n  },`);
  fs.writeFileSync(MODULO,
`/* GENERATO da strumenti/foto.js il ${new Date().toISOString().slice(0, 10)} — non modificare a mano.
   Le sorgenti e le note stanno in strumenti/foto.json. Ogni voce e' pronta
   per <Foto foto={FOTO.chiave} />: src per chi non capisce srcset, srcset
   con le larghezze disponibili, width e height per riservare lo spazio
   prima che la foto arrivi. */
export const FOTO = {
${righe.join('\n')}
};
`);
  console.log('scritto', path.relative(RADICE, MODULO), 'con', Object.keys(modulo).length, 'fotografie');
}

main().catch((e) => { console.error(e); process.exit(1); });
