import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Post from '@components/Post';
import CreatePost from '@components/CreatePost';
import { ToastContainer, toast } from 'react-toastify';

const Feed = ({ tokenUserData }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [posts, setPosts] = useState([]);
    const [createPost, setCreatePost] = useState(false)


    useEffect(() => {



        const fetchPosts = async () => {
            try {
                // Fetch posts 
                const res = await fetch(`/api/getposts`);
                const response = await res.json();
                setPosts(response);

            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchPosts();




    }, []);

    

    const toggleCreatePost = () => {
        setCreatePost(!createPost)
    }

    return (
        <>
            <Head>
                <title>Amazeart - Feed</title>
            </Head>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            {/* Same as */}
            <ToastContainer />

            <div className=' flex   items-center font-noto   flex-col gap-0 min-h-[100vh]  '>
                {
                    createPost && <div className='fixed z-30 top-36 justify-center items-center top-  w-full shadow-black shadow-2xl '>
                        <CreatePost tokenUserData={tokenUserData} toggleCreatePost={toggleCreatePost} />
                    </div>
                }


                <div className='feeds  justify-between flex xl:flex-wrap max-xl:flex-col   gap-10   overflow-y-scroll w-full  h-[100vh] pt-[10vh] pb-[30vh] px-[5vw] bg_main2  '>


                    {tokenUserData ? <div className=' w-full  flex gap-4 justify-center items-center'>
                        {tokenUserData.profilepic ?
                            <Link href={`/Profile/${tokenUserData?.username}`} className=''><img alt={`${tokenUserData?.name}'s Profile pic`} className="rounded-full max-md:w-[14vw] w-[5vw] " src={tokenUserData?.profilepic} ></img></Link>


                            :

                            <MdAccountCircle className='rounded-full w-20 h-20 text-gray-500' />
                        }


                        <button onClick={toggleCreatePost} className='flex justify-center items-center w-3/2  bg-white/80   rounded-full h-2/3 px-4 glassmorphism1 text-gray-200 font-light text-md hover:scale-105 duration-200     '>What's in your mind, {tokenUserData.name} </button>



                    </div> : <>

                    </>


                    }

                    <div className='feeds xl:flex-wrap  justify-center items-start flex max-xl:flex-col   gap-10 w-full    '>
                    {posts.map((post) => (
                        <Post key={post._id} post={post} tokenUserData={tokenUserData} />
                    ))}

                    </div>


                    


                </div>


            </div>

        </>
    );
};

export default Feed;
