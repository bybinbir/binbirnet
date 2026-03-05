import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ username: string; password: string }>(event)

  if (!body.username || !body.password) {
    throw createError({ statusCode: 400, statusMessage: 'Kullanıcı adı ve şifre gerekli' })
  }

  const auth = await readJsonFile<{ user: string; passwordHash: string }>('auth.json')

  const validUser = body.username === auth.user
  const validPass = auth.passwordHash
    ? await bcrypt.compare(body.password, auth.passwordHash)
    : false

  if (!validUser || !validPass) {
    throw createError({ statusCode: 401, statusMessage: 'Geçersiz kullanıcı adı veya şifre' })
  }

  const session = await getAdminSession(event)
  await session.update({
    user: body.username,
    loggedInAt: Date.now(),
  })

  return { ok: true, user: body.username }
})
