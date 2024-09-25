/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.2 tank.glb -t -T 
Files: tank.glb [81.14KB] > /Users/fant/work/personal-blog/public/models/tank-transformed.glb [19.55KB] (76%)
*/

import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    tank: THREE.Mesh
  }
  materials: {
    ['Material.005']: THREE.MeshStandardMaterial
  }
  animations: any[]
}

export const TankModel = React.forwardRef<THREE.Group, JSX.IntrinsicElements['group']>((props, ref) => {
  const { nodes, materials } = useGLTF('/models-transformed/tank-transformed.glb') as GLTFResult
  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh geometry={nodes.tank.geometry} material={materials['Material.005']}   />
    </group>
  )
})

useGLTF.preload('/models-transformed/tank-transformed.glb')