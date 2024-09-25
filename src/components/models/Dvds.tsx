import * as THREE from 'three';
import React, { createRef, LegacyRef, useMemo, useRef } from 'react';
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
  const textures = useLoader(THREE.TextureLoader, texturesSrc);
  const instances: LegacyRef<THREE.InstancedMesh> = useRef(null);
  const meshRefs = useMemo(() => texturesSrc.map(() => createRef<THREE.Group>()), [texturesSrc]);  // Crea i ref per ogni elemento
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
          meshRefs[i].current?.getWorldPosition(p);
          meshRefs[i].current?.getWorldQuaternion(r);
        }

        instance.setRotationFromQuaternion(r);
        instance.position.set(p.x, p.y, p.z)
      })
  });

  return (
    <Instances ref={instances as any}>
      {/* Define instanced geometry (merged) and material */}
      <bufferGeometry {...mergedGeometry} />
      <meshStandardMaterial transparent={false} side={THREE.DoubleSide} roughness={0.8} color={'#242424'} />

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