import {React, useId,useRef } from "react"


function Select({
    label='',
    options='',
    className='',
    ref,
    ...props
}) {
    const id=useId();
  return (
    <div className="w-full flex flex-col gap-1.5">
        {label && <label htmlFor={id} className="text-white" 
        >{label}</label>}
        <select
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            htmlFor={id}
            ref={ref}
            {...props}
        >
            {options?.map((option)=>(
                // {console.log(option)}
                <option key={option} value={option} >{/*key kyuki key diff hogi toh rendering me deffrentiate karne me aasani hogi react ko */}
                {/* ye value dena jaruri nahi hai kaam same hoga kyuki If you don’t provide it, the browser automatically uses the text inside <option>. */}
                    {option}
                </option>
            ))}

        </select>
    </div>
  )
}

export default Select