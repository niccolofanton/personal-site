import { useFrame, useThree } from '@react-three/fiber'
import React, { RefObject, useEffect, useRef, useState } from 'react';
import { useGLTF, DragControls, Wireframe, OrbitControls } from '@react-three/drei';
import { RigidBody, useRevoluteJoint, RapierRigidBody, useRapier, useRopeJoint, CuboidCollider, RoundCuboidCollider, useSpringJoint } from '@react-three/rapier';
import { GLTF } from 'three-stdlib';
import * as THREE from 'three';
import DraggableRigidBody, { DraggableRigidBodyProps } from './DraggableRigidBody';
import { interactionGroupA, interactionGroupB } from './Container-scene';

import SmoothOrbitControls from './SmoothOrbitControls';
import { Ak47Model } from './models/Ak47';
import { ApeModel } from './models/Ape';
import { BookModel } from './models/Book';
import { CarModel } from './models/Car';
import { ClankModel } from './models/Clank';
import { ControllerModel } from './models/Controller';
import { CrashModel } from './models/Crash';
import { DaftpunkModel } from './models/Daftpunk';
import { Deadmau5Model } from './models/Deadmau5';
import { DexterModel } from './models/Dexter';
import { DiscModel } from './models/Disc';
import { GbcModel } from './models/Gbc';
import { HaloModel } from './models/Halo';
import { KanyeModel } from './models/Kanye';
import { KlonoaModel } from './models/Klonoa';
import { MarioModel } from './models/Mario';
import { MinecraftModel } from './models/Minecraft';
import { PokemonModel } from './models/Pokemon';
import { RaymanModel } from './models/Rayman';
import { SlyModel } from './models/Sly';
import { SnakeModel } from './models/Snake';
import { SteveModel } from './models/Steve';
import { TankModel } from './models/Tank';
import { TerrariaModel } from './models/Terraria';
import { VhsModel } from './models/Vhs';
import { ZeldaModel } from './models/Zelda';
import { ZombieModel } from './models/Zombie';


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


// for (let i = 0; i < 200; i++) {
//   positions.push(
//     [Math.random() * (.5 - -.5) + -.5, Math.random() * (2 - 0.1) + 0.1, Math.random() * (3 - -3) + -3]
//   )
// }

// console.log(positions)


export function ContainerModel(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF('/container-model-test.glb') as GLTFResult;

  const bottomRef = useRef<THREE.Object3D>(null);
  const frontRef = useRef<THREE.Object3D>(null);
  const backRef = useRef<THREE.Object3D>(null);
  const leftRef = useRef<THREE.Object3D>(null);
  const rightRef = useRef<THREE.Object3D>(null);
  const topRef = useRef<THREE.Object3D>(null);

  const [type, setType] = useState('fixed');
  const [colliders, setColliders] = useState('hull');
  const [visible, setVisible] = useState(false);

  const [orbitEnabled, setOrbitEnabled] = useState(true);

  const groupA = 1; // Group 1
  const groupB = 2; // Group 2
  const groupC = 4; // Group 3


  // let firstCollisionId: number | null = null;
  // const [currentDragged, setCurrentDragged] = useState<number | null>(null);

  const DraggableRigidBodyProps: Partial<DraggableRigidBodyProps> = {
    rigidBodyProps: {
      // gravityScale: 3.5,
      // linearDamping: 5,
      angularDamping: .2,
    },
    jointConfig: {
      stiffness: 20
    },
    boundingBox: [[-8, 8], [.1, 8], [-8, 8]],
    dragControlsProps: {
      preventOverlap: true
    }
  }


  // // Questa funzione verrà passata a B per emettere un evento
  // const handleOnDragStart = (id: number | null | undefined) => {
  //   // key was not set on component
  //   if (id === undefined) return;
  //   // something is already being dragged
  //   if (currentDragged !== null) return
  //   // save only the first event fired
  //   if (firstCollisionId !== null) return;
  //   firstCollisionId = id;
  //   setCurrentDragged(id)
  // };

  // // Questa funzione verrà passata a B per emettere un evento
  // const handleOnDragStop = (id: number | undefined) => {
  //   // in case we don't have an id on the component
  //   if (id === undefined) return;
  //   // only the current dragged can reset the state
  //   if (id !== currentDragged) return;
  //   setCurrentDragged(null);
  // };

  useEffect(() => {

    // return;

    setTimeout(() => {
      setVisible(true);

      // setCollisionGroups(interactionGroupA)
      setType('dynamic');


      setTimeout(() => {

        // setCollisionGroups(interactionGroupA)
        setColliders('cuboid')
        setType('fixed');

      }, 1500)

    }, 1000)

  }, []);


  // Array per tenere traccia delle posizioni già generate
  let generatedPositions: any[] = [
    new THREE.Vector3(-0.012621761469900683, 1.991537183001228, -0.3141446491988096),
    new THREE.Vector3(-0.3157177311359942, 0.6404231546721415, 0.8216084635894614),
    new THREE.Vector3(0.19666437602836107, 0.7622624795479265, 2.5179808396069143),
    new THREE.Vector3(-0.7336749575698303, 1.2967759040629674, 2.582427474946236),
    new THREE.Vector3(-0.6086349767815271, 1.0516318060799499, -2.6977870142526292),
    new THREE.Vector3(-0.9187780985211824, 1.1357701565158806, -1.6209473418134754),
    new THREE.Vector3(-0.9099348536642919, 1.2537123172560505, 1.371154685449686),
    new THREE.Vector3(-0.03201270627502195, 0.5327846457233409, -1.0641108688908534),
    new THREE.Vector3(0.489483886439829, 0.9233909842067284, 1.530845559323204),
    new THREE.Vector3(0.6744868591838191, 0.5640977472803604, -2.0952415626976526),
    new THREE.Vector3(0.21521895369544852, 1.5403745262398392, -1.980338569225537),
    new THREE.Vector3(0.3343422813592576, 0.8753711214614125, -0.17965538085620913),
    new THREE.Vector3(-0.9103217586747183, 1.6898756010382154, 0.3264250537093991),
    new THREE.Vector3(0.954129964515186, 1.4583591232713284, 2.7214670265917125),
    new THREE.Vector3(0.33482602424973473, 1.6979285008123957, -2.991280744883828),
    new THREE.Vector3(0.9449559264919749, 1.9281816536683507, 1.578893266878553),
    new THREE.Vector3(0.862955026752934, 1.588091871057658, -0.6817787591801938),
    new THREE.Vector3(-0.3025377401701945, 1.9729534099451835, 1.827050998285367),
    new THREE.Vector3(0.08865116752393343, 1.780745346628515, 0.8347549056258092),
    new THREE.Vector3(-0.8970082845203233, 0.7561664008497724, -0.2121231693832426),
    new THREE.Vector3(-0.8966105441658891, 1.8877651504928423, -0.7756163504529208),
    new THREE.Vector3(-0.9830817003919039, 1.9190309185410035, -2.3065958812631275),
    new THREE.Vector3(0.9463515976464842, 1.8676248035232965, 0.31018181926412103),
    new THREE.Vector3(0.03295290667126194, 1.9314393823012024, 2.9776364996298117),
    new THREE.Vector3(0.9363344062773344, 0.544249554219874, 0.6074133489575351),
    new THREE.Vector3(0.9886620679889395, 0.5458796267830728, -1.0384158616050962),
    new THREE.Vector3(0.9980756349514359, 0.9309553879241437, -2.997953143847975),
  ];

  // // Funzione helper per calcolare la distanza tra due punti
  // const distance = (pos1: THREE.Vector3, pos2: THREE.Vector3) => {
  //   return Math.sqrt(
  //     Math.pow(pos2.x - pos1.x, 2) +
  //     Math.pow(pos2.y - pos1.y, 2) +
  //     Math.pow(pos2.z - pos1.z, 2)
  //   );
  // };

  // // Funzione helper per generare una nuova posizione
  // const randomPosition = () => {
  //   let newPos: THREE.Vector3;

  //   // Ripeti finché non trovi una posizione che rispetta la distanza minima
  //   do {
  //     const x = Math.random() * 2 - 1;  // x tra -1 e 1
  //     const y = Math.random() * 1.5 + 0.5;  // y tra 0.5 e 2
  //     const z = Math.random() * 6 - 3;  // z tra -3 e 3
  //     newPos = new THREE.Vector3(x, y, z);

  //     // Verifica se la nuova posizione è ad almeno 1 metro di distanza da tutte le altre
  //   } while (generatedPositions.some(pos => distance(pos, newPos) < 1));

  //   // Memorizza la nuova posizione
  //   generatedPositions.push(newPos);

  //   console.log(generatedPositions);

  //   return newPos.toArray();
  // };


  return (

    <>


      <SmoothOrbitControls enableRotate={orbitEnabled} />

      <DraggableRigidBody {...DraggableRigidBodyProps}
        groupProps={{ position: generatedPositions[0] }}
        onDragStart={() => setOrbitEnabled(false)}
        onDragStop={() => setOrbitEnabled(true)}
        enableSpringJoint={false}
        // groupProps={{ position: _ }}
        visibleMesh={
          <MarioModel position={[0, 0, 0]} scale={.14} />
        }
      />
      <DraggableRigidBody {...DraggableRigidBodyProps}
        groupProps={{ position: generatedPositions[1] }}
        onDragStart={() => setOrbitEnabled(false)}
        onDragStop={() => setOrbitEnabled(true)}
        enableSpringJoint={false}
        // groupProps={{ position: _ }}
        visibleMesh={
          <ZombieModel scale={.6} />
        }
      />
      <DraggableRigidBody {...DraggableRigidBodyProps}
        groupProps={{ position: generatedPositions[2] }}
        onDragStart={() => setOrbitEnabled(false)}
        onDragStop={() => setOrbitEnabled(true)}
        enableSpringJoint={false}
        // groupProps={{ position: _ }}
        visibleMesh={
          <Ak47Model scale={0.04} />
        }
      />
      <DraggableRigidBody {...DraggableRigidBodyProps}
        groupProps={{ position: generatedPositions[3] }}
        onDragStart={() => setOrbitEnabled(false)}
        onDragStop={() => setOrbitEnabled(true)}
        enableSpringJoint={false}
        // groupProps={{ position: _ }}
        visibleMesh={
          <ApeModel scale={.8} />
        }
      />
      <DraggableRigidBody {...DraggableRigidBodyProps}
        groupProps={{ position: generatedPositions[4] }}
        onDragStart={() => setOrbitEnabled(false)}
        onDragStop={() => setOrbitEnabled(true)}
        enableSpringJoint={false}
        // groupProps={{ position: _ }}
        visibleMesh={
          <BookModel scale={.05} />
        }
      />
      <DraggableRigidBody {...DraggableRigidBodyProps}
        groupProps={{ position: generatedPositions[5] }}
        onDragStart={() => setOrbitEnabled(false)}
        onDragStop={() => setOrbitEnabled(true)}
        enableSpringJoint={false}
        // groupProps={{ position: _ }}
        visibleMesh={
          <CarModel scale={.1} />
        }
      />
      <DraggableRigidBody {...DraggableRigidBodyProps}
        groupProps={{ position: generatedPositions[6] }}
        onDragStart={() => setOrbitEnabled(false)}
        onDragStop={() => setOrbitEnabled(true)}
        enableSpringJoint={false}
        // groupProps={{ position: _ }}
        visibleMesh={
          <ClankModel scale={.7} />
        }
      />
      <DraggableRigidBody {...DraggableRigidBodyProps}
        groupProps={{ position: generatedPositions[7] }}
        onDragStart={() => setOrbitEnabled(false)}
        onDragStop={() => setOrbitEnabled(true)}
        enableSpringJoint={false}
        // groupProps={{ position: _ }}
        visibleMesh={
          <ControllerModel scale={.005} />
        }
      />
      <DraggableRigidBody {...DraggableRigidBodyProps}
        groupProps={{ position: generatedPositions[8] }}
        onDragStart={() => setOrbitEnabled(false)}
        onDragStop={() => setOrbitEnabled(true)}
        enableSpringJoint={false}
        // groupProps={{ position: _ }}
        visibleMesh={
          <CrashModel scale={.01} />
        }
      />
      <DraggableRigidBody {...DraggableRigidBodyProps}
        groupProps={{ position: generatedPositions[9] }}
        onDragStart={() => setOrbitEnabled(false)}
        onDragStop={() => setOrbitEnabled(true)}
        enableSpringJoint={false}
        // groupProps={{ position: _ }}
        visibleMesh={
          <DaftpunkModel scale={3.7} />
        }
      />
      <DraggableRigidBody {...DraggableRigidBodyProps}
        groupProps={{ position: generatedPositions[10] }}
        onDragStart={() => setOrbitEnabled(false)}
        onDragStop={() => setOrbitEnabled(true)}
        enableSpringJoint={false}
        // groupProps={{ position: _ }}
        visibleMesh={
          <Deadmau5Model scale={.05} />
        }
      />
      <DraggableRigidBody {...DraggableRigidBodyProps}
        groupProps={{ position: generatedPositions[11] }}
        onDragStart={() => setOrbitEnabled(false)}
        onDragStop={() => setOrbitEnabled(true)}
        enableSpringJoint={false}
        // groupProps={{ position: _ }}
        visibleMesh={
          <DexterModel scale={.1} />
        }
      />
      <DraggableRigidBody {...DraggableRigidBodyProps}
        groupProps={{ position: generatedPositions[12] }}
        onDragStart={() => setOrbitEnabled(false)}
        onDragStop={() => setOrbitEnabled(true)}
        enableSpringJoint={false}
        // groupProps={{ position: _ }}
        visibleMesh={
          <DiscModel scale={1.1} />
        }
      />
      <DraggableRigidBody {...DraggableRigidBodyProps}
        groupProps={{ position: generatedPositions[13] }}
        onDragStart={() => setOrbitEnabled(false)}
        onDragStop={() => setOrbitEnabled(true)}
        enableSpringJoint={false}
        // groupProps={{ position: _ }}
        visibleMesh={
          <GbcModel scale={.7} />
        }
      />
      <DraggableRigidBody {...DraggableRigidBodyProps}
        groupProps={{ position: generatedPositions[14] }}
        onDragStart={() => setOrbitEnabled(false)}
        onDragStop={() => setOrbitEnabled(true)}
        enableSpringJoint={false}
        // groupProps={{ position: _ }}
        visibleMesh={
          <HaloModel scale={1} />
        }
      />
      <DraggableRigidBody {...DraggableRigidBodyProps}
        groupProps={{ position: generatedPositions[15] }}
        onDragStart={() => setOrbitEnabled(false)}
        onDragStop={() => setOrbitEnabled(true)}
        enableSpringJoint={false}
        // groupProps={{ position: _ }}
        visibleMesh={
          <KanyeModel scale={2} />
        }
      />
      <DraggableRigidBody {...DraggableRigidBodyProps}
        groupProps={{ position: generatedPositions[16] }}
        onDragStart={() => setOrbitEnabled(false)}
        onDragStop={() => setOrbitEnabled(true)}
        enableSpringJoint={false}
        // groupProps={{ position: _ }}
        visibleMesh={
          <KlonoaModel scale={.27} />
        }
      />
      <DraggableRigidBody {...DraggableRigidBodyProps}
        groupProps={{ position: generatedPositions[17] }}
        onDragStart={() => setOrbitEnabled(false)}
        onDragStop={() => setOrbitEnabled(true)}
        enableSpringJoint={false}
        // groupProps={{ position: _ }}
        visibleMesh={
          <MinecraftModel scale={1.8} />
        }
      />
      <DraggableRigidBody {...DraggableRigidBodyProps}
        groupProps={{ position: generatedPositions[18] }}
        onDragStart={() => setOrbitEnabled(false)}
        onDragStop={() => setOrbitEnabled(true)}
        enableSpringJoint={false}
        // groupProps={{ position: _ }}
        visibleMesh={
          <PokemonModel scale={.2} />
        }
      />
      <DraggableRigidBody {...DraggableRigidBodyProps}
        groupProps={{ position: generatedPositions[19] }}
        onDragStart={() => setOrbitEnabled(false)}
        onDragStop={() => setOrbitEnabled(true)}
        enableSpringJoint={false}
        // groupProps={{ position: _ }}
        visibleMesh={
          <RaymanModel scale={1.3} />
        }
      />
      <DraggableRigidBody {...DraggableRigidBodyProps}
        groupProps={{ position: generatedPositions[20] }}
        onDragStart={() => setOrbitEnabled(false)}
        onDragStop={() => setOrbitEnabled(true)}
        enableSpringJoint={false}
        // groupProps={{ position: _ }}
        visibleMesh={
          <SlyModel scale={1} />
        }
      />
      <DraggableRigidBody {...DraggableRigidBodyProps}
        groupProps={{ position: generatedPositions[21] }}
        onDragStart={() => setOrbitEnabled(false)}
        onDragStop={() => setOrbitEnabled(true)}
        enableSpringJoint={false}
        // groupProps={{ position: _ }}
        visibleMesh={
          <SnakeModel scale={.13} />
        }
      />
      <DraggableRigidBody {...DraggableRigidBodyProps}
        groupProps={{ position: generatedPositions[22] }}
        onDragStart={() => setOrbitEnabled(false)}
        onDragStop={() => setOrbitEnabled(true)}
        enableSpringJoint={false}
        // groupProps={{ position: _ }}
        visibleMesh={
          <SteveModel scale={.06} />
        }
      />
      <DraggableRigidBody {...DraggableRigidBodyProps}
        groupProps={{ position: generatedPositions[23] }}
        onDragStart={() => setOrbitEnabled(false)}
        onDragStop={() => setOrbitEnabled(true)}
        enableSpringJoint={false}
        // groupProps={{ position: _ }}
        visibleMesh={
          <TankModel scale={.8} />
        }
      />
      <DraggableRigidBody {...DraggableRigidBodyProps}
        groupProps={{ position: generatedPositions[24] }}
        onDragStart={() => setOrbitEnabled(false)}
        onDragStop={() => setOrbitEnabled(true)}
        enableSpringJoint={false}
        // groupProps={{ position: _ }}
        visibleMesh={
          <TerrariaModel scale={.13} />
        }
      />
      <DraggableRigidBody {...DraggableRigidBodyProps}
        groupProps={{ position: generatedPositions[25] }}
        onDragStart={() => setOrbitEnabled(false)}
        onDragStop={() => setOrbitEnabled(true)}
        enableSpringJoint={false}
        // groupProps={{ position: _ }}
        visibleMesh={
          <VhsModel scale={.25} />
        }
      />
      <DraggableRigidBody {...DraggableRigidBodyProps}
        groupProps={{ position: generatedPositions[26] }}
        onDragStart={() => setOrbitEnabled(false)}
        onDragStop={() => setOrbitEnabled(true)}
        enableSpringJoint={false}
        // groupProps={{ position: _ }}
        visibleMesh={
          <ZeldaModel scale={.05} />
        }
      />



      {/* <group ref={group} {...props} dispose={null}>
        <group>

          <RigidBody collisionGroups={interactionGroupB} ref={bottomRef} type={'fixed'} position={[0.065, 0, 0.329]}  // Belongs to groupA, collides with groupB
          >
            <mesh receiveShadow geometry={nodes.bottom001.geometry} material={materials['777.002']} scale={0.091} />
          </RigidBody>

          <RigidBody collisionGroups={interactionGroupB} gravityScale={1} type={type} ref={frontRef} colliders={colliders} position={[-0.953, 1.312, 0.321]} >
            <group>
              <mesh castShadow receiveShadow geometry={nodes.front001.geometry} material={materials['777.004']} scale={0.091} rotation={[Math.PI, 0, Math.PI]} />
              <mesh castShadow receiveShadow geometry={nodes.branding.geometry} material={materials['777.001']} scale={0.091} position={[0, -0.127, 0.29]} />
            </group>
          </RigidBody>

          <RigidBody collisionGroups={interactionGroupB} gravityScale={1} type={type} ref={topRef} colliders={colliders} position={[0.054, 2.36, 0.335]} >
            <mesh castShadow receiveShadow geometry={nodes.top001.geometry} material={materials['777.002']} scale={0.091} />
          </RigidBody>

          <RigidBody collisionGroups={interactionGroupB} gravityScale={1} type={type} ref={backRef} colliders={colliders} position={[1.081, 1.312, 0.334]} >
            <mesh castShadow receiveShadow geometry={nodes.back001.geometry} material={materials['777.002']} scale={0.091} />
          </RigidBody>

          <RigidBody collisionGroups={interactionGroupB} gravityScale={1} type={type} ref={leftRef} colliders={colliders} position={[0.065, 1.149, -3.169]} >
            <mesh castShadow receiveShadow geometry={nodes.left001.geometry} material={materials['777.002']} scale={0.091} />
          </RigidBody>

          <RigidBody collisionGroups={interactionGroupB} gravityScale={1} type={type} ref={rightRef} colliders={colliders} position={[0.065, 1.14, 3.871]} >
            <mesh castShadow receiveShadow geometry={nodes.right001.geometry} material={materials['777.002']} scale={0.091} />
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