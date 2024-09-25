/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.2 inception.glb -t -T 
Files: inception.glb [5.08KB] > /Users/fant/work/personal-blog/public/models/inception-transformed.glb [2.27KB] (55%)
*/

import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    inception: THREE.Mesh
  }
  materials: {
    ['Scene_-_Root']: THREE.MeshStandardMaterial
  }
  animations: any[]
}

export const InceptionModel = React.forwardRef<THREE.Group, JSX.IntrinsicElements['group']>((props, ref) => {
  const { nodes, materials } = useGLTF('/models-transformed/inception-transformed.glb') as GLTFResult
  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh geometry={nodes.inception.geometry} material={materials['Scene_-_Root']}  rotation={[-Math.PI / 2, 0, 0]}  />
    </group>
  )
})

useGLTF.preload('/models-transformed/inception-transformed.glb')