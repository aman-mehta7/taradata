import React, { useRef, useEffect } from "react";
import gsap from "gsap";

const NormalText = () => {
  const containerRef = useRef();
  const titleRef = useRef();

  useEffect(() => {
    if (containerRef.current) {
      const tl = gsap.timeline({ delay: 1.5 });

      // Animate in the heading
      tl.fromTo(
        ".ref",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 2, ease: "power3.out" }
      );

      // Stagger in the paragraph AFTER the heading
      // tl.fromTo(
      //   ".ref",
      //   { y: 20, opacity: 0 },
      //   { y: 0, opacity: 1, duration: 2.5, ease: "power2.out" },
      // );
    }
  }, []);

  return (
    <div ref={containerRef} className="absolute bottom-10 left-10">
      <h1
        ref={titleRef}
        className=" ref text-2xl font-bold robarto text-zinc-300 opacity-0"
      >
        Explore The Power Of Taradata
      </h1>
      <p
        className=" ref text-sm text-zinc-400 mt-2 max-w-md opacity-0"
      >
        © {new Date().getFullYear()} The Coders Dimension. All rights reserved.
      </p>
    </div>
  );
};

export default NormalText;