import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
}

export const ButtonPrimary = ({ children, onClick, type = 'button' }: Props) => (
  <button
    onClick={onClick}
    className='bg-purple-700 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded'
    type={type}
  >
    {children}
  </button>
)
