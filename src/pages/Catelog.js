import React, { useEffect, useState } from 'react'
import Footer from '../components/common/Footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/Apiconnector';
import { categories } from '../services/api';
import { getCatelogPageData } from '../services/operations/pageandComponentData';
import Course_Card from '../components/core/Catalog/Course_Card';
import { Any } from '../components/core/Catalog/Any';
  
 
 

const Catelog = () => {


    const {catelogName}= useParams();
    const [catelogPageData,setCatelogPagedData]=useState(null);
    const [categoryId,setCategoryId]=useState("");

    useEffect(()=>{
         const getCategories= async ()=>{
            const res =await apiConnector("GET",categories.CATEGORIES_API);
            //console.log(res.data.allCategory)
           // console.log(catelogName)
            const category_id =res?.data?.allCategory.filter((ct)=>ct.name.split(" ").join("-").toLowerCase() === catelogName)[0]
            ._id

           //// console.log(category_id);
           setCategoryId(category_id);


         }
         getCategories()
    },[catelogName]);




    useEffect(
         ()=>{
             
            const getCategoryDetails= async ()=>{
                try {
                    const  res = await getCatelogPageData(categoryId);

                    console.log("printing an res ")
                    console.log(res)
                   setCatelogPagedData(res)
                     
                }catch(e){
                 
                    console.log(e )
                }
            } 
            
            if(categoryId) {
                getCategoryDetails();
            }


            console.log(catelogPageData)

         }, [categoryId])



  return (
    <div className=' text-white '>
    
     <div>
        <p>{`Home/Catelog/`}
        <span>
          {
            catelogPageData?.data?.selectedCategory?.name
          }
        </span></p>
        <p>{catelogPageData?.data?.selectedCategory?.name }</p>
        <p>{
            catelogPageData?.data?.selectedCategory?.description}</p>
     </div>


           <div>


        <div>
        <div>Courses to get you started </div>
            <div className='flex'>
                <p>Most Popular</p>
                <p> New</p>
            </div>

            
            <div>
                
            {/* <CourseSlider courses={catelogPageData?.data?.selectedCategory?.courses}> </CourseSlider> */}

            
            {/* <CourseSlider12   courses={catelogPageData?.data?.selectedCategory?.courses} ></CourseSlider12> */}

            <Any   courses={catelogPageData?.data?.selectedCategory?.courses}  ></Any>
             
            </div>

            
        </div>



             <div>
               <p> Top Course in s {
            catelogPageData?.data?.selectedCategory?.name
          }</p>

            <div>       

                <Any   courses={catelogPageData?.data?.differentCategory?.courses}  ></Any> 

                {
                   
                  console.log(catelogPageData?.data?.differentCategory?.courses)
                }
            </div>

            </div>



            <div>
               
               <p>frequently brought together </p>

               <div className='py-8'>
                         <div className='grid grid-cols-1 lg:grid-cols-2  gap-10'>
                         {
                          catelogPageData?.data?.mostSellingCourses?.slice(0,4).map((courses,index)=>(
                            <Course_Card course={courses} key={index} height={"h-[480px]"}></Course_Card>
                          ))
                         }

                         </div>
               </div>

            </div>


        </div>

        <Footer></Footer>

        
     </div>






 
  )
}

export default Catelog