import { useLoaderData, json, Link } from 'remix'
import { useQuery } from '@apollo/client'
import { githubApi } from '~/utils/fetchers'
import { ButtonPrimary } from '~/components'
import { LAUNCHES } from '~/graphql/queries/launches'
import type { MetaFunction, LoaderFunction } from 'remix'

type IndexData = {
  github: any
}

export let loader: LoaderFunction = async () => {
  let { data } = await githubApi.get('/users/mocon')
  let loaderData: IndexData = { github: data }
  return json(loaderData)
}

export let meta: MetaFunction = () => {
  return {
    title: 'Home Page',
    description: 'Welcome to remix!',
  }
}

export default function Index() {
  let loaderData = useLoaderData<IndexData>()
  let { data } = useQuery(LAUNCHES, { variables: {} })

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
