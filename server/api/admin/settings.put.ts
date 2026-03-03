import { readJsonFile, writeJsonFile } from '~/server/utils/storage'
import type { SiteSettings } from '~/types'

export default defineEventHandler(async (event) => {
  const body = await readBody<Partial<SiteSettings>>(event)
  const current = await readJsonFile<SiteSettings>('settings.json')
  const updated: SiteSettings = {
    company: { ...current.company, ...body.company },
    contact: {
      phones: body.contact?.phones ?? current.contact.phones,
      emails: body.contact?.emails ?? current.contact.emails,
      whatsapp: { ...current.contact.whatsapp, ...body.contact?.whatsapp },
    },
    address: { ...current.address, ...body.address },
    social: body.social ?? current.social,
    externalLinks: { ...current.externalLinks, ...body.externalLinks },
  }
  await writeJsonFile('settings.json', updated)
  return updated
})
