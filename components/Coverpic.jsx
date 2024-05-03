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
import { IoMdCloseCircle } from "react-icons/io";


const Coverpic = ({ tokenUserData, togglePopup2 }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null); // State to store image preview URL
    const router = useRouter();
    const { username } = router.query;
    const [userData1, setUserData1] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
        // Create a preview URL for the selected image
        const previewURL = URL.createObjectURL(file);
        setImagePreview(previewURL);
    };
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
                const updatedUserData = { username, imageUrl };

                const res = await fetch('/api/updatecoverimage', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedUserData),
                });

                const response = await res.json();

                if (response.success) {
                    // Store the new token in localStorage
                    localStorage.setItem('token', response.token);
                    toast.success('User coverpic updated successfully', {
                        position: 'top-center',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                    // Redirect to another page
                    // router.push(`/Profile/${username}`);
                    // togglePopup();
                    router.reload();
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

    return (
        <div className='flex flex-col text-white justify-center   gap-10 items-center    w-full  p-8 rounded-lg duration-150 transition-all font-noto bg-gray-900 h-[70vh] relative '>
            <div className="fixed inset-0 bg-black z-[-1] opacity-70"></div>
            
            <div className='flex justify-between'>

                <h3 className="text-white text-2xl font-bold mb-1 text-center">Update your Cover Picture <span className='text_main'>{tokenUserData?.name}</span></h3>

            </div>
            <IoMdCloseCircle className='absolute right-5 top-5 text-3xl cursor-pointer hover:scale-125 duration-200 hover:text-[#9B03F8] text-gray-500' onClick={togglePopup2} />

            <form onSubmit={handleSubmit} className='bg-black/80 p-10 rounded-lg flex flex-col gap-4 w-1/2 max-lg:w-full' >
                {/* Style the input field */}
                <div className='flex items-center justify-center '>
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
                <button className='nav-btn  bg_button1 text-white px-5 py-2 rounded-lg  transition-all duration-150  hover:scale-95  w-full flex  justify-center items-center mt-5' type='submit' >
                    {
                        loading ? <Lottie animationData={A1} loop={true} className='w-6' /> :

                            <p>Upload</p>

                    }

                </button>
            </form>
        </div>
    )
}

export default Coverpic