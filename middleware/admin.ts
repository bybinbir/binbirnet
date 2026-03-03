export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.startsWith('/admin') || to.path === '/admin/login') return

  const { checkAuth } = useAdminAuth()
  const isAuthenticated = await checkAuth()

  if (!isAuthenticated) {
    return navigateTo('/admin/login')
  }
})
