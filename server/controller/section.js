 
const Course =require("../models/course");
const section = require("../models/section");
const subSection = require("../models/subSection");
 


exports.createSection =async (req, res)=>{
    try{

        const {sectionName ,CourseId}=req.body;
        
        console.log(CourseId, sectionName);

        if( !sectionName || !CourseId){
            res.status(400).json({
                sucess : false,
                message : " all field are manditory "

            })
        }

        const newSection =await section.create({sectionName});



        const updatedCourse =await Course.findByIdAndUpdate(CourseId,{
            $push : {
                courseContent : newSection._id
            }
        },
        {
            new : true 
        }
        ).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        })
        .exec()




        return res.status(200).json({
            sucess : true,
            message : " section created sucessfully",
            updatedCourse: updatedCourse
        })



    }catch(e){

        res.status(500).json({
            sucess : false,
            message : " something went wwrong "
        })
    }
}



exports.updatedSection =async (req,res)=>{
       
    try{


        const {sectionName ,sectionId,courseId}=req.body;


        if( !sectionName || !sectionId){
            return res.status(400).json({
                sucess : false,
                message : "please enter the all field"
            })
        }



        const section12 = await section.findByIdAndUpdate(
			sectionId,
			{ sectionName },
			{ new: true }
		);


        const course = await Course.findById(courseId)
		.populate({
			path:"courseContent",
			populate:{
				path:"subSection",
			},
		})
		.exec();
        



        return res.status(200).json({
            sucess : true,
            message : "section has been updated",
            data: course
        })

    }catch(e){

        console.log("error has been occourred \n"+e);
         res.status(400).json({
            sucess : false ,
            message : "something went wrong"
         })
    }
}


exports.deletesection =async (req,res)=>{

    try{

      const {sectionId ,courseId}=req.body;

         

		await Course.findByIdAndUpdate(courseId, {
			$pull: {
				courseContent: sectionId,
			}
		})



		const section12 = await section.findById(sectionId);
		console.log(sectionId, courseId);
		if(!section12) {
			return res.status(404).json({
				success:false,
				message:"Section not Found",
			})
		}

		// //delete sub section
		await subSection.deleteMany({_id: {$in: section.subSection}});

		await section.findByIdAndDelete(sectionId);

		//find the updated course and return 

		const course = await Course.findById(courseId).populate({
			path:"courseContent",
			populate: {
				path: "subSection"
			}
		})
		.exec();

		res.status(200).json({
			success:true,
			message:"Section deleted",
			data:course
		});





		//HW -> req.params -> test
		//const { sectionId } = req.params;
		//await section.findByIdAndDelete(sectionId);
		//HW -> Course ko bhi update karo
		// res.status(200).json({
		// 	success: true,
		// 	message: "Section deleted",
		// });


	} catch (error) {
		console.error("Error deleting section: ", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
}