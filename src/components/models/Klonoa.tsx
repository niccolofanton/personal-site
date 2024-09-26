/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.2 klonoa.glb -t -T 
Files: klonoa.glb [845.84KB] > /Users/fant/work/personal-blog/public/models/klonoa-transformed.glb [59.69KB] (93%)
*/

import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    klonoa: THREE.Mesh
  }
  materials: {
    DefaultMaterial: THREE.MeshStandardMaterial
  }
  animations: any[]
}

export const KlonoaModel = React.forwardRef<THREE.Group, JSX.IntrinsicElements['group']>((props, ref) => {
  const { nodes, materials } = useGLTF('/models-transformed/klonoa-transformed.glb') as GLTFResult
  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh geometry={nodes.klonoa.geometry} material={materials.DefaultMaterial}   />
    </group>
  )
})

useGLTF.preload('/models-transformed/klonoa-transformed.glb')
