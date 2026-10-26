// One-off: builds the self-hosted photos in public/ from the Unsplash originals.
// Run with `node scripts/images.mjs` after adding or changing a photo, then commit the output.
// Existing files are skipped; pass --force to re-encode everything.
import { access, mkdir, stat } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const pub = fileURLToPath(new URL('../public/', import.meta.url))
const force = process.argv.includes('--force')
const QUALITY = { avif: 50, webp: 72 }

/* Unsplash photo ids, by the name used in src/data.ts */
const PHOTOS = {
  harbour: '1546268060-2592ff93ee24',
  truck: '1766785368863-f2188a8c8b32',
  port: '1578575437130-527eed3abbec',
  'it-team': '1791317771424-82cf79f51fb3',
  'plane-window': '1543797414-a0c3ad076f7c',
  'care-desk': '1758876018582-e7573baf5306',
  warehouse: '1553413077-190dd305871c',
  sourcing: '1605732562742-3023a888e56e',
  melbourne: '1545044846-351ba102b6d5',
}

/* Crops and widths per use. focusX centres the crop horizontally (0.5 = middle, as Unsplash did) */
const JOBS = [
  /* Hero: landscape for desktops/tablets; phone crop sits between the Opera House and the bridge (~33–69% across) */
  { photo: 'harbour', file: 'hero/wide', ratio: 3 / 2, widths: [960, 1440, 1920, 2560] },
  { photo: 'harbour', file: 'hero/tall', ratio: 3 / 5, widths: [480, 720], focusX: 0.49 },
  /* Full-screen company panels (CompanyPanel.tsx) */
  ...['truck', 'port', 'it-team', 'plane-window', 'care-desk'].map(p =>
    ({ photo: p, file: `img/${p}`, ratio: 3 / 2, widths: [640, 1080, 1600, 2400] })),
  /* Service cards (Services.tsx) */
  ...['truck', 'warehouse', 'sourcing', 'it-team', 'plane-window', 'care-desk'].map(p =>
    ({ photo: p, file: `img/${p}-card`, ratio: 4 / 3, widths: [480, 900] })),
  /* Office photo (Presence.tsx) */
  { photo: 'melbourne', file: 'img/melbourne', ratio: 5 / 4, widths: [640, 1000, 1400] },
]

const exists = f => access(f).then(() => true, () => false)
const sources = new Map()
const source = async photo => {
  if (!sources.has(photo)) {
    const res = await fetch(`https://images.unsplash.com/photo-${PHOTOS[photo]}?fm=jpg&w=3200&q=92`)
    if (!res.ok) throw new Error(`${photo}: HTTP ${res.status}`)
    sources.set(photo, Buffer.from(await res.arrayBuffer()))
  }
  return sources.get(photo)
}

/* Largest crop of the source at this ratio, centred on focusX */
async function crop(src, ratio, focusX = 0.5) {
  const { width: W, height: H } = await sharp(src).metadata()
  const width = Math.min(W, Math.round(H * ratio))
  const height = Math.round(width / ratio)
  const left = Math.max(0, Math.min(W - width, Math.round(W * focusX - width / 2)))
  return { left, top: Math.round((H - height) / 2), width, height }
}

for (const { photo, file, ratio, widths, focusX } of JOBS) {
  await mkdir(`${pub}${file.split('/')[0]}`, { recursive: true })
  for (const w of widths) {
    for (const [fmt, quality] of Object.entries(QUALITY)) {
      const name = `${file}-${w}.${fmt}`
      if (!force && await exists(pub + name)) continue
      const src = await source(photo)
      await sharp(src).extract(await crop(src, ratio, focusX)).resize(w)[fmt]({ quality, effort: 6 }).toFile(pub + name)
      console.log(`${name}  ${Math.round((await stat(pub + name)).size / 1024)} KB  (${w}x${Math.round(w / ratio)})`)
    }
  }
}

/* Header logos: shown 34px tall (~134px wide), so 1x/2x/3x WebP instead of the 474px PNGs.
   The PNGs stay for structured data (logo in JSON-LD) */
for (const logo of ['logo-full', 'logo-full-white']) {
  for (const w of [134, 268, 402]) {
    const name = `${logo}-${w}.webp`
    if (!force && await exists(pub + name)) continue
    await sharp(`${pub}${logo}.png`).resize(w).webp({ nearLossless: true, quality: 60, effort: 6 }).toFile(pub + name)
    console.log(`${name}  ${Math.round((await stat(pub + name)).size / 1024)} KB`)
  }
}

/* Social share image (og:image): crawlers want a plain JPEG at 1200x630 */
if (force || !await exists(`${pub}og-image.jpg`)) {
  const src = await source('harbour')
  await sharp(src).extract(await crop(src, 1200 / 630)).resize(1200, 630).jpeg({ quality: 80, mozjpeg: true }).toFile(`${pub}og-image.jpg`)
  console.log(`og-image.jpg  ${Math.round((await stat(`${pub}og-image.jpg`)).size / 1024)} KB  (1200x630)`)
}
