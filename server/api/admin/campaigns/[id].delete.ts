import type { Campaign } from '~/types'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const campaigns = await readJsonFile<Campaign[]>('campaigns.json')

  const filtered = campaigns.filter((c) => c.id !== id)
  if (filtered.length === campaigns.length) {
    throw createError({ statusCode: 404, statusMessage: 'Kampanya bulunamadi' })
  }

  await writeJsonFile('campaigns.json', filtered)
  return { ok: true }
})
