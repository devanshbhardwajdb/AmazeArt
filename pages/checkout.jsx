import React, { useState, useEffect } from 'react'
import Script from "next/script";
import { HiOutlineMenuAlt1 } from 'react-icons/hi';
import { AiFillCloseCircle, AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import Link from 'next/link';
import { useRouter } from 'next/router';
import pincodes from "@/pincodes.json"
import { ToastContainer, toast } from 'react-toastify';
import Head from 'next/head';

import 'react-toastify/dist/ReactToastify.css';


const jwt = require('jsonwebtoken');

const Checkout = ({ cart, clearCart, subTotal, user, tokenUserData }) => {


    const key = process.env.NEXT_PUBLIC_KEY;
    const router = useRouter();
    const [userData, setUserData] = useState({});

    const [oldPass, setOldPass] = useState("")
    const [newPass, setNewPass] = useState("")
    const [confPass, setConfPass] = useState("")
    const [correct, setCorrect] = useState(true)
    const [correct2, setCorrect2] = useState(true)
    const [isHidden1, setIsHidden1] = useState(true);
    const [isHidden2, setIsHidden2] = useState(true);
    const [isHidden3, setIsHidden3] = useState(true);

    const [isMatched, setIsMatched] = useState(false)





    // const decoded = jwt.decode(user.value);


    useEffect(() => {
        setUserData(tokenUserData)
    }, []);






    const makePayment = async () => {

        const phone = (userData.phone).toString()
        const pincode = (userData.pincode).toString()


        if (phone.length !== 10) {
            toast.warning("Please enter valid 10 digit phone number", {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

        }
        else if (pincode.length !== 6) {
            toast.warning("Please enter valid 6 digit pincode", {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

        }
        else if (!Object.keys(pincodes).includes(userData.pincode)) {
            toast.warning("Your entered pincode is not servicable", {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else {




            const paymentBody = { subTotal, userData, cart }
            const a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentBody),
            });
            const data = await a.json();


            if (data.success) {



                const options = {
                    key: key,
                    currency: data.order.currency,
                    amount: data.order.amount,
                    order_id: data.order.id,
                    description: data.order.desc,
                    callback_url: `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,
                    image: `${process.env.NEXT_PUBLIC_HOST}/logo.png`,

                    prefill: {
                        name: userData?.name || "AmazeArt",
                        email: userData?.email || email,
                        contact: userData?.phone || phone,
                    },
                };

                const paymentObject = new window.Razorpay(options);
                paymentObject.open();


                // paymentObject.on('payment.success', function (response) {
                //   const paymentId = response.razorpay_payment_id;

                //   router.push('/')

                // });

                paymentObject.on("payment.failed", function (response) {
                    alert("Payment failed. Please try again. Contact support for help");

                });

            }
            else {
                clearCart();
                toast.error(data.error, {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }

        }





    };

    return (
        <>
            <ToastContainer
                position="top-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <Head><title>Checkout</title></Head>
            <Script
                id="razorpay-checkout-js"
                src="https://checkout.razorpay.com/v1/checkout.js"
            />
            <div className='text-white font-noto min-h-[100vh] lg:px-[8vw] max-lg:pt-[25vh] pt-[22vh] px-6 mb-60'>




                <div className="flex  flex-col gap-5   lg:w-1/2 mt-10">

                    <h3 className='font-semibold text-lg'>1. Delivery Details</h3>

                    {userData &&
                        <div className='bg-black/80 p-8 flex flex-col gap-5 rounded-xl'>
                            <div className="flex gap-5">
                                <h3 className=' text-base font-semibold'>{userData.name}</h3>
                                <h3 className=' text-base font-semibold'>{userData.phone}</h3>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className=' text-sm'>{userData.address}</h3>
                                <h3 className=' text-sm'>{userData.city}, {userData.state}, <span className='font-semibold'>{userData.pincode}</span></h3>
                            </div>
                            <Link href={`/UpdateAddress/${userData.username}?edit=true`}>
                                <button
                                    className='  nav-btn  bg_button1 text-white px-4 py-2 rounded-lg  transition-all duration-150  hover:scale-95   md:w-1/4 ' >Edit
                                </button>
                            </Link>
                        </div>
                    }


                </div>
                <div className='mt-10 flex flex-col gap-8'>
                    <h3 className='font-semibold text-lg'>2. Review Cart Items</h3>
                    <div className=" flex flex-col   " >



                        {
                            Object.keys(cart).length == 0 &&
                            <div>Your Cart is empty</div>
                        }
                        {
                            Object.keys(cart).map((k) => {

                                return <div key={k} className='lg:w-1/2 bg-black/80 p-6  rounded-xl hover:shadow-lg hover:shadow-gray-800 duration-150 transition-all   mb-6 flex justify-between '>


                                    <a className=" rounded flex justify-start ">
                                        <img alt="ecommerce" className="object-contain object-top w-1/2 " src={cart[k].img} />
                                    </a>
                                    <div className="mt-4  flex flex-col">
                                        <h3 className="text-white text-xl font-semibold mb-1">{cart[k].name}</h3>

                                        <p className="mt-1 text-md">₹{cart[k].price}</p>
                                        <p className="mt-1 text-md">Qty. {cart[k].qty}</p>

                                    </div>




                                </div>


                            })
                        }


                        <div className='flex justify-start mt-8 gap-6 flex-col'>
                            <h3 className="text-gray-200  font-semibold mt-6 text-lg mb-1">Subtotal : ₹ {subTotal}</h3>

                            <button
                                // disabled={disabled}
                                onClick={() => {
                                    makePayment();
                                }}
                                className='disabled:bg-gray-400  nav-btn  bg_button1 text-white px-5 py-2 rounded-lg  transition-all duration-150  hover:scale-95  hover:shadow-sm hover:shadow-gray-800 md:w-1/4 ' >Pay ₹ {subTotal}
                            </button>

                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}

export default Checkout
