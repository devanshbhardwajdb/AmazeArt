import React from 'react'
import Head from 'next/head';
import { FaLink } from "react-icons/fa6";


const Profile = () => {
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <div className='lg:px-[8vw]   flex  items-center justify-center text-white   flex-col gap-0 min-h-[100vh] font-livvic '>

        <div className="flex flex-col gap-1 items-center  glassmorphism shadow-lg shadow-black">
          <div className='flex items-center justify-center   h-[50vh] w-[70vw]'>

            <img src="https://scontent.fdel11-4.fna.fbcdn.net/v/t39.30808-6/327456937_529647162643933_8388095810749618537_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=783fdb&_nc_ohc=dLf-4aJMd7cAX9ncEWx&_nc_ht=scontent.fdel11-4.fna&oh=00_AfBj31YL9DSnHVYzFc-8tXsxRwP1-E7x5umiJOqh7a9TYg&oe=65E53ACD" alt="Cover pic" className='w-[40vw]' />
          </div>

          <div className='flex flex-col gap-4 w-[40vw] '>
            <div className="photo flex items-center justify-center gap-4  z-10 w-full">

              <img className="rounded-full w-[13vw]" src="https://scontent.fdel11-2.fna.fbcdn.net/v/t39.30808-1/428616155_1542116006640893_7309280044409018154_n.jpg?stp=dst-jpg_s320x320&amp;_nc_cat=103&amp;ccb=1-7&amp;_nc_sid=11e7ab&amp;_nc_ohc=6wTIqYxWPWQAX_BWeW_&amp;_nc_ht=scontent.fdel11-2.fna&amp;oh=00_AfDZGSFGWgLeeV1KF4cy4qjjiCvGsaoPM7Kx8vEj0uoRRg&amp;oe=65E5EA5E" ></img>

              <div className="flex flex-col gap-2">

                <h1 className='text-4xl  font-semibold'>Devansh Bhardwaj</h1>

                <div className="flex gap-5">
                  <h3>100 Posts</h3>
                  <h3>100 Followers</h3>
                  <h3>100 Following</h3>
                </div>
                <div className='bio flex flex-col gap-4   '>
                  <h3 className='category text-gray-300'>Musician/Band</h3>
                  <h3>Passionate Singer ❤️ <br /> Here is my YouTube Channel 👇🏻☺️✨</h3>

                  <a href="youtube.com/DevanshBhardwajDB" className='flex items-center gap-2 font-semibold underline hover:text-blue-300 duration-150'>
                    <FaLink />
                    <h3>youtube.com/DevanshBhardwajDB</h3>

                  </a>

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


      </div>
    </>
  )
}

export default Profile