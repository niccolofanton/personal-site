import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Object_3002: THREE.Mesh
    Object_3002_1: THREE.Mesh
  }
  materials: {
    mat_head: THREE.MeshStandardMaterial
    mat_eye: THREE.MeshStandardMaterial
  }
  animations: any[]
}

// Wrap MarioModel with forwardRef to allow parent components to pass refs
export const MarioModel = React.forwardRef<THREE.Group, JSX.IntrinsicElements['group']>((props, ref) => {
  const { nodes, materials } = useGLTF('/models-transformed/mario-transformed.glb') as GLTFResult
  return (
    <group ref={ref} {...props} dispose={null}>
      <group rotation={[-Math.PI, Math.PI / 2, 0]} scale={1.367}>
        <mesh geometry={nodes.Object_3002.geometry} material={materials.mat_head} />
        <mesh geometry={nodes.Object_3002_1.geometry} material={materials.mat_eye} />
      </group>
    </group>
  )
})

useGLTF.preload('/models-transformed/mario-transformed.glb')