import { useLoaderData, json, Link } from 'remix'
import { useQuery, gql } from '@apollo/client'
import { fetchGithubApi } from '~/utils/fetchers'
import { ButtonPrimary } from '~/components'
import type { MetaFunction, LoaderFunction } from 'remix'

const LAUNCHES_QUERY = gql`
  {
    launches(limit: 5) {
      id
      launch_date_utc
      launch_site {
        site_name
      }
      launch_success
      mission_name
      rocket {
        rocket_name
      }
      ships {
        name
      }
    }
  }
`

type IndexData = {
  github: any
}

export let loader: LoaderFunction = async () => {
  let github = await fetchGithubApi('/users/mocon')
  let data: IndexData = { github }
  return json(data)
}

export let meta: MetaFunction = () => {
  return {
    title: 'Home Page',
    description: 'Welcome to remix!',
  }
}

export default function Index() {
  let loaderData = useLoaderData<IndexData>()
  const { data } = useQuery(LAUNCHES_QUERY, { variables: {} })

  return (
    <main>
      <p>GitHub: {JSON.stringify(loaderData.github, null, 2)}</p>

      <p>Launches: {JSON.stringify(data?.launches, null, 2)}</p>

      <Link to='/dashboard'>
        <ButtonPrimary>Go to Dashboard</ButtonPrimary>
      </Link>
    </main>
  )
}
