 
const category =require("../models/category");

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

exports.createCategory =async (req,res)=>{

    try
    {

        const {name,description }=req.body;

        if(!name || !description){
            return res.status(400).json({
                sucess : false,
                message : "please enter the data"
            })
        }


        const categoryDetail= await category.create({
            name : name,
            description : description
        });


        res.status(200).json({
            sucess : true,
            message : " tag created sucessfully",
            categoryDetail
        })

    }
    catch(e){

        console.log("error occurred" +e);

        return res.status(500).json({
            sucess : false,
            message : " something went wrong "+ e
        })
    }
}


exports.showAllcategory =async (req, res)=>{
    try {


        const  allCategory= await category.find({},{name : true ,description : true})

        res.status(200).json({
            sucess : true,
            message : "all  ctegories are are here",
            allCategory

        })

    }catch(e){

        console.log(e);
        return res.status(500).json({
            sucess : false,
            message : "something went wrong" +e
        })
    }
}



exports.categoryPagedetails =async (req,res)=>{
    try{

        const {categoryId}=req.body;
        const selectedCategory =await category
        .findById(categoryId)
        .populate("course")
        .exec();


        if(!selectedCategory){
            return res.status(400).json(
                {
                    sucess : false,
                    message : "cousrse not found "
                }
            )
        }

        const differentCategory =await category.find({ _id : {$ne:categoryId}}).populate("course").exec();


        res.status(200).json({
            sucess : true,
            data : differentCategory,
        })

        

    }catch (e){
        console.log(e);
        res.status(500).json({
            sucess : false ,
            message : "something went wrong \n \n "+e
        })
    }
}




exports.categoryPageDetails3 = async (req, res) => {
    try {
      const { categoryId } = req.body
      console.log("PRINTING CATEGORY ID: ", categoryId);
      // Get courses for the specified category
      const selectedCategory = await category.findById(categoryId)
        .populate({
          path: "courses",
          match: { status: "Published" },
        // populate: "ratingAndReview",
        })
        .exec()
  
      //console.log("SELECTED COURSE", selectedCategory)
      // Handle the case when the category is not found
      if (!selectedCategory) {
        console.log("Category not found.")
        return res
          .status(404)
          .json({ success: false, message: "Category not found" })
      }
      // Handle the case when there are no courses
      if (selectedCategory.courses.length === 0) {
        console.log("No courses found for the selected category.")
        return res.status(404).json({
          success: false,
          message: "No courses found for the selected category.",
        })
      }
  
      // Get courses for other categories
      const categoriesExceptSelected = await category.find({
        _id: { $ne: categoryId },
      })
      let differentCategory = await category.findOne(
        categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
          ._id
      )
        .populate({
          path: "courses",
          match: { status: "Published" },
        })
        .exec()
        //console.log("Different COURSE", differentCategory)
      // Get top-selling courses across all categories
      const allCategories = await category.find()
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: {
            path: "instructor",
        },
        })
        .exec()
      const allCourses = allCategories.flatMap((category) => category.courses)
      const mostSellingCourses = allCourses
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10)
       // console.log("mostSellingCourses COURSE", mostSellingCourses)
      res.status(200).json({
        success: true,
        data: {
          selectedCategory,
          differentCategory,
          mostSellingCourses,
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }