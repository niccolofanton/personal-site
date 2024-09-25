/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.0 ../../public/container-2.glb -t 
*/

import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    back001: THREE.Mesh
    bottom001: THREE.Mesh
    branding: THREE.Mesh
    front001: THREE.Mesh
    left001: THREE.Mesh
    right001: THREE.Mesh
    top001: THREE.Mesh
  }
  materials: {
    ['777.002']: THREE.MeshStandardMaterial
    ['777.001']: THREE.MeshStandardMaterial
    ['777.004']: THREE.MeshStandardMaterial
  }
  animations: any[]
}

export function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/container-2.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <group position={[-2.292, 1.267, -0.328]}>
        <mesh geometry={nodes.back001.geometry} material={materials['777.002']} position={[3.331, 0.127, 0.334]} scale={0.091} />
      </group>
      <group position={[-2.292, 1.267, -0.328]}>
        <mesh geometry={nodes.bottom001.geometry} material={materials['777.002']} position={[2.315, -1.185, 0.329]} scale={0.091} />
      </group>
      <group position={[-2.292, 1.267, -0.328]}>
        <mesh geometry={nodes.branding.geometry} material={materials['777.001']} position={[1.294, -0.074, 0.61]} scale={0.091} />
        <mesh geometry={nodes.front001.geometry} material={materials['777.004']} position={[1.297, 0.127, 0.321]} rotation={[Math.PI, 0, Math.PI]} scale={0.091} />
      </group>
      <group position={[-2.292, 1.267, -0.328]}>
        <mesh geometry={nodes.left001.geometry} material={materials['777.002']} position={[2.315, -0.036, -3.169]} scale={0.091} />
      </group>
      <group position={[-2.292, 1.267, -0.328]}>
        <mesh geometry={nodes.right001.geometry} material={materials['777.002']} position={[2.315, -0.045, 3.871]} scale={0.091} />
      </group>
      <group position={[-2.292, 1.267, -0.328]}>
        <mesh geometry={nodes.top001.geometry} material={materials['777.002']} position={[2.304, 1.175, 0.335]} scale={0.091} />
      </group>
    </group>
  )
}

useGLTF.preload('/container-2.glb')