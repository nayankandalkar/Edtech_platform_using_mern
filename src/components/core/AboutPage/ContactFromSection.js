import React from 'react'
import ContactUsFrom from '../../ContactPage/ContactUsFrom'

const ContactFromSection = () => {
  return (
    <div className='text-white flex flex-col justify-center  text-center '>
        <h1>
            Get   in touch
        </h1>
        <p> we"d love to here for you , please fill out this form </p>
       <div>
        <ContactUsFrom></ContactUsFrom>
       </div>
    </div>
  )
}

export default ContactFromSection