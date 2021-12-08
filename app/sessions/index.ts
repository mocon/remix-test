import { createCookieSessionStorage } from 'remix'

const { getSession, commitSession, destroySession } = createCookieSessionStorage({
  cookie: {
    name: 'auth0_session',
    secure: true,
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  },
})

export { getSession, commitSession, destroySession }
