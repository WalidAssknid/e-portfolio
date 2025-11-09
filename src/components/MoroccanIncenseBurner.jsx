import { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

export function MoroccanIncenseBurner(props) {
  const group = useRef();
  const { scene } = useGLTF("/models/moroccan_incense_burner.glb");

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

  // Center the loaded model so its origin is in the middle of its bounds.
  // Also compute a gentle auto-scale if a very large model is loaded.
  useEffect(() => {
    if (!scene) return;
    try {
      const box = new THREE.Box3().setFromObject(scene);
      const size = new THREE.Vector3();
      box.getSize(size);
      const center = new THREE.Vector3();
      box.getCenter(center);

      // Move the gltf scene so it's centered at the origin
      scene.position.x -= center.x;
      scene.position.y -= center.y;
      scene.position.z -= center.z;

      // If model is huge, apply a reasonable default scale (keeps props.scale usable)
      const maxDim = Math.max(size.x, size.y, size.z);
      if (maxDim > 0 && maxDim > 3) {
        const autoScale = 3 / maxDim; // scale down to ~3 units
        scene.scale.setScalar(autoScale);
      }
    } catch (err) {
      // silently ignore bounding errors
      // console.warn('Could not compute bounding box for model', err)
    }
  }, [scene]);

  // Gentle rotation and floating animation (subtle)
  useFrame((state) => {
    if (group.current) {
      const time = state.clock.elapsedTime;

      // Slow, elegant rotation
      group.current.rotation.y = time * 0.12;

      // Very gentle floating motion
      group.current.position.y = Math.sin(time * 0.6) * 0.04;

      // Subtle scale pulse for breathing effect
      const scalePulse = 1 + Math.sin(time * 1.2) * 0.015;
      group.current.scale.setScalar((props.scale || 1) * scalePulse);
    }
  });

  return (
    <group ref={group}>
      {/* Ambient glow light */}
      <pointLight
        position={[0, 2, 0]}
        intensity={0.8}
        distance={8}
        color="#d6995c"
        decay={2}
      />
      <Float
        speed={0.9}
        rotationIntensity={0.12}
        floatIntensity={0.18}
      >
        <group
          {...props}
          dispose={null}
          scale={props.scale || 1}
          position={props.position || [0, 0, 0]}
        >
          <primitive object={scene} />
        </group>
      </Float>
    </group>
  );
}

useGLTF.preload("/models/moroccan_incense_burner.glb");

