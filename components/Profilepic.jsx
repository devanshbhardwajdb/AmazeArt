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
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Cropper from 'react-easy-crop';


const Profilepic = ({ tokenUserData, togglePopup }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null); // State to store image preview URL
    const router = useRouter();
    const { username } = router.query;
    const [userData1, setUserData1] = useState(null);
    const [loading, setLoading] = useState(false);
    const [imageCrop, setImageCrop] = useState({ x: 0, y: 0 });
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };



    const handleCropChange = (crop, percentCrop) => {
        setCrop(crop);
    };

    const handleZoomChange = (zoom) => {
        setZoom(zoom);
    };

    const handleCrop = async () => {
        try {
            const croppedImageBlob = await getCroppedImageBlob(selectedImage, croppedAreaPixels);
            setCroppedImage(URL.createObjectURL(croppedImageBlob));
        } catch (error) {
            console.error('Error cropping image:', error);
        }
    };

    const getCroppedImageBlob = (image, croppedAreaPixels) => {
        return new Promise((resolve, reject) => {
            const canvas = document.createElement('canvas');
            const scaleX = image.naturalWidth / image.width;
            const scaleY = image.naturalHeight / image.height;
            canvas.width = croppedAreaPixels.width;
            canvas.height = croppedAreaPixels.height;
            const ctx = canvas.getContext('2d');

            ctx.drawImage(
                image,
                croppedAreaPixels.x * scaleX,
                croppedAreaPixels.y * scaleY,
                croppedAreaPixels.width * scaleX,
                croppedAreaPixels.height * scaleY,
                0,
                0,
                croppedAreaPixels.width,
                croppedAreaPixels.height
            );

            canvas.toBlob((blob) => {
                resolve(blob);
            }, 'image/jpeg');
        });
    };


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

                const res = await fetch('/api/updateprofileimage', {
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

    return (
        <div className='flex flex-col text-white justify-center gap-10 items-center w-full p-8 rounded-lg shadow-lg shadow-gray-900 duration-150 transition-all font-noto bg-gray-900 h-[70vh] relative '>
            <div className='flex justify-between'>
                <h3 className="text-white text-2xl font-bold mb-1 text-center">Update your Profile Picture <span className='text_main'>{tokenUserData?.name}</span></h3>
            </div>
            <IoMdCloseCircle className='absolute right-5 top-5 text-3xl cursor-pointer hover:scale-125 duration-200 hover:text-[#9B03F8] text-gray-500' onClick={togglePopup} />
            <form onSubmit={handleSubmit} className='bg-black/80 p-10 rounded-lg flex flex-col gap-4 w-1/2' >
                <div className='flex items-center justify-center'>
                    <input type="file" accept="image/*" onChange={handleImageChange} className='hidden' id="fileInput" required />
                    <label htmlFor="fileInput" className="cursor-pointer bg_button1 hover:bg-blue-700 text-white  py-2 px-4 rounded">
                        Choose File
                    </label>
                    <span className='px-2'>{selectedImage ? selectedImage.name : "No file chosen"}</span>
                </div>
                {selectedImage && (
                    <div className='flex flex-col  bg-red-400' >
                        <Cropper
                            image={URL.createObjectURL(selectedImage)}
                            crop={crop}
                            zoom={zoom}
                            aspect={1 / 1}
                            onCropChange={handleCropChange}
                            onZoomChange={handleZoomChange}
                            onCropComplete={onCropComplete}
                            
                        />
                        <button onClick={handleCrop} >Crop Image</button>
                    </div>
                )}
                {croppedImage && <img src={croppedImage} alt="Cropped" />}
                <button className='nav-btn  bg_button1 text-white px-5 py-2 rounded-lg transition-all duration-150  hover:scale-95  w-full flex  justify-center items-center mt-5' type='submit'>
                    Upload
                </button>
            </form>
        </div>
    )
}

export default Profilepic