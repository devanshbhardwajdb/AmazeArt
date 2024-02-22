import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Head from 'next/head';
import Lottie from "lottie-react";
import A1 from "@/anime3.json"


const Login = () => {
    const router = useRouter();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");
    const [isHidden, setIsHidden] = useState(true);
    const [loading, setLoading] = useState(false);




    //   const handleSubmit = async (e) => {
    //     setLoading(true);
    //     e.preventDefault();

    //     const formBody = { email, password };


    //     let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(formBody)
    //     })
    //     let response = await res.json();


    //     setEmail("")
    //     setPassword("")


    //     if (response.success) {

    //       localStorage.setItem('token', response.token)
    //       toast.success('You are logged in Succesfully', {
    //         position: "top-center",
    //         autoClose: 1900,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "light",
    //       });
    //       setLoading(false);

    //       setTimeout(() => {
    //         router.push(`${process.env.NEXT_PUBLIC_HOST}`)

    //       }, 2000);
    //     }
    //     else {
    //       toast.error(response.error, {
    //         position: "top-center",
    //         autoClose: 2000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "light",
    //       });
    //       setLoading(false);
    //     }

    //   }
    return (
        <div className='min-h-[100vh]  flex justify-center items-center font-belleza  max-md:px-6 max-md:pt-28 '>
            <Head><title>Login to Amazeart</title></Head>
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
                className="flex flex-col gap-2 items-center   md:w-1/2 w-full h-auto p-8 rounded-lg shadow-lg shadow-gray-900 duration-150 transition-all font-belleza bg-black/0 border border-gray-300  ">
                <h3 className="text-white text-2xl font-bold mb-1">Login to your account</h3>
                <h3 className="text-white text-lg font-medium mb-1 cursor-pointer flex gap-1">or  <Link href={'/signup'}><p className='text-[#9F07F5]  hover:text-[#9F07F5] hover:underline-offset-4 hover:underline transition-all duration-300 hover:scale-95'>Signup</p></Link></h3>
                <div className="flex mt-6 gap-8  flex-col w-full ">
                    <input
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                        type="email"
                        className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:shadow-md focus:border focus:border-[#9F07F5] focus:shadow-[#9F07F5] bg-transparent text-white'
                        placeholder='Email address'
                        name='email'
                        required
                    />

                    <div className=' relative  rounded-lg   flex w-full  items-center justify-between'>


                        <input
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                            type={`${isHidden ? "password" : "visible"}`}
                            className='border  border-gray-300 rounded-lg  p-2 w-full focus:outline-none focus:shadow-md focus:border focus:border-[#9F07F5] focus:shadow-[#9F07F5] bg-transparent text-white'

                            placeholder='Password'
                            name='password'
                            required
                        />
                        {isHidden ?

                            (<AiFillEyeInvisible
                                onClick={() => { setIsHidden(false) }}
                                className='cursor-pointer w-7 h-7 text-gray-200 absolute right-3  '
                            />)
                            :
                            (<AiFillEye
                                onClick={() => { setIsHidden(true) }}
                                className='cursor-pointer w-7 h-7 text-[#9F07F5] absolute right-3 '
                            />)


                        }
                    </div>
                </div>
                <div className="flex justify-end w-full items-center mt-5">
                    {/* <div>
            <input type="checkbox" name='remember' className=' w-[15px] h-[15px] rounded cursor-pointer bg-[#d1fffe] border-[#9F07F5] text-[#9F07F5] focus:ring-0 focus:outline-none ' />
            <label htmlFor="remember" className='text-sm pl-1'>Remember me</label>
          </div> */}

                    <p className='text-[#9F07F5] cursor-pointer hover:text-[#9F07F5] hover:underline-offset-4 hover:underline transition-all duration-300 hover:scale-95'><Link href={'/forgot'}>Forgot Password?</Link></p>
                </div>
                <button className='nav-btn  bg_button1 text-white px-5 py-2 rounded-lg  transition-all duration-150  hover:scale-95  hover:shadow-lg  w-full flex  justify-center items-center' >
                    {
                        loading ? <Lottie animationData={A1} loop={true} className='w-6' /> :

                            <p>Login</p>

                    }

                </button>
            </form>

        </div>
    )
}

export default Login
