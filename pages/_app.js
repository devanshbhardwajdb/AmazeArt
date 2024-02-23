import '@/styles/globals.css'
import React, { useRef, useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Cursor from '@/components/Cursor'
import LoadingBar from 'react-top-loading-bar'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {

  const [progress, setProgress] = useState(0)
  const router = useRouter();
  const [key, setKey] = useState()



console.log(router.query)
  useEffect(() => {

    router.events.on('routeChangeStart', () => {
      setProgress(40);
    })
    router.events.on('routeChangeComplete', () => {
      setProgress(100);
    })

   
    setKey(Math.random())

  }, [router.query])

  return (

    <>
      
      <div className='relative '>
      <LoadingBar
         style={{
          backgroundImage: 'linear-gradient(to left , #E72B2B, #FF5BB3, #9B03F8, #FF804A)', // Example gradient colors
        }}
        progress={progress}
        waitingTime={500}
        height={4}
        onLoaderFinished={() => setProgress(0)}
      />
        <div className='fixed z-[-121] w-full h-full top-0 opacity-80 bg_main'></div>
        <div className='fixed z-[-120] w-full h-full top-0 bg-black/70 '></div>
        <Navbar />
        <Component {...pageProps} />
        <div className='bg-black/40'>
        
        <Footer />
        </div>


      </div>
    </>

  )
}
