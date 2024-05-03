
export const navVariants = {
    hidden: {
      opacity: 0,
      y: -50,
      transition: {
        type: 'slideIn',
        stiffness: 300,
        damping: 140,
      },
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'slideIn',
        stiffness: 80,
        delay: 0.4,
      },
    },
  };
export const navVariants2 = {
    hidden: {
      opacity: 0,
      y: 50,
      transition: {
        type: 'slideIn',
        stiffness: 300,
        damping: 140,
      },
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'slideIn',
        stiffness: 80,
        delay: 0.4,
      },
    },
  };
  
  export const slideIn = (direction, type, delay, duration) => ({
    hidden: {
      x: direction === 'left' ? '-70%' : direction === 'right' ? '70%' : 0,
      y: direction === 'up' ? '70%' : direction === 'down' ? '-70%' : 0,
      opacity:0,
    },
    show: {
      x: 0,
      y: 0,
      opacity:1,
      transition: {
        type,
        delay,
        duration,
        ease: 'easeOut',
      },
    
    },
  });
  export const slideIn3 = (direction, type, delay, duration) => ({
    hidden: {
      x: direction === 'left' ? '-10%' : direction === 'right' ? '10%' : 0,
      y: direction === 'up' ? '10%' : direction === 'down' ? '-10%' : 0,
      opacity:0,
    },
    show: {
      x: 0,
      y: 0,
      opacity:1,
      transition: {
        type,
        delay,
        duration,
        ease: 'easeOut',
      },
    
    },
  });
  export const slideIn2 = (direction, type, delay, duration) => ({
    hidden: {
      x: direction === 'left' ? '-50%' : direction === 'right' ? '50%' : 0,
      y: direction === 'up' ? '50%' : direction === 'down' ? '50%' : 0,
      scale:0.75,
      opacity:0,
    },
    show: {
      x: 0,
      y: 0,
      scale:0.75,
      opacity:1,
      transition: {
        type,
        delay,

        duration,
        ease: 'easeOut',
      },
    },
  });
  
  export const staggerContainer = (staggerChildren, delayChildren) => ({
    hidden: {},
    show: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  });
  
  export const textVariant = (delay) => ({
    hidden: {
      x: 100,
      opacity: 0,
    },
    show: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'ease',
        duration: 0.5,
        delay,
      },
    },
  });
  export const textVariant1 = (delay) => ({
    hidden: {
      x: -100,
      opacity: 0,
    },
    show: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'ease',
        duration: 0.5,
        delay,
      },
    },
  });
  export const textVariant2 = (delay) => ({
    hidden: {
      scale:0.75,
      opacity: 0,
    },
    show: {
      scale:1,
      opacity: 1,
      transition: {
        type: 'ease',
        duration: 0.8,
        delay,
      },
    },
  });
  export const textVariant3 = (delay) => ({
    hidden: {
      
      opacity: 0,
    },
    show: {
      
      opacity: 1,
      transition: {
        type: 'ease',
        duration: 0.8,
        delay,
      },
    },
  });
  
  
  export const textContainer = {
    hidden: {
      opacity: 0,
    },
    show: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: i * 0.1 },
    }),
  };
  

  
  export const fadeIn = (direction, type, delay, duration) => ({
    hidden: {
      x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
      y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      
      transition: {
        type,
        delay,
        duration,
        ease: 'easeOut',
      },
    },
  });
  export const fadeIn2 = (direction, type, delay, duration) => ({
    hidden: {
      x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
      y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      scale:0.75,

      transition: {
        type,
        delay,
        duration,
        ease: 'easeIn',
      },
    },
  });
  
  export const planetVariants = (direction) => ({
    hidden: {
      x: direction === 'left' ? '-100%' : '100%',
      rotate: 120,
    },
    show: {
      x: 0,
      rotate: 0,
      transition: {
        type: 'spring',
        duration: 1.8,
        delay: 0.5,
      },
    },
  });
  
  export const zoomIn = (delay, duration) => ({
    hidden: {
      scale: 0,
      opacity: 0,
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'tween',
        delay,
        duration,
        ease: 'easeOut',
      },
    },
  });
  
  export const footerVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 140,
      },
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 80,
        delay: 0.5,
      },
    },
  };
  