import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Explore = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const [direction, setDirection] = useState('next'); // State to track the direction of image change
    const images = ['/bg1.jpg', '/bg2.jpg', '/bg3.jpg', '/bg4.jpg', '/bg6.jpg', '/bg7.jpg', '/bg8.jpg', '/bg11.jpg', '/bg12.jpg', '/bg13.jpg'];

    useEffect(() => {
        const interval = setInterval(() => {
            setDirection('next');
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 4000);

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
            <div id="explore" className='lg:px-[8vw] pb-[20vh] flex items-center justify-center gap-0 border-t'>
                <div className="w-auto relative flex items-center justify-center">
                    <FaChevronLeft className="absolute h-48 left-[-50px] top-1/2 text-white cursor-pointer transform -translate-y-1/2" onClick={() => changeImage('prev')} />
                    <FaChevronRight className="absolute h-48 right-[-50px] top-1/2 text-white cursor-pointer transform -translate-y-1/2" onClick={() => changeImage('next')} />
                    <div className="flex">
                        {images.map((image, index) => (
                            <motion.img
                                key={index}
                                initial={direction === 'next' ? { opacity: 0, x: '100vw' } : { opacity: 0, x: '-100vw' }}
                                animate={index === currentImage ? { opacity: 1, x: 0 } : { opacity: 0, x: 0}}
                                exit={{ opacity: 0, x: direction === 'next' ? '-100vw' : '100vw' }}
                                transition={{ duration: 1 }}
                                src={image}
                                alt={`background-${index}`}
                                className={`w-[60vw] h-[70vh] rounded-3xl shadow-lg shadow-black bg-contain ${index === currentImage ? '' : 'hidden'}`}
                            />
                        ))}
                    </div>
                    <div className='absolute bottom-[-50px] left-1/2 transform -translate-x-1/2 flex gap-2'>
                        {images.map((_, index) => (
                            <span
                                key={index}
                                className={`w-3 h-3 rounded-full bg-white  cursor-pointer duration-500 ${index === currentImage ? 'opacity-80 bg_main' : 'opacity-20'}`}
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
