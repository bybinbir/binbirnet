import type { Slide } from '~/types'

export function useSlides() {
  return useAsyncData('slides', () => $fetch<Slide[]>('/api/slides'))
}
