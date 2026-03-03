import type { NavigationConfig } from '~/types'

export function useNavigation() {
  return useAsyncData('navigation', () => $fetch<NavigationConfig>('/api/navigation'))
}
