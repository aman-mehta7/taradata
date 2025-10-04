import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import BackBtn from "./BackBtn";

const ScrollInfo = ({story, setStory}) => {
  const contentRef = useRef(null);
  const scrollY = useRef(0);
  const maxScroll = useRef(0);

  useEffect(() => {
    const contentEl = contentRef.current;

    // compute max scroll based on content height
    const updateMaxScroll = () => {
      const totalHeight = contentEl.scrollHeight;
      const windowHeight = window.innerHeight;
      maxScroll.current = Math.max(totalHeight - windowHeight, 0);
    };
    updateMaxScroll();
    window.addEventListener("resize", updateMaxScroll);

    const handleWheel = (e) => {
      e.preventDefault();

      // increment scroll position
      scrollY.current += e.deltaY;
      // clamp
      scrollY.current = Math.max(
        0,
        Math.min(maxScroll.current, scrollY.current)
      );

      // animate container with gsap (smooth interpolation)
      gsap.to(contentEl, {
        y: -scrollY.current,
        ease: "power3.out",
        duration: 0.6,
      });
    };

    const items = gsap.utils.toArray(".effect"); // get all .effect divs
    items.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        gsap.to(el, {
          scale: 1.05,
          backgroundColor: "#05995b",
            borderRadius: "50px",
          duration: 0.3,
          ease: "power3.out",
        });
      });

      el.addEventListener("mouseleave", () => {
        gsap.to(el, {
          scale: 1,
          backgroundColor: "rgba(0,0,0,0)",
          borderRadius: "50px",
          duration: 0.3,
          ease: "power3.out",
        });
      });
    });

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", updateMaxScroll);
    };
  }, []);

  return (
    <div className=" absolute w-full h-screen overflow-hidden bg-black/30 backdrop-blur-xl z-[999]">
      <BackBtn story={story} setStory={setStory} />
      {/* scrolling content wrapper */}
      <div ref={contentRef} className="absolute top-0 left-0 w-full">
        <div className="h-full w-full p-10">
          <div className="flex justify-center items-center font-bold text-9xl text-[#05995b]">
            <h1>TARADATA</h1>
          </div>

          {/* introduction */}
          <div className="grid grid-cols-2 gap-10 mt-20 px-20 p-10">
            <div>
              <div className="mb-5 text-5xl">
                <h1 className="text-[#05995b]">INTRODUCTION</h1>
              </div>
              <p className="text-2xl leading-8">
                Terra (EOS AM‑1) is NASA’s flagship Earth‑observing satellite,
                launched in 1999. Flying in a sun‑synchronous polar orbit, it
                carries five key instruments—MODIS, ASTER, MISR, CERES, and
                MOPITT—to monitor Earth’s land, oceans, atmosphere, and energy
                budget. Its long, consistent data record underpins climate
                research, wildfire and air‑quality monitoring, and land‑use
                change studies. All data are open and free via NASA Earthdata.
              </p>
            </div>
            <div>
              <img
                src="https://via.placeholder.com/800x600"
                alt="Terra Satellite"
              />
            </div>
          </div>

          {/* what it does */}
          <div className=" mt-20 px-20 p-10 ">
            <h1 className="text-5xl pb-5 text-[#05995b]" >WHAT IT DOES</h1>
            <p className="text-2xl leading-8 w-[50%]">
              NASA’s Terra satellite (EOS AM‑1) is an Earth‑observing workhorse
              that takes daily, global snapshots to track how our planet is
              changing. Here’s what it does:
            </p>

            <div className="  p-10 mt-50">
              <div className="effect grid gap-10 grid-cols-2 py-10 ">
                <div className=" flex items-center ml-20 text-5xl">
                  <h1>LAND</h1>
                </div>
                <p className="w-[80%] ">
                  Tracks vegetation health, drought, deforestation, urban
                  growth, and wildfires (hotspot detection) with near‑daily
                  global coverage (MODIS).
                </p>
              </div>
              <div className=" effect grid grid-cols-2 gap-10 py-10 ">
                <div className="flex  items-center ml-20 text-5xl">
                  <h1>Oceans</h1>
                </div>
                <p className="w-[80%]">
                  Monitors sea surface temperature, ocean color, and
                  phytoplankton growth (MODIS, VIIRS).
                </p>
              </div>
              <div className=" effect grid grid-cols-2 gap-10 py-10 ">
                <div className="flex  items-center ml-20 text-5xl">
                  <h1>Atmosphere</h1>
                </div>
                <p className="w-[80%]">
                  Maps smoke, dust, and other aerosols (MISR), measures carbon
                  monoxide to follow pollution and fire plumes (MOPITT), and
                  characterizes clouds (MODIS/MISR).
                </p>
              </div>
              <div className=" effect grid grid-cols-2 gap-10 py-10 ">
                <div className="flex  items-center ml-20 text-5xl">
                  <h1>Earth’s energy budget</h1>
                </div>
                <p className="w-[80%]">
                  Measures how much solar energy Earth absorbs vs. reflects and
                  how much heat it emits back to space—key for climate change
                  trends (CERES).
                </p>
              </div>
              <div className=" effect grid grid-cols-2 gap-10 py-10 ">
                <div className="flex  items-center ml-20 text-5xl">
                  <h1>Heat and topography</h1>
                </div>
                <p className="w-[80%]">
                  Captures high‑resolution thermal and stereo images for
                  volcanoes, urban heat, land surface temperature, and terrain
                  models (ASTER).
                </p>
              </div>
            </div>
          </div>

          {/* impact on humanity */}
 <div className="mt-20 px-20 p-10">
      {/* Section Heading */}
      <h1 className="text-5xl pb-5 text-[#05995b]">IMPACT ON HUMANITY</h1>
      <p className="text-2xl leading-8 w-[50%]">
        NASA’s Terra satellite has delivered over two decades of practical
        benefits for people and the planet—here’s the impact at a glance:
      </p>

      {/* Cards Grid */}
      <div className=" mt-20 grid gap-5 grid-cols-3">
        
        {/* Card 1 */}
        <div className="group backdrop-blur-2xl rounded-lg p-5 transition-all duration-500 hover:bg-[#05995b] cursor-pointer h-32 overflow-hidden">
          <h1 className="text-3xl font-bold">Disaster response</h1>
          <p className="mt-3 text-lg leading-6 ">
            Rapid fire hotspots, flood extents, and volcano monitoring guide responders.
          </p>
        </div>

        {/* Card 2 */}
        <div className="group backdrop-blur-2xl rounded-lg p-5 transition-all duration-500 hover:bg-[#05995b] cursor-pointer h-32 overflow-hidden">
          <h1 className="text-3xl font-bold">Air quality &amp; health</h1>
          <p className="mt-3 text-lg leading-6 ">
            Tracks smoke, dust, and CO to improve PM2.5 estimates and public alerts.
          </p>
        </div>

        {/* Card 3 */}
        <div className="group backdrop-blur-2xl rounded-lg p-5 transition-all duration-500 hover:bg-[#05995b] cursor-pointer h-32 overflow-hidden">
          <h1 className="text-3xl font-bold">Climate evidence</h1>
          <p className="mt-3 text-lg leading-6 ">
            Measures Earth’s energy imbalance and long‑term trends in snow, ice, vegetation, and fire.
          </p>
        </div>

        {/* Card 4 */}
        <div className="group backdrop-blur-2xl rounded-lg p-5 transition-all duration-500 hover:bg-[#05995b] cursor-pointer h-32 overflow-hidden">
          <h1 className="text-3xl font-bold">Agriculture &amp; food security</h1>
          <p className="mt-3 text-lg leading-6 ">
            NDVI/EVI flag drought stress and help forecast yields.
          </p>
        </div>

        {/* Card 5 */}
        <div className="group backdrop-blur-2xl rounded-lg p-5 transition-all duration-500 hover:bg-[#05995b] cursor-pointer h-32 overflow-hidden">
          <h1 className="text-3xl font-bold">Water resources &amp; drought</h1>
          <p className="mt-3 text-lg leading-6 ">
            Snow cover and land‑surface temperature improve runoff and drought monitoring.
          </p>
        </div>

        {/* Card 6 */}
        <div className="group backdrop-blur-2xl rounded-lg p-5 transition-all duration-500 hover:bg-[#05995b] cursor-pointer h-32 overflow-hidden">
          <h1 className="text-3xl font-bold">Ocean health &amp; fisheries</h1>
          <p className="mt-3 text-lg leading-6 ">
            Ocean color maps phytoplankton and harmful algal blooms.
          </p>
        </div>

        {/* Card 7 */}
        <div className="group backdrop-blur-2xl rounded-lg p-5 transition-all duration-500 hover:bg-[#05995b] cursor-pointer h-32 overflow-hidden">
          <h1 className="text-3xl font-bold">Urban planning &amp; heat</h1>
          <p className="mt-3 text-lg leading-6 ">
            ASTER thermal maps pinpoint urban heat islands for cooling strategies.
          </p>
        </div>

        {/* Card 8 */}
        <div className="group backdrop-blur-2xl rounded-lg p-5 transition-all duration-500 hover:bg-[#05995b] cursor-pointer h-32 overflow-hidden">
          <h1 className="text-3xl font-bold">Hazards &amp; infrastructure</h1>
          <p className="mt-3 text-lg leading-6 ">
            Stereo/thermal imagery supports landslide risk, lava flow, and damage assessment.
          </p>
        </div>

        {/* Card 9 */}
        <div className="group backdrop-blur-2xl rounded-lg p-5 transition-all duration-500 hover:bg-[#05995b] cursor-pointer h-32 overflow-hidden">
          <h1 className="text-3xl font-bold">Open data &amp; policy</h1>
          <p className="mt-3 text-lg leading-6 ">
            Free global datasets empower researchers, support national reporting, and calibrate newer satellites.
          </p>
        </div>
      </div>
    </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollInfo;
