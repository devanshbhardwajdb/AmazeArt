import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Post from '@components/Post';
import CreatePost from '@components/CreatePost';
import { ToastContainer } from 'react-toastify';
import LoadingContainer from '@components/LoadingContainer';
import { MdAccountCircle } from 'react-icons/md';


const Feed = ({ tokenUserData }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [createPost, setCreatePost] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // Fetch posts 
                const res = await fetch(`/api/getposts`);
                const response = await res.json();

              

                setPosts(response);
                setIsLoading(false); // Set loading to false after fetching posts
            } catch (error) {
                console.error('Error fetching user data:', error);
                setIsLoading(false); // Set loading to false in case of an error
            }
        };
        fetchPosts();
    }, []);

    const toggleCreatePost = () => {
        setCreatePost(!createPost);
    };

    return (
        <>
           <Head>
                <title>Amazeart - Feed</title>
                {/* Description */}
                <meta name="description" content="Amazeart posts" />
                {/* Open Graph metadata for sharing on social media */}
                <meta property="og:title" content="Amazeart - Feed" />
                <meta property="og:description" content="Amazeart posts" />
                <meta property="og:image" content="https://amaze-art.vercel.app/logo.png" />
                {/* Twitter Card metadata */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Amazeart - Feed" />
                <meta name="twitter:description" content="Amazeart posts" />
                <meta name="twitter:image" content="https://amaze-art.vercel.app/logo.png" />
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

            <div className='flex items-center font-noto flex-col gap-0 min-h-[100vh] relative'>
                {createPost && (
                    <div className='   justify-center items-center  w-full shadow-black shadow-2xl'>
                        <CreatePost tokenUserData={tokenUserData} toggleCreatePost={toggleCreatePost} />
                    </div>
                )}

                <div className='feeds justify-between flex xl:flex-wrap max-xl:flex-col gap-10 overflow-y-scroll w-full h-[100vh] pt-[10vh] pb-[30vh] px-[5vw] bg_main2'>
                    {tokenUserData && (
                        <div className='w-full flex gap-4 justify-center items-center'>
                            {tokenUserData?.profilepic ? (
                                <Link href={`/Profile/${tokenUserData?.username}`}>
                                    <img alt={`${tokenUserData?.name}'s Profile pic`} className="rounded-full w-14 h-14" src={tokenUserData?.profilepic} />
                                </Link>
                            ) : (
                                <MdAccountCircle className='rounded-full w-20 h-20 text-gray-400' />
                            )}

                            <button onClick={toggleCreatePost} className='flex justify-center items-center w-3/2 max-md:w-[60vw] bg-white/80 rounded-full  px-4 glassmorphism1 text-gray-200 font-light text-md hover:scale-105 duration-200'>
                                What's in your mind, {tokenUserData.name}
                            </button>
                        </div>
                    )}

                    <div className='feeds xl:flex-wrap justify-center items-start flex max-xl:flex-col gap-10 w-full'>
                        {/* Conditional rendering based on loading state */}
                        {isLoading ? (
                            // Display loading containers while posts are being fetched
                            <>
                                <LoadingContainer />
                                <LoadingContainer />
                                <LoadingContainer />
                                <LoadingContainer />
                                <LoadingContainer />
                                <LoadingContainer />
                                <LoadingContainer />
                                <LoadingContainer />
                            </>
                        ) : (
                            // Render posts once fetched
                            posts.map((post) => <Post key={post._id} post={post} tokenUserData={tokenUserData} />)
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};


export default Feed;
