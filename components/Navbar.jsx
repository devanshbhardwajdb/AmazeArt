import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';


const Navbar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='bg-black/70 backdrop-blur-sm flex items-center px-[12vw] h-[15vh] justify-between py-5 rounded-br-[54px] rounded-bl-[54px] w-full fixed  z-50'
    >
      <div className='flex items-center gap-28 text-lg text-white font-normal font-belleza'>
        <img src="/logo.png" alt="logo" height={60} width={60}/>
        <Link href={'/'} className='text-white hover:scale-125 duration-300'><h1>Home</h1></Link>
        <Link href={'/home'} className='text-white hover:scale-125 duration-300'><h1>Feed</h1></Link>
        <Link href={'/home'} className='text-white hover:scale-125 duration-300'><h1>Products</h1></Link>
        <Link href={'/#about'} className='text-white hover:scale-125 duration-300'><h1>About us</h1></Link>
      </div>
      <div className='flex gap-12'>
        <Link href={'/login'}><button className='bg-transparent rounded-2xl text-lg font-belleza px-7 text-white border-2 hover:scale-110 duration-300 hover:bg-white hover:text-black'>Login</button></Link>
        <Link href={'/'}><button className='bg-transparent rounded-2xl text-lg font-belleza px-7 text-white border-white border-2 hover:scale-110 duration-300 hover:bg-white hover:text-black'>Signup</button></Link>
      </div>
    </motion.div>
  );
}

export default Navbar;
