// // CoolText.jsx
// import React from "react";
// import { Text3D } from "@react-three/drei";

// const CoolText = () => {
//   return (
//     <group position={[-45, -5, -60]} scale={5}>
//       <Text3D
//         font="/fonts/helvetiker_regular.typeface.json"   // must be placed in /public/fonts
//         size={2}          // font size
//         height={0.3}      // extrusion depth (3D thickness)
//         bevelEnabled={false} // no bevel, keep it crisp/clean
//       >
//         THE DIMENSION
//         <meshStandardMaterial
//           color="black"
//           emissive="cyan"       // subtle glow
//           emissiveIntensity={0.25} // mild, not overpowering
//           metalness={0.1}          // a hint of sheen
//           roughness={0.6}          // diffuse surface (not a mirror)
//         />
//       </Text3D>

//       {/* Soft front light to make the edges visible */}
//       <pointLight position={[0, 0, 15]} intensity={1.5} color="white" />
//     </group>
//   );
// };

// export default CoolText;

// CoolText.jsx
import React, { useRef } from "react";
import { Float, Text3D } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const CoolText = () => {
  const text1 = useRef();
  const text2 = useRef();
  const text3 = useRef();
  const mat1 = useRef();
  const mat2 = useRef();
  const mat3 = useRef();

  useGSAP(() => {

    // text4.current.material.transparent = true;
    if (text1.current) {
      gsap.fromTo(
        text1.current.position,
        { y: 2,},
        {
          y: 0,
          duration: 1.5,
          ease: "easeInOut",
        }
      );
    }
    if (text2.current) {
      gsap.fromTo(
        text2.current.position,
        { x: 2,},
        {
          x: 0,
          duration: 1.5,
          ease: "easeInOut",
        }
      );
    }
    if (mat1.current)
      gsap.to(mat1.current, { opacity: 1, duration: 0.5, ease: "easeInOut" });

    if (mat2.current)
      gsap.to(mat2.current, {
        opacity: 1,
        duration: 1,
        ease: "easeInOut",
        // delay: 1,
      });

    if (mat3.current)
      gsap.to(mat3.current, {
        opacity: 1,
        duration: 0.5,
        ease: "easeInOut",
        delay: 1.2,
      });

  });

  return (
    <>
      <group 
        position={[-45, 23, -80]}
        scale={5}
        // rotation={[0, -Math.PI / 50, 0]}
      >
        <Text3D
          ref={text1}
          font="taradata/fonts/helvetiker_regular.typeface.json" // must exist in public/fonts
          size={2} // font size
          height={0.6} // extrusion depth (make it thick enough)
          bevelEnabled
          bevelThickness={0.05} // very light bevel
          bevelSize={0.05}
          bevelSegments={3}
          curveSegments={12}
        >
          T H E
          <meshStandardMaterial
            ref={mat1}
            color="black"
            emissive="" // subtle glow
            opacity={0}
            transparent={true}
            emissiveIntensity={10} // keep low, don’t wash out shadows
            metalness={0.2} // slight reflection
            roughness={0.4} // adds contrast/highlights
          />
        </Text3D>

        {/* Light to show depth */}
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="white" />
        <directionalLight position={[-5, -5, 3]} intensity={0.6} />
        <ambientLight intensity={0.3} />
      </group>
      <group
        position={[-18, 10, -80]}
        scale={5}
        // rotation={[0, -Math.PI / 50, 0]}
      >
        <Text3D
          ref={text2}
          font="taradata/fonts/helvetiker_regular.typeface.json" // must exist in public/fonts
          size={2} // font size
          height={0.6} // extrusion depth (make it thick enough)
          bevelEnabled
          bevelThickness={0.05} // very light bevel
          bevelSize={0.05}
          bevelSegments={3}
          curveSegments={12}
        >
          DIMENSION
          <meshStandardMaterial
            ref={mat2}
            color="black"
            opacity={0}
            transparent={true}
            emissive="" // subtle glow
            emissiveIntensity={10} // keep low, don’t wash out shadows
            metalness={0.2} // slight reflection
            roughness={0.4} // adds contrast/highlights
          />
        </Text3D>

        {/* Light to show depth */}
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="white" />
        <directionalLight position={[-5, -5, 3]} intensity={0.6} />
        <ambientLight intensity={0.3} />
      </group>
      <group
        position={[-43, 16, -80]}
        scale={2}
        // rotation={[0, -Math.PI / 50, 0]}
      >
        <Text3D
          ref={text3}
          font="taradata/fonts/helvetiker_regular.typeface.json" // must exist in public/fonts
          size={2} // font size
          height={0.6} // extrusion depth (make it thick enough)
          bevelEnabled
          bevelThickness={0.05} // very light bevel
          bevelSize={0.05}
          bevelSegments={3}
          curveSegments={12}
        >
          CODERS
          <meshStandardMaterial
            ref={mat3}
            color="black"
            emissive="  " // subtle glow
            opacity={0}
            transparent={true}
            emissiveIntensity={2} // keep low, don’t wash out shadows
            metalness={0.2} // slight reflection
            roughness={0.4} // adds contrast/highlights
          />
        </Text3D>

        {/* Light to show depth */}
        {/* <directionalLight position={[5, 5, 5]} intensity={1.2} color="white" />
        <directionalLight position={[-5, -5, 3]} intensity={0.6} /> */}
        <ambientLight intensity={0.3} />
      </group>
    </>
  );
};

export default CoolText;
