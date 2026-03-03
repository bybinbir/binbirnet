import type { SiteSettings } from '~/types'

export function useSettings() {
  return useAsyncData('settings', () => $fetch<SiteSettings>('/api/settings'))
}
