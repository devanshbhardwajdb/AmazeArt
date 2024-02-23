import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { FaArrowDown } from "react-icons/fa";


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
            <div className='  lg:px-[8vw] py-[18vh] flex  items-center   flex-col gap-0'>
                {/* {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`background-${index}`}
                        className={`fixed z-[-117] w-full top-0 transition-opacity duration-1000 ${index === currentImage ? 'opacity-100' : 'opacity-0'
                            }`}
                    />
                ))} */}
                <div className={`fixed z-[-117] bg7-image w-full h-full top-0 transition-opacity  duration-1000 
                        }`}
                ></div>
                <div className='fixed z-[-116] w-full h-full top-0 opacity-15 bg_main'></div>

                

                <div className="flex ">
                    <h1 className='font-metal text-[30vh] max-xl:text-[18vh] max-lg:text-[10vh] max-md:text-[10vh] text_main px-5 backdrop' >Amaze</h1> 
                    <h1 className='font-metal text-[30vh] max-xl:text-[18vh] max-md:text-[10vh] max-lg:text-[10vh] text-white px-5'>Art</h1>
                </div>
                <h2 className='font-swash text-white text-[8vh] max-xl:text-[4vh] max-lg:text-[3vh] max-md:text-[2.54vh]'>A Unified Solution for all Artists !</h2>
                <Link href={'#about'}><button className='bg_button1 px-14 mt-5 py-3 font-belleza text-xl max-md:text-base max-md:px-8 max-md:py-2 rounded-full hover:scale-110 duration-300 button1 hover:shadow-md hover:shadow-black hover:duration-200'>Explore</button></Link>


                {/* <div className='w-24 h-24  flex items-center justify-center rounded-full border-4 bg_border'><Link href={'#about'}><FaArrowDown className=' text-6xl text-white ' /></Link></div> */}

                {/* </div> */}
            </div>
        </>
    );
}

export default Hero;
