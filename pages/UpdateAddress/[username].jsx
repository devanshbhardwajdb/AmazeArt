import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { FcGoogle } from "react-icons/fc";
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Lottie from "lottie-react";
import A1 from "@/anime3.json"
import A2 from "@/anime9.json"
import Head from 'next/head';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '@firebase.config';

const Complete = ({ tokenUserData }) => {
    const router = useRouter();

    const { username } = router.query;
    const [userData, setUserData] = useState(null);
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [pincode, setPincode] = useState("")
    const [bio, setBio] = useState("")
    const [profilePic, setProfilePic] = useState("")
    const [coverPic, setCoverPic] = useState("")
    const [isHidden, setIsHidden] = useState(true);
    const [loading, setLoading] = useState(false);
    const [isUsernameValid, setIsUsernameValid] = useState(true);
    const [userExists, setUserExists] = useState(false);




    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (username && username === tokenUserData.username) {
                    // Fetch user data based on the username
                    const res = await fetch(`/api/user/${username}`);
                    const response = await res.json();

                    if (response.success) {
                        const { user } = response;
                        // Check if address and other required fields are already filled
                        if (user.address && user.city && user.state && user.pincode && !router.query.edit) {
                            // Redirect to another page if all required fields are filled
                            router.push(`/UploadProfile/${username}`);
                            setUserData(user);
                        } else {
                            // Set user data if some fields are missing
                            setUserData(user);
                            setAddress(user.address)
                            setCity(user.city)
                            setPincode(user.pincode)
                            setState(user.state)
                            // setLoading(false);
                        }
                    }
                } else if (!username && username === tokenUserData.username) {
                    // Username is not available
                    setUserData(null);
                } else {
                    router.push(`/NotFound`)
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [username, router, tokenUserData]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = {
            username,
            address,
            city,
            state,
            pincode,
        };

        try {
            const res = await fetch('/api/updateaddress', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (data.success) {
                localStorage.setItem('token', data.token);
                toast.success('User address updated successfully', {
                    position: 'top-center',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                if (router.query.edit) {
                    router.push(`/checkout`);

                } else {

                    router.push(`/UploadProfile/${username}`);
                }
            } else {
                toast.error(data.error, {
                    position: 'top-center',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch (error) {
            console.error('Error updating user address:', error);
            toast.error('An error occurred while updating user address', {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        setLoading(false);
    };

    const handleSkip = () => {
        router.push(`/UploadProfile/${username}`);

    }


    return (
        <div className='min-h-[120vh] px-[10vw]  flex  justify-center items-center font-noto  max-md:px-6 max-md:pt-28 '>
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
                theme="dark"
            />
            {/* Same as */}
            <ToastContainer />

            {
                !userData ? (
                    <div className='text-white'>
                        <Lottie animationData={A2} loop={true} className='w-[15vw]' />
                    </div>

                ) : (


                    <form
                        onSubmit={(e) => { handleSubmit(e) }}
                        method='POST'
                        className="flex flex-col  gap-2 items-center    w-full h-auto p-8 rounded-lg shadow-lg shadow-gray-900 duration-150 transition-all font-noto bg-white/5 backdrop-blur-md   glassmorphism">
                        <h3 className="text-white text-2xl font-bold mb-1 text-center">Complete Your Profile <span className='text_main'>{userData.name}</span></h3>

                        <div className="flex mt-6 gap-8  flex-col w-full ">
                            <div className='flex gap-8'>



                                <div className='text-white w-full'>
                                    <h3>Username</h3>
                                    <input
                                        value={username}
                                        readOnly
                                        type="text"
                                        className={`bg-white/15 rounded-lg p-2 focus:outline-none  ${isUsernameValid ? 'border-[#9F07F5]' : 'border-red-500'
                                            } shadow-md border border-[#9F07F5] shadow-[#9F07F5] text-white placeholder-gray-200 w-full `}
                                        placeholder="Username"
                                        name="username"
                                        pattern="[a-zA-Z0-9_]{4,}" // Only allows alphanumeric characters and underscores, minimum length of 4 characters
                                        title="Username must be at least 4 characters long and can only contain letters, numbers, and underscores"
                                        required
                                    />

                                </div>


                                <div className='text-white w-full'>
                                    <h3>Name</h3>
                                    <input
                                        value={userData.name}
                                        readOnly
                                        type="name"
                                        className='rounded-lg p-2 focus:outline-none shadow-md border border-[#9F07F5] shadow-[#9F07F5] bg-white/15 text-white placeholder-gray-200 w-full'
                                        placeholder='Name'
                                        name='name'
                                        required
                                    />
                                </div>
                            </div>
                            <div className='flex gap-8'>
                                <div className='text-white w-full'>
                                    <h3>Email</h3>

                                    <input
                                        value={userData.email}
                                        readOnly
                                        type="email"
                                        className='rounded-lg p-2 focus:outline-none shadow-md border border-[#9F07F5] shadow-[#9F07F5] bg-white/15 text-white placeholder-gray-200 w-full'
                                        placeholder='Email address'
                                        name='email'
                                        required
                                    />
                                </div>
                                <div className='text-white w-full'>
                                    <h3>Phone</h3>
                                    <input
                                        value={userData.phone}
                                        readOnly
                                        type="tel"
                                        className='bg-white/15 rounded-lg p-2 shadow-md border border-[#9F07F5] shadow-[#9F07F5]  text-white placeholder-gray-200 w-full'
                                        placeholder='Mobile'
                                        name='phone'
                                        required
                                    />
                                </div>
                            </div>
                            <div className='flex gap-8'>

                                <div className='text-white w-full'>
                                    <h3>Address</h3>
                                    <textarea
                                        value={address}
                                        onChange={(e) => {

                                            setAddress(e.target.value);

                                        }}
                                        type="text"
                                        className='bg-white/15 rounded-lg p-2 focus:outline-none focus:shadow-md focus:border focus:border-[#9F07F5] focus:shadow-[#9F07F5]  text-white placeholder-gray-200 w-full resize-none'
                                        placeholder='Enter your address'
                                        name='address'
                                        required

                                    />
                                </div>
                                <div className='text-white w-full'>
                                    <h3>City</h3>
                                    <input
                                        value={city}
                                        onChange={(e) => {

                                            setCity(e.target.value);

                                        }}
                                        type="text"
                                        className='bg-white/15 rounded-lg p-2 focus:outline-none focus:shadow-md focus:border focus:border-[#9F07F5] focus:shadow-[#9F07F5]  text-white placeholder-gray-200 w-full resize-none '
                                        placeholder='Enter you City'
                                        name='city'
                                        required
                                    />
                                </div>
                            </div>
                            <div className='flex gap-8'>
                                <div className='text-white w-full'>
                                    <h3>State</h3>
                                    <input
                                        value={state}
                                        onChange={(e) => {

                                            setState(e.target.value);

                                        }}
                                        type="text"
                                        className='bg-white/15 rounded-lg p-2 focus:outline-none focus:shadow-md focus:border focus:border-[#9F07F5] focus:shadow-[#9F07F5]  text-white placeholder-gray-200 w-full'
                                        placeholder='Enter you State'
                                        name='state'
                                        required
                                    />
                                </div>
                                <div className='text-white w-full'>
                                    <h3>Pincode</h3>
                                    <input
                                        value={pincode}
                                        onChange={(e) => {
                                            if (e.target.value.length <= 6) {
                                                setPincode(e.target.value);
                                            }
                                        }}
                                        type="number"
                                        className='bg-white/15 rounded-lg p-2 focus:outline-none focus:shadow-md focus:border focus:border-[#9F07F5] focus:shadow-[#9F07F5]  text-white placeholder-gray-200 w-full'
                                        placeholder='Enter your Pincode'
                                        name='pincode'
                                        required
                                    />
                                </div>
                            </div>





                        </div>

                        <div className='flex flex-col w-full items-end'>
                            <button className='nav-btn   text-white underline text-shadow rounded-lg  transition-all duration-150   flex w-1/2  justify-end items-end px-4 mt-5 hover:text-gray-400' onClick={handleSkip}><p>Skip</p></button>

                            <button className='nav-btn  bg_button1 text-white px-5 py-2 rounded-lg  transition-all duration-150  hover:scale-95  w-full flex  justify-center items-center mt-5' >
                                {
                                    loading ? <Lottie animationData={A1} loop={true} className='w-6' /> :

                                        <p>Continue</p>

                                }

                            </button>
                        </div>


                    </form>)}

        </div>
    )
}

export default Complete