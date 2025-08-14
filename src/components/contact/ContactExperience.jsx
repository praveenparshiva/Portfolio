import React, { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useInView } from "react-intersection-observer";

// Lazy-load the 3D model
const Computer = React.lazy(() => import("./Computer"));

const ContactExperience = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Load once
    threshold: 0.05, // 5% visible
  });

  return (
    <div ref={ref} style={{ height: "100%", width: "100%" }}>
      {inView && (
        <Canvas shadows camera={{ position: [0, 3, 7], fov: 45 }}>
          <ambientLight intensity={0.5} color="#fff4e6" />
          <directionalLight
            position={[5, 5, 3]}
            intensity={2.5}
            color="#ffd9b3"
          />
          <directionalLight
            position={[5, 9, 1]}
            castShadow
            intensity={2.5}
            color="#ffd9b3"
          />
          <OrbitControls
            enableZoom={false}
            minPolarAngle={Math.PI / 5}
            maxPolarAngle={Math.PI / 2}
          />
          <group scale={[1, 1, 1]}>
            <mesh
              receiveShadow
              position={[0, -1.5, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
            >
              <planeGeometry args={[30, 30]} />
              <meshStandardMaterial color="#2d8ea4ff" />
            </mesh>
          </group>
          <group scale={0.03} position={[0, -1.49, -2]} castShadow>
            <Suspense fallback={null}>
              <Computer />
            </Suspense>
          </group>
        </Canvas>
      )}
    </div>
  );
};

export default ContactExperience;
