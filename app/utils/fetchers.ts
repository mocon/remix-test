import axios from 'axios'

const auth0ClientId = process.env.AUTH0_CLIENT_ID!
const auth0ClientSecret = process.env.AUTH0_CLIENT_SECRET!
const auth0BaseUrl = process.env.AUTH0_DOMAIN!
const auth0Audience = process.env.AUTH0_AUDIENCE!
const githubBaseUrl = process.env.GITHUB_API_BASE_URL!

export const githubApi = axios.create({
  baseURL: githubBaseUrl,
  headers: {
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
  },
})

export const auth0Api = axios.create({
  baseURL: auth0BaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})
