import axios from 'axios'

const githubBaseUrl = process.env.GITHUB_API_BASE_URL!

export const githubApi = axios.create({
  baseURL: githubBaseUrl,
  headers: {
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
  },
})
