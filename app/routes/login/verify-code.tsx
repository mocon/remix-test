import { redirect } from 'remix'
import type { ActionFunction } from 'remix'

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

  // TODO: Send verification code to API
  console.log('🏀 verificationCode =>', verificationCode)
  return redirect(`/dashboard`)
}

export default function VerifyCode() {
  return null
}
