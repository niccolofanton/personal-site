/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.2 zelda.glb -t -T 
Files: zelda.glb [13.18KB] > /Users/fant/work/personal-blog/public/models/zelda-transformed.glb [1.95KB] (85%)
*/

import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    zelda: THREE.Mesh
  }
  materials: {
    Material__2: THREE.MeshStandardMaterial
  }
  animations: any[]
}

export const ZeldaModel = React.forwardRef<THREE.Group, JSX.IntrinsicElements['group']>((props, ref) => {
  const { nodes, materials } = useGLTF('/models-transformed/zelda-transformed.glb') as GLTFResult
  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh geometry={nodes.zelda.geometry} material={materials.Material__2}  rotation={[-Math.PI / 2, 0, 0]}  />
    </group>
  )
})

useGLTF.preload('/models-transformed/zelda-transformed.glb')
