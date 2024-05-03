import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { slideIn, textVariant2, navVariants,navVariants2 } from "@/utils/motion";
import { useRouter } from 'next/router';
import { AiFillHome } from "react-icons/ai";
import { FaBagShopping } from "react-icons/fa6";
import { BsFilePostFill } from "react-icons/bs";
import { FaReadme } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";








const Navbar = ({ user, tokenUserData, logout }) => {
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

    <>

      <motion.div
        variants={navVariants}
        initial="hidden"
        whileInView="show"
        className={`flex   h-[8vh]  gap-2  w-full fixed justify-center max-xl:gap-12 xl:justify-between bg-black/60  md:px-[10vw] px-[2vw] items-center    z-50 duration-700 backdrop-blur-md text-white`}
      >

        {/* THIS IS THE LOGO */}
        <div className='flex  items-center gap-0 max-lg:hidden max-md:flex h-full w-3/4 cursor-pointer max-md:w-10 '>
          
            <img src="/logo.png" alt="logo" height={40} width={40} />
          

        </div>
        {/* THIS IS THE PC LINKS */}

        <div className='flex items-center text-2xl max-md:hidden max-lg:text-lg font-normal font-noto h-full  w-1/2'>

          <Link href={'/'} className={`hover:text-3xl duration-300 ${page === 'home' ? 'text-3xl border-b-2 border-[#9B03F8]  text-[#9B03F8]' : ''}   md:px-10 px-4  h-full flex items-center `} title='Home'><AiFillHome /></Link>
          <Link href={'/feed'} className={`hover:text-3xl duration-300 ${page === 'feed' ? 'text-3xl border-b-2 text-[#9B03F8] border-[#9B03F8] ' : ''}    md:px-10 px-4  h-full flex items-center  `} title='Feed'><BsFilePostFill />
          </Link>
          <Link href={'/shop'} className={`hover:text-3xl duration-300 ${page === 'products' ? 'text-3xl border-b-2 text-[#9B03F8] border-[#9B03F8] ' : ''}    md:px-10 px-4  h-full flex items-center  `} title='Shop'><FaBagShopping />
          </Link>
          <Link href={'/about'} className={`hover:text-3xl duration-300 bg_border1 ${page === 'about' ? 'text-3xl  border-b-2  text-[#9B03F8] border-[#9B03F8] ' : ''}   md:px-10 px-4  h-full flex items-center  `} title='About'><FaReadme />
          </Link>
        </div>


        <div className=' flex items-center h-full justify-end gap-12 w-3/4 max-md:hidden   '>
          {!user.value ?

            <Link href={'/login'}><button className='nav-btn  bg_button1 text-white px-5 py-2 rounded-lg  transition-all duration-150  hover:scale-95  hover:shadow-lg  w-full flex  justify-center items-center text-shadow2' >

              Login
            </button></Link>
            : (

              <div className='lg:relative '>

                <div onClick={() => { setDropdown(prevState => !prevState); }} className=' cursor-pointer   p-3 flex items-center justify-center'>
                  <img alt={`${tokenUserData?.username}'s profilepic`} className="rounded-full w-10 h-10" src={tokenUserData?.profilepic} ></img>
                </div>

                {dropdown &&

                  <div

                    className="dropdown bg-black/90 absolute right-0 max-lg:left-0  px-10  pt-6 pb-4 rounded-lg lg:rounded-tr-none gap-5 flex flex-col shadow-lg shadow-black   "
                  >

                    <Link href={`/Profile/${tokenUserData?.username}`} className='hover:text-[#9B03F8] hover:underline-offset-4  hover:underline transition-all duration-300 hover:scale-95'><h4>My Profile</h4></Link>

                    <button onClick={logout} className='nav-btn  bg_button1 text-white px-5 py-2 rounded-lg  transition-all duration-150  hover:scale-95  hover:shadow-lg hover:shadow-black/70 ' >Logout</button>

                  </div>

                }

              </div>
            )
          }
        
        </div>

      </motion.div>



      {/* This is navbar for mobile devices */}
      <motion.div
        variants={navVariants2}
        initial="hidden"
        whileInView="show"
        className={`flex   h-[8vh]  gap-2  w-full fixed justify-center max-xl:gap-12  bg-black  md:px-[10vw] px-[2vw] items-center  bottom-0 md:hidden  z-50 duration-700 backdrop-blur-md text-white`}
      >

        {/* THIS IS THE LOGO */}

        {/* THIS IS THE PC LINKS */}

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
            <FaPlus className='relative'/>
            


            {dropdown2 &&

              <div
                className="dropdown bg-black absolute right-0 max-lg:left-0 bottom-[8vh]  px-10  pt-6 pb-4 rounded-lg lg:rounded-tr-none gap-5 flex flex-col items-center z-[-1] shadow-lg shadow-black text-sm  "
              >


                {user.value ?
                  <><Link href={`/feed`} className='hover:text-[#9B03F8] hover:underline-offset-4  hover:underline transition-all duration-300 hover:scale-95'><h4>Upload Post</h4></Link>
                    <Link href={`/shop`} className='hover:text-[#9B03F8] hover:underline-offset-4  hover:underline transition-all duration-300 hover:scale-95'><h4>Upload Product</h4></Link>
                    </>:
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

                <div  className=' cursor-pointer   p-3 flex items-center justify-center'>


                  {!user.value ?
                  <div className='rounded-full w-10 h-10  flex items-center justify-center '><Link href={'/login'}><MdAccountCircle className='text-3xl ' /></Link></div>
                  :
                    <img alt={`${tokenUserData?.username}'s profilepic`} className="rounded-full w-10 h-10" src={tokenUserData?.profilepic} onClick={() => { setDropdown(prevState => !prevState); }} ></img>}
                </div>

                {dropdown &&

                  <div

                    className="dropdown bg-black absolute right-0 max-lg:left-0 bottom-[8vh]  px-10  pt-6 pb-4 rounded-lg lg:rounded-tr-none gap-5 flex flex-col shadow-lg shadow-black z-[-1] items-end   "
                  >

                    <Link href={`/Profile/${tokenUserData?.username}`} className='hover:text-[#9B03F8] hover:underline-offset-4  hover:underline transition-all duration-300 hover:scale-95'><h4>My Profile</h4></Link>

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
