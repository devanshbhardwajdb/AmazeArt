import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Explore from './explore'
import { motion } from 'framer-motion';
import { slideIn, textVariant2, navVariants, slideIn2, slideIn3 } from "@/utils/motion";
import { FaArrowDown } from "react-icons/fa";
import A1 from "@/robo_anime.json"
import A2 from "@/art_anime.json"
import Lottie from "lottie-react";


const Hero = () => {




    return (
        <>
            <Head>
                <title>Amazeart</title>
                {/* Description */}
                <meta name="description" content="A Unified Solution for all Artists!" />
                {/* Open Graph metadata for sharing on social media */}
                <meta property="og:title" content="Amazeart" />
                <meta property="og:description" content="A Unified Solution for all Artists!" />
                <meta property="og:image" content="https://amaze-art.vercel.app/logo.png" />
                {/* Twitter Card metadata */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Amazeart" />
                <meta name="twitter:description" content="A Unified Solution for all Artists!" />
                <meta name="twitter:image" content="https://amaze-art.vercel.app/logo.png" />
            </Head>
            <motion.div className='  lg:px-[8vw] min-h-[90vh] xl:py-[25vh] py-[10vh]  max-lg:flex-col   flex w-full  items-center justify-center  gap-8'>
                {/* <div className={`fixed z-[-117] bg7-image w-full h-full top-0 transition-opacity  duration-1000 
                        }`}
                ></div> */}

                <video src='/space2.mp4' className='fixed z-[-117] opacity-50 top-0 left-0 w-full h-full object-cover ' loop autoPlay muted  ></video>

                {/* <Lottie animationData={A1} loop={true} className='w-[30vw] fixed left-50 -z-10 opacity-50 top-50' /> */}

                {/* <div className='fixed z-[-116] w-full h-full top-0 opacity-15 bg_main'></div> */}

                <div className='flex flex-col items-center bg    xl:w-1/2'>

                    <motion.div className="flex relative ">
                        <motion.h1
                            variants={slideIn3('left', "tween", 0, 1.0)}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: false, amount: 0.9 }}
                            className='font-metal text-[20vh] max-xl:text-[18vh] max-lg:text-[10vh] max-md:text-[10vh] text_main pl-5 backdrop  ' >Amaze</motion.h1>
                        <motion.h1
                            variants={slideIn3('left', "tween", 0, 1.0)}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: false, amount: 0.9 }}
                            className='font-metal absolute text-[20vh] max-xl:text-[18vh] max-lg:text-[10vh] max-md:text-[10vh] opacity-10  pl-5 z-[-1] text-shadow' >Amaze</motion.h1>
                        <motion.h1
                            variants={slideIn3('right', "tween", 0, 1.0)}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: false, amount: 0.9 }}
                            className='font-metal text-[20vh] max-xl:text-[18vh] max-md:text-[10vh] max-lg:text-[10vh] text-white px-5 text-shadow '>Art</motion.h1>
                    </motion.div>


                    <motion.h2
                        variants={slideIn3('top', "tween", 0, 2.0)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: false, amount: 0.9 }}
                        className='font-swash  text-white text-[6vh] max-xl:text-[4vh] max-lg:text-[2.4vh] max-md:text-[2vh] text-shadow'>A Unified Solution for all Artists !</motion.h2>


                    <Link href={'/feed'}><motion.button
                        variants={slideIn3('bottom', "tween", 0, 1.0)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: false, amount: 0.9 }}
                        className='bg_button1 px-10 mt-5 py-3 font-noto text-lg max-md:text-xs max-md:px-4 max-md:py-2 rounded-full hover:scale-110 duration-300 button1 hover:shadow-md hover:shadow-black hover:duration-200 text-white text-shadow2 '>Explore</motion.button></Link>

                </div>
                <Explore />
            </motion.div>
        </>
    );
}

export default Hero;
