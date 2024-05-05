import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import 'react-toastify/dist/ReactToastify.css';
import { IoMdCloseCircle } from "react-icons/io";
import Link from 'next/link';

const Following_ = ({ key, username }) => {

    const [userData, setUserData] = useState(null)

    useEffect(() => {

        const fetchUserData = async () => {
            try {
                // Fetch user data based on the username
                // console.log(username)
                const response = await fetch(`/api/user/${username}`);
                const userData = await response.json();
                // console.log(userData);

                if (userData.success) {
                    setUserData(userData.user);



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
        <Link href={`/Profile/${username}`} className='hover:bg-black/20'><div key={key} className='commentbox flex w-full px-4  items-center gap-2 border-y border-gray-200 py-2 '>
            
                <img alt={`${username}'s profilepic`} className="rounded-full w-10 h-10" src={userData?.profilepic} />
                <h4 className='text-white font-bold text-sm'>@{username}</h4>
            
        </div></Link>
    )
}

export default Following_