import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState } from "react";
import { SlArrowRight } from "react-icons/sl";
import { SlArrowLeft } from "react-icons/sl";

const Nav = ({ story, setStory, data, setData }) => {
  const [nav, setNav] = useState(false);

  const leftArrowRef = useRef(null);
  const rightArrowRef = useRef(null);

  useGSAP(() => {
    gsap.set(leftArrowRef.current, { opacity: nav ? 0 : 1, x: nav ? -30 : 0 });
    gsap.set(rightArrowRef.current, { opacity: nav ? 1 : 0, x: nav ? 0 : 30 });
  }, []); // run once for initial state

  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: { duration: 0.3, ease: "power2.inOut" },
    });

    if (nav) {
      tl.to(leftArrowRef.current, { opacity: 0, x: -30 }).to(
        rightArrowRef.current,
        { opacity: 1, x: 0 },
        "-=0.15"
      ); // overlap a little
    } else {
      tl.to(rightArrowRef.current, { opacity: 0, x: 30 }).to(
        leftArrowRef.current,
        { opacity: 1, x: 0 },
        "-=0.15"
      );
    }
  }, [nav]);

  useGSAP(() => {
    gsap.fromTo(".nav-container,#nav", {
      x: 200,
      opacity: 0,
    }, {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: "easeInOut",
      delay: 0.7,
    });
  }, []);

  return (
    <section
      id="nav"
      className={` absolute ${nav ? "-right-[0vw]" : "-right-[15vw]"
        } top-0 z-[99999] transition-all duration-500 ease-in-out opacity-0`}
    >
      <div className="nav-container h-screen w-[20vw] text-white clip-path flex items-center bg-zinc-800/65 hover:bg-zinc-800/85 transition-all duration-500 ease-in-out overflow-hidden opacity-0">
        <button
          onClick={() => setNav(!nav)}
          className="arrow relative w-12 h-12 text-5xl font-bold px-10 py-90 transition-all duration-400 ease-in-out hover:scale-110"
        >
          {/* Left Arrow */}
          <span
            ref={leftArrowRef}
            className="absolute inset-0 flex items-center justify-center opacity-100"
          >
            <SlArrowLeft />
          </span>

          {/* Right Arrow */}
          <span
            ref={rightArrowRef}
            className="absolute inset-0 flex items-center justify-center opacity-0 translate-x-5"
          >
            <SlArrowRight />
          </span>
        </button>

        <div className="flex flex-col gap-30 items-center justify-center text-amber-50 h-full w-full">
          <button
            onClick={() => {
              setStory(!story);
              setNav(!nav);
            }}
            className="text-5xl font-bold"
          >
            STORY
          </button>
          <button className="text-5xl font-bold"
            onClick={() => {
              setData(!data);
              setNav(!nav);
            }}
          >DATA</button>
          {/* <button className="text-5xl font-bold">TEAM</button> */}
        </div>
      </div>
    </section>
  );
};

export default Nav;
