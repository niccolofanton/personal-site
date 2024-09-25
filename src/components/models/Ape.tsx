/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.2 ape.glb -t -T 
Files: ape.glb [10.37MB] > /Users/fant/work/personal-blog/public/models/ape-transformed.glb [270.12KB] (97%)
*/

import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    defaultMaterial003: THREE.Mesh
    defaultMaterial003_1: THREE.Mesh
    defaultMaterial003_2: THREE.Mesh
    defaultMaterial003_3: THREE.Mesh
  }
  materials: {
    Sclera: THREE.MeshStandardMaterial
    Helmet: THREE.MeshStandardMaterial
    Light: THREE.MeshStandardMaterial
    Body: THREE.MeshStandardMaterial
  }
  animations: any[]
}

export const ApeModel = React.forwardRef<THREE.Group, JSX.IntrinsicElements['group']>((props, ref) => {
  const { nodes, materials } = useGLTF('/models-transformed/ape-transformed.glb') as GLTFResult
  return (
    <group ref={ref} {...props} dispose={null}>
      <group >
        <mesh geometry={nodes.defaultMaterial003.geometry} material={materials.Sclera} />
        <mesh geometry={nodes.defaultMaterial003_1.geometry} material={materials.Helmet} />
        <mesh geometry={nodes.defaultMaterial003_2.geometry} material={materials.Light} />
        <mesh geometry={nodes.defaultMaterial003_3.geometry} material={materials.Body} />
      </group>
    </group>
  )
})

useGLTF.preload('/models-transformed/ape-transformed.glb')