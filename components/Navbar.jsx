import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { slideIn, textVariant2, navVariants, navVariants2 } from "@/utils/motion";
import { useRouter } from 'next/router';
import { AiFillHome } from "react-icons/ai";
import { FaBagShopping } from "react-icons/fa6";
import { BsFilePostFill } from "react-icons/bs";
import { FaReadme } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { IoMdCart } from 'react-icons/io';
import { HiOutlineMenuAlt1 } from 'react-icons/hi';
import { MdAccountCircle } from 'react-icons/md';
import { AiFillCloseCircle, AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';


const Navbar = ({ tokenUserData, user, cart, setCart, addToCart, removeFromCart, clearCart, subTotal, setSubTotal, logout }) => {
  const ref = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const ref5 = useRef();
  const router = useRouter();
  const [sidebar, setSidebar] = useState(true)
  // State to track scroll position and navbar background color
  const [scrollPosition, setScrollPosition] = useState(0);
  const [navbarBackground, setNavbarBackground] = useState('transparent');
  const [page, setPage] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const [dropdown2, setDropdown2] = useState(false);







  // Update scroll position state on scroll
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Change navbar background based on scroll position
  useEffect(() => {
    if (scrollPosition > 100) {
      setNavbarBackground('rgba(0, 0, 0, 0.7)'); // Change background to black after scrolling 100 pixels
    } else {
      setNavbarBackground('transparent'); // Reset background to transparent when at the top
    }
  }, [scrollPosition]);

  useEffect(() => {
    if (router.pathname === "/") {
      setPage("home")
    }
    else if (router.pathname === "/feed") {

      setPage("feed")
    }
    else if (router.pathname === "/shop") {
      setPage("shop")
    }
    else {
      setPage("")
    }

  }, [router.pathname])

  useEffect(() => {


    setDropdown(false)
    setDropdown2(false)
  }, [router])

  useEffect(() => {
    setSidebar(false);
  }, [router.pathname, cart]);

  // Open sidecart when item is added to cart
  useEffect(() => {
    if (Object.keys(cart).length > 0) {
      setSidebar(true);
    }
  }, [cart, Object.keys(cart).length]);



  const toggleMenu = () => {


    if (ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.remove('translate-x-full')
      ref.current.classList.add('translate-x-0')
      ref3.current.classList.remove('w-[5vw] rounded-b-lg', 'border-[#F6E8B1]')
      ref3.current.classList.add('w-4', 'border-[#9B03F8]')
      ref4.current.classList.remove('w-4', 'border-[#F6E8B1]')
      ref4.current.classList.add('w-[5vw] rounded-b-lg', 'border-[#9B03F8]')
      ref5.current.classList.remove('w-[5vw] rounded-b-lg', 'border-[#F6E8B1]')
      ref5.current.classList.add('w-4', 'border-[#9B03F8]')



    }
    else if (!ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.add('translate-x-full')
      ref.current.classList.remove('translate-x-0')
      ref3.current.classList.remove('w-4', 'border-[#9B03F8]')
      ref3.current.classList.add('w-[5vw] rounded-b-lg', 'border-[#F6E8B1]')
      ref4.current.classList.remove('w-[5vw] rounded-b-lg', 'border-[#9B03F8]')
      ref4.current.classList.add('w-4', 'border-[#F6E8B1]')
      ref5.current.classList.remove('w-4', 'border-[#9B03F8]')
      ref5.current.classList.add('w-[5vw] rounded-b-lg', 'border-[#F6E8B1]')


    }

  }

  useEffect(() => {
    const navbarHeight = document.getElementById('navbar').offsetHeight;
    const sideCartElement = ref.current;



    if (sideCartElement) {
      sideCartElement.style.top = `${navbarHeight}px`;
    }
  }, [sidebar]);
  useEffect(() => {
    const navbarHeight = document.getElementById('navbar').offsetHeight;
    const dropdownElement = ref2.current;



    if (dropdownElement) {
      dropdownElement.style.top = `${navbarHeight}px`;
    }
  }, [dropdown]);



  const toggleCart = () => {

    if (ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.remove('translate-x-full')
      ref.current.classList.add('translate-x-0')
    }
    else if (!ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.add('translate-x-full')
      ref.current.classList.remove('translate-x-0')
    }

  }


  return (

    // THIS IS THE MAIN NAVABR DIV

    <>

      <motion.div
        id='navbar'
        variants={navVariants}
        initial="hidden"
        whileInView="show"
        className={`flex   h-[8vh]  gap-2  w-full fixed justify-center max-xl:gap-12 xl:justify-between bg-black/60  md:px-[10vw] px-[2vw] items-center    z-50 duration-700 backdrop-blur-md text-white`}
      >

        {/* THIS IS THE LOGO */}
        <div className='flex  items-center justify-between  gap-0 max-lg:hidden max-md:flex h-full w-3/4 cursor-pointer  '>

          <img src="/logo.png" alt="logo" height={40} width={40} />


          {tokenUserData && <div className='flex items-center gap-2 cursor-pointer active-while:text-[#9B03F8] md:hidden' onClick={toggleCart}>
            <IoMdCart className='w-[30px] h-[30px] ' />

          </div>}


        </div>
        {/* THIS IS THE PC LINKS */}

        <div className='flex items-center text-2xl max-md:hidden max-lg:text-lg font-normal font-noto h-full  w-1/2'>

          <Link href={'/'} className={`hover:text-3xl duration-300 ${page === 'home' ? 'text-3xl border-b-2 border-[#9B03F8]  text-[#9B03F8]' : ''}   md:px-10 px-4  h-full flex items-center `} title='Home'><AiFillHome /></Link>
          <Link href={'/feed'} className={`hover:text-3xl duration-300 ${page === 'feed' ? 'text-3xl border-b-2 text-[#9B03F8] border-[#9B03F8] ' : ''}    md:px-10 px-4  h-full flex items-center  `} title='Feed'><BsFilePostFill />
          </Link>
          <Link href={'/shop'} className={`hover:text-3xl duration-300 ${page === 'shop' ? 'text-3xl border-b-2 text-[#9B03F8] border-[#9B03F8] ' : ''}    md:px-10 px-4  h-full flex items-center  `} title='Shop'><FaBagShopping />
          </Link>
          <Link href={'/about'} className={`hover:text-3xl duration-300 bg_border1 ${page === 'about' ? 'text-3xl  border-b-2  text-[#9B03F8] border-[#9B03F8] ' : ''}   md:px-10 px-4  h-full flex items-center  `} title='About'><FaReadme />
          </Link>
        </div>


        <div className=' flex items-center h-full justify-end gap-12 w-3/4 max-md:hidden   '>
          {!user.value ?
            <div className='flex gap-3'>

              <Link href={'/login'}><button className='nav-btn  bg_button1 text-white px-5 py-2 rounded-lg  transition-all duration-150  hover:scale-95  hover:shadow-lg  w-full flex  justify-center items-center text-shadow2' >

                Login
              </button></Link>

              <Link href={'/signup'}><button className='nav-btn  bg_button1 text-white px-5 py-2 rounded-lg  transition-all duration-150  hover:scale-95  hover:shadow-lg  w-full flex  justify-center items-center text-shadow2' >

                Signup
              </button></Link></div>
            : (

              <div className='lg:relative  flex gap-2'>


                {tokenUserData && <><div className='flex items-center gap-2 cursor-pointer active-while:text-[#9B03F8]' onClick={toggleCart}>
                  <IoMdCart className='w-[30px] h-[30px] ' />

                </div>

                  <div onClick={() => { setDropdown(prevState => !prevState); }} className=' cursor-pointer   p-3 flex items-center justify-center'>

                    {tokenUserData?.profilepic ?

                      <img alt={`${tokenUserData?.username}'s profilepic`} className="rounded-full w-10 h-10" src={tokenUserData?.profilepic} ></img>
                      :

                      <MdAccountCircle className='rounded-full w-10 h-10 text-gray-200' />
                    }
                  </div></>}

                {dropdown &&

                  <div
                    ref={ref2}
                    className="dropdown bg-black/90 absolute right-0 max-lg:left-0  px-10  pt-6 pb-4 rounded-lg lg:rounded-tr-none gap-5 flex flex-col shadow-lg shadow-black   "
                  >

                    <Link href={`/Profile/${tokenUserData?.username}`} className='hover:text-[#9B03F8] hover:underline-offset-4  hover:underline transition-all duration-300 hover:scale-95'><h4>My Profile</h4></Link>
                    <Link href={`/orders`} className='hover:text-[#9B03F8] hover:underline-offset-4  hover:underline transition-all duration-300 hover:scale-95'><h4>My Orders</h4></Link>
                    <button onClick={logout} className='nav-btn  bg_button1 text-white px-5 py-2 rounded-lg  transition-all duration-150  hover:scale-95  hover:shadow-lg hover:shadow-black/70 ' >Logout</button>

                  </div>

                }

              </div>
            )
          }

        </div>

      </motion.div>
      <div ref={ref} className={`sidecart fixed overflow-y-auto z-[100]   top-0  w-[100vw] lg:w-[30vw] md:w-[60vw] h-full right-0 bg-black/90 pb-36 shadow-lg shadow-black/40 font-noto flex flex-col gap-4 p-5 transform transition-transform max-md:border-t max-md:border-gray-900  ${(Object.keys(cart).length === 0 || !sidebar) ? `translate-x-full` : `translate-x-0 `} `}  >

        <div className='flex justify-between items-center '>
          <h4 className='font-semibold text-lg text-white'>YOUR CART</h4>
          <AiFillCloseCircle className='cursor-pointer w-8 h-8 text-[#9B03F8] ' onClick={toggleCart} />

        </div>

        {
          Object.keys(cart).length == 0 &&
          <div className='text-white'>Your Cart is empty</div>
        }
        {
          Object.keys(cart).map((k) => {


            return <div key={k} className='flex justify-between items-center'>
              <Link href={`/productId?id=${k}&username=${cart[k].username}`} className=' w-1/2 p-6  bg-white/90 rounded-xl hover:shadow-lg hover:shadow-gray-900 duration-150 transition-all flex flex-row justify-between items-center'>
                <div>
                  <a className="block relative  rounded overflow-hidden">
                    <img alt="ecommerce" className="object-cover object-top w- h-full block " src={cart[k].img} />
                  </a>
                  <div className="mt-4">
                    <h3 className="text-gray-500 text-sm tracking-widest title-font mb-1">{cart[k].name}</h3>
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Type: {cart[k].type}</h3>



                    <p className="mt-1">₹ {cart[k].price}</p>

                  </div>
                </div>
              </Link>

              <div className="flex flex-col gap-1 items-center pr-2 text-white ">
                <AiFillPlusCircle onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].type) }} className='cursor-pointer w-5 h-5 text-white' />
                <h4>{cart[k].qty}</h4>
                <AiFillMinusCircle className='cursor-pointer w-5 h-5 ' onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].type) }} />
              </div>
            </div>


          })
        }


        <h3 className="text-gray-200  font-semibold mt-6 text-lg mb-1">Subtotal : ₹ {subTotal}</h3>
        <div className='flex justify-center mt-8 gap-6 max-md:flex-col'>
          <Link href={`${process.env.NEXT_PUBLIC_HOST}/checkout`}><button disabled={Object.keys(cart).length === 0} className=' disabled:bg-gray-400 nav-btn  bg_button1 text-shadow2 text-white px-5 py-2 rounded-lg  transition-all duration-150  hover:scale-95  w-full' >Check Out</button></Link>
          <button disabled={Object.keys(cart).length === 0} onClick={clearCart} className='disabled:bg-gray-400 nav-btn  bg_button1 text-shadow2 text-white px-5 py-2 rounded-lg  transition-all duration-150  hover:scale-95   cursor-pointer ' >Clear Cart</button>
        </div>

      </div>



      {/* This is navbar for mobile devices */}
      <motion.div
        variants={navVariants2}
        initial="hidden"
        whileInView="show"
        className={`flex   h-[8vh]  gap-2  w-full fixed justify-center max-xl:gap-12  bg-black  md:px-[10vw] px-[2vw] items-center  bottom-0 md:hidden  z-50 duration-700 backdrop-blur-md text-white`}
      >



        <div className='flex items-center justify-between text-xl  font-normal font-noto  h-full  w-full'>

          <Link href={'/'} className={`duration-300  ${page === 'home' ? 'text-2xl -translate-y-[30%] text-[#000]' : ''}  w-[20vw]   h-full flex items-center justify-center  `} title='Home'>
            <AiFillHome className='relative' />
            {page === 'home' && <div className="flex absolute  bg_main w-16 h-16 rounded-full  z-[-1]"></div>}
          </Link>
          <Link href={'/feed'} className={`duration-300  ${page === 'feed' ? 'text-2xl -translate-y-[30%] text-[#000]' : ''}  w-[20vw]   h-full flex items-center justify-center  `} title='Feed'>
            <BsFilePostFill className='relative' />
            {page === 'feed' && <div className="flex absolute  bg_main w-16 h-16 rounded-full  z-[-1]"></div>}
          </Link>


          <div className={`hover:text-3xl duration-300  w-[20vw] justify-center    h-full flex items-center  `} title='Feed' onClick={() => { setDropdown2(prevState => !prevState); }}>
            <FaPlus className='relative' />



            {dropdown2 &&

              <div
                className="dropdown bg-black absolute right-0 max-lg:left-0 bottom-[8vh]  px-10  pt-6 pb-4 rounded-lg lg:rounded-tr-none gap-5 flex flex-col items-center z-[-1] shadow-lg shadow-black text-sm  "
              >


                {user.value ?
                  <><Link href={`/feed`} className='hover:text-[#9B03F8] hover:underline-offset-4  hover:underline transition-all duration-300 hover:scale-95'><h4>Upload Post</h4></Link>
                    <Link href={`/shop`} className='hover:text-[#9B03F8] hover:underline-offset-4  hover:underline transition-all duration-300 hover:scale-95'><h4>Upload Product</h4></Link>
                  </> :
                  <Link href={`/login`} className='hover:text-[#9B03F8] hover:underline-offset-4  hover:underline transition-all duration-300 hover:scale-95'><h4>Login to Continue</h4></Link>

                }

              </div>

            }
          </div>


          <Link href={'/shop'} className={`duration-300  ${page === 'shop' ? 'text-2xl -translate-y-[30%] text-[#000]' : ''}  w-[20vw]   h-full flex items-center justify-center  `} title='Shop'>
            <FaBagShopping className='relative' />
            {page === 'shop' && <div className="flex absolute  bg_main w-16 h-16 rounded-full  z-[-1]"></div>}
          </Link>





          {/* <Link href={'/login'}><button className='nav-btn   bg_button1 text-white px-5 py-2 rounded-lg  transition-all duration-150  text-sm  hover:shadow-lg  w-full flex  justify-center items-center text-shadow2' >

              Login
            </button></Link> */}


          <div className='lg:relative text-sm'>

            <div className=' cursor-pointer   p-3 flex items-center justify-center'>


              {!user.value ?
                <div className='rounded-full w-10 h-10  flex items-center justify-center '><Link href={'/login'}><button className='nav-btn  bg_button1 text-white px-5 py-2 rounded-lg  transition-all duration-150   hover:shadow-lg  w-full flex scale-75 justify-center items-center text-shadow2' >

                  Login
                </button></Link></div>
                : <>
                  {tokenUserData?.profilepic ?

                    <img alt={`${tokenUserData?.username}'s profilepic`} className="rounded-full w-10 h-10" src={tokenUserData?.profilepic} onClick={() => { setDropdown(prevState => !prevState); }} ></img>
                    :

                    <MdAccountCircle className='rounded-full w-10 h-10 text-gray-200' onClick={() => { setDropdown(prevState => !prevState); }} />
                  }</>}
            </div>

            {dropdown &&

              <div

                className="dropdown bg-black absolute right-0 max-lg:left-0 bottom-[8vh]  px-10  pt-6 pb-4 rounded-lg lg:rounded-tr-none gap-5 flex flex-col shadow-lg shadow-black z-[-1] items-end   "
              >

                <Link href={`/Profile/${tokenUserData?.username}`} className='hover:text-[#9B03F8] hover:underline-offset-4  hover:underline transition-all duration-300 hover:scale-95'><h4>My Profile</h4></Link>
                <Link href={`/orders`} className='hover:text-[#9B03F8] hover:underline-offset-4  hover:underline transition-all duration-300 hover:scale-95'><h4>My Orders</h4></Link>

                <button onClick={logout} className='nav-btn  bg_button1 text-white px-5 py-2 rounded-lg  transition-all duration-150  hover:scale-95  hover:shadow-lg hover:shadow-black/70 ' >Logout</button>

              </div>

            }

          </div>






        </div>





      </motion.div >

    </>
  );
}

export default Navbar;
