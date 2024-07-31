
const category =require("../models/category");
const Course= require("../models/course");

const User =require ("../models/User");





const cloudinary123 =require("cloudinary").v2;



cloudinary123.config({
    timeout : 6000,
})

async function uploadFileToCloud(file,folder,quality){
    const options= {folder}
    options.resource_type ="auto"
    options.quality=quality
 return await cloudinary123.uploader.upload(file.tempFilePath  , options);
}




 
 exports.any =async (req,res)=>{

    try{



       const {courseName, courseDescription ,whatYouWillLearn,price ,tag,Category} =req.body;
        
       const file12 =await req.files.image;
       const response= await uploadFileToCloud(file12 ,"IMAGES")
       

       const thumbNail =    req.files.thumbnailImage;

 if(!courseName || ! courseDescription || !whatYouWillLearn || !price || !tag   ){
 return res.status(400).json({
    sucess : false,
    message : "all field are mandatiory",
    courseName, courseDescription,whatYouWillLearn,price,tag,thumbNail, category

 })
 }

  const userId =   req.user.id;
  
//  //const userId= req.id;
 
 console.log("\n\n\n my use id is "+userId);
 const instructorDetail =await  User.findById({_id:userId});





 if(!instructorDetail )
 {
     res.status(400).json({
         sucess : false,
         message : "instructor details not found"
     })
 }
 
  const categoryDetail= await category.findById(Category);
 
 if(!categoryDetail){
   return  res.status(400).json({
         sucess : false ,
         message : "tag details not found "
     })
 
 }
 

 const newCourse =await Course.create({
    courseName,
    courseDescription,
    instructor :instructorDetail._id,
    whatYouWillLearn,
    price,
    tag : tag,
     thumbNail:response.url,
    category :categoryDetail._id,
    
})



await User.findByIdAndUpdate({_id:instructorDetail._id},{
    
        $push :{
            courses: newCourse._id,
        }
},{new :true})

 await category.findByIdAndUpdate({_id :Category},
    {
        $push : {
            courses :newCourse._id,
        }
    },{new :true})




        res.status(200).json({
            sucess :true,
            message : " ok done image uploaded ",
           
        })

    }catch(e){
        console.log(e);
        res.status(500).json({
            sucess :false,
            message : "something went wrong "+e
        })
    }
 }