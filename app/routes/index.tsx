import { useLoaderData, json, Link } from 'remix'
import { spacexGraphQl, gql, fetchGithubApi } from '~/utils/fetchers'
import { ButtonPrimary } from '~/components'
import type { MetaFunction, LoaderFunction } from 'remix'

type IndexData = {
  launches: []
  github: any
}

export let loader: LoaderFunction = async () => {
  let github = await fetchGithubApi('/users/mocon')
  let query = gql`
    {
      launches {
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
  let launches = await spacexGraphQl.request(query, {})
  let data: IndexData = {
    launches,
    github,
  }
  return json(data)
}

export let meta: MetaFunction = () => {
  return {
    title: 'Home Page',
    description: 'Welcome to remix!',
  }
}

export default function Index() {
  let data = useLoaderData<IndexData>()

  return (
    <main>
      <p>GitHub: {JSON.stringify(data.github, null, 2)}</p>
      <p>Launches: {JSON.stringify(data.launches, null, 2)}</p>

      <Link to='/dashboard'>
        <ButtonPrimary>Go to Dashboard</ButtonPrimary>
      </Link>
    </main>
  )
}
