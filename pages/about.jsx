    import React from 'react';
    import { BiSolidQuoteSingleLeft, BiSolidQuoteSingleRight } from "react-icons/bi";
    import { motion } from "framer-motion";
    import { slideIn, textVariant2 } from "@/utils/motion";

    const About = () => {
        return (
            <div id="about" className='px-[8vw] py-[10vh] min-h-[90.7vh] gap-8 flex items-center flex-col font-noto text-white justify-center relative'>

                <div className="flex items-center justify-center flex-col gap-10 ">

                    <motion.h1
                        variants={slideIn('top', "tween", 0, 1.0)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: false, amount: 0.9 }}
                        className='font-swash text-5xl z-10  max-md:text-4xl' >
                        About us
                    </motion.h1>

                    <div className='relative max-xl:w-3/4  max-lg:w-[70vw] max-md:pt-10'>
                        <motion.div
                            variants={slideIn('left', "tween", 0, 1.0)}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: false, amount: 0.9 }}
                            className='absolute -left-12 -top-10 max-md:-left-4 max-md:-top-4'>

                            <BiSolidQuoteSingleLeft
                                className='text-5xl max-lg:text-5xl'
                            />

                        </motion.div>

                        <motion.h4
                            variants={textVariant2(0)}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: false, amount: 0.9 }}
                            className='text-xl text-center relative max-lg:text-lg max-md:text-sm'>
                            Welcome to Amazeart, the vibrant hub where artists of all genres converge to share their talents and earn recognition for their creativity. Our platform provides a dynamic space for musicians, painters, dancers, photographers, crafters, and creators of all kinds to showcase their work to a global audience. With Amazeart, artists have the opportunity to not only share their passion but also monetize their talent. Whether through selling artwork, streaming music, offering online tutorials, or engaging with patrons, Amazeart empowers artists to turn their passion into a sustainable livelihood. Join us on Amazeart and embark on a journey where creativity thrives and artists flourish.
                        </motion.h4>

                        <motion.div
                            variants={slideIn('right', "tween", 0, 1.0)}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: false, amount: 0.9 }}
                            className='absolute -right-12 -bottom-10 max-md:-right-4 max-md:-bottom-8 '>

                            <BiSolidQuoteSingleRight
                                className='text-5xl max-lg:text-5xl'
                            />

                        </motion.div>
                    </div>
                </div>
            </div>
        );
    }

    export default About;
