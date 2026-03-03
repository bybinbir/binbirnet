import type { Slide } from '~/types'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const slides = await readJsonFile<Slide[]>('slides.json')

  const filtered = slides.filter((s) => s.id !== id)
  if (filtered.length === slides.length) {
    throw createError({ statusCode: 404, statusMessage: 'Slide bulunamadi' })
  }

  await writeJsonFile('slides.json', filtered)
  return { ok: true }
})
