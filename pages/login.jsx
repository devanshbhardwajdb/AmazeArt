import React, { useState } from 'react';
import Link from 'next/link';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';
import Lottie from 'lottie-react';
import A1 from '@/anime3.json';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@firebase.config';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';

const Login = () => {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [isUsernameValid, setIsUsernameValid] = useState(true);
    const [password, setPassword] = useState('');
    const [isHidden, setIsHidden] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // console.log(user)

            // Now, verify the user from MongoDB
            const formBody = { email, password };
            const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formBody),
            });
            const response = await res.json();

            if (response.success) {
                const decoded = jwt.decode(response.token);
                const userData = decoded;

                // console.log(userData)

                localStorage.setItem('token', response.token);
                toast.success('You are logged in successfully', {
                    position: 'top-center',
                    autoClose: 1900,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                });

                // Redirect user to the appropriate page based on their profile completion status
                if (userData.username) {
                    const res = await fetch(`/api/user/${userData.username}`);
                    const userResponse = await res.json();

                    if (userResponse.success) {
                        const { user } = userResponse;

                        if (user.address && user.city && user.state && user.pincode) {
                            // User profile is complete, redirect to the appropriate page
                            if (user.profilepic && user.coverpic) {
                                router.push(`/Profile/${user.username}`);
                            } else if (user.profilepic) {
                                router.push(`/UploadCover/${user.username}`);
                            } else {
                                router.push(`/UploadProfile/${user.username}`);
                            }
                        } else {
                            // User profile is incomplete, redirect to address update page
                            router.push(`/UpdateAddress/${user.username}`);
                        }
                    }
                }

                // Reset the form fields
                setEmail('');
                setPassword('');
            } else {
                // Handle login error from MongoDB
                toast.error(response.error, {
                    position: 'top-center',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                });
            }
        } catch (error) {
            console.error('Error logging in:', error);
            // Handle login error from Firebase
            toast.error('Invalid credentials', {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[91vh] px-[10vw] flex justify-center items-center font-noto max-md:px-6 max-md:pt-28">
            <Head>
                <title>Login to Amazeart</title>
                {/* Description */}
                <meta name="description" content="Login to Amazeart" />
                {/* Open Graph metadata for sharing on social media */}
                <meta property="og:title" content="Amazeart" />
                <meta property="og:description" content="Login to Amazeart" />
                <meta property="og:image" content="https://amaze-art.vercel.app/logo.png" />
                {/* Twitter Card metadata */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Amazeart" />
                <meta name="twitter:description" content="Login to Amazeart" />
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

            <div className="flex flex-col max-lg:hidden items-center justify-center w-1/2 border-r mr-20 h-[50vh]">
                <div className="flex">
                    <h1 className="font-metal text-[14vh] max-xl:text-[18vh] max-lg:text-[10vh] max-md:text-[10vh] text_main pl-5 backdrop">Amaze</h1>
                    <h1 className="font-metal text-[14vh] max-xl:text-[18vh] max-md:text-[10vh] max-lg:text-[10vh] text-white px-5">Art</h1>
                </div>
                <h2 className="font-swash text-white text-[3vh] max-xl:text-[4vh] max-lg:text-[3vh] max-md:text-[2.54vh]">Login to share and sell your creation!</h2>
            </div>

            <form
                onSubmit={(e) => handleSubmit(e)}
                method="POST"
                className="flex flex-col gap-2 items-center md:w-1/2 w-full h-auto p-8 rounded-lg shadow-lg shadow-gray-900 duration-150 transition-all font-noto bg-white/5 backdrop-blur-md glassmorphism"
            >
                <h3 className="text-white text-2xl font-bold mb-1">Login to your account</h3>
                <h3 className="text-white text-lg font-medium mb-1 cursor-pointer flex gap-1">
                    or <Link href={'/signup'}><p className="text_main hover:text-[#9F07F5] hover:underline-offset-4 hover:underline transition-all duration-300 hover:scale-95">Signup</p></Link>
                </h3>
                <div className="flex mt-6 gap-8 flex-col w-full">
                    <div className="flex flex-col w-full">
                    <input
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                        type="email"
                        className='rounded-lg p-2 focus:outline-none focus:shadow-md focus:border focus:border-[#9F07F5] focus:shadow-[#9F07F5] bg-white/15 text-white placeholder-gray-200'
                        placeholder='Email address'
                        name='email'
                        required
                    />
                        
                    </div>

                    <div className="relative rounded-lg flex w-full items-center justify-between">
                        <input
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                            type={`${isHidden ? "password" : "visible"}`}
                            className="bg-white/15 rounded-lg p-2 w-full focus:outline-none focus:shadow-md focus:border focus:border-[#9F07F5] focus:shadow-[#9F07F5] text-white placeholder-gray-200"
                            placeholder="Password"
                            name="password"
                            required
                        />
                        {isHidden ?
                            (<AiFillEyeInvisible
                                onClick={() => { setIsHidden(false) }}
                                className="cursor-pointer w-7 h-7 text-gray-200 absolute right-3"
                            />)
                            :
                            (<AiFillEye
                                onClick={() => { setIsHidden(true) }}
                                className="cursor-pointer w-7 h-7 text-[#9F07F5] absolute right-3"
                            />)
                        }
                    </div>
                </div>
                <div className="flex justify-end w-full items-center mt-5">
                    <p className="text_main cursor-pointer hover:text-[#9F07F5] hover:underline-offset-4 hover:underline transition-all duration-300 hover:scale-95"><Link href={'/forgot'}>Forgot Password?</Link></p>
                </div>
                <button className="nav-btn bg_button1 text-white px-5 py-2 rounded-lg transition-all duration-150 hover:scale-95 hover:shadow-lg w-full flex justify-center items-center" disabled={loading}>
                    {loading ? <Lottie animationData={A1} loop={true} className="w-6" /> : <p>Login</p>}
                </button>
            </form>
        </div>
    );
}

export default Login;
