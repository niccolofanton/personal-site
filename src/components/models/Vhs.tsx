import * as THREE from 'three';
import React, { createRef, LegacyRef, useMemo, useRef } from 'react';
import { useGLTF, Instances, Instance } from '@react-three/drei';
import { GroupProps, useFrame, useLoader } from '@react-three/fiber';
import DraggableRigidBody, { DraggableRigidBodyProps } from '../DraggableRigidBody';
import { generatedPositions } from '../Container-model';
import { GLTF } from 'three-stdlib'


type GLTFResult = GLTF & {
  nodes: {
    vhs: THREE.Mesh
  }
  materials: {
    ['Material.002']: THREE.MeshBasicMaterial
  }
  animations: any[]
}

type VhsModelProps = JSX.IntrinsicElements['group'] & {
  texturesSrc: string[];
  draggableRigidBodyProps: Partial<DraggableRigidBodyProps>;
  groupProps: GroupProps;
};

export const VhsModel = React.forwardRef<any, VhsModelProps>(({ texturesSrc, ...props }, ref) => {

  const { nodes, materials } = useGLTF('/models-transformed/vhs-transformed.glb') as GLTFResult
  const textures = useLoader(THREE.TextureLoader, texturesSrc);
  const instances: LegacyRef<THREE.InstancedMesh> = useRef(null);
  const meshRefs = useMemo(() => texturesSrc.map(() => createRef<THREE.Group>()), [texturesSrc]);  // Crea i ref per ogni elemento
  const geometry = useMemo(() => new THREE.BoxGeometry(1.05, 1.01, .5), [])
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
        instance.rotateX(-Math.PI / 2)
        instance.position.set(p.x, p.y, p.z)
      })
  });

  return (
    <Instances ref={instances as any}>
      {/* Define instanced geometry (merged) and material */}
      <bufferGeometry {...nodes.vhs.geometry} />
      {/* <meshStandardMaterial {...materials['Material.002']} /> */}
      <meshBasicMaterial {...materials['Material.002']} />

      {textures.map((texture, i) => (
        <>

          <Instance rotation={[-Math.PI / 2, 0, 0]} scale={[4.472 / 2, 0.582 / 2, 2.471 / 2]} />

          <DraggableRigidBody
            key={`cd${i}`}
            {...props.draggableRigidBodyProps}
            groupProps={{ position: generatedPositions[7 + i] }}
            rigidBodyProps={{ colliders: 'cuboid' }}
            enableSpringJoint={false}
            visibleComponentRef={meshRefs[i]}
            visibleMesh={
              <group ref={ref} {...props} dispose={null}>

                <mesh scale={[8.4 / 2, 4.7 / 2, 3 / 2]} geometry={geometry} material={material} />


                {/* Plane to display the PNG texture */}
                <mesh position={[-.0, -.14, .3]} scale={2} rotation={[0, 0, Math.PI / 2]} >
                  <planeGeometry args={[.6, 1]} />
                  <meshBasicMaterial map={texture} />
                </mesh>

              </group>
            }
          />
        </>
      ))}
    </Instances>
  );
});

useGLTF.preload('/models-transformed/vhs-transformed.glb');
