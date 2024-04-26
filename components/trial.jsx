
<div className="flex h-full w-full gap-1 text-2xl relative text-white" >

<div className='bg-white/80 h-full w-[5vw] rounded-b-lg '></div>
<div className='bg-black/80 h-full w-[5vw] rounded-b-lg '></div>
<div className='bg-white/80 h-full w-[5vw] rounded-b-lg '></div>
<div className='bg-black/80 hover:bg-black hover:scale-125 duration-300 h-full w-[5vw] cursor-pointer rounded-b-lg flex items-center justify-center '><img src="/logo.png" alt="logo" height={40} width={40} /></div>
<div className='bg-white/80 h-full w-[5vw] rounded-b-lg '></div>
<div className='bg-white/80 h-full w-[5vw] rounded-b-lg '></div>


<Link href={'/'} className='  '><div className={` bg-black/80  h-full w-[5vw] rounded-b-lg flex items-center justify-center  duration-300   ${page==='home'?'scale-125':'hover:scale-125'} ${page==='home'?'bg-black':'hover:bg-black'}` }><AiFillHome /></div></Link>

<div className='bg-white/80 h-full w-[5vw] rounded-b-lg '></div>


<Link href={'/feed'} className='  '><div className={`bg-black/80  h-full w-[5vw] rounded-b-lg flex items-center justify-center  duration-300 ${page==='feed'?'scale-125':'hover:scale-125'} ${page==='feed'?'bg-black':'hover:bg-black'}`}><BsFilePostFill /></div></Link>


<div className='bg-white/80 h-full w-[5vw] rounded-b-lg '></div>


<Link href={'/products'} className='  '><div className={`bg-black/80   h-full w-[5vw] rounded-b-lg flex items-center justify-center  duration-300 ${page==='products'?'scale-125':'hover:scale-125'} ${page==='products'?'bg-black':'hover:bg-black'}`}><FaBagShopping /></div></Link>

<div className='bg-white/80 h-full w-[5vw] rounded-b-lg '></div>
</div>
<div className="flex h-full w-full gap-1 text-white">
<div className='bg-white/80 h-full w-[5vw] rounded-b-lg '></div>
<Link href={'/login'}><div className='bg-black/80 h-full w-[5vw] rounded-b-lg  flex items-center justify-center hover:scale-125 duration-300 hover:bg-black'><button className='bg-transparent rounded-b-xl text-lg  font-noto w-full h-full    '>Login</button></div></Link>


<div className='bg-white/80 h-full w-[5vw] rounded-b-lg '></div>


<Link href={'/signup'}><div className='bg-black/80 h-full w-[5vw] rounded-b-lg   flex items-center justify-center hover:scale-125 duration-300 hover:bg-black'><button className='bg-transparent rounded-b-xl text-lg  font-noto w-full h-full   hover:bg_main  '>Signup</button></div></Link>


<div className='bg-white/80 h-full w-[5vw] rounded-b-lg '></div>
<div className='bg-white/80 h-full w-[5vw] rounded-b-lg '></div>
<div className='bg-black/80 h-full w-[5vw] rounded-b-lg '></div>
<div className='bg-white/80 h-full w-[5vw] rounded-b-lg '></div>
<div className='bg-black/80 h-full w-[5vw] rounded-b-lg '></div>
<div className='bg-white/80 h-full w-[5vw] rounded-b-lg '></div>
<div className='bg-black/80 h-full w-[5vw] rounded-b-lg '></div>
<div className='bg-white/80 h-full w-[5vw] rounded-b-lg '></div>
</div>








     {/* THIS IS MOBILE SUPPORTED LINKS */}
     <div ref={ref} className={`flex fixed max-sm:w-[50vw] top-[12vh] max-md:top-[9vh] w-[40vw] p-5  right-0 flex-col    items-start gap-6 font-dark   nav-right  duration-500 translate-x-full transform transition-transform  lg:hidden shadow-md shadow-black  ${navbarBackground === 'transparent' ? 'bg-transparent' : 'bg-black/70 '}  `}>
     <Link href={'/'} className=' hover:text-3xl duration-300 '><h1>Home</h1></Link>
     <Link href={'/feed'} className=' hover:text-3xl duration-300 py-2'><h1>Feed</h1></Link>
     <Link href={'/products'} className=' hover:text-3xl duration-300 '><h1>Products</h1></Link>
     <Link href={'/#about'} className=' hover:text-3xl duration-300'><h1>About us</h1></Link>

     <div className="flex flex-col gap-2">
       <Link href={'/login'}><button className='bg-transparent rounded-xl text-lg font-noto w-20  border-2 border-[#fff] hover:scale-110 duration-300 hover:bg-[#F6E8B1] hover:text-[#461313]'>Login</button></Link>

       <Link href={'/signup'}><button className='bg-transparent rounded-xl text-lg font-noto w-20   hover:scale-110 duration-300 hover:bg-[#fff] border-2 border-[#fff] hover:text-black'>Signup</button></Link>
     </div>
   </div>



   {/* THIS IS THE MENUBAR */}
   <div ref={ref2} className=' absolute top-[40%] max-md:top-[35%]  max-lg:top-[47%] right-[10vw] xl:hidden transition-all duration-500 cursor-pointer' onClick={toggleMenu} >
     <div className="menubar  flex flex-col items-end gap-2 max-xl:rotate-0 transition-all duration-500  max-md:scale-[75%]">
       <div ref={ref3} className="line1 w-10 border-2  rounded-full border-[#F6E8B1] duration-300"></div>
       <div ref={ref4} className="line1 w-4 border-2  rounded-full border-[#F6E8B1] duration-300 "></div>
       <div ref={ref5} className="line1 w-10 border-2 rounded-full border-[#F6E8B1] duration-300"></div>
     </div>

   </div>




<div className='backdrop-blur-sm bg-black/40 '>
          {/* <About /> */}
          {/* <Explore /> */}
        </div>




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
    const [selectedFile, setSelectedFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const router = useRouter();
    const [userData1, setUserData1] = useState(null);
    const [loading, setLoading] = useState(false);
    const [caption, setCaption] = useState("")

    const { username, profilepic, name } = tokenUserData;

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
        formData.append('file', selectedFile);

        try {
            const res = await fetch(selectedFile.type.startsWith('image') ? '/api/uploadimage' : '/api/uploadvideo', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            console.log(data)
            const { imageUrl, videoUrl } = data;
            const contentUrl = imageUrl || videoUrl;

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
