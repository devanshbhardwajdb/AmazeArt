import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { motion } from 'framer-motion';

const Hero = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const images = ['/bg1.jpg', '/bg2.jpg', '/bg3.jpg', '/bg4.jpg', '/bg6.jpg', '/bg7.jpg', '/bg8.jpg', '/bg11.jpg', '/bg12.jpg', '/bg13.jpg']; // List of images for the slideshow

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 4000); // Change image every 5 seconds

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <>
            <Head>
                <title>Amazeart</title>
            </Head>
            <div className='min-h-[100vh] lg:px-[8vw] pt-[15vh] flex  items-center flex-col gap-0'>
                {/* {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`background-${index}`}
                        className={`fixed z-[-117] w-full top-0 transition-opacity duration-1000 ${index === currentImage ? 'opacity-100' : 'opacity-0'
                            }`}
                    />
                ))} */}
                <img
                   
                    src={'/bg7.jpg'}
                    className={`fixed z-[-117] w-full top-0 transition-opacity duration-1000 
                        }`}
                />
                <div className='fixed z-[-116] w-full h-full top-0 opacity-15 bg_main'></div>

                {/* <div className='relative w-[99.6vw]  h-[100vh] flex items-center justify-center flex-col bg-black/20'> */}

                <div className="flex">
                    <h1 className='font-metal text-[200px] text_main px-5 backdrop' >Amaze</h1>
                    <h1 className='font-metal text-[200px] text-white px-5'>Art</h1>
                </div>
                <h2 className='font-swash text-white text-[55px]'>A Unified Solution for all Artists !</h2>
                <Link href={'#explore'}><button className='bg_button1 px-14 mt-5 py-3 font-belleza text-xl rounded-full hover:scale-110 duration-300 button1 hover:shadow-md hover:shadow-black hover:duration-200'>Explore</button></Link>
                {/* </div> */}
            </div>
        </>
    );
}

export default Hero;
