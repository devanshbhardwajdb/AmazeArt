import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';





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





  const toggleMenu = () => {


    if (ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.remove('translate-x-full')
      ref.current.classList.add('translate-x-0')
      ref3.current.classList.remove('w-10', 'border-white')
      ref3.current.classList.add('w-4', 'border-[#9B03F8]')
      ref4.current.classList.remove('w-4', 'border-white')
      ref4.current.classList.add('w-10', 'border-[#9B03F8]')
      ref5.current.classList.remove('w-10', 'border-white')
      ref5.current.classList.add('w-4', 'border-[#9B03F8]')



    }
    else if (!ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.add('translate-x-full')
      ref.current.classList.remove('translate-x-0')
      ref3.current.classList.remove('w-4', 'border-[#9B03F8]')
      ref3.current.classList.add('w-10', 'border-white')
      ref4.current.classList.remove('w-10', 'border-[#9B03F8]')
      ref4.current.classList.add('w-4', 'border-white')
      ref5.current.classList.remove('w-4', 'border-[#9B03F8]')
      ref5.current.classList.add('w-10', 'border-white')


    }

  }
  return (

    // THIS IS THE MAIN NAVABR DIV
    <motion.div
      initial={{ opacity: 0, y: -100, backgroundColor: 'transparent'  }}
      animate={{ opacity: 1, y: 0 , backgroundColor: navbarBackground }}
      transition={{ duration: 0.5 }}
      className={ `flex items-center px-[12vw] h-[15vh] justify-between py-5 w-full fixed   z-50 max-xl:h-[12vh] max-md:h-[9vh] duration-700  max-xl:bg-black/70 ${navbarBackground === 'transparent'?'':'backdrop-blur-sm'}`}
    >


      {/* THIS IS THE LOGO */}
      <div className='cursor-pointer max-md:w-10 '>
        <img src="/logo.png" alt="logo" height={60} width={60} />
      </div>


      {/* THIS IS THE PC LINKS */}
      <div className=' max-xl:hidden flex  gap-48'>
        <div className='flex items-center gap-28 text-lg text-white font-normal font-belleza'>

          <Link href={'/'} className='text-white hover:scale-125 duration-300'><h1>Home</h1></Link>
          <Link href={'/home'} className='text-white hover:scale-125 duration-300'><h1>Feed</h1></Link>
          <Link href={'/home'} className='text-white hover:scale-125 duration-300'><h1>Products</h1></Link>
          <Link href={'/#about'} className='text-white hover:scale-125 duration-300'><h1>About us</h1></Link>
        </div>
        <div className='flex gap-12'>
          <Link href={'/login'}><button className='bg-transparent rounded-2xl text-lg font-belleza px-9 text-white border-2 hover:scale-110 duration-300 hover:bg-white hover:text-black'>Login</button></Link>
          <Link href={'/'}><button className='bg-transparent rounded-2xl text-lg font-belleza px-8 text-white border-white border-2 hover:scale-110 duration-300 hover:bg-white hover:text-black'>Signup</button></Link>
        </div>
      </div>


      {/* THIS IS MOBILE SUPPORTED LINKS */}
      <div ref={ref} className={`flex fixed max-sm:w-[50vw] top-[12vh] max-md:top-[9vh] w-[40vw] p-5  right-0 flex-col    items-start gap-6 font-light   nav-right  duration-500 translate-x-full transform transition-transform  lg:hidden shadow-md shadow-black  ${navbarBackground === 'transparent'?'bg-transparent':'bg-black/70 '}  `}>
        <Link href={'/'} className='text-white hover:scale-125 duration-300 '><h1>Home</h1></Link>
        <Link href={'/home'} className='text-white hover:scale-125 duration-300 py-2'><h1>Feed</h1></Link>
        <Link href={'/home'} className='text-white hover:scale-125 duration-300 '><h1>Products</h1></Link>
        <Link href={'/#about'} className='text-white hover:scale-125 duration-300'><h1>About us</h1></Link>

        <div className="flex flex-col gap-2">
          <Link href={'/login'}><button className='bg-transparent rounded-2xl text-lg font-belleza px-9 text-white border-2 hover:scale-110 duration-300 hover:bg-white hover:text-black'>Login</button></Link>

          <Link href={'/'}><button className='bg-transparent rounded-2xl text-lg font-belleza px-8 text-white border-white border-2 hover:scale-110 duration-300 hover:bg-white hover:text-black'>Signup</button></Link>
        </div>
      </div>



      {/* THIS IS THE MENUBAR */}
      <div ref={ref2} className=' absolute top-[40%] max-md:top-[35%]  max-lg:top-[47%] right-[10vw] xl:hidden transition-all duration-500 cursor-pointer' onClick={toggleMenu} >
        <div className="menubar  flex flex-col items-end gap-2 max-xl:rotate-0 transition-all duration-500  max-md:scale-[75%]">
          <div ref={ref3} className="line1 w-10 border-2  rounded-full border-white duration-300"></div>
          <div ref={ref4} className="line1 w-4 border-2  rounded-full border-white duration-300 "></div>
          <div ref={ref5} className="line1 w-10 border-2 rounded-full border-white duration-300"></div>
        </div>

      </div>
    </motion.div>
  );
}

export default Navbar;
