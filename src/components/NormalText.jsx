import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'

const NormalText = () => {
  const textRef = useRef();

  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { y: 50, opacity: 0 }, // start above, hidden
        { y: 0, opacity: 1, duration: 1, delay: 1.65, ease: "power3.out" } // animate down into place
      );
    }
  }, []);

  return (
    <div ref={textRef} className='absolute z-50 bottom-10 left-10 opacity-0'>
      <h1 className='text-2xl font-bold robarto text-zinc-300'>
        Explore The Power Of Taradata
      </h1>
      <p className='text-sm text-zinc-400 mt-2 max-w-md'>
        © {new Date().getFullYear()} The Coders Dimension. All rights reserved.
      </p>
    </div>
  )
}

export default NormalText