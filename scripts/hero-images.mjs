// One-off: builds the self-hosted hero in public/hero/ from the Unsplash original.
// Run with `node scripts/hero-images.mjs` after changing the photo, then commit the output.
// Landscape set for desktops/tablets, portrait crop for phones (keeps them under ~150 KB).
import { mkdir, stat } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const SRC = 'https://images.unsplash.com/photo-1546268060-2592ff93ee24?fm=jpg&w=3200&q=92'
const out = fileURLToPath(new URL('../public/hero/', import.meta.url))

/* Bridge and Opera House span ~33–69% across the frame; phone crop centres between them */
const FOCUS_X = 0.49
const SETS = {
  wide: { ratio: 3 / 2, widths: [960, 1440, 1920, 2560] },
  tall: { ratio: 3 / 5, widths: [480, 720] },
}
const QUALITY = { avif: 50, webp: 72 }

const src = Buffer.from(await (await fetch(SRC)).arrayBuffer())
const { width: W, height: H } = await sharp(src).metadata()
await mkdir(out, { recursive: true })

for (const [name, { ratio, widths }] of Object.entries(SETS)) {
  /* Largest crop of the source at this ratio, centred on FOCUS_X */
  const cw = Math.min(W, Math.round(H * ratio))
  const ch = Math.round(cw / ratio)
  const left = Math.max(0, Math.min(W - cw, Math.round(W * FOCUS_X - cw / 2)))
  const top = Math.round((H - ch) / 2)
  for (const w of widths) {
    const img = sharp(src).extract({ left, top, width: cw, height: ch }).resize(w)
    for (const [fmt, quality] of Object.entries(QUALITY)) {
      const file = `${out}${name}-${w}.${fmt}`
      await img.clone()[fmt]({ quality, effort: 6 }).toFile(file)
      console.log(`${name}-${w}.${fmt}  ${Math.round((await stat(file)).size / 1024)} KB  (${w}x${Math.round(w / ratio)})`)
    }
  }
}
