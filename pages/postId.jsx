import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { FaHeart, FaRegHeart, FaShare, FaFacebook, FaTwitter, FaLinkedin, FaPlus, FaComment, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import { MdPayment } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import { BsThreeDotsVertical } from "react-icons/bs";
import { useRouter } from 'next/router';
import Lottie from "lottie-react";
import A1 from "@/anime3.json"
import LoadingContainer2 from '@components/LoadingContainer2';

import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    WhatsappShareButton,

} from "react-share";

const PostId = ({ tokenUserData }) => {

    const router = useRouter();
    const postId = router.query.id;
    const [post, setPost] = useState({});
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [commentCount, setCommentCount] = useState(0);
    const [commentText, setCommentText] = useState('')
    const [shareCount, setShareCount] = useState(0);
    const [isShareOpen, setIsShareOpen] = useState(false);
    const [loading, setLoading] = useState(true);



    const handleLike = async () => {
        try {
            // Toggle the like state locally
            setIsLiked(!isLiked);

            // Send a request to the API route to toggle the like
            const response = await fetch(`/api/like?postId=${postId}`, {
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

    const addComment = async (e) => {
        setLoading(true);
        e.preventDefault();
        // console.log("agya hu")
        // console.log(postId, commentText)
        try {
            const response = await fetch(`/api/comment`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ postId, username: tokenUserData.username, commentText, profilepic: tokenUserData.profilepic }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data)
                setCommentCount(data.post.comments.length);
                setPost(data.post)
                setCommentText('')
                toast.success('Posted Comment !', {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } else {
                console.error('Failed to add comment:', response.statusText);

            }
        } catch (error) {
            console.error('Error adding comment:', error);
        }
        setLoading(false);
    };
    function formatTimeAgo(timestamp) {
        const currentTime = new Date();
        const commentTime = new Date(timestamp);
        const timeDifference = Math.abs(currentTime - commentTime);

        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
            return `${days} day${days > 1 ? 's' : ''} ago`;
        } else if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (minutes > 0) {
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else {
            return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
        }
    }





    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`/api/getpostbyid?id=${postId}`);
                const result = await res.json();
                setPost(result);
                setIsLiked(result.likes.includes(tokenUserData?.username));
                setLikeCount(result.likes.length);
                setCommentCount(result.comments.length);
                setShareCount(result.shares);
                setLoading(fapostId // Set loading to false after fetching post
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };
        fetchPost();
    }, [postId, tokenUserData]);



    return (

        <>
            <Head><title>Amazeart - {post.caption}</title></Head>
            <ToastContainer
                position="top-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"


            />





            <div className='py-[15vh] bg-white/5 backdrop-blur-md lg:px-[15vw] max-lg:px-[3vw] overflow-x-hidden gap-6  font-noto w-full'>
                {loading ? (
                    // Render loading container while fetching post
                    <LoadingContainer2 />
                ) :

                    (<div className="postcontainer  bg-white/5 backdrop-blur-md   glassmorphism  bg-gray-600 rounded-lg  flex flex-col  gap-6  font-noto ">

                        <div className='flex justify-between items-center w-full'>
                            <div className='flex  items-center gap-2 '>
                                <img alt={`${post.username}'s profilepic`} className="rounded-full w-10 h-10" src={post.profilepic} ></img>
                                <div className=''>
                                    <h4 className='text-white font-medium text-sm flex max-md:flex-col items-center gap-1'>{post.name} • <span className="text-gray-300 text-xs">Posted {formatTimeAgo(post.createdAt)}</span></h4>
                                    <h5 className='text-gray-300 text-sm'>@{post.username}</h5>
                                </div>
                            </div>
                            <button className='bg-transparent flex items-center justify-center px-3 text-white text-sm rounded-xl  font-noto w-30 h-8  border-2 border-white  duration-300 hover:bg-[#fff] hover:text-[#000]'><FaPlus className='  cursor-pointer mr-3' /><h5>Follow</h5></button>
                        </div>
                        <div className="caption text-white text-sm"><h4>{post.caption}</h4></div>
                        <div className="post bg-white/10   object-scale-down flex justify-center items-center w-full ">
                            <img src={post.contentUrl} alt="Post" className='xl:w-[25vw] w-[100vw] object-contain' />
                        </div>
                        <div className="reactions flex items-center justify-around py-4 border-t border-b border-white/30  text-2xl">
                            <div className={`flex  items-center justify-center gap-1 cursor-pointer hover:scale-110 duration-150 ${!isLiked ? 'text-white' : 'text-red-500'}`} onClick={handleLike}>
                                {isLiked ? <FaHeart className='text-md text-red-500' /> : <FaRegHeart className='text-md' />}
                                <h5 className='text-sm'>{likeCount}</h5>
                            </div>
                            <div className='flex gap-1 items-center justify-center text-white cursor-pointer hover:scale-110 duration-150 '>
                                <FaComment className='text-md' />
                                <h5 className='text-sm'>{commentCount}</h5>
                            </div>
                            <div className='flex gap-1  items-center justify-center text-white cursor-pointer hover:scale-110 duration-150 relative '>
                                <FaShare onClick={handleShare} />
                                <h5 className='text-sm'>{shareCount}</h5>

                            </div>
                            {isShareOpen && (
                                <div className="share-options rounded-lg flex fixed bg-black/70 gap-5 bottom-6 right-0 p-4">
                                    <WhatsappShareButton url={`${process.env.NEXT_PUBLIC_HOST}postId?post=${post._id}`} onClick={() => handleShareButtonClick('whatsapp')}><FaWhatsapp className='text-green-500 ' /></WhatsappShareButton>
                                    <FacebookShareButton url={`${process.env.NEXT_PUBLIC_HOST}postId?post=${post._id}`} onClick={() => handleShareButtonClick('facebook')}><FaFacebook className='text-blue-500 ' /></FacebookShareButton>
                                    <TwitterShareButton url={`${process.env.NEXT_PUBLIC_HOST}postId?post=${post._id}`} onClick={() => handleShareButtonClick('twitter')}><FaXTwitter className='text-gray-200 ' /> </TwitterShareButton>
                                    <LinkedinShareButton url={`${process.env.NEXT_PUBLIC_HOST}postId?post=${post._id}`} onClick={() => handleShareButtonClick('linkedin')}><FaLinkedin className='text-blue-700 ' /></LinkedinShareButton>
                                </div>
                            )}
                        </div>
                        <form className="commentbox flex gap-2 items-center font-noto " onSubmit={(e) => { addComment(e) }} method='PUT'>
                            <input
                                type={`text`}
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                className='bg-white/15 rounded-lg  p-2 w-full focus:outline-none focus:shadow-md focus:border focus:border-[#9F07F5] focus:shadow-[#9F07F5]  text-white placeholder-gray-200 text-sm'
                                placeholder='Type your comment'
                                name='comment'
                                required
                            />
                            <button type='submit' className='text-xl bg_button1 h-full w-10 p-2 rounded-full  text-white transition-all duration-150  hover:scale-95  hover:shadow-lg cursor-pointer flex justify-center items-center'>
                                {
                                    loading ? <Lottie animationData={A1} loop={true} className='w-6' /> :

                                        <IoSend />

                                }
                            </button>
                        </form>

                        <div className="comments  flex  flex-col gap-4 text-white text-sm">
                            {post.comments?.map((comment) => (
                                <div key={comment._id} className='commentbox flex  items-start gap-2 '>
                                    <img alt={`${comment.username}'s profilepic`} className="rounded-full w-10 h-10" src={comment.profilepic} />
                                    <div className='flex flex-col gap-0'>
                                        <div className='bg-black/40 py-1 px-4 rounded-lg rounded-tl-none flex flex-col gap-2'>
                                            <h4 className='text-white font-bold text-sm'>@{comment.username}</h4>
                                            <h4 className='font-light'>{comment.commentText}</h4>
                                        </div>
                                        <span className="text-gray-300 text-xs">Posted {formatTimeAgo(comment.createdAt)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>)
                }
            </div>
        </>
    )
}

export default PostId;
