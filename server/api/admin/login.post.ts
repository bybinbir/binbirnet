import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ username: string; password: string }>(event)
  const config = useRuntimeConfig()

  if (!body.username || !body.password) {
    throw createError({ statusCode: 400, statusMessage: 'Kullanici adi ve sifre gerekli' })
  }

  const validUser = body.username === config.adminUser
  const validPass = config.adminPasswordHash
    ? await bcrypt.compare(body.password, config.adminPasswordHash as string)
    : false

  if (!validUser || !validPass) {
    throw createError({ statusCode: 401, statusMessage: 'Gecersiz kullanici adi veya sifre' })
  }

  const session = await getAdminSession(event)
  await session.update({
    user: body.username,
    loggedInAt: Date.now(),
  })

  return { ok: true, user: body.username }
})
