import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { FcGoogle } from "react-icons/fc";
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Lottie from "lottie-react";
import A1 from "@/anime3.json";
import Head from 'next/head';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '@firebase.config';

const Complete = ({ tokenUserData }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null); // State to store image preview URL
    const router = useRouter();
    const { username } = router.query;
    const [tokenUserData1, settokenUserData1] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
        // Create a preview URL for the selected image
        const previewURL = URL.createObjectURL(file);
        setImagePreview(previewURL);
    };


    useEffect(() => {
        const fetchtokenUserData = async () => {
            try {
                if (username && username === tokenUserData.username) {
                    // Fetch user data based on the username
                    const res = await fetch(`/api/user/${username}`);
                    const response = await res.json();

                    if (response.success) {
                        const { user } = response;
                        // Check if address and other required fields are already filled
                        if (user.profilepic) {
                            // Redirect to another page if all required fields are filled
                            router.push(`/UploadCover/${username}`);
                        } else {
                            // Set user data if some fields are missing
                            settokenUserData1(user);
                            setLoading(false);
                        }
                    }
                } else {
                    // Username is not available
                    settokenUserData1(null);
                    router.push(`/NotFound`)
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchtokenUserData();
    }, [username, router]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('image', selectedImage);

        try {
            const res = await fetch('/api/uploadimage', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            const { imageUrl } = data;

            if (imageUrl) {
                const updatedtokenUserData = { username, imageUrl };

                const res = await fetch('/api/updateprofileimage', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedtokenUserData),
                });

                const response = await res.json();

                if (response.success) {
                    // Store the new token in localStorage
                    localStorage.setItem('token', response.token);
                    toast.success('User profilepic updated successfully', {
                        position: 'top-center',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                    // Redirect to another page
                    router.push(`/UploadCover/${username}`);
                } else {
                    toast.error(response.error || 'Failed to update token', {
                        position: 'top-center',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            } else {
                toast.error('Image URL not received from the server', {
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
            console.error('Error uploading image:', error);
            toast.error('An error occurred while uploading image', {
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
        router.push(`/UploadCover/${username}`);

    }

    return (
        <div className="min-h-[100vh] px-[10vw] flex justify-center items-center font-noto max-md:px-6 max-md:pt-28">
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

            <div className='flex flex-col text-white justify-center   gap-10 items-center    w-full  p-8 rounded-lg shadow-lg shadow-gray-900 duration-150 transition-all font-noto bg-white/5 backdrop-blur-md   glassmorphism '>
                <h3 className="text-white lg:text-2xl max-lg:text-xl font-bold mb-1 text-center">Upload your Profile Picture <span className='text_main'>{tokenUserData?.name}</span></h3>
                <form onSubmit={handleSubmit} className='bg-black/80 p-10 rounded-lg flex flex-col gap-4 lg:w-1/2' >
                    {/* Style the input field */}
                    <div className='flex items-center justify-center  '>
                        <input type="file" accept="image/*" onChange={handleImageChange} className='hidden' id="fileInput" required />
                        {/* Style the label to resemble a button */}
                        <label htmlFor="fileInput" className="cursor-pointer bg_button1 hover:bg-blue-700 text-white  py-2 px-4 rounded">
                            Choose File
                        </label>

                        {/* Display the selected file name (optional) */}
                        <span className='px-2'>{selectedImage ? selectedImage.name : "No file chosen"}</span>
                        {/* Display the image preview */}
                    </div>
                    {imagePreview && <img src={imagePreview} alt="Preview" className=" w-36 h-auto mx-auto mb-4" />}

                    <div className='flex flex-col items-end'>

                        <button className='nav-btn   text-white underline text-shadow rounded-lg  transition-all duration-150   flex w-1/2  justify-end items-end px-4 mt-5 hover:text-gray-400' onClick={handleSkip}><p>Skip</p></button>

                        <button className='nav-btn  bg_button1 text-white px-5 py-2 rounded-lg  transition-all duration-150  hover:scale-95  w-full flex  justify-center items-center mt-5' type='submit' >
                            {
                                loading ? <Lottie animationData={A1} loop={true} className='w-6' /> :

                                    <p>Upload</p>

                            }

                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Complete;
