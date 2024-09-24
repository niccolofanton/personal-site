import * as THREE from 'three';
import React, { LegacyRef, useMemo, useRef } from 'react';
import { useGLTF, Instances, Instance } from '@react-three/drei';
import { GroupProps, useFrame, useLoader } from '@react-three/fiber';
import DraggableRigidBody, { DraggableRigidBodyProps } from '../DraggableRigidBody';
import { generatedPositions } from '../Container-model';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
import { GLTF } from 'three-stdlib'
import { ensureSameAttributes } from '../utils/ensureSameAttributes';

type GLTFResult = GLTF & {
  nodes: {
    Plane001_1: THREE.Mesh
    Plane001_2: THREE.Mesh
  }
  materials: {
    ['Material.002']: THREE.MeshStandardMaterial
    CdMaterial: THREE.MeshStandardMaterial
  }
  animations: any[]
}

type DvdsModelProps = JSX.IntrinsicElements['group'] & {
  texturesSrc: string[];
  draggableRigidBodyProps: Partial<DraggableRigidBodyProps>;
  groupProps: GroupProps;
};

export const DvdsModel = React.forwardRef<any, DvdsModelProps>(({ texturesSrc, ...props }, ref) => {

  const { nodes } = useGLTF('/models-transformed/dvd-transformed.glb') as GLTFResult
  const textures = texturesSrc.map((src) => useLoader(THREE.TextureLoader, src));
  const instances: LegacyRef<THREE.InstancedMesh> = useRef(null);
  const meshRefs = texturesSrc.map(() => useRef<THREE.Group>(null));
  const geometry = useMemo(() => new THREE.PlaneGeometry(1.05, 1.01), [])
  const geometry2 = useMemo(() => new THREE.BoxGeometry(1.05, 1.01, .5), [])

  const mergedGeometry = useMemo(() => {
    const geometries = [nodes.Plane001_1.geometry, nodes.Plane001_2.geometry];
    ensureSameAttributes(geometries); // Ensure all geometries have the same attributes
    return BufferGeometryUtils.mergeGeometries(geometries); // Merge the geometries
  }, [nodes]);

  const material = useMemo(() => new THREE.MeshStandardMaterial({ visible: false }), [])

  useFrame(() => {
    if (!instances.current) return;

    instances.current?.children
      .filter(instance => instance.constructor.name == 'PositionMesh')
      .forEach((instance, i) => {
        let p = new THREE.Vector3();
        let r = new THREE.Quaternion();

        if (meshRefs[i]?.current) {
          meshRefs[i].current.getWorldPosition(p);
          meshRefs[i].current.getWorldQuaternion(r);
        }

        instance.setRotationFromQuaternion(r);
        instance.position.set(p.x, p.y, p.z)
      })
  });

  return (
    <Instances ref={instances as any}>
      {/* Define instanced geometry (merged) and material */}
      <bufferGeometry {...mergedGeometry} />
      <meshStandardMaterial transparent opacity={0.35} side={THREE.DoubleSide} roughness={0.2} color={'#CCCCCC'} />

      {textures.map((texture, i) => (
        <>
          <Instance rotation={[-Math.PI / 2, -Math.PI, 0]} scale={[1, 1, 1.33]} />

          <DraggableRigidBody
            key={`cd${i}`}
            {...props.draggableRigidBodyProps}
            groupProps={{ position: generatedPositions[7 + 5 + i] }}
            rigidBodyProps={{ colliders: 'cuboid' }}
            enableSpringJoint={false}
            visibleComponentRef={meshRefs[i]}

            visibleMesh={
              <group ref={el => meshRefs[i] = (el as any)} >
                <mesh
                  key={`mesh${i}`}
                  position={[.085, -.12, 0]} scale={[1.69, 2.65, 1]} rotation={[Math.PI / 2, 0, 0]}
                  geometry={geometry}  >
                  <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
                </mesh>

                <mesh
                  key={`mesh-a${i}`}
                  position={[.085, .3, 0]} scale={[1.69, 2.65, 1.8]} rotation={[Math.PI / 2, 0, 0]}
                  geometry={geometry2} material={material} >
                </mesh>

              </group>
            }
          />
        </>
      ))}
    </Instances>
  );
});

useGLTF.preload('/models-transformed/dvd-transformed.glb');



// import * as THREE from 'three'
// import React, { ReactElement, useImperativeHandle, useMemo, useRef } from 'react'
// import { useGLTF } from '@react-three/drei'
// import { GLTF } from 'three-stdlib'
// import { GroupProps, useLoader } from '@react-three/fiber'
// import DraggableRigidBody, { DraggableRigidBodyProps } from '../DraggableRigidBody'
// import { generatedPositions } from '../Container-model'

// type GLTFResult = GLTF & {
//   nodes: {
//     Object_0005: THREE.Mesh
//     Object_0005_1: THREE.Mesh
//   }
//   materials: {
//     ['CdMaterial.005']: THREE.MeshStandardMaterial
//     ['Material.003']: THREE.MeshStandardMaterial
//   }
//   animations: any[]
// }

// type CdModelProps = JSX.IntrinsicElements['group'] & {
//   texturesSrc: string[]
//   groupProps: GroupProps,
//   draggableRigidBodyProps: Partial<DraggableRigidBodyProps>
// }

// export const CdsModel = React.forwardRef<any, CdModelProps>(({ texturesSrc, ...props }, ref) => {
//   const { nodes, materials } = useGLTF('/models-transformed/cd-transformed.glb') as GLTFResult
//   const textures = texturesSrc.map(src => useLoader(THREE.TextureLoader, src))

//   const geometry = useMemo(() => new THREE.PlaneGeometry(1.05, 1.01), [])
//   const material = useMemo(() => new THREE.MeshStandardMaterial({
//     transparent: true,
//     opacity: .3,
//     side: THREE.DoubleSide,
//     roughness: .1
//   }), [])

//   return (
//     <>
//       {textures.map((texture, i) => {

//         return <DraggableRigidBody  {...props.draggableRigidBodyProps}
//           key={`cd${i}`}
//           groupProps={{ position: generatedPositions[7 + 5 + 11 + i] }}
//           rigidBodyProps={{ colliders: 'cuboid' }}
//           visibleMesh={
//             <group {...props.groupProps} >
//               <mesh rotation={[0, Math.PI + .6, 0]} position={[-.5, -.005, -.775]} scale={[1, 1, 1.33]} geometry={nodes.Object_0005.geometry} material={materials['CdMaterial.005']} />
//               <mesh rotation={[0, Math.PI + .6, 0]} position={[-.5, -.005, -.775]} scale={[1, 1, 1.33]} geometry={nodes.Object_0005_1.geometry} material={material} />

//               {/* scale={[2.475, 2.39, 0]}  */}
//               <mesh scale={2.39} position={[-.034, 0, -.01]} geometry={geometry}>
//                 <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
//               </mesh>

//             </group>
//           }
//         />

//       })}
//     </>
//   )
// })

// useGLTF.preload('/models-transformed/cd-transformed.glb')
