import React from 'react'
import { useId } from 'react'

function Input({
    label,
    type='text',
    className='',
    palceholder='',
    ref,
    ...props
}) {
    const id = useId();

    return (
        <div className="w-full flex items-center gap-4 py-2">
            
            {label && (
                <label
                    className="max-w-1/3 text-left font-medium text-black"
                    htmlFor={id}
                >
                    {label}
                </label>
            )}

            <input
                type={type}
                placeholder={palceholder}
                id={id}
                ref={ref}
                {...props}
                className={`flex-1 px-3 py-2 rounded-lg bg-white text-black 
                border border-gray-300 shadow-sm
                outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400
                transition-all duration-200 ${className}`}
            />
        </div>
    );
}

export default Input
