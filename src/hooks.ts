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
