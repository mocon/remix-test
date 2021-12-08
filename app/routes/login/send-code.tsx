import { redirect } from 'remix'
import type { ActionFunction } from 'remix'
import { auth0Api } from '~/utils/fetchers'
import { getSession, commitSession } from '~/sessions'
import type { PasswordlessOtpStartResponse } from '~/types/auth0'

const auth0ClientId = process.env.AUTH0_CLIENT_ID!
const auth0ClientSecret = process.env.AUTH0_CLIENT_SECRET!
const auth0Audience = process.env.AUTH0_AUDIENCE!

/**
 *
 * Receives the user's country code and phone number, sends
 * it to Auth0 and requests a verification code.
 *
 */
export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()
  const countryCode = form.get('countryCode')
  const phoneNumber = form.get('phoneNumber')

  if (typeof countryCode !== 'string' || typeof phoneNumber !== 'string') {
    throw new Error(`Form not submitted correctly.`)
  }

  try {
    // Send phone number to Auth0 API
    const { data }: { data: PasswordlessOtpStartResponse } = await auth0Api.post(
      `/passwordless/start`,
      {
        client_id: auth0ClientId,
        client_secret: auth0ClientSecret,
        connection: 'sms',
        phone_number: `${countryCode}${phoneNumber}`,
        send: 'code',
        authParams: {
          scope: 'openid profile email',
          audience: auth0Audience,
        },
      },
    )

    const session = await getSession(request.headers.get('Cookie'))
    session.set('user_id', data._id)
    session.set('phone_number', data.phone_number)

    return redirect(`/login/verify`, {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    })
  } catch (error) {
    // Something went wrong
    console.error(error)
    return redirect(`/login`)
  }
}

export default function SendCode() {
  return null
}
