import { useFrame, useThree } from '@react-three/fiber'
import React, { RefObject, useEffect, useRef, useState } from 'react';
import { useGLTF, DragControls, Wireframe } from '@react-three/drei';
import { RigidBody, useRevoluteJoint, RapierRigidBody, useRapier, useRopeJoint, CuboidCollider, RoundCuboidCollider, useSpringJoint } from '@react-three/rapier';
import { GLTF } from 'three-stdlib';
import * as THREE from 'three';
import DraggableRigidBody from './DraggableRigidBody';

type GLTFResult = GLTF & {
  nodes: {
    back001: THREE.Mesh
    bottom001: THREE.Mesh
    branding: THREE.Mesh
    front001: THREE.Mesh
    left001: THREE.Mesh
    right001: THREE.Mesh
    top001: THREE.Mesh
  }
  materials: {
    ['777.002']: THREE.MeshStandardMaterial
    ['777.001']: THREE.MeshStandardMaterial
    ['777.004']: THREE.MeshStandardMaterial
  }
  animations: any[]
}

const RevoluteJoint: React.FC<{
  body1: RefObject<RapierRigidBody>,
  body2: RefObject<RapierRigidBody>,
  anchor: [number, number, number],
  anchors?: [[number, number, number], [number, number, number]],
  rotation?: [number, number, number]
}> = ({ body1, body2, anchor, anchors = undefined, rotation = [0, 0, 1] }) => {
  anchors ?
    useRevoluteJoint(body1, body2, [...anchors, rotation]) :
    useRevoluteJoint(body1, body2, [anchor, anchor, rotation]);
  return null;
};

const positions: [number, number, number,][] = [];

for (let i = 0; i < 40; i++) {
  positions.push(
    [Math.random() * (6 - -6) + -6, Math.random() * (5 - 0.5) + 0.5, Math.random() * (6 - -6) + -6]
  )
}

export function ContainerModel(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF('/container-model-test.glb') as GLTFResult;

  const bottomRef = useRef<THREE.Object3D>(null);
  const frontRef = useRef<THREE.Object3D>(null);
  const backRef = useRef<THREE.Object3D>(null);
  const leftRef = useRef<THREE.Object3D>(null);
  const rightRef = useRef<THREE.Object3D>(null);
  const topRef = useRef<THREE.Object3D>(null);

  const groupA = 1; // Group 1
  const groupB = 2; // Group 2
  const groupC = 4; // Group 3


  let firstCollisionId: number | null = null;
  const [currentDragged, setCurrentDragged] = useState<number | null>(null);

  const DraggableRigidBodyProps: Partial<DraggableRigidBody2Props> = {
    rigidBodyProps: {
      gravityScale: 3.5,
      linearDamping: 5,
      angularDamping: .2,
      colliders: "hull"
    },
    boundingBox: [[-8, 8], [.5, 8], [-8, 8]],
  }


  // Questa funzione verrà passata a B per emettere un evento
  const handleOnDragStart = (id: number | null | undefined) => {
    // key was not set on component
    if (id === undefined) return;
    // something is already being dragged
    if (currentDragged !== null) return
    // save only the first event fired
    if (firstCollisionId !== null) return;
    firstCollisionId = id;
    setCurrentDragged(id)
  };

  // Questa funzione verrà passata a B per emettere un evento
  const handleOnDragStop = (id: number | undefined) => {
    // in case we don't have an id on the component
    if (id === undefined) return;
    // only the current dragged can reset the state
    if (id !== currentDragged) return;
    console.log('handleOnDragStop', id);
    setCurrentDragged(null);
  };



  return (
    <>
      {
        positions.map((_, i) =>
          <DraggableRigidBody key={i} {...DraggableRigidBodyProps}

            id={i}
            onDragStart={handleOnDragStart}
            onDragStop={handleOnDragStop}
            currentDragged={currentDragged}
            enableSpringJoint={false}

            groupProps={{ position: _ }}

            visibleMesh={
              <mesh castShadow receiveShadow>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={"gray"} wireframe={false} />
              </mesh>
            }

          // invisibleMesh={
          //   <mesh castShadow receiveShadow>
          //     <boxGeometry args={[.9, .9, .9]} />
          //     <meshStandardMaterial color={"red"} wireframe={false} />
          //   </mesh>
          // }
          />
        )
      }

      {/* <group ref={group} {...props} dispose={null}>
        <group>

          <RigidBody ref={bottomRef} type={'fixed'} position={[0.065, 0, 0.329]}  // Belongs to groupA, collides with groupB
          >
            <mesh geometry={nodes.bottom001.geometry} material={materials['777.002']} scale={0.091} />
          </RigidBody>

          <RigidBody gravityScale={3} ref={frontRef} colliders={'hull'} position={[-0.953, 1.312, 0.321]} >
            <group>
              <mesh geometry={nodes.front001.geometry} material={materials['777.004']} scale={0.091} rotation={[Math.PI, 0, Math.PI]} />
              <mesh geometry={nodes.branding.geometry} material={materials['777.001']} scale={0.091} position={[0, -0.127, 0.29]
              } />
            </group>
          </RigidBody>

          <RigidBody gravityScale={3} ref={topRef} colliders={'hull'} position={[0.054, 2.36, 0.335]} >
            <mesh geometry={nodes.top001.geometry} material={materials['777.002']} scale={0.091} />
          </RigidBody>

          <RigidBody gravityScale={3} ref={backRef} colliders={'hull'} position={[1.081, 1.312, 0.334]} >
            <mesh geometry={nodes.back001.geometry} material={materials['777.002']} scale={0.091} />
          </RigidBody>

          <RigidBody gravityScale={3} ref={leftRef} colliders={'hull'} position={[0.065, 1.149, -3.169]} collisionGroups={(groupB << 16) | groupA}>
            <mesh geometry={nodes.left001.geometry} material={materials['777.002']} scale={0.091} />
          </RigidBody>

          <RigidBody gravityScale={3} ref={rightRef} colliders={'hull'} position={[0.065, 1.14, 3.871]} collisionGroups={(groupB << 16) | groupA}>
            <mesh geometry={nodes.right001.geometry} material={materials['777.002']} scale={0.091} />
          </RigidBody>



          <RevoluteJoint body1={bottomRef} body2={frontRef}
            anchors={[[-1, .1, 0], [0, -1.35, 0]]} />

          <RevoluteJoint body1={bottomRef} body2={backRef}
            anchors={[[1, .1, 0], [0, -1.35, 0]]} />

          <RevoluteJoint body1={bottomRef} body2={leftRef}
            anchors={[[0, .11, -3.4], [0, -1.3, 0]]} rotation={[1, 0, 0]} />

          <RevoluteJoint body1={bottomRef} body2={rightRef}
            anchors={[[0, .11, 3.4], [0, -1.3, 0]]} rotation={[1, 0, 0]} />

          <RevoluteJoint body1={topRef} body2={backRef}
            anchors={[[1.06, 0, 0], [0, 1.1, 0]]} />

        </group>
      </group> */}
    </>

  );
}

useGLTF.preload('/container-model-test.glb')