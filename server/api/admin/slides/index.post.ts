import type { Slide } from '~/types'

export default defineEventHandler(async (event) => {
  const body = await readBody<Omit<Slide, 'id'>>(event)
  const slides = await readJsonFile<Slide[]>('slides.json')

  const newSlide: Slide = {
    id: 'slide-' + Date.now(),
    image: body.image,
    imageAlt: body.imageAlt,
    badge: body.badge,
    title: body.title,
    description: body.description,
    buttonText: body.buttonText,
    buttonHref: body.buttonHref,
    buttonIcon: body.buttonIcon,
    order: body.order ?? slides.length,
  }

  slides.push(newSlide)
  await writeJsonFile('slides.json', slides)
  return newSlide
})
