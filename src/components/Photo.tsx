import type { ComponentProps } from 'react'
import { IMG } from '../data'

type Props = Omit<ComponentProps<'img'>, 'src' | 'srcSet'> & { name: string; widths: number[] }

/* Self-hosted photo: AVIF where supported, WebP otherwise */
export default function Photo({ name, widths, sizes, ...img }: Props) {
  return (
    <picture>
      <source type="image/avif" srcSet={IMG(name, 'avif', widths)} sizes={sizes} />
      <img {...img} src={`/img/${name}-${widths[Math.floor(widths.length / 2)]}.webp`} srcSet={IMG(name, 'webp', widths)} sizes={sizes} />
    </picture>
  )
}
