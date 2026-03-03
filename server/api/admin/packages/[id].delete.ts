import type { Package } from '~/types'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const packages = await readJsonFile<Package[]>('packages.json')

  const filtered = packages.filter((p) => p.id !== id)
  if (filtered.length === packages.length) {
    throw createError({ statusCode: 404, statusMessage: 'Paket bulunamadi' })
  }

  await writeJsonFile('packages.json', filtered)
  return { ok: true }
})
