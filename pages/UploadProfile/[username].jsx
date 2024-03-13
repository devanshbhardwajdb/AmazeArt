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

const Complete = () => {
    // const router = useRouter();

    // const { username } = router.query;
    // console.log(username)

    // const [userData, setUserData] = useState(null);
    // const [address, setAddress] = useState("")
    // const [city, setCity] = useState("")
    // const [state, setState] = useState("")
    // const [pincode, setPincode] = useState("")
    // const [bio, setBio] = useState("")
    // const [profilePic, setProfilePic] = useState("")
    // const [coverPic, setCoverPic] = useState("")


    // const [isHidden, setIsHidden] = useState(true);
    // const [loading, setLoading] = useState(false);
    // const [isUsernameValid, setIsUsernameValid] = useState(true);
    // const [userExists, setUserExists] = useState(false);



    const router = useRouter();
    const { username } = router.query;

    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', selectedImage);

        try {
            const res = await fetch(`/api/uploadImage/${username}`, {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            console.log(data.imageUrl);
            // Store the image URL in your database
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <div className='min-h-[120vh] px-[10vw]  flex  justify-center items-center font-livvic  max-md:px-6 max-md:pt-28 '>
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

            


                    <div>
                        <h1>Upload Image</h1>
                        <form onSubmit={handleSubmit}>
                            <input type="file" accept="image/*" onChange={handleImageChange} />
                            <button type="submit">Upload</button>
                        </form>
                    </div>

        </div>
    )
}

export default Complete