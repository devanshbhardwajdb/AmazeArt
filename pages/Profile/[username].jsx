// pages/profile/[username].js

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { FaLink } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { IoIosAddCircle } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import Link from 'next/link';
import Profilepic from '@components/Profilepic';


const UserProfile = ({ tokenUserData }) => {
  const router = useRouter();
  // console.log(router.query)
  const { username } = router.query;
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profilePopup, setProfilePopup] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/login')
    }


  }, [])

  useEffect(() => {
    setProfilePopup(false)
    const fetchUserData = async () => {
      try {
        // Fetch user data based on the username
        const response = await fetch(`/api/user/${username}`);
        const userData = await response.json();
        console.log(userData)


        if (userData.success) {

          setUserData(userData.user);
          setLoading(false);

        }


      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (username) {
      fetchUserData();
    }
  }, [username]);


  const togglePopup = () => {
    setProfilePopup(!profilePopup)
  }



  return (
    <>
      <Head>
        <title>Profile - {username}</title>
      </Head>
      <div className='lg:px-[8vw]   flex  items-center justify-center text-white   flex-col gap-0 min-h-[100vh] font-livvic '>
        {
          loading ? (
            <div>
              Loading...
            </div>

          ) : (

            (tokenUserData.username === username) ? (

              <div className="flex flex-col gap-1 items-center  glassmorphism shadow-lg shadow-black ">

                {
                  profilePopup && <div className='fixed z-30 top-36 justify-center items-center top-  w-full shadow-black shadow-2xl '>
                    <Profilepic tokenUserData={tokenUserData} togglePopup={togglePopup} />
                  </div>
                }
                <div className='flex items-center justify-center   h-[50vh] w-[70vw]'>

                  {userData.coverpic ?
                    <img src={userData?.coverpic} alt={`${userData?.name}'s Cover pic`} className='w-[40vw]' />
                    :
                    <div className='w-[40vw] h-[40vh] bg-gray-800 flex justify-center items-center'>No Cover Image</div>
                  }
                </div>

                <div className='flex flex-col gap-4 w-[40vw] '>
                  <div className="photo flex items-center justify-center gap-4  z-10 w-full">
                    <div className='relative'>
                      {userData.profilepic ?

                        <img alt={`${userData?.name}'s Profile pic`} className="rounded-full w-44 h-44" src={userData?.profilepic} ></img>
                        :

                        <MdAccountCircle className='rounded-full w-44 h-44 text-gray-500' />
                      }

                      <IoIosAddCircle className='absolute text-gray-300 text-3xl bottom-4 left-3  cursor-pointer hover:scale-125 duration-200 hover:text-[#9B03F8]' onClick={togglePopup} />

                    </div>


                    <div className="flex flex-col gap-2">

                      <h1 className='text-4xl  font-semibold'>{userData?.name}</h1>
                      <h2 className='text-lg  font-normal'>{userData?.username}</h2>

                      <div className="flex gap-5">
                        <h3>{userData?.posts} Posts</h3>
                        <h3>{userData?.followers} Followers</h3>
                        <h3>{userData?.following} Following</h3>
                      </div>
                      <div className='bio flex flex-col gap-4   '>
                        <h3 className='category text-gray-300'>Musician/Band</h3>
                        <h3>{userData?.bio}</h3>
                        {userData?.link &&

                          <a href={userData?.link} className='flex items-center gap-2 font-semibold underline hover:text-blue-300 duration-150'>
                            <FaLink />
                            <h3>{userData?.link}</h3>

                          </a>

                        }


                      </div>
                    </div>

                  </div >
                  <div className="PAbutton w-full">
                    <button className='nav-btn  bg_button1 text-white px-5 py-2 rounded-lg  transition-all duration-150  hover:scale-95  hover:shadow-lg  w-full flex  justify-center items-center' >Professional Dashboard


                    </button>

                  </div>

                  <div className="flex  items-center justify-center gap-32 border-y-2 py-3 px-3">
                    <h2>Posts</h2>
                    <h2>Products</h2>
                    <h2>Saved</h2>
                  </div>

                  <div className="posts flex items-center justify-start gap-2 flex-wrap	w-[40vw]">
                    <div className="post_box w-[9.5vw] h-[30vh] bg-gray-300"> </div>
                    <div className="post_box w-[9.5vw] h-[30vh] bg-gray-300"> </div>
                    <div className="post_box w-[9.5vw] h-[30vh] bg-gray-300"> </div>
                    <div className="post_box w-[9.5vw] h-[30vh] bg-gray-300"> </div>
                    <div className="post_box w-[9.5vw] h-[30vh] bg-gray-300"> </div>
                    <div className="post_box w-[9.5vw] h-[30vh] bg-gray-300"> </div>
                    <div className="post_box w-[9.5vw] h-[30vh] bg-gray-300"> </div>
                    <div className="post_box w-[9.5vw] h-[30vh] bg-gray-300"> </div>
                  </div>
                </div>

              </div>) : (
              <div className="flex flex-col gap-1 items-center  glassmorphism shadow-lg shadow-black ">

                {/* {
                    profilePopup && <div className='fixed z-30 top-36 justify-center items-center top-  w-full shadow-black shadow-2xl '>
                      <Profilepic tokenUserData={tokenUserData} togglePopup={togglePopup} />
                    </div>
                  } */}
                <div className='flex items-center justify-center   h-[50vh] w-[70vw]'>

                  {userData.coverpic ?
                    <img src={userData?.coverpic} alt={`${userData?.name}'s Cover pic`} className='w-[40vw]' />
                    :
                    <div className='w-[40vw] h-[40vh] bg-gray-800 flex justify-center items-center'>No Cover Image</div>
                  }
                </div>

                <div className='flex flex-col gap-4 w-[40vw] '>
                  <div className="photo flex items-center justify-center gap-4  z-10 w-full">
                    <div className='relative'>
                      {userData.profilepic ?

                        <img alt={`${userData?.name}'s Profile pic`} className="rounded-full w-44 h-44" src={userData?.profilepic} ></img>
                        :

                        <MdAccountCircle className='rounded-full w-44 h-44 text-gray-500' />
                      }
                      {/* 
                        <IoIosAddCircle className='absolute text-gray-300 text-3xl bottom-4 left-3  cursor-pointer hover:scale-125 duration-200 hover:text-[#9B03F8]' onClick={togglePopup} /> */}

                    </div>


                    <div className="flex flex-col gap-2">

                      <h1 className='text-4xl  font-semibold'>{userData?.name}</h1>
                      <h2 className='text-lg  font-normal'>{userData?.username}</h2>

                      <div className="flex gap-5">
                        <h3>{userData?.posts} Posts</h3>
                        <h3>{userData?.followers} Followers</h3>
                        <h3>{userData?.following} Following</h3>
                      </div>
                      <div className='bio flex flex-col gap-4   '>
                        <h3 className='category text-gray-300'>Musician/Band</h3>
                        <h3>{userData?.bio}</h3>
                        {userData?.link &&

                          <a href={userData?.link} className='flex items-center gap-2 font-semibold underline hover:text-blue-300 duration-150'>
                            <FaLink />
                            <h3>{userData?.link}</h3>

                          </a>

                        }


                      </div>
                    </div>

                  </div >
                  <div className="PAbutton w-full">
                    <button className='nav-btn  bg_button1 text-white px-5 py-2 rounded-lg  transition-all duration-150  hover:scale-95  hover:shadow-lg  w-full flex  justify-center items-center' >Professional Dashboard


                    </button>

                  </div>

                  <div className="flex  items-center justify-center gap-32 border-y-2 py-3 px-3">
                    <h2>Posts</h2>
                    <h2>Products</h2>
                    <h2>Saved</h2>
                  </div>

                  <div className="posts flex items-center justify-start gap-2 flex-wrap	w-[40vw]">
                    <div className="post_box w-[9.5vw] h-[30vh] bg-gray-300"> </div>
                    <div className="post_box w-[9.5vw] h-[30vh] bg-gray-300"> </div>
                    <div className="post_box w-[9.5vw] h-[30vh] bg-gray-300"> </div>
                    <div className="post_box w-[9.5vw] h-[30vh] bg-gray-300"> </div>
                    <div className="post_box w-[9.5vw] h-[30vh] bg-gray-300"> </div>
                    <div className="post_box w-[9.5vw] h-[30vh] bg-gray-300"> </div>
                    <div className="post_box w-[9.5vw] h-[30vh] bg-gray-300"> </div>
                    <div className="post_box w-[9.5vw] h-[30vh] bg-gray-300"> </div>
                  </div>
                </div>

              </div>

            )


          )



        }



      </div>
    </>
  );
};

export default UserProfile;
