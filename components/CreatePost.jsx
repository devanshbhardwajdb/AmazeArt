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


const CreatePost = ({ tokenUserData, toggleCreatePost }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null); // State to store image preview URL
    const router = useRouter();
    // const { username } = router.query;
    const [userData1, setUserData1] = useState(null);
    const [loading, setLoading] = useState(false);
    const [caption, setCaption] = useState("")

    const { username, profilepic, name } = tokenUserData;

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
        // Create a preview URL for the selected image
        const previewURL = URL.createObjectURL(file);
        setImagePreview(previewURL);
    };
    const handleCreatePost = async (e) => {
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
            const contentUrl = imageUrl;

            if (contentUrl) {
                
                const updatedUserData = { name, username, contentUrl, caption, profilepic };

                const res = await fetch('/api/createpost', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedUserData),
                });

                const response = await res.json();

                if (response.success) {
                    // Store the new token in localStorage
                    // localStorage.setItem('token', response.token);
                    toast.success('Posted Successfully !', {
                        position: 'top-center',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                    // Redirect to another page
                    toggleCreatePost();
                    window.location.reload();
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
                toast.error('Failed to upload !', {
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
            console.error('Error uploading', error);
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
        setCaption("")
        setLoading(false);
    };

    useEffect(() => {
        // Disable scrolling on the body when the component mounts
        document.body.style.overflow = 'hidden';

        // Re-enable scrolling on the body when the component unmounts
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <div className='fixed inset-0 flex justify-center items-center z-50'>
            <div className='flex flex-col text-white justify-center gap-10 items-center w-[60vw] p-8 rounded-lg shadow-sm shadow-gray-900 duration-150 transition-all font-noto bg-gray-900 h-[80vh] relative'>
                <div className='flex justify-between'>
                    <h3 className="text-white text-2xl font-bold mb-1 text-center">Create a new Post! <span className='text_main'>{tokenUserData?.name}</span></h3>
                </div>
                <IoMdCloseCircle className='absolute right-5 top-5 text-3xl cursor-pointer hover:scale-125 duration-200 hover:text-[#9B03F8] text-gray-500' onClick={toggleCreatePost} />
                <form onSubmit={handleCreatePost} className='bg-black/80 p-10 rounded-lg flex flex-col gap-4 w-1/2'>
                    {/* Style the input field */}
                    <div className='flex flex-col gap-6 items-center justify-center '>
                        <textarea type="text" placeholder='Write the Caption' className='bg-black/80 p-4 rounded-md focus:outline-none focus:shadow-md focus:shadow-[#9F07F5] text-white border-[#9F07F5] focus:border placeholder-gray-200 resize-none flex justify-center items-center create_text w-full' onChange={(e) => { setCaption(e.target.value) }} required />
                        <div className='flex justify-between items-center  w-full '>
                            <input type="file" accept="image/*, video/*" onChange={handleImageChange} className='hidden' id="fileInput" required />
                            {/* Style the label to resemble a button */}
                            <label htmlFor="fileInput" className="cursor-pointer bg_button1 hover:bg-blue-700 text-white  py-2 px-4 rounded">
                                Choose Photo/Video
                            </label>
                            {/* Display the selected file name (optional) */}
                            <span className='px-2'>{selectedImage ? selectedImage.name : "No file chosen"}</span>
                        </div>
                    </div>
                    {imagePreview && <img src={imagePreview} alt="Preview" className=" w-36 h-auto mx-auto mb-4" />}
                    <button className='nav-btn bg_button1 text-white px-5 py-2 rounded-lg transition-all duration-150 hover:scale-95 w-full flex justify-center items-center mt-5' type='submit' >
                        {loading ? <Lottie animationData={A1} loop={true} className='w-6' /> : <p>Post</p>}
                    </button>
                </form>
            </div>
            {/* Backdrop element */}
            <div className="fixed inset-0 bg-black z-[-1] opacity-70"></div>
        </div>
    )
}

export default CreatePost;
