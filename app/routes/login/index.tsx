import { ButtonPrimary } from '~/components'
import loginStyles from '~/styles/login/index.css'
import type { LinksFunction, MetaFunction } from 'remix'

export let links: LinksFunction = () => [{ rel: 'stylesheet', href: loginStyles }]

export let meta: MetaFunction = () => {
  return {
    title: 'Login Page',
    description: 'Welcome to remix!',
  }
}

export default function Login() {
  return (
    <form method='post' action='/login/send-code'>
      <div className='shadow-md rounded px-8 pt-6 pb-8 my-6 flex flex-col'>
        <div className='mb-4'>
          <label className='block text-sm font-bold mb-2'>Country Code</label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-black mb-2'
            name='countryCode'
            type='text'
            defaultValue='+1'
          />
          <p className='text-red text-xs italic'>Enter your country code</p>
        </div>
        <div className='mb-6'>
          <label className='block text-sm font-bold mb-2'>Phone Number</label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-black mb-2'
            name='phoneNumber'
            type='tel'
            placeholder='2135551234'
            autoFocus
          />
          <p className='text-red text-xs italic'>Enter your phone number, including area code</p>
        </div>
        <div className='flex items-center justify-between'>
          <ButtonPrimary type='submit'>Send code</ButtonPrimary>
          <a
            className='inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker'
            href='#'
          >
            Having trouble?
          </a>
        </div>
      </div>
    </form>
  )
}
