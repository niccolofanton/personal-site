/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.2 sly.glb -t -T 
Files: sly.glb [463.15KB] > /Users/fant/work/personal-blog/public/models/sly-transformed.glb [75.76KB] (84%)
*/

import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    sly: THREE.Mesh
  }
  materials: {
    Cane: THREE.MeshStandardMaterial
  }
  animations: any[]
}

export const SlyModel = React.forwardRef<THREE.Group, JSX.IntrinsicElements['group']>((props, ref) => {
  const { nodes, materials } = useGLTF('/models-transformed/sly-transformed.glb') as GLTFResult
  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh geometry={nodes.sly.geometry} material={materials.Cane}   />
    </group>
  )
})

useGLTF.preload('/models-transformed/sly-transformed.glb')