import { redirect } from 'remix'
import type { ActionFunction } from 'remix'
import { auth0Api } from '~/utils/fetchers'
import { getSession, commitSession } from '~/sessions'
import type { PasswordlessOtpVerifyResponse } from '~/types/auth0'

const auth0ClientId = process.env.AUTH0_CLIENT_ID!
const auth0ClientSecret = process.env.AUTH0_CLIENT_SECRET!
const auth0Audience = process.env.AUTH0_AUDIENCE!

/**
 *
 * Receives the verification code and sends it to Auth0. If
 * login is successful, redirects to the dashboard page.
 *
 */
export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()
  const verificationCode = form.get('verificationCode')

  if (typeof verificationCode !== 'string') {
    throw new Error(`Form not submitted correctly.`)
  }

  const session = await getSession(request.headers.get('Cookie'))

  // Send verification code to Auth0 API
  try {
    const { data }: { data: PasswordlessOtpVerifyResponse } = await auth0Api.post(`/oauth/token`, {
      grant_type: 'http://auth0.com/oauth/grant-type/passwordless/otp',
      client_id: auth0ClientId,
      client_secret: auth0ClientSecret,
      otp: verificationCode,
      realm: 'sms',
      username: session.get('phone_number'),
      audience: auth0Audience,
      scope: 'openid profile email',
    })

    session.set('id_token', data.id_token)
    session.set('access_token', data.access_token)

    return redirect(`/dashboard`, {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    })
  } catch (error) {
    // Something went wrong
    console.error(error)
    return redirect(`/login/verify`)
  }
}

export default function VerifyCode() {
  return null
}
