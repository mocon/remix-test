import type { MetaFunction, LoaderFunction } from 'remix'
import { useLoaderData, json, Link } from 'remix'

type DashboardData = {
  resources: Array<{ name: string; url: string }>
}

export let loader: LoaderFunction = () => {
  let data: DashboardData = {
    resources: [
      {
        name: 'Remix Docs',
        url: 'https://remix.run/docs',
      },
    ],
  }
  return json(data)
}

export let meta: MetaFunction = () => {
  return {
    title: 'Dashboard Page',
    description: 'Welcome to remix!',
  }
}

export default function Index() {
  let data = useLoaderData<DashboardData>()

  return (
    <>
      <table className='w-full'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Views</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Intro to CSS</td>
            <td>Adam</td>
            <td>858</td>
          </tr>
          <tr>
            <td>
              A Long and Winding Tour of the History of UI Frameworks and Tools and the Impact on
              Design
            </td>
            <td>Adam</td>
            <td>112</td>
          </tr>
          <tr>
            <td>Intro to JavaScript</td>
            <td>Chris</td>
            <td>1,280</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}