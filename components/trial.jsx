
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


