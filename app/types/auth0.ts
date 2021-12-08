export type PasswordlessOtpStartResponse = {
  _id: string
  phone_number: string
  phone_verified: boolean
  request_language: string | null
}

export type PasswordlessOtpVerifyResponse = {
  access_token: string
  id_token: string
  scope: string
  expires_in: number
  token_type: 'Bearer'
}
