import type { Campaign } from '~/types'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody<Partial<Campaign>>(event)
  const campaigns = await readJsonFile<Campaign[]>('campaigns.json')

  const index = campaigns.findIndex((c) => c.id === id)
  if (index === -1) {
    throw createError({ statusCode: 404, statusMessage: 'Kampanya bulunamadi' })
  }

  campaigns[index] = {
    ...campaigns[index],
    ...body,
    id: id!,
    order: body.order !== undefined ? Number(body.order) : campaigns[index].order,
  }

  await writeJsonFile('campaigns.json', campaigns)
  return campaigns[index]
})
