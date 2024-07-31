import React from 'react'
import toast from 'react-hot-toast';
import { apiConnector } from '../Apiconnector';
import { catalogData } from '../api';

 export const getCatelogPageData =async (categoryId) => {
 
    const toastid =toast.loading("loading ....")
let result =[];
 try{
     
    const response =await apiConnector("POST", catalogData.CATALOGPAGEDATA_API, {
        categoryId:categoryId
    })

    if(!response?.data?.success){
        throw new Error("could not fetch category page data")
    }
    result =response?.data;


 }catch(e){
 console.log("cataelog page data api error" +e);
 toast.error(e)
 }
 toast.dismiss(toastid);
 return result;
   
}

// export default getCatelogPageData