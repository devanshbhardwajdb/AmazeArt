import React, { useState } from 'react';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';
import Lottie from 'lottie-react';
import A1 from '@/anime3.json';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@firebase.config';
import { useRouter } from 'next/router';

const Forgot = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Send password reset email
            await sendPasswordResetEmail(auth, email);

            toast.success('Password reset email sent. Please check your email inbox.', {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });

            // Reset the form field
            setEmail('');
            setTimeout(() => {
                router.push('/login');

            }, 2100);
        } catch (error) {
            console.error('Error sending password reset email:', error);
            toast.error('Failed to send password reset email. Please try again later.', {
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
                <title>Reset Password</title>
                {/* Description */}
                <meta name="description" content="Reset Password for Amazeart" />
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
                <h2 className="font-swash text-white text-[3vh] max-xl:text-[4vh] max-lg:text-[3vh] max-md:text-[2.54vh]">Reset your password !</h2>
            </div>

            <form
                onSubmit={(e) => handleSubmit(e)}
                method="POST"
                className="flex flex-col gap-2 items-center md:w-1/2 w-full h-auto p-8 rounded-lg shadow-lg shadow-gray-900 duration-150 transition-all font-noto bg-white/5 backdrop-blur-md glassmorphism"
            >
                <h3 className="text-white text-2xl font-bold mb-1">Enter the Email</h3>

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


                </div>

                <button className="nav-btn bg_button1 text-white px-5 py-2 rounded-lg transition-all duration-150 hover:scale-95 hover:shadow-lg w-full flex justify-center items-center mt-5" disabled={loading}>
                    {loading ? <Lottie animationData={A1} loop={true} className="w-6" /> : <p>Send Mail</p>}
                </button>
            </form>
        </div>
    );
}

export default Forgot;
