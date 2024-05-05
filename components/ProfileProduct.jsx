import React, { useState ,useEffect} from 'react';
import Link from 'next/link';
import { FaHeart, FaRegHeart, FaComment } from "react-icons/fa";
import { FaCirclePlay } from "react-icons/fa6";
import { FaPlay,FaPlus } from "react-icons/fa";




const ProfileProduct = ({ post, tokenUserData }) => {
    
   
    const [user, setUser] = useState(null)
    // Check if the contentUrl contains any video extension
    const isVideo = /\.(mp4|webm)/.test(post.contentUrl);



 
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
        <div className="feedcontainer   backdrop-blur-md   bg-black/70 h-auto flex flex-col  gap-20  font-noto  hover:scale-105 duration-200">
           
            

            {/* Conditional rendering for image or video */}
            {isVideo ? (
                // Render video element if contentUrl is a video
                <Link href={`${process.env.NEXT_PUBLIC_HOST}/productId?id=${post._id}&username=${post.username}`}>
                    <div className='post bg-white/10 relative  object-scale-down flex justify-center '>
                        <FaPlay className='absolute text-5xl text-gray-200 text-shadow top-[30%] ' />
                        <video className='object-cover md:w-[15vw] xl:h-[25vh] max-xl:h-[10vh] max-md:h-[15vh] w-[44vw]  '>
                            <source src={post.contentUrl} type='video/mp4' />


                        </video>
                    </div>
                </Link>
            ) : (
                // Render image element if contentUrl is not a video
                <Link href={`${process.env.NEXT_PUBLIC_HOST}/productId?id=${post._id}&username=${post.username}`}>
                    <div className="post bg-white/10 flex justify-center w-[44vw] md:w-[15vw] xl:h-[25vh] max-xl:h-[10vh] max-md:h-[15vh] ">
                        <img src={post.contentUrl} alt="Post" className=' object-cover' />
                    </div>
                </Link>
            )}

           
        </div>
    )
}

export default ProfileProduct;
