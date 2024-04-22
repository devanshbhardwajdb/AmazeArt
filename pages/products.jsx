import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { FaArrowDown } from "react-icons/fa";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaComment, FaShareAlt, FaRegComment } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";

const Products = () => { const [isLiked, setIsLiked] = useState(false)

  const handleLike = () => {

      setIsLiked(!isLiked)
  }


  return (
    <>
      <Head>
        <title>Amazeart - Creations</title>
      </Head>
      <div className='lg:px-[8vw]  flex  items-center   flex-col gap-0 min-h-[100vh]  '>

        <div className={`fixed z-[-117] bg7-image w-full h-full top-0 transition-opacity  duration-1000 }`}
        ></div>
        <div className='fixed z-[-116] w-full h-full top-0 opacity-15 bg_main'></div>

        <div className='feeds flex flex-col gap-10  backdrop-blur-xl shadow-black shadow-md overflow-y-scroll lg:w-[60vw] h-[100vh] py-[20vh] px-[5vw]'>

          <div className="feedcontainer w-full bg-white/5 backdrop-blur-md   glassmorphism  bg-gray-600 rounded-lg h-auto flex flex-col gap-6 p-5 font-noto">
            <div className='flex justify-between items-center w-full'>
              <div className='flex items-center gap-2 '>
                <div className="profilepic w-16 h-16 rounded-full bg-green-400"></div>

                <div className=''>
                  <h4 className='text-white font-medium'>Devansh Bhardwaj</h4>
                  <h5 className='text-gray-300'>@devanshbhardwaj_db</h5>
                </div>
              </div>
              <BsThreeDotsVertical className='text-3xl text-white cursor-pointer mr-3' />
            </div>
            <div className="caption text-white"><h4>Trying to my realme through my REALME ❤️</h4></div>

            <div className="post bg-white/10 h-[40vh] object-scale-down ">
              <img src="/bg1.jpg" alt="Post" className='h-full w-full object-contain' />
            </div>

            <div className="reactions flex items-center justify-around py-4 border-t border-b border-white/40  text-2xl">

              {/* <div className={`flex max-md:flex-col items-center justify-center  gap-1 cursor-pointer hover:scale-110 duration-150   ${!isLiked ? 'text-white' : 'text-blue-400'}  `} onClick={handleLike}>

                <AiFillLike />
                <h5 className='text-base'>Like</h5>

              </div> */}
              <div className={`flex max-md:flex-col items-center justify-center  gap-1 cursor-pointer hover:scale-110 duration-150 text-white  `} onClick={handleLike}>

                
                <h5 className='text-base'>Price: ₹15000</h5>

              </div>
              <div className='flex gap-1 max-md:flex-col items-center justify-center text-white cursor-pointer hover:scale-110 duration-150 '>

                <FaComment />
                <h5 className='text-base'>Contact</h5>

              </div>
              <div className='flex gap-1 max-md:flex-col items-center justify-center text-white cursor-pointer hover:scale-110 duration-150 '>

                <FaShareAlt />
                <h5 className='text-base'>Share</h5>

              </div>
              <div className='flex   items-center justify-center text-white cursor-pointer   '>

              <Link href={'/'}><button className='bg-transparent text-sm rounded-xl  font-noto w-20 h-8  border-2 border-white hover:scale-110 duration-300 hover:bg-[#fff] hover:text-[#000]'>Buy Now</button></Link>

              </div>




            </div>



          </div>



        </div>


      </div>
    </>
  )
}

export default Products