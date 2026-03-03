import type { Package } from '~/types'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody<Partial<Package>>(event)
  const packages = await readJsonFile<Package[]>('packages.json')

  const index = packages.findIndex((p) => p.id === id)
  if (index === -1) {
    throw createError({ statusCode: 404, statusMessage: 'Paket bulunamadi' })
  }

  packages[index] = {
    ...packages[index],
    ...body,
    id: id!,
    downMbps: body.downMbps ? Number(body.downMbps) : packages[index].downMbps,
    upMbps: body.upMbps ? Number(body.upMbps) : packages[index].upMbps,
    priceTry: body.priceTry ? Number(body.priceTry) : packages[index].priceTry,
    oldPriceTry: body.oldPriceTry !== undefined ? (body.oldPriceTry ? Number(body.oldPriceTry) : undefined) : packages[index].oldPriceTry,
  }

  await writeJsonFile('packages.json', packages)
  return packages[index]
})
