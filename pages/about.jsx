import React from 'react'
import { BiSolidQuoteSingleLeft, BiSolidQuoteSingleRight } from "react-icons/bi";
import { motion } from "framer-motion";
import { fadeIn, fadeIn2, slideIn, slideIn2, staggerContainer, textVariant, textVariant1, textVariant2, textVariant3 } from "@/utils/motion";


const About = () => {
    return (
        <div id="about" className='px-[8vw]  py-[5vh] gap-8 flex items-center flex-col  font-belleza text-white justify-center   '>
            <motion.h1
                variants={slideIn('top', "tween", 0, 1.0)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.9 }}
                className='font-swash text-5xl'
            >
                About us
            </motion.h1>
            <div className='relative '>
                <motion.div
                    variants={slideIn('left', "tween", 0, 1.0)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.9 }}
                    className='absolute -left-10 -top-10'
                >

                    <BiSolidQuoteSingleLeft

                        className=' text-7xl'
                    />

                </motion.div>

                <motion.h4
                    variants={textVariant2(0)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.9 }}
                    className='text-2xl text-center relative'>Welcome to Amazeart, the vibrant hub where artists of all genres converge to share their talents and earn recognition for their creativity. Our platform provides a dynamic space for musicians, painters, dancers, photographers, crafters, and creators of all kinds to showcase their work to a global audience. With Amazeart, artists have the opportunity to not only share their passion but also monetize their talent. Whether through selling artwork, streaming music, offering online tutorials, or engaging with patrons, Amazeart empowers artists to turn their passion into a sustainable livelihood. Join us on Amazeart and embark on a journey where creativity thrives and artists flourish.</motion.h4>
                <motion.div
                    variants={slideIn('right', "tween", 0, 1.0)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.9 }}
                    className='absolute -right-10 -bottom-10'
                >

                    <BiSolidQuoteSingleRight

                        className=' text-7xl'
                    />

                </motion.div>

            </div>


        </div>
    )
}

export default About