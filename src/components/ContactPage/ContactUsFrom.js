import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Button from '../core/Homepage/Button';
import { apiConnector } from '../../services/Apiconnector';
import { contactusEndpoint } from '../../services/api';
import countryCode from '../../data/countrycode.json'

const ContactUsFrom = () => {

    const [loading ,setLoading]=useState(false);

    const{
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSucessful}
    } = useForm();

    const submitContactForm =async (data)=>{


        console.log("ok ok ")

        console.log(data);
        try{

            setLoading(true)
            const response= await apiConnector("POST",contactusEndpoint.CONTACT_US_API, data )
               
        }catch(e){
           
            console.log(e.message)
        }
        setLoading(false)
    }
    useEffect( ()=>{
        if(isSubmitSucessful){
            reset({
                 email : "",
                 firstname : "",
                 lastname : "",
                 message : "",
                 phoneNo : ""
            })
        }
    },[reset,isSubmitSucessful])



  return (
    <div> 
    
    <form onSubmit={handleSubmit(submitContactForm)}  className=''>

       <div className=' flex gap-5 flex-col w-[800px] mx-auto  '>

         
           <div     className='  flex    w-[100%] gap-5  items-center   justify-center   mx-auto'>


            <div  className=' flex  flex-col w-[50%]'>
                <label  htmlFor='firstname'> first name</label>
                <input type='text' name='firstname' id='firstname' 
                placeholder='Enter first name '
                 className='h-[50px] bg-richblack-300 rounded-md text-richblack-900'
                {...register("firstname",{required: true})} ></input>

                {
                    errors.firstname && (
                        <span>
                            please enter your name 
                        </span>
                    )
                }
            </div>

            <div  className=' flex  flex-col w-[50%]'>
                <label  htmlFor='lastname'> last name</label>
                <input type='text' name='lastname' id='lastname' 
                placeholder='Enter last name '
                 className=' bg-richblack-300 h-[50px] rounded-md  font-semibold text-richblack-900'
                 
                {...register("lastname" )} ></input>

            </div>


           </div>

           <div className='flex  flex-col'>

            <label htmlFor='email'>Enmail Address</label>
            <input type='email' 
            name='email'
            id='email'
            className=' bg-richblack-300 h-[50px] rounded-lg  font-semibold text-richblack-900'
            placeholder='enter email address'
            {...register("email",{required:true})}></input>

            {
                errors.email && (
                    <span>
                        please enter your email
                    </span>
                )
            }


           </div>


         <div className='flex flex-col '>

         <label htmlFor='phoneNo'>Phone Number</label>
            
            <div className=' flex  gap-20 justify-center  '>
      
              <div className=' w-[80px] 0'>
                <select   
                name='dropdown'
                id='dropdown'
                
                className=' bg-richblack-400 w-[100px] text-richblack-900 h-[50px] rounded-md'
                {...register("countrycode" ,{ required: true})}>
                    {
                        countryCode.map((data,index)=>(
                            <option key={index}  >{data.code } -{data.country}</option>
                        ))
                    }
                </select>
              </div>



              <div className='  '>
                <input 
                   type='text'
                id='phoneNo'
                className=' text-richblack-900 h-[50px] w-[630px] bg-richblack-400 rounded-lg'
                name='phoneNo'
                placeholder='12345 45640'
                {...register("phoneNo",{required:true, maxLength: {value:10,message: "invalid phone number"}
                ,minLength:{value:0 , message : "invalid  phone number "}})}
                

                ></input>
            </div>


            </div>
 

         </div>




            <div className='flex flex-col'>
             
             <label  htmlFor='message'
             >
                Message
             </label>

             <textarea
             className=' bg-richblack-300  rounded-lg font-semibold text-richblack-900'
              name="message"
             id='message'
             cols="30"
             rows="7"

             placeholder='enter your message'
             {...register("message",{required:true})}></textarea>

             {
                errors.message && (
                    <span>
                        please enter your message
                    </span>
                )
             }
            </div>





           </div>


           <button type='submit' className=' bg-yellow-100  bg-y px-8 py-3  rounded-lg m-[10px]  text-richblack-900 font-bold'>


            send message 
           </button>
    </form>

    </div>
  )
}

export default ContactUsFrom