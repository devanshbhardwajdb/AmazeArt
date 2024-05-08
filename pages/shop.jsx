import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Post from '@components/Post';
import CreateProduct from '@components/CreateProduct';
import { ToastContainer } from 'react-toastify';
import LoadingContainer from '@components/LoadingContainer';
import Product from '@components/Product';
import { MdAccountCircle } from "react-icons/md";

const Feed = ({ tokenUserData }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [createproduct, setCreateProduct] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // Fetch posts 
                const res = await fetch(`/api/getproducts`);
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

    const toggleCreateProduct = () => {
        setCreateProduct(!createproduct);
    };

    return (
        <>
            <Head>
                <title>Amazeart - Shop</title>
                {/* Description */}
                <meta name="description" content="Amazeart products" />
                {/* Open Graph metadata for sharing on social media */}
                <meta property="og:title" content="Amazeart - shop" />
                <meta property="og:description" content="Amazeart products" />
                <meta property="og:image" content="https://amaze-art.vercel.app/logo.png" />
                {/* Twitter Card metadata */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Amazeart - Shop" />
                <meta name="twitter:description" content="Amazeart products" />
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
                {createproduct && (
                    <div className='   justify-center items-center  w-full shadow-black shadow-2xl'>
                        <CreateProduct tokenUserData={tokenUserData} toggleCreateProduct={toggleCreateProduct} />
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

                            <button onClick={toggleCreateProduct} className='flex justify-center items-center w-3/2 max-md:w-[60vw] bg-white/80 rounded-full  px-4 glassmorphism1 text-gray-200 font-light text-md hover:scale-105 duration-200'>
                                Upload your talent to earn, {tokenUserData?.name}
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
                            posts.map((post) => <Product key={post._id} post={post} tokenUserData={tokenUserData} />)
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};


export default Feed;
