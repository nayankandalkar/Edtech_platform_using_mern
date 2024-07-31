import React from 'react'

const Stats = () => {

    const Stats =[
        {count: "5K" ,label : "Active :Student" },
        {count: "10+" ,label : "Mentors" },
        {count: "20+" ,label : " Courses" },
        {count: "50+" ,label : " Awards" },
    ]

  return (
    <div>
        <section>
            <div>
                <div className='text-white flex  items-center justify-center gap-[50px]     mt-[100px]  bg-richblack-700 p-5 flex-wrap'>
                {
                    Stats.map((data,index)=>{
                        return (
                             <div key={index} className='flex flex-col items-center border-2 border-richblack-600 p-4 rounded-lg justify-center w-[200px] h-[100px]  '>
                                <h1>{data.count}</h1>
                                <h2>{data.label}</h2>
                             </div>
                        )
                    })

                }
                </div>
            </div>
        </section>
    </div>
  )
}

export default Stats