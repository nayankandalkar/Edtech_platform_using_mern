import React from 'react'

const IconBtn = (
    {
        text,
        onclick,
        children,
        disabled,
        outline =false,
        customClass,
        type 
    }
) => {


  return (
    <div>
        <button
        disabled={disabled}
        onClick={onclick}
        type={type}>
            {
                children ? 
                (
                <div> 
                    <span>
                    {text}
                </span>
                {children}
                
                </div>) 
                : (
                    <div>
                        {text}
                    </div>
                )
            }
        </button>
    </div>
  )
}

export default IconBtn