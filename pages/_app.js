import '@/styles/globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function App({ Component, pageProps }) {
  return (

    <>
      <div className='relative '>
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
