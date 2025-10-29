import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Astron(props) {
  const { nodes, materials } = useGLTF('/models/moroccan_incense_burner.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.IncenseBurner_top_low_T_IncenseBurner_0.geometry}
        material={materials.T_IncenseBurner}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.IncenseBurner_bottom_low_T_IncenseBurner_0.geometry}
        material={materials.T_IncenseBurner}
      />
    </group>
  )
}

useGLTF.preload('/models/moroccan_incense_burner.glb')
