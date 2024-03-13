// pages/profile/[username].js

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { FaLink } from 'react-icons/fa';
import { useRouter } from 'next/router';

const UserProfile = () => {
  const router = useRouter();
  // console.log(router.query)
  const { username } = router.query;
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/login')
    }


  }, [])

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data based on the username
        const response = await fetch(`/api/user/${username}`);
        const userData = await response.json();
        

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
            <div className="flex flex-col gap-1 items-center  glassmorphism shadow-lg shadow-black">
              <div className='flex items-center justify-center   h-[50vh] w-[70vw]'>

                <img src="https://scontent.fdel11-4.fna.fbcdn.net/v/t39.30808-6/327456937_529647162643933_8388095810749618537_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=783fdb&_nc_ohc=dLf-4aJMd7cAX9ncEWx&_nc_ht=scontent.fdel11-4.fna&oh=00_AfBj31YL9DSnHVYzFc-8tXsxRwP1-E7x5umiJOqh7a9TYg&oe=65E53ACD" alt="Cover pic" className='w-[40vw]' />
              </div>

              <div className='flex flex-col gap-4 w-[40vw] '>
                <div className="photo flex items-center justify-center gap-4  z-10 w-full">

                  <img alt={`${userData?.username}'s profilepic`} className="rounded-full w-44 h-44" src={userData?.profilepic} ></img>

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

                        <a href="youtube.com/DevanshBhardwajDB" className='flex items-center gap-2 font-semibold underline hover:text-blue-300 duration-150'>
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



        }



      </div>
    </>
  );
};

export default UserProfile;
