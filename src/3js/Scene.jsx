//

import { Canvas, useFrame } from "@react-three/fiber";
import React, { useRef, useEffect, useState } from "react";
import Earth from "./Earth";
import {
  Float,
  OrbitControls,
  PerspectiveCamera,
  Text,
} from "@react-three/drei";
import Satellite from "./Satellite";
import Particals from "./Particals";
import gsap from "gsap";
import CoolText from "../components/CoolText";
import NormalText from "../components/NormalText";
import { useGSAP } from "@gsap/react";

const RotatingEarth = () => {
  const earthRef = useRef();

  const baseSpeed = 0.03; // normal rotation
  const scrollSpeed = 0.19; // speed when scrolling
  const [targetSpeed, setTargetSpeed] = useState(baseSpeed);
  const currentSpeed = useRef(baseSpeed);

  useEffect(() => {
    let timeout;

    const handleScroll = () => {
      setTargetSpeed(scrollSpeed); // speed up on scroll
      clearTimeout(timeout);

      // after scrolling stops, target goes back to baseSpeed
      timeout = setTimeout(() => {
        setTargetSpeed(baseSpeed);
      }, 100); // adjust delay if you want
    };

    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
  }, []);

  useFrame((_, delta) => {
    // smooth lerp: currentSpeed -> targetSpeed
    currentSpeed.current += (targetSpeed - currentSpeed.current) * 0.1; // 0.1 = smoothing factor
    if (earthRef.current) {
      earthRef.current.rotation.z += delta * currentSpeed.current;
    }
  });

  return (
    <group ref={earthRef} scale={0.11} position={[8, -11, -3]}>
      <Earth />
    </group>
  );
};

const Scene = ({ story }) => {
  const satelliteGroup = useRef();
  const cameraRef = useRef();



const tiltRef = useRef(null);
const [xVal, setXVal] = useState(0);
const [yVal, setYVal] = useState(0);

const mouseMove = (e) => {
  const rect = e.target.getBoundingClientRect();
  const offsetX = e.clientX - rect.left - rect.width / 2;
  const offsetY = e.clientY - rect.top - rect.height / 2;


  setXVal(offsetX / 20000);
  setYVal(-offsetY / 10000);
};

useGSAP(
  () => {
    if (tiltRef.current) {
      gsap.to(tiltRef.current.rotation, {
        x: -yVal,  // tilt up/down
        y: xVal,  // tilt left/right
        duration: 3,
        ease: "easeInOut",
        delay: 0.15,
      });
    }
  },
  [xVal, yVal]
);


  // Animate satellite group on story toggle
  useEffect(() => {
    if (satelliteGroup.current) {
      gsap.to(satelliteGroup.current.position, {
        x: story ? -2 : -1,
        y: story ? -1 : 0,
        z: -2,
        duration: 1.2,
        ease: "easeInOut",
      });

      gsap.to(satelliteGroup.current.scale, {
        x: story ? 0.35 : 0.6,
        y: story ? 0.35 : 0.6,
        z: story ? 0.35 : 0.6,
        duration: 1.2,
        ease: "easeInOut",
      });

      gsap.to(satelliteGroup.current.rotation, {
        x: story ? Math.PI / 2 : 0,
        y: story ? Math.PI / 1.7 : Math.PI / 2,
        z: story ? Math.PI / -2 : 0.2,
        duration: 1.2,
        ease: "easeInOut",
      });
    }
  }, [story]);

  // Animate camera on story toggle
  useEffect(() => {
    if (cameraRef.current) {
      gsap.to(cameraRef.current.position, {
        x: story ? -8 : 0,
        y: story ? -1 : 0,
        z: story ? -2 : 10,
        duration: 1.5,
        ease: "easeInOut",
      });
    }
  }, [story]);

  return (
    <Canvas
      onMouseMove={mouseMove}
      // onMouseLeave={() => {
      //   if (tiltRef.current) {
      //     gsap.to(tiltRef.current.rotation, {
      //       x: 0,
      //       y: 0,
      //       duration: 3,
      //       delay: 2,
      //       // ease: "power2.out",
      //     });
      //   }
      // }}
    >
      <OrbitControls
        enableZoom={false}
        enableDamping={false}
        enablePan={false}
        enableRotate={false}
      />

      {/* Controlled camera */}
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 10]} />

      <ambientLight intensity={5} />

      <Float>
        <group
          ref={satelliteGroup}
          position={[-1, -1, -2]}
          scale={0.6}
          rotation={[0, Math.PI / 2, 0.2]}
        >
          <Satellite />
        </group>
      </Float>

      <Float speed={0.2} rotationIntensity={0.2} floatIntensity={1}>
        <group position={[-25, -5, -10]} scale={8} rotation={[0, 0, 1]}>
          <Particals />
        </group>
      </Float>

      {/* <group scale={1.5} position={[0, 0, -40]}>
      <Sky />
    </group> */}
      <group scale={1.5} position={[0, 0, -40]} ref={tiltRef}>
        <CoolText />
        <directionalLight position={[.5, 5, 0]} intensity={0.5} color="red" />
        <directionalLight position={[0, -5, 0]} intensity={0.5} color="blue" />
      </group>

      {/* <group scale={1.5} position={[0, 0, 0]}>
     <NormalText />
    </group> */}

      <RotatingEarth />
    </Canvas>
  );
};

export default Scene;
