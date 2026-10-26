import { useEffect, useRef, useState } from 'react'

/* Photo fallback: keep the gradient if an image can't load */
export function useImgGuard() {
  const [failed, setFailed] = useState(false)
  const ref = useRef<HTMLImageElement>(null)
  useEffect(() => {
    const i = ref.current
    if (i && i.complete && i.naturalWidth === 0) setFailed(true)
  }, [])
  return { failed, imgProps: { ref, onError: () => setFailed(true) } }
}

/* Section links use clean paths (/contact) instead of #contact: scroll in place and update the URL */
export function useSectionRouting(sections: Record<string, string>) {
  useEffect(() => {
    const byPath = new Map(Object.entries(sections).map(([id, path]) => [path, id]))
    const idFor = (pathname: string) => byPath.get(pathname.replace(/(.)\/$/, '$1'))
    const go = (id: string | undefined, smooth: boolean) =>
      id && document.getElementById(id)?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' })

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = (e.target as Element).closest('a')
      if (!a || a.target === '_blank') return
      const href = a.getAttribute('href') ?? ''
      /* In-page anchors (the skip link) move focus without adding # to the URL */
      if (href.startsWith('#')) {
        const el = document.getElementById(href.slice(1))
        if (!el) return
        e.preventDefault()
        el.scrollIntoView()
        el.focus({ preventScroll: true })
        return
      }
      const url = new URL(a.href)
      const id = url.origin === location.origin ? idFor(url.pathname) : undefined
      if (!id) return
      e.preventDefault()
      if (url.pathname !== location.pathname) history.pushState(null, '', url.pathname)
      go(id, true)
    }
    const onPop = () => go(idFor(location.pathname), true)

    /* Opening /contact directly (or refreshing it) lands on that section */
    history.scrollRestoration = 'manual'
    const start = idFor(location.pathname)
    if (start !== 'top') go(start, false)

    document.addEventListener('click', onClick)
    addEventListener('popstate', onPop)
    return () => {
      document.removeEventListener('click', onClick)
      removeEventListener('popstate', onPop)
    }
  }, [sections])
}

/* Zoom-in on panels as they arrive */
export function useInView<T extends Element>(threshold = 0.35) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) setInView(true) }), { threshold })
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return { ref, inView }
}
