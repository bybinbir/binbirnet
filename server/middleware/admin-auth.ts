export default defineEventHandler(async (event) => {
  const url = getRequestURL(event)

  // Sadece /api/admin/* route'larini koru (login haric)
  if (!url.pathname.startsWith('/api/admin')) return
  if (url.pathname === '/api/admin/login') return

  await requireAdminSession(event)
})
