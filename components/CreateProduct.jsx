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
import Select from 'react-select';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '@firebase.config';
import { IoMdCloseCircle } from "react-icons/io";


const CreateProduct = ({ tokenUserData, toggleCreateProduct }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const router = useRouter();
    const [userData1, setUserData1] = useState(null);
    const [loading, setLoading] = useState(false);
    const [caption, setCaption] = useState("")
    const [price, setPrice] = useState()

    const [productTitle, setProductTitle] = useState("")
    const [productType, setProductType] = useState("")

    const { username, profilepic, name } = tokenUserData;


    const options = [
        { value: 'Music', label: 'Music' },
        { value: 'Art', label: 'Art' },
        { value: 'Cinematic Video', label: 'Cinematic Video' },
        { value: 'Sketch', label: 'Sketch' },
        { value: 'Hand Craft', label: 'Hand Craft' },
        { value: 'Choreography', label: 'Choreography' },
        { value: 'Beats', label: 'Beats' },
        { value: 'Photo', label: 'Photo' },
        // Add more options here...
    ];


    const handleChange = (selectedOption) => {
        setProductType(selectedOption);
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        // Create a preview URL for the selected file
        const previewURL = URL.createObjectURL(file);
        setFilePreview(previewURL);
    };

    const handleCreatePost = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        if (selectedFile.type.startsWith('image')) {

            formData.append('image', selectedFile);
        }
        else {
            formData.append('video', selectedFile);
        }

        try {
            const res = await fetch(selectedFile.type.startsWith('image') ? '/api/uploadimage' : '/api/uploadvideo', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            // console.log(data)
            const { imageUrl, videoUrl } = data;
            const contentUrl = imageUrl || videoUrl;

            if (contentUrl) {

                const updatedUserData = { name, username,productTitle,productType,price, contentUrl, caption, profilepic };

                const res = await fetch('/api/createproduct', {
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
                    toast.success('Uploaded Successfully !', {
                        position: 'top-center',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                    // Redirect to another page
                    toggleCreateProduct();
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
            toast.error('An error occurred while uploading file', {
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

    // useEffect(() => {
    //     // Disable scrolling on the body when the component mounts
    //     document.body.style.overflow = 'hidden';

    //     // Re-enable scrolling on the body when the component unmounts
    //     return () => {
    //         document.body.style.overflow = 'auto';
    //     };
    // }, []);

    return (
        <div className='absolute  w-full flex justify-center items-center z-50 mt-[10vh] ' >
            <div className='flex flex-col text-white justify-center gap-10 items-center lg:w-[60vw] w-[90vw]  p-8 rounded-lg shadow-sm shadow-gray-900 duration-150 transition-all font-noto bg-gray-900 xl:min-h-[80vh] min-h-[60vh] relative '>
                <div className='flex justify-between'>
                    <h3 className="text-white lg:text-2xl text-lg font-bold mb-1 text-center">Upload a new Product! <span className='text_main'>{tokenUserData?.name}</span></h3>
                </div>
                <IoMdCloseCircle className='absolute right-5 top-5 text-3xl cursor-pointer hover:scale-125 duration-200 hover:text-[#9B03F8] text-gray-500' onClick={toggleCreateProduct} />
                <form onSubmit={handleCreatePost} className='bg-black/80 p-10 rounded-lg flex flex-col gap-4 lg:w-1/2'>
                    {/* Style the input field */}
                    <div className='flex flex-col gap-6 items-center justify-center '>
                        <input
                            value={productTitle}
                            onChange={(e) => { setProductTitle(e.target.value) }}
                            type="text"
                            className={`bg-black/80 p-3 rounded-md focus:outline-none focus:shadow-md focus:shadow-[#9F07F5] text-white border-[#9F07F5] focus:border placeholder-gray-200 resize-none flex justify-center items-center create_text w-full `}
                            placeholder="Product Title"
                            name="title"
                            required
                        />
                        <Select
                            value={productType}
                            onChange={handleChange}
                            options={options}
                            isSearchable
                            className='bg-black/80 rounded-lg p-2 focus:outline-none focus:shadow-md focus:border focus:border-[#9F07F5] focus:shadow-[#9F07F5] text-white placeholder-gray-200 w-full'
                            placeholder="Select or search product type..."
                            required
                        />
                        <input
                            value={price}
                            onChange={(e) => { setPrice(e.target.value) }}
                            type="number"
                            className={`bg-black/80 p-3 rounded-md focus:outline-none focus:shadow-md focus:shadow-[#9F07F5] text-white border-[#9F07F5] focus:border placeholder-gray-200 resize-none flex justify-center items-center create_text w-full `}
                            placeholder="Enter the price of product"
                            name="price"
                            required
                        />
                        <textarea type="text" placeholder='Enter the Description' className='bg-black/80 p-4 rounded-md focus:outline-none focus:shadow-md focus:shadow-[#9F07F5] text-white border-[#9F07F5] focus:border placeholder-gray-200 resize-none flex justify-center items-center create_text w-full' onChange={(e) => { setCaption(e.target.value) }} required />
                        <div className='flex justify-between items-center  w-full '>
                            <input type="file" accept="image/*, video/*" onChange={handleFileChange} className='hidden' id="fileInput" required />
                            {/* Style the label to resemble a button */}
                            <label htmlFor="fileInput" className="cursor-pointer bg_button1 hover:bg-blue-700 text-white  py-2 px-4 rounded">
                                Choose Photo/Video
                            </label>
                            {/* Display the selected file preview (image or video) */}
                            {selectedFile && (
                                <div className='px-2'>
                                    {selectedFile.type.startsWith('image') ? (
                                        <img src={filePreview} alt="Preview" className=" w-36 h-auto mx-auto mb-4" />
                                    ) : (
                                        <video controls className="w-36 h-auto mx-auto mb-4">
                                            <source src={filePreview} type={selectedFile.type} />
                                        </video>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <button className='nav-btn bg_button1 text-white px-5 py-2 rounded-lg transition-all duration-150 hover:scale-95 w-full flex justify-center items-center mt-5' type='submit' >
                        {loading ? <Lottie animationData={A1} loop={true} className='w-6' /> : <p>Upload</p>}
                    </button>
                </form>
            </div>
            {/* Backdrop element */}
            <div className="fixed inset-0 bg-black z-[-1] opacity-70"></div>
        </div>
    )
}

export default CreateProduct;
