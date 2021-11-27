import { useLoaderData, json, Link } from 'remix'
import { ButtonPrimary } from '~/components'
import type { MetaFunction, LoaderFunction } from 'remix'

type LoginData = {
  resources: Array<{ name: string; url: string }>
}

export let loader: LoaderFunction = () => {
  let data: LoginData = {
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
  }
  return json(data)
}

export let meta: MetaFunction = () => {
  return {
    title: 'Login Page',
    description: 'Welcome to remix!',
  }
}

export default function Index() {
  let data = useLoaderData<LoginData>()

  return (
    <>
      <div className='bg-white text-black shadow-md rounded px-8 pt-6 pb-8 my-6 flex flex-col'>
        <div className='mb-4'>
          <label className='block text-sm font-bold mb-2'>Username</label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker'
            id='username'
            type='text'
            placeholder='Username'
          />
        </div>
        <div className='mb-6'>
          <label className='block text-sm font-bold mb-2'>Password</label>
          <input
            className='shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3'
            id='password'
            type='password'
            placeholder='******************'
          />
          <p className='text-red text-xs italic'>Please choose a password.</p>
        </div>
        <div className='flex items-center justify-between'>
          <ButtonPrimary>Sign In</ButtonPrimary>
          <a
            className='inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker'
            href='#'
          >
            Forgot Password?
          </a>
        </div>
      </div>
    </>
  )
}
