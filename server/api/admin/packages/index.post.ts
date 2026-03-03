import type { Package } from '~/types'

export default defineEventHandler(async (event) => {
  const body = await readBody<Omit<Package, 'id'>>(event)
  const packages = await readJsonFile<Package[]>('packages.json')

  const newPkg: Package = {
    id: body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now(),
    name: body.name,
    type: body.type,
    downMbps: Number(body.downMbps),
    upMbps: Number(body.upMbps),
    priceTry: Number(body.priceTry),
    oldPriceTry: body.oldPriceTry ? Number(body.oldPriceTry) : undefined,
    badge: body.badge || null,
  }

  packages.push(newPkg)
  await writeJsonFile('packages.json', packages)
  return newPkg
})
