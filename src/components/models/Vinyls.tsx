import * as THREE from 'three';
import React, { createRef, LegacyRef, useMemo, useRef } from 'react';
import { useGLTF, Instances, Instance } from '@react-three/drei';
import { GroupProps, useFrame, useLoader } from '@react-three/fiber';
import DraggableRigidBody, { DraggableRigidBodyProps } from '../DraggableRigidBody';
import { generatedPositions } from '../Container-model';
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    album: THREE.Mesh
    vinile: THREE.Mesh
  }
  materials: {
    Album_tx: THREE.MeshStandardMaterial
    Vinyl1: THREE.MeshStandardMaterial
  }
  animations: any[]
}

type DiscModelProps = JSX.IntrinsicElements['group'] & {
  texturesSrc: string[];
  draggableRigidBodyProps: Partial<DraggableRigidBodyProps>;
  groupProps: GroupProps;
};

export const VinylsModel = React.forwardRef<any, DiscModelProps>(({ texturesSrc, ...props }, ref) => {

  const { nodes, materials } = useGLTF('/models-transformed/vinyl-transformed.glb') as GLTFResult
  const textures = useLoader(THREE.TextureLoader, texturesSrc);
  const instances: LegacyRef<THREE.InstancedMesh> = useRef(null);
  const meshRefs = useMemo(() => texturesSrc.map(() => createRef<THREE.Group>()), [texturesSrc]);  // Crea i ref per ogni elemento
  const geometry = useMemo(() => new THREE.CircleGeometry(.75, 25), [])
  const geometry2 = useMemo(() => new THREE.CylinderGeometry(.75,.75,.1, 25), [])
  const invMaterial = useMemo(() => new THREE.MeshStandardMaterial({ visible: false }), [])

  useFrame(() => {
    if (!instances.current) return;

    instances.current?.children
      .filter(instance => instance.constructor.name == 'PositionMesh')
      .forEach((instance, i) => {
        let p = new THREE.Vector3();
        let r = new THREE.Quaternion();

        if (meshRefs[i]?.current) {
          meshRefs[i].current?.getWorldPosition(p);
          meshRefs[i].current?.getWorldQuaternion(r);
        }

        instance.setRotationFromQuaternion(r);
        instance.rotateX(0.494)
        instance.position.set(p.x, p.y, p.z)
      })
  });

  return (
    <Instances ref={instances as any}>

      <bufferGeometry {...nodes.vinile.geometry} />
      <meshStandardMaterial {...materials.Vinyl1} roughness={.7} metalness={.05} color={'#353535'} side={THREE.DoubleSide} />

      {textures.map((texture, i) => {

        const material = new THREE.MeshStandardMaterial({map: texture});

        return (
          <>
            <Instance scale={1.6 * 2}/>

            <DraggableRigidBody
              key={`cd${i}`}
              {...props.draggableRigidBodyProps}
              groupProps={{ position: generatedPositions[7 + 5 + 11 + 33 + i] }}
              rigidBodyProps={{ colliders: 'cuboid' }}
              enableSpringJoint={false}
              visibleComponentRef={meshRefs[i]}
              visibleMesh={
                <group ref={el => meshRefs[i] = (el as any)}  >
                  <mesh scale={1 * 2} rotation={[Math.PI/2,0,0]} position={[0, 0, 0]} geometry={geometry2} material={invMaterial}/>
                  <mesh scale={.55 * 2} position={[0, 0, .05]} geometry={geometry} material={material}/>
                  <mesh scale={.55 * 2} rotation={[0, -Math.PI, 0]} position={[0, 0, -.1]} geometry={geometry} material={material}/>
                </group>
              }
            />
          </>
        )

      })}
    </Instances>
  );
});

useGLTF.preload('/models-transformed/vinyl-transformed.glb');