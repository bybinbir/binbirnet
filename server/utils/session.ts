import type { H3Event } from 'h3'

export interface AdminSession {
  user?: string
  loggedInAt?: number
}

export async function getAdminSession(event: H3Event) {
  const config = useRuntimeConfig()
  return await useSession<AdminSession>(event, {
    password: config.sessionSecret as string,
    name: 'bn-admin-session',
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 8, // 8 saat
    },
  })
}

export async function requireAdminSession(event: H3Event): Promise<AdminSession> {
  const session = await getAdminSession(event)
  if (!session.data?.user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
  return session.data
}
