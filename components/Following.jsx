import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import 'react-toastify/dist/ReactToastify.css';
import { IoMdCloseCircle } from "react-icons/io";
import Follower from './Follower';
import Following_ from './Following_';


const Following = ({ tokenUserData, togglePopup5 }) => {
    // State to store image preview URL
    const router = useRouter();
    const { username } = router.query;

    const [userData, setuUserData] = useState(null)
    const [following, setFollowing] = useState([])


    useEffect(() => {
        // setProfilePopup(false);
        const fetchUserData = async () => {
          try {
            // Fetch user data based on the username
            const response = await fetch(`/api/user/${username}`);
            const userData = await response.json();
            // console.log(userData);
    
            if (userData.success) {
            //   setUserData(userData.user);
       
            //   setIsFollowing(userData.user.followers.includes(tokenUserData.username));
              setFollowing(userData.user.following) // Check if the token user is in the followers list
              
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
    
    
        if (username) {
          fetchUserData();
        //   fetchPosts();
        }
      }, [username]);




    return (
        <div className='flex flex-col text-white justify-center   gap-10 items-center    w-full rounded-lg shadow-lg shadow-gray-900 duration-150 transition-all font-noto bg-gray-900 min-h-[30vh]     relative '>
            <IoMdCloseCircle className='absolute right-5 top-5 text-3xl cursor-pointer hover:scale-125 duration-200 hover:text-[#9B03F8] text-gray-500' onClick={togglePopup5} />



            <div className="comments w-full  flex  flex-col gap-4 text-white text-sm">
                {following.map((username) => (
                   <Following_ key={username} username={username}/>
                ))}
            </div>
        </div>
    )
}

export default Following