import type { Slide } from '~/types'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody<Partial<Slide>>(event)
  const slides = await readJsonFile<Slide[]>('slides.json')

  const index = slides.findIndex((s) => s.id === id)
  if (index === -1) {
    throw createError({ statusCode: 404, statusMessage: 'Slide bulunamadi' })
  }

  slides[index] = {
    ...slides[index],
    ...body,
    id: id!,
    order: body.order !== undefined ? Number(body.order) : slides[index].order,
  }

  await writeJsonFile('slides.json', slides)
  return slides[index]
})
