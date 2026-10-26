// Injects the server-rendered homepage into dist/index.html, copies it to each section path
// (/contact, /bivry...) so those URLs open directly, then removes the SSR bundle.
// Each section copy gets its own title, description and self-referencing canonical.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const ssrDir = `${root}dist-ssr`
const page = `${root}dist/index.html`
const SITE = 'https://elomagroup.com.au'

const { render, SECTIONS, SECTION_META } = await import(pathToFileURL(`${ssrDir}/entry-server.js`).href)
const html = await readFile(page, 'utf8')
const slot = '<div id="root"></div>'
if (!html.includes(slot)) throw new Error(`${slot} not found in dist/index.html`)

const out = html.replace(slot, `<div id="root">${render()}</div>`)
await writeFile(page, out)

const esc = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

/* Swap one match of re for to; fail the build if the homepage head changed shape */
const swap = (s, re, to, what) => {
  if (!re.test(s)) throw new Error(`prerender: ${what} not found in dist/index.html`)
  return s.replace(re, to)
}

function sectionHead(s, path, { title, description }) {
  const url = SITE + path
  s = swap(s, /<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`, '<title>')
  s = swap(s, /(<meta name="description" content=")[^"]*/, `$1${esc(description)}`, 'meta description')
  s = swap(s, /(<link rel="canonical" href=")[^"]*/, `$1${url}`, 'canonical')
  s = swap(s, /(<meta property="og:url" content=")[^"]*/, `$1${url}`, 'og:url')
  s = swap(s, /(<meta property="og:title" content=")[^"]*/, `$1${esc(title)}`, 'og:title')
  s = swap(s, /(<meta property="og:description" content=")[^"]*/, `$1${esc(description)}`, 'og:description')
  /* hreflang alternates describe the homepage and country pages, not this section */
  s = s.replace(/<link rel="alternate" hreflang="[^"]*" href="[^"]*">\s*/g, '')
  /* JSON-LD WebPage node */
  s = swap(s, /("@type": "WebPage",\s*"@id": ")[^"]*(",\s*"url": ")[^"]*(",\s*"name": ")[^"]*/,
    `$1${url}#webpage$2${url}$3${title.replace(/"/g, '\\"')}`, 'JSON-LD WebPage')
  return s
}

// Same page under each section URL, with that section's head
for (const [id, path] of Object.entries(SECTIONS)) {
  if (path === '/') continue
  const meta = SECTION_META[id]
  if (!meta) throw new Error(`prerender: no SECTION_META for "${id}"`)
  const dir = `${root}dist${path}`
  await mkdir(dir, { recursive: true })
  await writeFile(`${dir}/index.html`, sectionHead(out, path, meta))
}
await rm(ssrDir, { recursive: true, force: true })
console.log(`Pre-rendered dist/index.html and ${Object.keys(SECTIONS).length - 1} section URLs`)
