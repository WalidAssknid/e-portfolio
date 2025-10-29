import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export function Astronaut(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/moroccan_lantern.glb')
  const lightRef = useRef()

  // Add subtle emissive warmth to the lantern’s metal
  useEffect(() => {
    materials['15_-_Default'].metalness = 0.7
    materials['15_-_Default'].roughness = 0.3
    materials['15_-_Default'].color = new THREE.Color(0x8c7853) // bronze tone
    materials['15_-_Default'].emissive = new THREE.Color(0xffc973)
    materials['15_-_Default'].emissiveIntensity = 0.2
  }, [materials])

  // Slight flickering effect for realism
  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.intensity = 1.4 + Math.sin(Date.now() * 0.005) * 0.3
    }
  })

  return (
    <group ref={group} {...props} dispose={null} scale={0.025}>
      {/* Warm internal light */}
      <pointLight
        ref={lightRef}
        position={[0, 3, 0]}
        intensity={1.5}
        distance={10}
        decay={2}
        color={'#ffb36b'}
        castShadow
      />

      {/* Lantern model */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Object238_15_-_Default_0'].geometry}
        material={materials['15_-_Default']}
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Sphere001_14_-_Default_0'].geometry}
        material={materials['14_-_Default']}
        position={[-0.371, 7.364, -0.108]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  )
}

useGLTF.preload('/models/moroccan_lantern.glb')
