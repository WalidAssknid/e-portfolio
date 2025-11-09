import { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

export function BoxingGloves(props) {
  const group = useRef();
  const meshRef = useRef();
  const { scene } = useGLTF("/models/vintage__old_boxing_gloves.glb");

  // Enable shadows - preserve original colors
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          // Preserve original material colors
        }
      });
    }
  }, [scene]);

  // Dynamic punching motion animation
  useFrame((state) => {
    if (group.current) {
      const time = state.clock.elapsedTime;
      
      // Continuous slow rotation
      group.current.rotation.y = time * 0.2;
      
      // Punching motion simulation
      const punchCycle = Math.sin(time * 1.2);
      group.current.rotation.x = punchCycle * 0.3;
      group.current.position.z = Math.abs(punchCycle) * 0.3;
      
      // Power pulse effect
      const powerPulse = 1 + Math.sin(time * 3) * 0.08;
      group.current.scale.setScalar((props.scale || 1) * powerPulse);
      
      // Slight shake for intensity
      group.current.rotation.z = Math.sin(time * 5) * 0.05;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Glow effect */}
      <pointLight
        position={[0, 0, 0]}
        intensity={1.5}
        distance={6}
        color="#ca2f8c"
        decay={2}
      />
      <Float
        speed={2}
        rotationIntensity={0.8}
        floatIntensity={0.7}
      >
        <group
          ref={group}
          {...props}
          dispose={null}
          scale={props.scale || 1.8}
          position={props.position || [0, -0.5, 0]}
        >
          <primitive object={scene} />
        </group>
      </Float>
    </group>
  );
}

useGLTF.preload("/models/vintage__old_boxing_gloves.glb");

