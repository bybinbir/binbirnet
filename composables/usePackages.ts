import type { Package } from '~/types'

export function usePackages() {
  return useAsyncData('packages', () => $fetch<Package[]>('/api/packages'))
}
