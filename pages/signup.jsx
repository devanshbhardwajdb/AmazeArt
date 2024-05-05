import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { FcGoogle } from "react-icons/fc";
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Lottie from "lottie-react";
import A1 from "@/anime3.json"
import Head from 'next/head';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '@firebase.config';

const Signup = () => {

    const [username, setUsername] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [isHidden, setIsHidden] = useState(true);
    const [loading, setLoading] = useState(false);
    const [isUsernameValid, setIsUsernameValid] = useState(true);
    const [userExists, setUserExists] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            router.push('/')
        }


    }, [])

    // const handleGoogle = async () => {
    //     try {
    //         setLoading(true);
    //         const provider = new GoogleAuthProvider();
    //         const result = await signInWithPopup(auth, provider);
    //         const user = result.user;

    //         // After successful sign-in, you can generate JWT token and store user data as needed

    //         let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/googlesignup`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(user)
    //         })
    //         let response = await res.json();

    //         if (response.success) {
    //             console.log("HIIII")
    //             let res2 = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/googlelogin`, {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify(user)
    //             })
    //             let response2 = await res2.json();
    //             console.log(response2)
    //             if (response2.success) {

    //                 localStorage.setItem('token', response2.token)
    //                 toast.success('You are Signed in Succesfully', {
    //                   position: "top-center",
    //                   autoClose: 1900,
    //                   hideProgressBar: false,
    //                   closeOnClick: true,
    //                   pauseOnHover: true,
    //                   draggable: true,
    //                   progress: undefined,
    //                   theme: "dark",
    //                 });
    //                 setLoading(false);
          
    //                 setTimeout(() => {
    //                   router.push(`${process.env.NEXT_PUBLIC_HOST}`)
          
    //                 }, 2000);
    //               }
    //               else {
    //                 toast.error(response.error, {
    //                   position: "top-center",
    //                   autoClose: 2000,
    //                   hideProgressBar: false,
    //                   closeOnClick: true,
    //                   pauseOnHover: true,
    //                   draggable: true,
    //                   progress: undefined,
    //                   theme: "dark",
    //                 });
    //                 setLoading(false);
    //               }


               
    //         }

    //         else {
    //             toast.error(response.error, {
    //                 position: "top-center",
    //                 autoClose: 1900,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //                 theme: "dark",
    //             });

    //             setLoading(false);
    //         }

            
    //     } catch (error) {
    //         console.error('Google sign-in error:', error);
    //         setLoading(false);
    //     }
    // };

    useEffect(() => {
        if (username.trim() !== '') { // Check if username is not empty
            const fetchUsername = async () => {
                try {
                    const res = await fetch(`/api/check/${username}`);
                    const data = await res.json();
    
                    if (data.success) {
                        setUserExists(true);
                    } else {
                        setUserExists(false);
                    }
                } catch (error) {
                    console.error('Error checking username:', error);
                }
            };
    
            fetchUsername();
        }
    }, [username]); // Run this effect whenever username changes
    
    



    const handleSubmit = async (e) => {

        setLoading(true);
        e.preventDefault();

        const formBody = { username, name, email, phone, password };


        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formBody)
        })
        let response = await res.json();

        setEmail("")
        setUsername("")
        setPhone("")
        setPassword("")
        if (response.success) {
            toast.success('You are signed up Succesfully', {
                position: "top-center",
                autoClose: 1900,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setLoading(false);

            setTimeout(() => {
                router.push(`${process.env.NEXT_PUBLIC_HOST}/login`)

            }, 2000);
        }

        else {
            toast.error(response.error, {
                position: "top-center",
                autoClose: 1900,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

            setLoading(false);
        }

    }
    return (
        <div className='min-h-[120vh] px-[10vw]  flex  justify-center items-center font-noto  max-md:px-6 max-md:pt-28 '>
            <Head>
                <title>Signup to Amazeart</title>
                {/* Description */}
                <meta name="description" content="Signup to Amazeart" />
                {/* Open Graph metadata for sharing on social media */}
                <meta property="og:title" content="Amazeart" />
                <meta property="og:description" content="Signup to Amazeart" />
                <meta property="og:image" content="https://amaze-art.vercel.app/logo.png" />
                {/* Twitter Card metadata */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Amazeart" />
                <meta name="twitter:description" content="Signup to Amazeart" />
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
            {/* Same as */}
            <ToastContainer />
            <div className='flex flex-col max-lg:hidden items-center justify-center w-1/2  border-r mr-20 h-[50vh]'>
                <div className="flex ">
                    <h1 className='font-metal text-[14vh] max-xl:text-[18vh] max-lg:text-[10vh] max-md:text-[10vh] text_main pl-5 backdrop' >Amaze</h1>
                    <h1 className='font-metal text-[14vh] max-xl:text-[18vh] max-md:text-[10vh] max-lg:text-[10vh] text-white px-5'>Art</h1>
                </div>
                <h2 className='font-swash text-white text-[3vh] max-xl:text-[4vh] max-lg:text-[3vh] max-md:text-[2.54vh]'>Signup to join the creative amazeart community !</h2>
            </div>

            <form
                onSubmit={(e) => { handleSubmit(e) }}
                method='POST'
                className="flex flex-col  gap-2 items-center   md:w-1/2 w-full h-auto p-8 rounded-lg shadow-lg shadow-gray-900 duration-150 transition-all font-noto bg-white/5 backdrop-blur-md   glassmorphism">
                <h3 className="text-white text-2xl font-bold mb-1">Signup to Amazeart</h3>
                <h3 className="text-white text-base font-medium mb-1 cursor-pointer flex gap-1">or  <Link href={'/login'}><p className='text_main text  hover:text-[#9F07F5] hover:underline-offset-4 hover:underline transition-all duration-300 hover:scale-95'>Login</p></Link></h3>
                <div className="flex mt-6 gap-8  flex-col w-full ">
                    <div className='flex flex-col w-full'>
                        <input
                            value={username}
                            onChange={ (e) => {
                                 setUsername(e.target.value);
                                setIsUsernameValid(e.target.validity.valid); // Check if the input matches the pattern
                                 
                            }}
                            type="text"
                            className={`bg-white/15 rounded-lg p-2 focus:outline-none focus:shadow-md focus:border ${isUsernameValid ? 'border-[#9F07F5]' : 'border-red-500'
                                } focus:shadow-[#9F07F5] text-white placeholder-gray-200`}
                            placeholder="Username"
                            name="username"
                            pattern="[a-zA-Z0-9_]{4,}" // Only allows alphanumeric characters and underscores, minimum length of 4 characters
                            title="Username must be at least 4 characters long and can only contain letters, numbers, and underscores"
                            required
                        />
                        {!isUsernameValid && (
                            <p className="text-red-500 text-sm ">Username must be at least 4 characters long and can only contain letters, numbers, and underscores</p>
                        )}
                        {userExists && (
                            <p className="text-red-500 text-sm ">Username already exists</p>
                        )}
                    </div>
                    <input
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}
                        type="name"
                        className='rounded-lg p-2 focus:outline-none focus:shadow-md focus:border focus:border-[#9F07F5] focus:shadow-[#9F07F5] bg-white/15 text-white placeholder-gray-200'
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

                {/* <div className='text-white flex flex-col justify-center items-center'>
                    <h1 className='text-lg'>or</h1>
                    <button onClick={handleGoogle} className='flex gap-1 bg_button1 px-5 py-2 rounded-lg'>
                        <FcGoogle className='text-2xl' />
                        <p>Sign in through google </p>
                    </button>
                </div> */}
            </form>

        </div>
    )
}

export default Signup
