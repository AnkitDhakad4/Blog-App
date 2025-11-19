import React from 'react'

export default function Button({
    children,
    textColor='',
    className='',
    bgColor='bg-blue-600',
    type='button',
    ...props
}) {
  return (
    <button
    type={type} 
    className={`px-4 py-2 rounded-lg ${bgColor}  ${textColor} ${className}`} 
    {...props}>
        {children}
    </button>
  )
}
