import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaHeart, FaRegHeart, FaComment } from "react-icons/fa";
import { FaCirclePlay } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import {MdAccountCircle} from "react-icons/md"





const Product = ({ post, tokenUserData }) => {
    // const [isLiked, setIsLiked] = useState(post.likes.includes(tokenUserData?.username));
    // const [likeCount, setLikeCount] = useState(post.likes.length);
    // const [commentCount, setCommentCount] = useState(post.comments.length);
    const [user, setUser] = useState(null)
    // Check if the contentUrl contains any video extension
    const isVideo = /\.(mp4|webm)/.test(post.contentUrl);



    const handleLike = async () => {
        try {
            // Toggle the like state locally
            setIsLiked(!isLiked);

            // Send a request to the API route to toggle the like
            const response = await fetch(`/api/like?postId=${post._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: tokenUserData?.username }),
            });

            if (response.ok) {
                // Update the like count in the UI
                setLikeCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
            } else {
                // Revert the like state if the request fails
                setIsLiked(!isLiked);
                console.error('Failed to toggle like:', response.statusText);
            }
        } catch (error) {
            // Revert the like state if there's an error
            setIsLiked(!isLiked);
            console.error('Error toggling like:', error);
        }
    };

    useEffect(() => {

        const fetchUser = async () => {

            const result = await fetch(`/api/user/${post.username}`);
            const userJson = await result.json();

            const { user } = userJson
            setUser(user)
            // console.log(user)
        }

        fetchUser();


    }, [])


    return (
        <div className="feedcontainer xl:w-[20vw] bg-white/5 backdrop-blur-md   glassmorphism  bg-gray-600 rounded-lg h-auto flex flex-col  gap-6  font-noto w-full hover:scale-105 duration-200">
            <div className='flex justify-between items-center w-full'>
                <div className='flex items-center gap-2 '>
                    <Link href={`/Profile/${post?.username}`} className='hover:text-[#9B03F8] hover:underline-offset-4  hover:underline transition-all duration-300 hover:scale-95'>
                        {user?.profilepic ?

                            <img alt={`${post?.username}'s profilepic`} className="rounded-full w-10 h-10" src={user?.profilepic} ></img>
                            :

                            <MdAccountCircle className='rounded-full w-10 h-10 text-gray-200' />
                        }

                    </Link>
                    <div className=''>
                        <h4 className='text-white font-medium text-sm'>{post.name}</h4>
                        <h5 className='text-gray-300 text-sm '>@{post.username}</h5>
                    </div>
                </div>
            </div>
            <div className='flex flex-col'>
                <div className="caption text-white text-xl font-bold"><h4>{post.productTitle}</h4></div>
                <div className="caption text-white text-sm"><h4>{post.description}</h4></div>
            </div>

            {/* Conditional rendering for image or video */}
            {isVideo ? (
                // Render video element if contentUrl is a video

                <div className='post bg-white/10 relative  object-scale-down flex justify-center '>
                    <FaPlay className='absolute text-5xl text-gray-200 text-shadow top-[30%] ' />
                    <video className='object-contain '>
                        <source src={post.contentUrl} type='video/mp4' />


                    </video>
                </div>

            ) : (
                // Render image element if contentUrl is not a video
                <Link href={`${process.env.NEXT_PUBLIC_HOST}/productId?id=${post._id}&username=${post.username}`}>
                    <div className="post bg-white/10    flex justify-center ">
                        <img src={post.contentUrl} alt="Post" className=' object-contain' />
                    </div>
                </Link>

            )}

            <div className="reactions flex items-center justify-around py-2 border-t border-b border-white/20  text-2xl">
                <div className={`flex  items-center justify-center gap-1 cursor-pointer hover:scale-110 duration-150 `} >
                    <FaStar className='text-md text-yellow-500' />
                    <h5 className='text-sm text-white'>{post.rating}</h5>
                </div>
                <div className={`flex max-md:flex-col items-center justify-center gap-1 cursor-pointer hover:scale-110 duration-150 `} >

                    <h5 className='text-sm text-white'>₹{post.price}</h5>
                </div>

                {!(post?.username === tokenUserData?.username) && <Link href={`${process.env.NEXT_PUBLIC_HOST}/productId?id=${post._id}&username=${post.username}`}><button className='nav-btn  bg_button1 text-white px-5 py-2 rounded-lg  transition-all duration-150  hover:scale-95  hover:shadow-lg hover:shadow-black/70 text-sm ' >Buy</button></Link>}
                {/* <div className='flex gap-1 max-md:flex-col items-center justify-center text-white cursor-pointer hover:scale-110 duration-150 '>
                    <FaComment className='text-md' />
                    <h5 className='text-sm'>{commentCount}</h5>
                </div> */}
            </div>
        </div>
    )
}

export default Product;
