// Injects the server-rendered homepage into dist/index.html, copies it to each section path
// (/contact, /bivry...) so those URLs open directly, then removes the SSR bundle.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const ssrDir = `${root}dist-ssr`
const page = `${root}dist/index.html`

const { render, SECTIONS } = await import(pathToFileURL(`${ssrDir}/entry-server.js`).href)
const html = await readFile(page, 'utf8')
const slot = '<div id="root"></div>'
if (!html.includes(slot)) throw new Error(`${slot} not found in dist/index.html`)

const out = html.replace(slot, `<div id="root">${render()}</div>`)
await writeFile(page, out)

// Same page under each section URL; its canonical still points to the homepage
for (const path of Object.values(SECTIONS)) {
  if (path === '/') continue
  const dir = `${root}dist${path}`
  await mkdir(dir, { recursive: true })
  await writeFile(`${dir}/index.html`, out)
}
await rm(ssrDir, { recursive: true, force: true })
console.log(`Pre-rendered dist/index.html and ${Object.keys(SECTIONS).length - 1} section URLs`)
