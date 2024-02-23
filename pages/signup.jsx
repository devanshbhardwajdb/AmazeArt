import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Lottie from "lottie-react";
import A1 from "@/anime3.json"
import Head from 'next/head';

const Signup = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [isHidden, setIsHidden] = useState(true);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // useEffect(() => {
    //     if (localStorage.getItem('token')) {
    //         router.push('/')
    //     }


    // }, [])



    // const handleSubmit = async (e) => {
    //     setLoading(true);
    //     e.preventDefault();

    //     const formBody = { name, email, phone, password };


    //     let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(formBody)
    //     })
    //     let response = await res.json();

    //     setEmail("")
    //     setName("")
    //     setPhone("")
    //     setPassword("")
    //     if (response.success) {
    //         toast.success('You are signed up Succesfully', {
    //             position: "top-center",
    //             autoClose: 1900,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "light",
    //         });
    //         setLoading(false);

    //         setTimeout(() => {
    //             router.push(`${process.env.NEXT_PUBLIC_HOST}/login`)

    //         }, 2000);
    //     }

    //     else {
    //         toast.error(response.error, {
    //             position: "top-center",
    //             autoClose: 1900,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "light",
    //         });

    //         setLoading(false);
    //     }

    // }
    return (
        <div className='min-h-[100vh]  flex justify-center items-center font-belleza  max-md:px-6 pt-36 max-md:pt-64 pb-20'>
            <Head><title>Signup to Amazeart</title></Head>
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
                theme="light"
            />
            {/* Same as */}
            <ToastContainer />
            <form
                onSubmit={(e) => { handleSubmit(e) }}
                method='POST'
                className="flex flex-col gap-2 items-center   md:w-1/2 w-full h-auto p-8 rounded-lg shadow-lg shadow-gray-900 duration-150 transition-all font-belleza bg-white/5 backdrop-blur-md glassmorphism ">
                <h3 className="text-white text-2xl font-bold mb-1">Signup to Tech Wear</h3>
                <h3 className="text-white text-base font-medium mb-1 cursor-pointer flex gap-1">or  <Link href={'/login'}><p className='text_main text  hover:text-[#9F07F5] hover:underline-offset-4 hover:underline transition-all duration-300 hover:scale-95'>Login</p></Link></h3>
                <div className="flex mt-6 gap-8  flex-col w-full ">
                    <input
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}
                        type="name"
                        className='bg-white/15 rounded-lg p-2 focus:outline-none focus:shadow-md focus:border focus:border-[#9F07F5] focus:shadow-[#9F07F5] text-white placeholder-gray-200'
                        placeholder='Name'
                        name='name'
                        required
                    />
                    <input
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                        type="email"
                        className='rounded-lg p-2 focus:outline-none focus:shadow-md focus:border focus:border-[#9F07F5] focus:shadow-[#9F07F5] bg-white/15 text-white placeholder-gray-200'
                        placeholder='Email address'
                        name='email'
                        required
                    />
                    <input
                        value={phone}
                        onChange={(e) => {
                            if (e.target.value.length <= 10) {
                                setPhone(e.target.value);
                            }
                        }}
                        type="tel"
                        className='bg-white/15 rounded-lg p-2 focus:outline-none focus:shadow-md focus:border focus:border-[#9F07F5] focus:shadow-[#9F07F5]  text-white placeholder-gray-200'
                        placeholder='Mobile'
                        name='phone'
                        required
                    />

                    <div className=' relative  rounded-lg   flex w-full  items-center justify-between '>


                        <input
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                            type={`${isHidden ? "password" : "visible"}`}
                            className='bg-white/15 text-white  rounded-lg  p-2 w-full focus:outline-none focus:shadow-md focus:border focus:border-[#9F07F5] focus:shadow-[#9F07F5] placeholder-gray-200'

                            placeholder='Password'
                            name='password'
                            required
                        />
                        {isHidden ?

                            (<AiFillEyeInvisible
                                onClick={() => { setIsHidden(false) }}
                                className='cursor-pointer w-7 h-7 text-white absolute right-3  '
                            />)
                            :
                            (<AiFillEye
                                onClick={() => { setIsHidden(true) }}
                                className='cursor-pointer w-7 h-7 text-[#9F07F5] absolute right-3  '
                            />)


                        }
                    </div>


                </div>

                <button className='nav-btn  bg_button1 text-white px-5 py-2 rounded-lg  transition-all duration-150  hover:scale-95  w-full flex  justify-center items-center mt-5' >
                    {
                        loading ? <Lottie animationData={A1} loop={true} className='w-6' /> :

                            <p>Signup</p>

                    }

                </button>
            </form>

        </div>
    )
}

export default Signup
