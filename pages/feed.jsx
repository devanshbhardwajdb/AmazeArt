import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Post from '@components/Post';
import CreatePost from '@components/CreatePost';

const Feed = ({ tokenUserData }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [posts, setPosts] = useState([]);
    const [createPost, setCreatePost] = useState(true)



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

    const toggleCreatePost = () => {
        setCreatePost(!createPost)
    }

    return (
        <>
            <Head>
                <title>Amazeart - Feed</title>
            </Head>

            <div className='lg:px-[8vw] pt-[10vh] flex  items-center font-noto   flex-col gap-0 min-h-[100vh]  '>
                {
                    createPost && <div className='fixed z-30 top-36 justify-center items-center top-  w-full shadow-black shadow-2xl '>
                        <CreatePost tokenUserData={tokenUserData} toggleCreatePost={toggleCreatePost} />
                    </div>
                }

                {tokenUserData ? <div className=' w-[60vw] flex gap-4 justify-center'>
                    {tokenUserData.profilepic ?
                        <Link href={`/Profile/${tokenUserData.username}`} className=''><img alt={`${tokenUserData?.name}'s Profile pic`} className="rounded-full w-20 h-20" src={tokenUserData?.profilepic} ></img></Link>


                        :

                        <MdAccountCircle className='rounded-full w-20 h-20 text-gray-500' />
                    }


                    <button onClick={toggleCreatePost} className='flex justify-center items-center py-4 px-10 bg-gray-600 rounded-full hover:scale-95 duration-200 hover:bg-gray-500 '>What's in your mind {tokenUserData.name} </button>



                </div> : <>

                </>


                }


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
