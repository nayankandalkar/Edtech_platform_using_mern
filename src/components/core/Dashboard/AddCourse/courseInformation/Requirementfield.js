import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const Requirementfield = ({name,label,register,errors,setValue,getValue}) => {
  
  const [requirement ,setRequirement] =useState("");
  const [requiremetList,setRequirementlist]=useState([]);
 
  const { editCourse, course } = useSelector((state) => state.course)

  useEffect(()=>{


    if (editCourse) {
      setRequirementlist(course?.instructions)
    }

    
    register(
      name,{
         required :true,
         validate : (value)=>value.length >0
      }
    )
  },[])

  useEffect(()=>{
    setValue(name,requiremetList)
  },[requiremetList])
  const handleAddRequirement =()=>{
    if(requirement){
      setRequirementlist([...requiremetList,requirement]);
      setRequirement("");
    }
  }

  //console.log(requiremetList);

  const handleRemoveRequirement =(index )=>{
    const updateRequirementList= [...requiremetList]
    updateRequirementList.splice(index,1);
    setRequirementlist(updateRequirementList)
  }



  return (
    <div> 

    <div>

    
    <label  className='text-white'  htmlFor={name}>{label}<span>* </span></label>

    <input
                type='text'
                id={name}
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
                 
                className='text-white  m-10'
            />

<button
            type='button'
            onClick={handleAddRequirement}
            className='font-semibold text-yellow-50'>
                Add
            </button>
     </div>
     
     {
      requiremetList.length >0 && (
      <ul>
        {
          requiremetList.map((requirement,index)=>(
          
          <li key={index} className=' flex items-center text-richblack-5'>

         
            <span  >{requirement}</span>
            <button
            type='button'
            onClick={()=>handleRemoveRequirement(index)}
            className='  text-xs  text-pure-greys-300 '>
              clear
            </button>

            </li>
          ))
        }
      </ul>
      )
     }

     {
      errors[name] && (
       <span className=' text-white'>
        {label} is required 
       </span>
      )
     }

     

    </div>
  )
}

export default Requirementfield