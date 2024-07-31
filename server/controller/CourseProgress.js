const courseProgrss = require("../models/courseProgrss");
const subSection = require("../models/subSection");

// exports.updateCourseprogress = async (req,res)=>{

//     const {courseId, subSectionId} =req.body;
//     const userId =req.user.id;
//     try{

//          const subsection12 =await subSection.findById(subSectionId);


//              if(!subsection12){
//                 return res.status(404).json({
//                     "sucess" : false,
//                     "message ": "invalid subsection"
//                 })
//              }

//              let courseProgress12 =await  courseProgrss.findOne({
//                 courseId :courseId,
//                 userId : userId
//              })

//              if(!courseProgress12){
//                 return res.status(404).json({
//                     "sucess": false,
//                     "message ": "course progress does not exist "
//                 })
//              }else {
//                 if(courseProgress12.completedVideos.includes(subSectionId))
//                 {
//                     return res.status(400).json({
//                         "sucess" : false ,
//                         "message ": "subsesction alreadly completed"
//                     })
//                 }


//                 courseProgrss.completedVideos.push(subSectionId);

//              }

//               await courseProgrss.save()


//         res.status(200).json({
//             "sucess" : true,
            
//         })

//     }catch(e){

//         console.log(e);

//         return res.status(500).json({
//             "sucess" :  false,
//             " message" : " something went wrong "
//         })
//     }
// }




exports.updateCourseprogress = async(req,res) => {
    const {courseId, subSectionId} = req.body;
    const userId = req.user.id;

    try{
        //check if the subsection is valid
        const subSection12 = await subSection.findById(subSectionId);

        if(!subSection12) {
            return res.status(404).json({error:"Invalid SUbSection"});
        }

        console.log("SubSection Validation Done");

        //check for old entry 
        let courseProgress12 = await courseProgrss.findOne({
            courseId:courseId,
            userId:userId,
        });

        console.log("i am where error ",courseProgress12);

        if(!courseProgress12) {
            return res.status(404).json({
                success:false,
                message:"Course Progress does not exist"
            });
        }

        else {
            console.log("Course Progress Validation Done");
            //check for re-completing video/subsection
            if(courseProgress12.completedVideos.includes(subSectionId)) {
                return res.status(400).json({
                    error:"Subsection already completed",
                });
            }

            // //poush into completed video
            courseProgress12.completedVideos.push(subSectionId);
            console.log("Copurse Progress Push Done");
        }
        await courseProgress12.save();
        console.log("Course Progress Save call Done");
        return res.status(200).json({
            success:true,
            message:"Course Progress Updated Successfully",
        })
    }
    catch(error) {
        console.error(error);
        return res.status(400).json({error:"Internal Server Error"});
    }
}