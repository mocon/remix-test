import { GraphQLClient, gql } from 'graphql-request'

// SpaceX GraphQL API
const spacexEndpoint = process.env.SPACEX_API_URL!
const spacexHeaders = {
  headers: {
    'content-type': 'application/json',
  },
}
const spacexGraphQl = new GraphQLClient(spacexEndpoint, spacexHeaders)

// GitHub REST API
const githubBaseUrl = process.env.GITHUB_API_BASE_URL!
const githubHeaders = {
  headers: {
    Accept: 'application/vnd.github.v3+json',
  },
}
const fetchGithubApi = async (path: string) => {
  const data = await fetch(`${githubBaseUrl}${path}`, githubHeaders)
  return data.json()
}

export { spacexGraphQl, gql, fetchGithubApi }
