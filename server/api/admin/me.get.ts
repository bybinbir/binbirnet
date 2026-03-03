export default defineEventHandler(async (event) => {
  const session = await getAdminSession(event)
  if (!session.data?.user) {
    throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
  }
  return { user: session.data.user }
})
