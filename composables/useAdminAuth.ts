export function useAdminAuth() {
  const user = useState<string | null>('admin-user', () => null)
  const isLoggedIn = computed(() => !!user.value)

  async function checkAuth() {
    try {
      const data = await $fetch<{ user: string }>('/api/admin/me')
      user.value = data.user
      return true
    } catch {
      user.value = null
      return false
    }
  }

  async function login(username: string, password: string) {
    const data = await $fetch<{ ok: boolean; user: string }>('/api/admin/login', {
      method: 'POST',
      body: { username, password },
    })
    user.value = data.user
    return data
  }

  async function logout() {
    await $fetch('/api/admin/logout', { method: 'POST' })
    user.value = null
    navigateTo('/admin/login')
  }

  return { user, isLoggedIn, checkAuth, login, logout }
}
