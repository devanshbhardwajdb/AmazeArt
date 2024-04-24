import Hero from './hero'
import Explore from './explore'
import About from './about'
import Cursor from '@/components/Cursor'
import { useState, useEffect } from 'react'


export default function Home() {
  const [showImage, setShowImage] = useState(true); // State to control the visibility of the image

  useEffect(() => {
    // Hide the image after 3 seconds (3000 milliseconds)
    const timeout = setTimeout(() => {
      setShowImage(false);
    }, 10000); // Adjust timing as needed

    // Clear timeout when component unmounts or showImage changes
    return () => clearTimeout(timeout);
  }, []); // Run only once on component mount

  return (
    <div className=''>

      <>
        {/* <Cursor /> */}
        <Hero />
        
      </>

    </div>
  )
}
