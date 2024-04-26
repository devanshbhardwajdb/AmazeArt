import React from 'react'

const LoadingContainer = () => {
  return (
    <div className="feedcontainer xl:w-[20vw] h-[40vh] bg-white/5 backdrop-blur-md glassmorphism bg-gray-600 rounded-lg flex flex-col gap-6 font-noto w-full animate-pulse duration-75 ">
        <div className='flex justify-between items-center w-full'>
            <div className='flex items-center gap-2 w-full '>

                <h4 className="rounded-full w-10 h-10 bg-gray-400"  ></h4>
                <div className='w-1/2 gap-1 flex flex-col'>
                    <h4 className='text-white font-medium text-sm w-3/2 h-4 bg-gray-400 rounded-md'></h4>
                    <h5 className='text-gray-300 text-sm bg-white/10 h-3 w-2/3 rounded-md'></h5>
                </div>
            </div>
            {/* <button className='bg-transparent flex items-center justify-center px-3 text-white text-sm rounded-xl  font-noto w-30 h-8  border-2 border-white  duration-300 hover:bg-[#fff] hover:text-[#000]'><FaPlus className='  cursor-pointer mr-3' /><h5>Follow</h5></button> */}
        </div>
        <div className="caption text-white text-sm bg-white/10 h-4 rounded-md"><h4></h4></div>


        <div className="post bg-white/10 h-1/2 rounded-md   object-scale-down flex justify-center ">
            {/* <img src={post.contentUrl} alt="Post" className=' object-contain' /> */}
        </div>

       
    </div>
    
  )
}

export default LoadingContainer