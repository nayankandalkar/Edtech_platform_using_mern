const cloudinary123 =require("cloudinary").v2; 

const section =require("../models/section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const subSection = require("../models/subSection");
 
 


cloudinary123.config({
    timeout : 8000,
})



async function uploadFileToCloud(file,folder,quality){
    const options= {folder}
    options.resource_type ="auto"
    options.quality=quality
 return await cloudinary123.uploader.upload(file.tempFilePath  , options);
}

function isFileTypeSupported(type ,supportedTypes){
    return supportedTypes.includes(type);
}

exports.createsubsection =async (req,res)=>{
    try{

        const {sectionId,title,timeDuration,description} =req.body;

        const file=req.files.videoFile;


       const supportedfile= ["mp4","mov" ];
        const filetype= file.name.split(".")[1].toLowerCase();

        
        if( ! isFileTypeSupported(filetype, supportedfile)){

            return res.status(400).json({
                sucess :false,
                filetype :filetype,
                message : "file format not supported"
            })
        }

          
         const response= await uploadFileToCloud(file ,"IMAGES")

        if( !sectionId || !title   || !description  ){
           
           
            console.log(sectionId, title, timeDuration , description); 

            return res.status(400).json({
                sucess : false,
                message : "please enter the whole data",
                sectionId ,
                title,
                timeDuration,
                description

            })
            

        }

    //  //  const uploadDetails =await uploadImageToCloudinary(video,process.env.FOLDER_NAME);

        const  sectionDetails =await subSection.create({
            title : title,
            description :description,
            videoUrl: response.secure_url,
            
         })

         const updatedsection =await section.findByIdAndUpdate({_id:sectionId },{
            $push :{
                subSection :sectionDetails._id
            }
         },{
            new : true
         }).populate("subSection")

         res.status(200).json({
            sucess : true,
            message : "section has benn created sucessfully",
            data : updatedsection
        })

    }catch(e){
        console.log(e);
        res.status(500).json({
            sucess : false,
            message :  e 
        })
    }
}




  
exports.deleteSubSection = async (req, res) => {
    try {
      const { subSectionId, sectionId } = req.body

      console.log(subSectionId,   "    "  , sectionId)
      
      await section.findByIdAndUpdate(
        { _id: sectionId },
        {
          $pull: {
            subSection: subSectionId,
          },
        }
      )
       const subSection12 = await subSection.findByIdAndDelete({ _id: subSectionId })
  
      if (!subSection12) {
        return res
          .status(404)
          .json({ success: false, message: "SubSection not found" })
      }
  


      const updatedSection = await section.findById(sectionId).populate("subSection")
      return res.json({
        success: true,
        message: "SubSection deleted successfully",
        data:updatedSection,
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while deleting the SubSection",
      })
    }
  }






  exports.updateSubSection = async (req, res) => {
    try {
       const { sectionId,subSectionId, title, description } = req.body
       const subSection12 = await subSection.findById(subSectionId)
  
      if (!subSection12) {
        return res.status(404).json({
          success: false,
          message: "SubSection not found",
        })
      }
  
      if (title !== undefined) {
        subSection.title = title
      }
  
      if (description !== undefined) {
        subSection.description = description
      }
      if (req.files && req.files.video !== undefined) {
        const video = req.files.video
        const uploadDetails = await uploadFileToCloud(file ,"IMAGES")
        subSection.videoUrl = uploadDetails.secure_url
        subSection.timeDuration = `${uploadDetails.duration}`
      }
  
       await subSection12.save()
  
      const updatedSection = await section.findById(sectionId).populate("subSection")


      return res.json({
        success: true,
        data:updatedSection,
        message: "Section updated successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the section",
      })
    }
  }


