import type { Slide } from '~/types'

export default defineEventHandler(async () => {
  const slides = await readJsonFile<Slide[]>('slides.json')
  return slides.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
})
