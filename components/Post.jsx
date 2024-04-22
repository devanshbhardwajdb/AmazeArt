import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowDown } from "react-icons/fa";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaComment, FaShareAlt, FaRegComment, FaPlus } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";

const Post = ({ post }) => {

    const [isLiked, setIsLiked] = useState(false)

    console.log(post)



    const handleLike = () => {

        setIsLiked(!isLiked)
    }

    return (

        <div className="feedcontainer w-full bg-white/5 backdrop-blur-md   glassmorphism  bg-gray-600 rounded-lg h-auto flex flex-col gap-6 p-5 font-noto">
            <div className='flex justify-between items-center w-full'>
                <div className='flex items-center gap-2 '>
                    <img alt={`${post.username}'s profilepic`} className="rounded-full w-10 h-10" src={post.profilepic} ></img>

                    <div className=''>
                        <h4 className='text-white font-medium'>{post.name}</h4>
                        <h5 className='text-gray-300'>@{post.username}</h5>
                    </div>
                </div>
                <button className='bg-transparent flex items-center justify-center px-3 text-white text-sm rounded-xl  font-noto w-30 h-8  border-2 border-white hover:scale-110 duration-300 hover:bg-[#fff] hover:text-[#000]'><FaPlus className='  cursor-pointer mr-3' /><h5>Follow</h5></button>

            </div>
            <div className="caption text-white"><h4>{post.caption}</h4></div>

            <div className="post bg-white/10 h-[40vh] object-scale-down ">
                <img src={post.conte} alt="Post" className='h-full w-full object-contain' />
            </div>

            <div className="reactions flex items-center justify-around py-4 border-t border-b border-white/40  text-2xl">

                <div className={`flex max-md:flex-col items-center justify-center  gap-1 cursor-pointer hover:scale-110 duration-150   ${!isLiked ? 'text-white' : 'text-blue-400'}  `} onClick={handleLike}>

                    <AiFillLike />
                    <h5 className='text-base'>Like</h5>

                </div>
                <div className='flex gap-1 max-md:flex-col items-center justify-center text-white cursor-pointer hover:scale-110 duration-150 '>

                    <FaComment />
                    <h5 className='text-base'>Comment</h5>

                </div>
                <div className='flex gap-1 max-md:flex-col items-center justify-center text-white cursor-pointer hover:scale-110 duration-150 '>

                    <FaShareAlt />

                    <h5 className='text-base'>Share ({post.shares})</h5>

                </div>
                {/* <div className='flex gap-1 max-md:flex-col items-center justify-center text-white cursor-pointer hover:scale-110 duration-150 '>

            <MdPayment />
            <h5 className='text-base'>Buy</h5>

        </div> */}




            </div>



        </div>

    )
}

export default Post