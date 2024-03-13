import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Post from '@components/Post';

const Feed = () => {
    const [isLiked, setIsLiked] = useState(false);
    const [posts, setPosts] = useState([]);

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

    const handleLike = () => {
        setIsLiked(!isLiked);
    };

    return (
        <>
            <Head>
                <title>Amazeart - Feed</title>
            </Head>

            <div className='lg:px-[8vw]  flex  items-center   flex-col gap-0 min-h-[100vh]  '>

                <div className={`fixed z-[-117] bg7-image w-full h-full top-0 transition-opacity  duration-1000 }`}
                ></div>
                <div className='fixed z-[-116] w-full h-full top-0 opacity-15 bg_main'></div>

                <div className='feeds flex flex-col gap-10  backdrop-blur-xl shadow-black shadow-md overflow-y-scroll lg:w-[60vw] h-[100vh] py-[20vh] px-[5vw]'>


                    {posts.map((post) => (
                        <Post key={post._id} post={post} />
                    ))}


                </div>


            </div>

        </>
    );
};

export default Feed;
