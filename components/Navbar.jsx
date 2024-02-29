import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { slideIn, textVariant2, navVariants } from "@/utils/motion";
import { useRouter } from 'next/router';
import { AiFillHome } from "react-icons/ai";
import { FaBagShopping } from "react-icons/fa6";
import { BsFilePostFill } from "react-icons/bs";
import { FaReadme } from "react-icons/fa";







const Navbar = () => {
  const ref = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const ref5 = useRef();
  const router = useRouter();
  // State to track scroll position and navbar background color
  const [scrollPosition, setScrollPosition] = useState(0);
  const [navbarBackground, setNavbarBackground] = useState('transparent');
  const [page, setPage] = useState("");



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
    if (router.pathname === "/feed") {
      setPage("feed")
    }
    if (router.pathname === "/products") {
      setPage("products")
    }

  }, [router.pathname])






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


  return (

    // THIS IS THE MAIN NAVABR DIV
    <motion.div
      variants={navVariants}
      initial="hidden"
      whileInView="show"
      className={`flex   h-[8vh]  gap-2  w-full fixed justify-center max-xl:gap-12 xl:justify-between bg-black/60  md:px-[10vw] px-[2vw] items-center   z-50 duration-700 backdrop-blur-md text-white  `}
    >

      {/* THIS IS THE LOGO */}
      <div className='flex  items-center gap-0 max-lg:hidden h-full w-3/4 '>
        <div className='cursor-pointer max-md:w-10  '>
          <img src="/logo.png" alt="logo" height={40} width={40} />
        </div>

      </div>
      {/* THIS IS THE PC LINKS */}

      <div className='flex items-center text-2xl max-lg:text-lg font-normal font-livvic h-full  w-1/2'>

        <Link href={'/'} className={`hover:text-3xl duration-300 ${page === 'home' ? 'text-3xl border-b-2  text-[#9B03F8]' : ''}   md:px-10 px-4  h-full flex items-center `}><AiFillHome /></Link>
        <Link href={'/feed'} className={`hover:text-3xl duration-300 ${page === 'feed' ? 'text-3xl border-b-2 text-[#9B03F8]' : ''}    md:px-10 px-4  h-full flex items-center  `}><BsFilePostFill />
        </Link>
        <Link href={'/products'} className={`hover:text-3xl duration-300 ${page === 'products' ? 'text-3xl border-b-2 text-[#9B03F8]' : ''}    md:px-10 px-4  h-full flex items-center  `}><FaBagShopping />
        </Link>
        <Link href={'/#about'} className={`hover:text-3xl duration-300 bg_border1 ${page === 'about' ? 'text-3xl  border-b-2  text-[#9B03F8]' : ''}   md:px-10 px-4  h-full flex items-center  `}><FaReadme />
        </Link>
      </div>


      <div className=' flex items-center h-full justify-end gap-12 w-3/4    '>
        <Link href={'/login'}><button className='nav-btn  bg_button1 text-white px-5 py-2 rounded-lg  transition-all duration-150  hover:scale-95  hover:shadow-lg  w-full flex  justify-center items-center' >

Login
        </button></Link>
        {/* <Link href={'/signup'}><button className='bg-transparent rounded-xl  font-livvic w-20   hover:scale-110 duration-300 hover:bg-[#F6E8B1] border-2 border-white hover:text-[#461313]'>Signup</button></Link> */}
      </div>








    </motion.div>
  );
}

export default Navbar;
