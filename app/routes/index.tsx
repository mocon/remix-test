import type { MetaFunction, LoaderFunction } from 'remix'
import { useLoaderData, json, Link } from 'remix'
import { GraphQLClient, gql } from 'graphql-request'

const headers = {
  headers: {
    'content-type': 'application/json'
  }
}

type LaunchData = {
  id: string
  full_name: string
  status: string
  location: {
    name: string
    region: string
    latitude: number
    longitude: number
  },
  landing_type: string
  attempted_landings: number
  successful_landings: number
  wikipedia: string
  details: string
}

type IndexData = {
  resources: Array<{ name: string; url: string }>
  demos: Array<{ name: string; to: string }>
  launches: LaunchData[]
}

export let loader: LoaderFunction = async () => {
  const endpoint = process.env.SPACEX_API_URL!
  const query = gql`
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
  const client = new GraphQLClient(endpoint, headers)
  let launches = await client.request(query, {})

  let data: IndexData = {
    resources: [
      {
        name: 'Remix Docs',
        url: 'https://remix.run/docs',
      },
      {
        name: 'React Router Docs',
        url: 'https://reactrouter.com/docs',
      },
      {
        name: 'Remix Discord',
        url: 'https://discord.gg/VBePs6d',
      },
    ],
    demos: [
      {
        to: 'demos/actions',
        name: 'Actions',
      },
      {
        to: 'demos/about',
        name: 'Nested Routes, CSS loading/unloading',
      },
      {
        to: 'demos/params',
        name: 'URL Params and Error Boundaries',
      },
    ],
    launches,
  }

  return json(data)
}

export let meta: MetaFunction = () => {
  return {
    title: 'Remix Starter',
    description: 'Welcome to remix!',
  }
}

export default function Index() {
  let data = useLoaderData<IndexData>()

  return (
    <>
      <main>
        <h2>Welcome to Remix!</h2>
        <p>We're stoked that you're here. 🥳</p>
        <p>
          Feel free to take a look around the code to see how Remix does things, it might be a bit
          different than what you’re used to. When you're ready to dive deeper, we've got plenty of
          resources to get you up-and-running quickly.
        </p>
        <p>
          Launches: {JSON.stringify(data.launches)}
        </p>
      </main>
      <aside>
        <h2>Demos In This App</h2>
        <ul>
          {data.demos.map((demo) => (
            <li key={demo.to} className='remix__page__resource'>
              <Link to={demo.to} prefetch='intent'>
                {demo.name}
              </Link>
            </li>
          ))}
        </ul>
        <h2>Resources</h2>
        <ul>
          {data.resources.map((resource) => (
            <li key={resource.url} className='remix__page__resource'>
              <a href={resource.url}>{resource.name}</a>
            </li>
          ))}
        </ul>
      </aside>
    </>
  )
}
