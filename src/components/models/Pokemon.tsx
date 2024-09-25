/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.2 pokemon.glb -t -T 
Files: pokemon.glb [69.7KB] > /Users/fant/work/personal-blog/public/models/pokemon-transformed.glb [10.83KB] (84%)
*/

import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    pokemon: THREE.Mesh
  }
  materials: {
    fireRed_material: THREE.MeshBasicMaterial
  }
  animations: any[]
}

export const PokemonModel = React.forwardRef<THREE.Group, JSX.IntrinsicElements['group']>((props, ref) => {
  const { nodes, materials } = useGLTF('/models-transformed/pokemon-transformed.glb') as GLTFResult
  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh geometry={nodes.pokemon.geometry} material={materials.fireRed_material}   />
    </group>
  )
})

useGLTF.preload('/models-transformed/pokemon-transformed.glb')