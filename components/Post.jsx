import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaHeart, FaRegHeart, FaShare, FaFacebook, FaTwitter, FaLinkedin, FaPlus, FaComment, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaCirclePlay } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa";
import {MdAccountCircle} from "react-icons/md"
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    WhatsappShareButton,

} from "react-share";




const Post = ({ post, tokenUserData }) => {
    const [isLiked, setIsLiked] = useState(post.likes.includes(tokenUserData?.username));
    const [likeCount, setLikeCount] = useState(post.likes.length);
    const [commentCount, setCommentCount] = useState(post.comments.length);
    const [shareCount, setShareCount] = useState(post.shares);
    const [user, setUser] = useState(null)
    const [isShareOpen, setIsShareOpen] = useState(false);
    // Check if the contentUrl contains any video extension
    const isVideo = /\.(mp4|webm)/.test(post.contentUrl);


    const handleShare = async () => {
        setIsShareOpen(!isShareOpen);

    };
    const handleShareButtonClick = async (socialMedia) => {
        try {
            // Send a request to the API route to increment the share count
            const response = await fetch(`/api/share`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ postId }),
            });

            if (response.ok) {
                console.log('Post shared successfully');
                // Update the share count in the UI
                setShareCount((prevCount) => prevCount + 1);
            } else {
                console.error('Failed to share post:', response.statusText);
            }
        } catch (error) {
            console.error('Error sharing post:', error);
        }
    };
    const handleLike = async () => {
        try {
            // Toggle the like state locally

            if (tokenUserData) {
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
            <div className="caption text-white text-sm"><h4>{post.caption}</h4></div>

            {/* Conditional rendering for image or video */}
            {isVideo ? (
                // Render video element if contentUrl is a video
                <Link href={`${process.env.NEXT_PUBLIC_HOST}/postId?id=${post._id}&username=${post.username}`}>
                    <div className='post bg-white/10 relative  object-scale-down flex justify-center '>
                        <FaPlay className='absolute text-5xl text-gray-200 text-shadow top-[30%] ' />
                        <video className='object-contain '>
                            <source src={post.contentUrl} type='video/mp4' />


                        </video>
                    </div>
                </Link>
            ) : (
                // Render image element if contentUrl is not a video
                <Link href={`${process.env.NEXT_PUBLIC_HOST}/postId?id=${post._id}&username=${post.username}`}>
                    <div className="post bg-white/10    flex justify-center ">
                        <img src={post.contentUrl} alt="Post" className=' object-contain' />
                    </div>
                </Link>
            )}

            <div className="reactions flex items-center justify-around   text-2xl">
                <div className={`flex  items-center justify-center gap-1 cursor-pointer hover:scale-110 duration-150 ${!isLiked ? 'text-white' : 'text-red-500'}`} onClick={handleLike}>
                    {isLiked ? <FaHeart className='text-md text-red-500' /> : <FaRegHeart className='text-md' />}
                    <h5 className='text-sm'>{likeCount}</h5>
                </div>
                <div className='flex gap-1  items-center justify-center text-white cursor-pointer hover:scale-110 duration-150 '>
                    <FaComment className='text-md' />
                    <h5 className='text-sm'>{commentCount}</h5>
                </div>
                <div className='flex gap-1 relative  items-center justify-center text-white cursor-pointer hover:scale-110 duration-150  '>
                    <FaShare onClick={handleShare} />
                    <h5 className='text-sm'>{shareCount}</h5>
                    {isShareOpen && (
                        <div className="share-options rounded-lg flex absolute bg-black/90 gap-5 top-full right-0 p-2">
                            <WhatsappShareButton url={`${process.env.NEXT_PUBLIC_HOST}/postId?id=${post._id}&username=${post.username}`} onClick={() => handleShareButtonClick('whatsapp')}><FaWhatsapp className='text-green-500 ' /></WhatsappShareButton>
                            <FacebookShareButton url={`${process.env.NEXT_PUBLIC_HOST}/postId?id=${post._id}&username=${post.username}`} onClick={() => handleShareButtonClick('facebook')}><FaFacebook className='text-blue-500 ' /></FacebookShareButton>
                            <TwitterShareButton url={`${process.env.NEXT_PUBLIC_HOST}/postId?id=${post._id}&username=${post.username}`} onClick={() => handleShareButtonClick('twitter')}><FaXTwitter className='text-gray-200 ' /> </TwitterShareButton>
                            <LinkedinShareButton url={`${process.env.NEXT_PUBLIC_HOST}/postId?id=${post._id}&username=${post.username}`} onClick={() => handleShareButtonClick('linkedin')}><FaLinkedin className='text-blue-700 ' /></LinkedinShareButton>
                        </div>
                    )}

                </div>

            </div>
        </div>
    )
}

export default Post;
