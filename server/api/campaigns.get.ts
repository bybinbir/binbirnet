import type { Campaign } from '~/types'

export default defineEventHandler(async () => {
  const campaigns = await readJsonFile<Campaign[]>('campaigns.json')
  return campaigns
    .filter((c) => c.active)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
})
