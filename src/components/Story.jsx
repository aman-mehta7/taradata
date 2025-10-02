import { useGSAP } from '@gsap/react'
import React from 'react'
import { gsap } from 'gsap'

const Story = ({story}) => {

    useGSAP(() => {
        gsap.to('.story-container-x', {
            height: story ? '100%' : '0%',
            duration: 2,
            ease: 'ease.inOut'
        })
        gsap.to('.story-container-y', {
            width: story ? '100%' : '0%',
            duration: 2,
            ease: 'ease.inOut'
        })
  }, [story])

  return (
    <section className=' story-container w-full h-dvh absolute z-50' >
        <div>
            <div className=' story-container-x bg-black h-0 w-full absolute z-50 top-0'></div>
            <div className=' story-container-x bg-black h-0 w-full absolute z-50 bottom-0 '></div>
            <div className=' story-container-y bg-black h-screen w-0 absolute z-50 right-0 '></div>
            <div className=' story-container-y bg-black h-screen w-0 absolute z-50 left-0'></div>
        </div>
    </section>

  )
}

export default Story