import { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

export function Skateboard(props) {
  const group = useRef();
  const meshRef = useRef();
  const { scene } = useGLTF("/models/skate.glb");

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

  // Dynamic trick animations - ollie, kickflip simulation
  useFrame((state) => {
    if (group.current) {
      const time = state.clock.elapsedTime;
      
      // Continuous rotation with variation
      group.current.rotation.y = time * 0.5;
      
      // Trick simulation - periodic flips and rotations
      const trickCycle = Math.sin(time * 0.8) * 0.5 + 0.5; // 0 to 1
      
      // Kickflip motion
      if (trickCycle > 0.7) {
        group.current.rotation.x = Math.sin(time * 3) * 0.3;
        group.current.rotation.z = Math.sin(time * 2.5) * 0.4;
        group.current.position.y = Math.sin(time * 3) * 0.2;
      } else {
        group.current.rotation.x = Math.sin(time * 0.5) * 0.1;
        group.current.rotation.z = Math.sin(time * 0.7) * 0.15;
        group.current.position.y = Math.sin(time * 1.5) * 0.1;
      }
      
      // Scale pulse for energy effect
      const scalePulse = 1 + Math.sin(time * 2) * 0.05;
      group.current.scale.setScalar((props.scale || 1) * scalePulse);
    }
  });

  return (
    <group ref={meshRef}>
      {/* Glow effect */}
      <pointLight
        position={[0, 0, 0]}
        intensity={1}
        distance={5}
        color="#33c2cc"
        decay={2}
      />
      <Float
        speed={3}
        rotationIntensity={1.2}
        floatIntensity={1}
      >
        <group
          ref={group}
          {...props}
          dispose={null}
          scale={props.scale || 0.8}
          position={props.position || [0, 0, 0]}
        >
          <primitive object={scene} />
        </group>
      </Float>
    </group>
  );
}

useGLTF.preload("/models/skate.glb");

