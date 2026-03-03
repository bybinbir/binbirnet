import type { Campaign } from '~/types'

export default defineEventHandler(async (event) => {
  const body = await readBody<Omit<Campaign, 'id'>>(event)
  const campaigns = await readJsonFile<Campaign[]>('campaigns.json')

  const newCampaign: Campaign = {
    id: body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40) + '-' + Date.now(),
    title: body.title,
    description: body.description,
    active: body.active ?? true,
    order: body.order ?? campaigns.length,
  }

  campaigns.push(newCampaign)
  await writeJsonFile('campaigns.json', campaigns)
  return newCampaign
})
