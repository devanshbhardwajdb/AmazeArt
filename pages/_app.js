import '@/styles/globals.css'
import React, { useRef, useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Cursor from '@/components/Cursor'
import LoadingBar from 'react-top-loading-bar'
import { useRouter } from 'next/router'
var jwt = require('jsonwebtoken');

export default function App({ Component, pageProps }) {

  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0)
  const [progress, setProgress] = useState(0)
  const router = useRouter();
  const [user, setUser] = useState({ value: null });




  useEffect(() => {

    router.events.on('routeChangeStart', () => {
      setProgress(40);
    })
    router.events.on('routeChangeComplete', () => {
      setProgress(100);
    })
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")))
        saveCart(JSON.parse(localStorage.getItem("cart")))
      }
    } catch (error) {
      console.log(error)
      localStorage.clear();
    }
    const token = localStorage.getItem('token');

    if (token) {
      setUser({ value: token })
    }


  }, [router.query])

  const decoded = jwt.decode(user.value);
  const tokenUserData = decoded;
  const [showImage, setShowImage] = useState(true); // State to control the visibility of the image

  useEffect(() => {
    // Hide the image after 3 seconds (3000 milliseconds)
    const timeout = setTimeout(() => {
      setShowImage(false);
    }, 2000); // Adjust timing as needed

    // Clear timeout when component unmounts or showImage changes
    return () => clearTimeout(timeout);
  }, []); // Run only once on component mount

  const logout = () => {
    localStorage.removeItem('token');
    setUser({ value: null })
    router.push('/')
    clearCart();
  }

  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart))
    let subt = 0;
    let keys = Object.keys(myCart)
    for (let i = 0; i < keys.length; i++) {
      subt += myCart[keys[i]].price * myCart[keys[i]].qty

    }
    setSubTotal(subt)
  }

  const addToCart = (itemCode, qty, price, name, type, img,username) => {

    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = newCart[itemCode].qty + qty;
    }
    else {
      newCart[itemCode] = { qty: 1, price, name, type, img , username}
    }
    // console.log(newCart);
    setCart(newCart)
    saveCart(newCart)

  }

  const buyNow = (itemCode, qty, price, name, type, img, username) => {

    saveCart({})
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = newCart[itemCode].qty + qty;
    }
    else {
      newCart[itemCode] = { qty: 1, price, name, type, img, username }
    }

    setCart(newCart)
    saveCart(newCart)
    router.push(`${process.env.NEXT_PUBLIC_HOST}/checkout`)
    // console.log("hi bro e rha hia")

  }
  const removeFromCart = (itemCode, qty) => {
    let newCart = cart;

    // console.log(newCart[itemCode])
    if (itemCode in cart) {
      newCart[itemCode].qty = newCart[itemCode].qty - qty;
    }

    if (newCart[itemCode]["qty"] <= 0) {
      delete newCart[itemCode]
    }

    setCart(newCart)
    saveCart(newCart)

  }

  const clearCart = () => {

    setCart({})
    saveCart({})
  }

  return (

    <>

      <div className='relative '>
        <LoadingBar
          style={{
            backgroundImage: 'linear-gradient(to left , #E72B2B, #FF5BB3, #9B03F8, #FF804A)', // Example gradient colors
          }}
          progress={progress}
          waitingTime={300}
          height={4}
          onLoaderFinished={() => setProgress(0)}
        />
        <div className='fixed bg-fixed bg-cover z-[-121] w-full h-full top-0 opacity-8  0 bg_main2'></div>
        {/* <div className='fixed z-[-120] w-full h-full top-0 bg-black/70 '></div>  */}

        {showImage ? (
          <div className='flex items-center justify-center h-[100vh] w-full'>
            <img
              src="/logo.png"
              alt="AmazeArt"
              className="w-80 h-80 opacity-100 animate-pulse duration-300 "
            // Set showImage to false when the image is loaded
            />
          </div>
        ) :
          <>
            <Navbar tokenUserData={tokenUserData} user={user} logout={logout} cart={cart} setCart={setCart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} setSubTotal={setSubTotal} />
            <Component {...pageProps} tokenUserData={tokenUserData} user={user} addToCart={addToCart} cart={cart} clearCart={clearCart} subTotal={subTotal} buyNow={buyNow} />
            <div className='bg-black/40'>

              <Footer />
            </div>
          </>
        }


      </div>
    </>

  )
}
