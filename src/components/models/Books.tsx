import DraggableRigidBody, { DraggableRigidBodyProps } from '../DraggableRigidBody';
import { GroupProps, useFrame, useLoader } from '@react-three/fiber';
import { useGLTF, Instances, Instance } from '@react-three/drei';
import React, { createRef, LegacyRef, useMemo, useRef } from 'react';
import { generatedPositions } from '../Container-model';
import { GLTF } from 'three-stdlib'
import * as THREE from 'three';

type GLTFResult = GLTF & {
  nodes: {
    Plane: THREE.Mesh
  }
  materials: {
    ['Material.001']: THREE.MeshStandardMaterial
  }
  animations: any[]
}

type BookModelProps = JSX.IntrinsicElements['group'] & {
  texturesSrc: string[];
  draggableRigidBodyProps: Partial<DraggableRigidBodyProps>;
  groupProps: GroupProps;
};

export const BooksModel = React.forwardRef<any, BookModelProps>(({ texturesSrc, ...props }, ref) => {

  const { nodes, materials } = useGLTF('/models-transformed/book-transformed.glb') as GLTFResult
  const instances: LegacyRef<THREE.InstancedMesh> = useRef(null);
  const textures = useLoader(THREE.TextureLoader, texturesSrc);
  const meshRefs = useMemo(() => texturesSrc.map(() => createRef<THREE.Group>()), [texturesSrc]);  // Crea i ref per ogni elemento
  const geometry = useMemo(() => new THREE.PlaneGeometry(.666, 1), [])
  const geometry2 = useMemo(() => new THREE.BoxGeometry(.666, 1, .15), [])
  const material = useMemo(() => new THREE.MeshStandardMaterial({ visible: false }), [])

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
        instance.rotateX(Math.PI / 2)
        instance.position.set(p.x, p.y, p.z)
      })
  });

  return (
    <Instances ref={instances as any}>
      {/* Define instanced geometry (merged) and material */}
      <bufferGeometry {...nodes.Plane.geometry} />
      <meshStandardMaterial {...materials['Material.001']} />

      {textures.map((texture, i) => (
        <>
          <Instance scale={[1, 1, 1.33]} rotation={[Math.PI / 2, 0, 0]} />

          <DraggableRigidBody
            key={`cd${i}`}
            {...props.draggableRigidBodyProps}
            groupProps={{ position: generatedPositions[i] }}
            rigidBodyProps={{ colliders: 'cuboid', density: 1 }}
            enableSpringJoint={false}
            visibleComponentRef={meshRefs[i]}
            visibleMesh={
              <group ref={ref} {...props} dispose={null} rotation={[0, Math.PI, 0]}>
                <mesh scale={2.64} position={[.08, 0, -.09]} rotation={[0, 0.006, 0]} material={material} geometry={geometry2} />

                <mesh scale={2.64} position={[.08, 0, -.09]} rotation={[0, 0.006, 0]} geometry={geometry}>
                  <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
                </mesh>
              </group>
            }
          />
        </>
      ))}
    </Instances>
  );
});

useGLTF.preload('/models-transformed/book-transformed.glb');
