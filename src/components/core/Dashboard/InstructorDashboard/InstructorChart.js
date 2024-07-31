import React, { useState } from 'react'
import { Chart, registerables } from 'chart.js';
import {Pie} from "react-chartjs-2"
import { MdLabel } from 'react-icons/md';

Chart.register(...registerables);

const InstructorChart = ({courses}) => {
 
 
    const [currChart , setCurrChart]= useState("student");

    const getRandomColors =( num)=>{
        const colors =[];
          for (let i=0 ; i<num ; i++){

            
                 const color =`rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)} , ${Math.floor(Math.random() * 256)})`
                  
                 
                 colors.push(color);
                }



                return (colors)
    }


    const chartDataForStudents = {
        labels: courses.map((course)=>course.courseName),
        datasets : [{
            data : courses.map((course)=>course.totalStudentsEnrolled),
            backgroundColor : getRandomColors(courses.length),
        }]
    }


    const chartDataForIncome = {
        labels : courses.map((course)=>course.totalStudentsEnrolled),
        datasets :[{
            data : courses.map((course)=>course.totalAmountGenerated),
            backgroundColor : getRandomColors(courses.length),
        }]
    }

    const operations ={

    }


    return (
    <div>InstructorChart

    <p> Visualize</p>
    <div>
        <button onClick={()=>setCurrChart("student")}> students</button>
        <button onClick={()=>setCurrChart("income")}>Income</button>
    </div>

    <div>
        <Pie
        
        data={currChart === "student"  ? chartDataForStudents : chartDataForIncome}>

        </Pie>
    </div>
    </div>
  )
}

export default InstructorChart