import React from 'react'
import Lottie from "lottie-react";
import A1 from "@/anime8.json"
import Head from 'next/head';

const NotFound = () => {
    return (

        <>
        <Head><title>Page not found</title></Head>
        <div className='min-h-[90.8vh] flex justify-center items-center'>
            <Lottie animationData={A1} loop={true} className='w-[40vw]' />
        </div>
        </>
    )
}

export default NotFound