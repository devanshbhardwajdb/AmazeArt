import React, { useState } from 'react';
import Link from 'next/link';
import { FaHeart, FaRegHeart, FaComment } from "react-icons/fa";

const Post = ({ post, tokenUserData }) => {
    const [isLiked, setIsLiked] = useState(post.likes.includes(tokenUserData?.username));
    const [likeCount, setLikeCount] = useState(post.likes.length);
    const [commentCount, setCommentCount] = useState(post.comments.length);

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
                body: JSON.stringify({ username: tokenUserData.username }),
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

    return (
        <div className="feedcontainer xl:w-[20vw] bg-white/5 backdrop-blur-md   glassmorphism  bg-gray-600 rounded-lg h-auto flex flex-col  gap-6  font-noto w-full hover:scale-105 duration-200">
            <div className='flex justify-between items-center w-full'>
                <div className='flex items-center gap-2 '>
                    <Link href={`/Profile/${post?.username}`} className='hover:text-[#9B03F8] hover:underline-offset-4  hover:underline transition-all duration-300 hover:scale-95'>
                        <img alt={`${post.username}'s profilepic`} className="rounded-full w-10 h-10" src={post.profilepic} ></img></Link>
                    <div className=''>
                        <h4 className='text-white font-medium text-sm'>{post.name}</h4>
                        <h5 className='text-gray-300 text-sm '>@{post.username}</h5>
                    </div>
                </div>
            </div>
            <div className="caption text-white text-sm"><h4>{post.caption}</h4></div>

            {/* Conditional rendering for image or video */}
            {post.contentUrl.endsWith('.mp4') || post.contentUrl.endsWith('.webm') ? (
                // Render video element if contentUrl ends with video extension
                <Link href={`${process.env.NEXT_PUBLIC_HOST}postId?id=${post._id}`}>
                    <video controls className='object-contain'>
                        <source src={post.contentUrl} type='video/mp4' />
                    </video>
                </Link>
            ) : (
                // Render image element for all other cases
                <Link href={`${process.env.NEXT_PUBLIC_HOST}postId?id=${post._id}`}>
                    <div className="post bg-white/10   object-scale-down flex justify-center ">
                        <img src={post.contentUrl} alt="Post" className=' object-contain' />
                    </div>
                </Link>
            )}

            <div className="reactions flex items-center justify-around py-2 border-t border-b border-white/20  text-2xl">
                <div className={`flex max-md:flex-col items-center justify-center gap-1 cursor-pointer hover:scale-110 duration-150 ${!isLiked ? 'text-white' : 'text-red-500'}`} onClick={handleLike}>
                    {isLiked ? <FaHeart className='text-md text-red-500' /> : <FaRegHeart className='text-md' />}
                    <h5 className='text-sm'>{likeCount}</h5>
                </div>
                <div className='flex gap-1 max-md:flex-col items-center justify-center text-white cursor-pointer hover:scale-110 duration-150 '>
                    <FaComment className='text-md' />
                    <h5 className='text-sm'>{commentCount}</h5>
                </div>
            </div>
        </div>
    )
}

export default Post;
