import type { Campaign } from '~/types'

export function useCampaigns() {
  return useAsyncData('campaigns', () => $fetch<Campaign[]>('/api/campaigns'))
}
