import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { slideIn3 } from '@/utils/motion';

const Explore = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const [direction, setDirection] = useState('next'); // State to track the direction of image change
    const images = ['/bg1.jpg', '/bg2.jpg', '/bg3.jpg', '/bg4.jpg', '/bg6.jpg', '/bg7.jpg', '/bg8.jpg'];

    useEffect(() => {
        const interval = setInterval(() => {
            // setDirection('next');
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);

    const changeImage = (direction) => {
        setDirection(direction);
        if (direction === 'next') {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        } else {
            setCurrentImage((prevImage) => (prevImage - 1 + images.length) % images.length);
        }
    };

    return (
        <>
            <div id="explore" className=' w-1/2 max-md:w-full  flex items-center justify-center gap-0 '>
                <div className="w-auto relative flex items-center justify-center">
                    {/* <FaChevronLeft className="absolute h-48 left-[-8vw] top-1/2 text-white cursor-pointer transform -translate-y-1/2" onClick={() => changeImage('prev')} />
                    <FaChevronRight className="absolute h-48 right-[-8vw] top-1/2 text-white cursor-pointer transform -translate-y-1/2" onClick={() => changeImage('next')} /> */}
                    <div className="flex relative">
                        {images.map((image, index) => (
                            <motion.img
                                key={index}
                                variants={slideIn3(`${index>currentImage?'right':'left'}`, 'tween', 0, 1.0)}
                                initial="hidden"
                                animate={index === currentImage ? 'show' : 'hidden'}
                                
                                src={image}
                                alt={`background-${index}`}
                                className={`z-[10]  w-[40vw] h-[50vh] max-xl:w-[75vw]  max-xl:h-[30vh]  max-lg:w-[50vw]  max-lg:h-[20vh] max-md:h-[20vh]  max-md:w-[70vw] rounded-3xl shadow-2xl shadow-black bg-contain ${index === currentImage ? 'visible' : 'hidden'}`}
                            />
                        ))}

                        

                    </div>
                    <div className='absolute bottom-[-6vh] max-lg:bottom-[-3vh] left-1/2 transform -translate-x-1/2 flex gap-2'>
                        {images.map((_, index) => (
                            <span
                                key={index}
                                className={`w-3 h-3 max-md:w-2 max-md:h-2 rounded-full bg-white  cursor-pointer duration-500 ${index === currentImage ? 'opacity-80 bg_main' : 'opacity-20'}`}
                                onClick={() => setCurrentImage(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Explore;
