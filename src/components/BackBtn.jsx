import React from 'react'
import { FaBackward } from "react-icons/fa6";

const BackBtn = ({story, setStory}) => {
  return (
    <>
      <button onClick={() => setStory(false)} className="absolute top-4 left-8 z-50 p-2 hover:bg-[#05995b] text-white text-3xl rounded-md flex items-center gap-2">
        <FaBackward /> Back
      </button>
    </>
  )
}

export default BackBtn