/**
 * Ottimizza tutte le immagini del progetto usando sharp.
 *
 * Uso:
 *   npm install sharp --save-dev   (una tantum)
 *   node scripts/optimize-images.mjs
 *
 * Cosa fa:
 *  - Ridimensiona le immagini a max 800px di larghezza (mantenendo aspect ratio)
 *  - Comprime JPEG al 75% di qualità (ottimo rapporto qualità/peso)
 *  - Il logo viene ridimensionato a max 400px
 *  - Sovrascrive i file originali (BACKUP consigliato prima di eseguire)
 */

import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// ── Configurazione ──
const IMAGE_GROUPS = [
  {
    label: 'Riscaldamento (RecentWorks)',
    dir: path.join(ROOT, 'src/assets/images'),
    pattern: /^riscaldamento\d+\.jpg$/i,
    maxWidth: 800,
    quality: 75,
  },
  {
    label: 'About Us lavori',
    dir: path.join(ROOT, 'src/assets/images/aboutuslavori copia'),
    pattern: /^\d+\.jpeg$/i,
    maxWidth: 800,
    quality: 75,
  },
  {
    label: 'Logo',
    dir: path.join(ROOT, 'src/assets/logo'),
    pattern: /\.jpeg$/i,
    maxWidth: 400,
    quality: 80,
  },
];

async function optimizeImage(filePath, maxWidth, quality) {
  const input = await fs.readFile(filePath);
  const sizeBefore = input.length;

  const metadata = await sharp(input).metadata();
  const needsResize = metadata.width > maxWidth;

  let pipeline = sharp(input);

  if (needsResize) {
    pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
  }

  // Output as JPEG with progressive scanning (better perceived loading)
  const output = await pipeline
    .jpeg({ quality, progressive: true, mozjpeg: true })
    .toBuffer();

  const sizeAfter = output.length;
  const saved = sizeBefore - sizeAfter;
  const pct = ((saved / sizeBefore) * 100).toFixed(1);

  await fs.writeFile(filePath, output);

  const name = path.basename(filePath);
  const kb = (n) => (n / 1024).toFixed(0);
  console.log(
    `  ${needsResize ? '↓' : '○'} ${name.padEnd(30)} ${kb(sizeBefore).padStart(6)} KB → ${kb(sizeAfter).padStart(6)} KB  (${saved > 0 ? '-' : '+'}${pct}%)`
  );

  return { sizeBefore, sizeAfter };
}

async function run() {
  console.log('🖼️  Ottimizzazione immagini...\n');

  let totalBefore = 0;
  let totalAfter = 0;
  let count = 0;

  for (const group of IMAGE_GROUPS) {
    console.log(`── ${group.label} ──`);

    let files;
    try {
      files = (await fs.readdir(group.dir)).filter((f) => group.pattern.test(f));
    } catch {
      console.log('  ⚠️  Cartella non trovata, salto.\n');
      continue;
    }

    if (files.length === 0) {
      console.log('  Nessun file trovato.\n');
      continue;
    }

    for (const file of files.sort()) {
      const { sizeBefore, sizeAfter } = await optimizeImage(
        path.join(group.dir, file),
        group.maxWidth,
        group.quality
      );
      totalBefore += sizeBefore;
      totalAfter += sizeAfter;
      count++;
    }
    console.log('');
  }

  const totalSaved = totalBefore - totalAfter;
  const kb = (n) => (n / 1024).toFixed(0);
  const mb = (n) => (n / (1024 * 1024)).toFixed(2);

  console.log('════════════════════════════════════════════');
  console.log(`✅ ${count} immagini ottimizzate`);
  console.log(`   Prima:  ${kb(totalBefore)} KB (${mb(totalBefore)} MB)`);
  console.log(`   Dopo:   ${kb(totalAfter)} KB (${mb(totalAfter)} MB)`);
  console.log(`   Risparmiato: ${kb(totalSaved)} KB (${((totalSaved / totalBefore) * 100).toFixed(1)}%)`);
  console.log('════════════════════════════════════════════');
  console.log('\n👉 Ora esegui:  npm run build');
}

run().catch((err) => {
  console.error('❌ Errore:', err.message);
  process.exit(1);
});
