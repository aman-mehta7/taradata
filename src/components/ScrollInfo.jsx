import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const ScrollInfo = () => {
  const timelineRef = useRef(null);
  const progressRef = useRef(0);

  useEffect(() => {

    // Create clean, organized timeline
    const tl = gsap.timeline({ paused: true });
    timelineRef.current = tl;

    // Smooth scroll handling
    let targetProgress = 0;
    const scrollSensitivity = 0.0003;
    let isAnimating = false;

    const smoothUpdateProgress = () => {
      const currentProgress = progressRef.current;
      const diff = targetProgress - currentProgress;

      if (Math.abs(diff) > 0.001) {
        progressRef.current += diff * 0.1; // Smooth interpolation
        tl.progress(progressRef.current);
        requestAnimationFrame(smoothUpdateProgress);
      } else {
        isAnimating = false;
      }
    };

    const handleWheel = (event) => {
      event.preventDefault();

      // Update target progress based on scroll
      targetProgress += event.deltaY * scrollSensitivity;
      targetProgress = Math.max(0, Math.min(1, targetProgress)); // Clamp between 0-1

      // Start smooth animation if not already running
      if (!isAnimating) {
        isAnimating = true;
        smoothUpdateProgress();
      }
    };

    // Add event listener
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  return (
    <div className="fixed top-0 h-screen w-full  z-[999] pointer-events-none">
      <div className="h-full w-full p-10">
        <div className="flex justify-center items-center font-bold text-9xl ">
          <h1>TARADATA</h1>
        </div>

        {/* introduction */}
        <div className="grid grid-cols-2 gap-10 mt-20">
          <div>
            <h1>INTRODUCTION</h1>
            <p>
              Terra (EOS AM‑1) is NASA’s flagship Earth‑observing satellite,
              launched in 1999. Flying in a sun‑synchronous polar orbit, it
              carries five key instruments—MODIS, ASTER, MISR, CERES, and
              MOPITT—to monitor Earth’s land, oceans, atmosphere, and energy
              budget. Its long, consistent data record underpins climate
              research, wildfire and air‑quality monitoring, and land‑use change
              studies. All data are open and free via NASA Earthdata.
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
        <div>
          <div>
            <h1>WHAT IT DOES</h1>
            <p>
              NASA’s Terra satellite (EOS AM‑1) is an Earth‑observing workhorse
              that takes daily, global snapshots to track how our planet is
              changing. Here’s what it does:
            </p>
          </div>

          <div>
            <div>
              <h1>LAND</h1>
              <p>
                {" "}
                Tracks vegetation health, drought, deforestation, urban growth,
                and wildfires (hotspot detection) with near‑daily global
                coverage (MODIS).
              </p>
            </div>
            <div>
              <h1>Oceans</h1>
              <p>
                {" "}
                Monitors sea surface temperature, ocean color, and phytoplankton
                growth (MODIS, VIIRS).
              </p>
            </div>
            <div>
              <h1>Atmosphere</h1>
              <p>
                Maps smoke, dust, and other aerosols (MISR), measures carbon
                monoxide to follow pollution and fire plumes (MOPITT), and
                characterizes clouds (MODIS/MISR).
              </p>
            </div>
            <div>
              <h1>Earth’s energy budget</h1>
              <p>
                {" "}
                Measures how much solar energy Earth absorbs vs. reflects and
                how much heat it emits back to space—key for climate change
                trends (CERES).
              </p>
            </div>
            <div>
              <h1>Heat and topography</h1>
              <p>
                Captures high‑resolution thermal and stereo images for
                volcanoes, urban heat, land surface temperature, and terrain
                models (ASTER).
              </p>
            </div>
          </div>
        </div>

        {/* impact on humanity */}
        <div>
          <div>
            <h1>IMPACT ON HUMANITY</h1>
            <p>
              NASA’s Terra satellite has delivered over two decades of practical benefits for people and the planet—here’s the impact at a glance:
            </p>
          </div>
          <div>
            <div>
              <h1>Disaster response</h1> Rapid fire hotspots, flood extents, and volcano monitoring guide responders.
              <h1>Air quality & health:</h1>Tracks smoke, dust, and CO to improve PM2.5 estimates and public alerts.
              <h1>Climate evidence</h1> Measures Earth’s energy imbalance and long‑term trends in snow, ice, vegetation, and fire.
              <h1>Agriculture & food security</h1> NDVI/EVI flag drought stress and help forecast yields.
              <h1>Water resources & drought</h1>Snow cover and land‑surface temperature improve runoff and drought monitoring.
              <h1>Ocean health & fisheries</h1>Ocean color maps phytoplankton and harmful algal blooms.
              <h1>Urban planning & heat </h1> ASTER thermal maps pinpoint urban heat islands for cooling strategies.
              <h1>Hazards & infrastructure:</h1> Stereo/thermal imagery supports landslide risk, lava flow, and damage assessment.
              <h1>Open data & policy</h1>Free global datasets empower researchers, support national reporting, and calibrate newer satellites.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ScrollInfo;
