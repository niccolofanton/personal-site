import * as THREE from 'three';
import React, { createRef, LegacyRef, useMemo, useRef } from 'react';
import { useGLTF, Instances, Instance } from '@react-three/drei';
import { GroupProps, useFrame, useLoader } from '@react-three/fiber';
import DraggableRigidBody, { DraggableRigidBodyProps } from '../DraggableRigidBody';
import { generatedPositions } from '../Container-model';
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    vinile: THREE.Mesh
  }
  materials: {
    Vinyl1: THREE.MeshStandardMaterial
  }
}

type DiscModelProps = JSX.IntrinsicElements['group'] & {
  texturesSrc: string[];
  draggableRigidBodyProps: Partial<DraggableRigidBodyProps>;
  groupProps: GroupProps;
};

export const VinylsModel = React.forwardRef<any, DiscModelProps>(({ texturesSrc, ...props }, ref) => {

  const { nodes } = useGLTF('/models-transformed/vinyl-transformed.glb') as GLTFResult;
  const textures = useLoader(THREE.TextureLoader, texturesSrc);
  const instances: LegacyRef<THREE.InstancedMesh> = useRef(null);
  const meshRefs = useMemo(() => texturesSrc.map(() => createRef<THREE.Group>()), [texturesSrc]);

  const geometry = useMemo(() => new THREE.CircleGeometry(.75, 25), []);
  const geometry2 = useMemo(() => new THREE.CylinderGeometry(.75, .75, .1, 25), []);
  const invMaterial = useMemo(() => new THREE.MeshStandardMaterial({ visible: false }), []);

  const materials = useMemo(() => textures.map(texture => new THREE.MeshStandardMaterial({ map: texture })), [textures]);

  useFrame(() => {
    if (!instances.current) return;

    instances.current?.children
      .filter(instance => !!(instance as any).instance)
      .forEach((instance, i) => {
        if (!meshRefs[i]?.current) return

        let p = new THREE.Vector3();
        let r = new THREE.Quaternion();

        meshRefs[i].current?.getWorldPosition(p);
        meshRefs[i].current?.getWorldQuaternion(r);

        instance.setRotationFromQuaternion(r);
        instance.rotateX(0.494)

        instance.position.set(p.x, p.y, p.z)
      })
  });

  return (
    <Instances ref={instances as any}>
      <bufferGeometry {...nodes.vinile.geometry} />
      <meshStandardMaterial roughness={.7} metalness={.05} color={'#353535'} side={THREE.DoubleSide} />

      {texturesSrc.map((_, i) => (
        <React.Fragment key={i}>
          <Instance scale={3.2} />
          <DraggableRigidBody
            {...props.draggableRigidBodyProps}
            groupProps={{ position: generatedPositions[i] }}
            rigidBodyProps={{ colliders: 'cuboid' }}
            enableSpringJoint={false}
            visibleComponentRef={meshRefs[i]}
            visibleMesh={
              <group ref={meshRefs[i]}>
                <mesh scale={2} rotation={[Math.PI / 2, 0, 0]} geometry={geometry2} material={invMaterial} />
                <mesh scale={1.12} geometry={geometry} material={materials[i]} />
                <mesh scale={1.12} rotation={[0, -Math.PI, 0]} geometry={geometry} material={materials[i]} />
              </group>
            }
          />
        </React.Fragment>
      ))}
    </Instances>
  );
});
