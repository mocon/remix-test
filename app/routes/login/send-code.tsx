import { redirect } from 'remix'
import type { ActionFunction } from 'remix'

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

  // TODO: Send phone number to API
  console.log('🏀 countryCode =>', countryCode)
  console.log('🏀 phoneNumber =>', phoneNumber)
  return redirect(`/login/verify`)
}

export default function SendCode() {
  return null
}
