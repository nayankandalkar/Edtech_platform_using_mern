import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx";

import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { BiDownArrow } from "react-icons/bi";
import { CiCirclePlus } from "react-icons/ci";
import SubSectionModal from './SubSectionModal';
import ConfirmationModal from '../../../../common/ConfirmationModal';
import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../Slices/courseSlice';
import { MdDelete } from "react-icons/md";

const NestedView = ({handleChangeEditSectionName}) => {
 
    const {course} =useSelector((state)=>state.course);
    const {token} =useSelector((state)=>state.auth);
   
    const dispatch =useDispatch();

    const [addSubsection ,setAddSubSection]= useState(null);
    const [viewSubsection ,setViewSubSection]= useState(null);
    const [editSubsection ,setEditSubSection]= useState(null);
    const [confirmationModal , setConfirmationModal] =useState(null);


     const handeleDeleteSection=async( sectionId)=>{

      const result =await deleteSection({
        sectionId,
        courseId :course._id,
        token
      })

      console.log("i am main delete ")
      console.log(result);
      if(result){
        dispatch(setCourse(result));
      }

      setConfirmationModal(null)
     }

     const handeleDeleteSubSection = async(subSectionId , sectionId)=>{
      
      

      const result =await deleteSubSection({subSectionId,sectionId}, token);
      if(result){
        const updatedCourseContent = course.courseContent.map((section) =>
        section._id === sectionId ? result : section
      )
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      dispatch(setCourse(updatedCourse))
      }
      setConfirmationModal(null)
     }

     console.log(" i am course");
     console.log(course);
  
    return (
    <div> 
        
        <div className='rounded-lg bg-richblack-700 p-6 px-8 flex  flex-col gap-10'>

            {
              course?.courseContent?.map((section)=>(
             
             <div>

         
                
                <div>
                  {
                    console.log(section)
                  }
                </div>
              

                  
                    <details key={section._id} open>

                    <summary className='flex  items-center justify-between gap-x-10   border-b-2'>

                      <div className=' flex   items-center  justify-center gap-x-3 border-b-2 '>
                      <RxDropdownMenu />
                      <p className='text-white'>{section.sectionName}</p>
                      </div>
       
                       <div  className='flex items-center gap-x-3'>




 
                      <button
                       onClick={()=>handleChangeEditSectionName(section._id, section.sectionName)}>
                        <MdOutlineEdit />
                      </button> 
                      
                      
                      <button onClick={()=>{
                        setConfirmationModal({
                            text1: "Delete Thisv Section",
                            text2 :"All the lecture  in this section will be deleted ",
                            btn1Text: "Delete",
                            btn2Text : "Cancel",
                            btn1Handler: ()=> handeleDeleteSection(section._id),
                            btn2Handler : ()=>setConfirmationModal(null)
                        })
                      }}>
                        <RiDeleteBin7Fill></RiDeleteBin7Fill>
                      </button> 
                      




                      <span>|</span>
                      <BiDownArrow  className='text-xl text-white'/>


                      </div> 
                    </summary>
                      






                       <div>
                        {
                          section.subSection.map((data)=>(
                            <div key={data?._id}
                            onClick={()=>setViewSubSection(data)}
                            className='flex items-center justify-between gap-x-3 border-2  '>
                              
                             
                              <div className=' flex   items-center  justify-center gap-x-3 border-b-2 '>
                                        <RxDropdownMenu />
                                       <p className='text-white'>{data.title}</p>
                              </div>
                                
                               

                               <div
                                onClick={ (e)=>e.stopPropagation()}
                               className=' flex items-center gap-x-3 ' 
                               >

                               
                               <button
                               onClick={()=>setEditSubSection({...data, sectionId:section._id})}
                      >
                        <MdOutlineEdit />
                      </button> 

                      <button
                      onClick={()=>{
                                      
                          
                        setConfirmationModal({
                           
                          text1: "Delete This SubSection",
                            text2 :" section lecture will be deleted  ",
                            btn1Text: "Delete",
                            btn2Text : "Cancel",
                            btn1Handler: ()=> handeleDeleteSubSection(data._id,section._id),
                            btn2Handler : ()=>setConfirmationModal(null)

                        })

                      }}>
                           <MdDelete />
                      </button>

                      </div>

                            </div>
                          ))
                        }

                     
                        <button onClick={()=>setAddSubSection(section._id)}
                        className='mt-4 flex items-center gap-x-2 text-yellow-50'>
                         
                        <CiCirclePlus />
                        <p> Add lecture </p>
                        </button>


                      </div> 



                        
                    </details>


                    </div>
                   
              ))
            }
        </div>


        { addSubsection ?(<SubSectionModal
        
        modalData ={addSubsection}
        setModalData={setAddSubSection}
        add= {true}
        ></SubSectionModal>):
         viewSubsection ? (<SubSectionModal
         modalData ={viewSubsection}
        setModalData={setViewSubSection}
        view= {true}></SubSectionModal>): 
         editSubsection ? (<SubSectionModal
         modalData ={editSubsection}
        setModalData={setEditSubSection}
        edit= {true}></SubSectionModal>):<div></div> }


          
          {
            confirmationModal ?(<ConfirmationModal modalData={confirmationModal}></ConfirmationModal>):
            (<div></div>)
          }
    </div>
  )
}

export default NestedView