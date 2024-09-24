import React, { RefObject, useEffect, useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useRevoluteJoint, RapierRigidBody} from '@react-three/rapier';
import { GLTF } from 'three-stdlib';
import * as THREE from 'three';
import DraggableRigidBody, { DraggableRigidBodyProps } from './DraggableRigidBody';

import SmoothOrbitControls from './SmoothOrbitControls';
import { Ak47Model } from './models/Ak47';
import { ApeModel } from './models/Ape';
import { BooksModel } from './models/Books';
import { CarModel } from './models/Car';
import { ClankModel } from './models/Clank';
import { ControllerModel } from './models/Controller';
import { CrashModel } from './models/Crash';
import { DaftpunkModel } from './models/Daftpunk';
import { Deadmau5Model } from './models/Deadmau5';
import { DexterModel } from './models/Dexter';
import { VinylsModel } from './models/Vinyls';
import { GbcModel } from './models/Gbc';
import { HaloModel } from './models/Halo';
import { KanyeModel } from './models/Kanye';
import { KlonoaModel } from './models/Klonoa';
import { MarioModel } from './models/Mario';
import { MinecraftModel } from './models/Minecraft';
import { RaymanModel } from './models/Rayman';
import { SlyModel } from './models/Sly';
import { SnakeModel } from './models/Snake';
import { SteveModel } from './models/Steve';
import { TankModel } from './models/Tank';
import { VhsModel } from './models/Vhs';
import { ZeldaModel } from './models/Zelda';
import { ZombieModel } from './models/Zombie';
import { CdsModel } from './models/Cds';
import { DvdsModel } from './models/Dvds';

// Array of generated positions
export const generatedPositions = [
  new THREE.Vector3(-1.95, 5.98, 7.87),
  new THREE.Vector3(0.14, 2.83, 6.97),
  new THREE.Vector3(-3.30, 17.29, -7.24),
  new THREE.Vector3(1.76, 8.91, 7.82),
  new THREE.Vector3(-1.15, 5.78, 2.83),
  new THREE.Vector3(-3.73, 18.46, 6.17),
  new THREE.Vector3(-8.70, 7.96, -3.83),
  new THREE.Vector3(2.82, 11.15, 7.21),
  new THREE.Vector3(8.10, 2.48, -6.10),
  new THREE.Vector3(-3.15, 4.90, 7.86),
  new THREE.Vector3(0.12, 14.69, -8.20),
  new THREE.Vector3(-4.83, 5.86, -3.71),
  new THREE.Vector3(2.84, 11.53, -6.39),
  new THREE.Vector3(0.18, 6.47, -1.55),
  new THREE.Vector3(7.89, 3.43, 3.89),
  new THREE.Vector3(-4.98, 9.38, -3.18),
  new THREE.Vector3(5.85, 12.10, 3.41),
  new THREE.Vector3(-4.07, 8.77, -0.31),
  new THREE.Vector3(-6.32, 14.35, -4.94),
  new THREE.Vector3(-5.39, 9.99, -1.62),
  new THREE.Vector3(-0.75, 3.73, 7.48),
  new THREE.Vector3(-4.27, 11.08, -5.92),
  new THREE.Vector3(8.99, 10.35, -6.74),
  new THREE.Vector3(8.64, 1.15, 2.86),
  new THREE.Vector3(-1.78, 18.51, -1.10),
  new THREE.Vector3(-7.37, 5.75, -5.19),
  new THREE.Vector3(5.65, 16.12, -1.13),
  new THREE.Vector3(-4.48, 3.52, 4.49),
  new THREE.Vector3(2.68, 18.87, -4.03),
  new THREE.Vector3(-4.20, 16.40, 1.62),
  new THREE.Vector3(-0.64, 1.85, 2.51),
  new THREE.Vector3(2.29, 10.98, -7.90),
  new THREE.Vector3(-3.94, 1.80, 6.38),
  new THREE.Vector3(5.28, 5.28, -4.67),
  new THREE.Vector3(-8.99, 10.95, -8.96),
  new THREE.Vector3(-6.12, 7.13, 8.60),
  new THREE.Vector3(5.78, 15.10, -4.82),
  new THREE.Vector3(2.72, 7.64, -7.12),
  new THREE.Vector3(5.30, 4.67, 1.91),
  new THREE.Vector3(-4.78, 8.88, -6.19),
  new THREE.Vector3(8.98, 6.70, -4.93),
  new THREE.Vector3(2.94, 18.38, -5.00),
  new THREE.Vector3(-8.62, 10.55, -2.34),
  new THREE.Vector3(8.97, 9.11, 6.33),
  new THREE.Vector3(-5.86, 5.15, -4.94),
  new THREE.Vector3(-5.21, 5.23, -1.77),
  new THREE.Vector3(-0.45, 11.63, -7.62),
  new THREE.Vector3(-4.02, 18.47, -6.95),
  new THREE.Vector3(7.39, 3.87, 5.14),
  new THREE.Vector3(-8.49, 14.76, 4.70),
  new THREE.Vector3(6.13, 2.07, -6.64),
  new THREE.Vector3(2.64, 14.01, 5.43),
  new THREE.Vector3(2.60, 5.10, -0.29),
  new THREE.Vector3(2.66, 14.20, -8.76),
  new THREE.Vector3(-0.71, 18.23, -2.29),
  new THREE.Vector3(-4.43, 11.18, 6.92),
  new THREE.Vector3(6.59, 16.54, 6.05),
  new THREE.Vector3(1.16, 4.72, 8.34),
  new THREE.Vector3(8.11, 9.82, 2.62),
  new THREE.Vector3(-8.14, 1.51, -4.14),
  new THREE.Vector3(-3.16, 7.15, -2.00),
  new THREE.Vector3(-4.33, 9.05, 2.49),
  new THREE.Vector3(8.78, 8.17, -8.17),
  new THREE.Vector3(-0.85, 6.01, 7.81),
  new THREE.Vector3(1.77, 4.06, 6.51),
  new THREE.Vector3(4.92, 12.70, -6.28),
  new THREE.Vector3(-8.70, 15.85, 2.95),
  new THREE.Vector3(-6.13, 17.78, 4.43),
  new THREE.Vector3(-2.71, 10.80, 2.52),
  new THREE.Vector3(-8.51, 7.09, 1.89),
  new THREE.Vector3(-6.53, 5.82, 3.28),
  new THREE.Vector3(0.20, 18.83, -4.17),
  new THREE.Vector3(0.08, 18.19, -8.47),
  new THREE.Vector3(3.34, 2.72, 5.62),
  new THREE.Vector3(3.86, 16.34, -8.75),
  new THREE.Vector3(-5.30, 17.13, -4.59),
  new THREE.Vector3(6.01, 11.09, 4.13),
  new THREE.Vector3(2.51, 14.94, 0.22),
  new THREE.Vector3(4.21, 14.53, 0.28),
  new THREE.Vector3(-7.74, 3.12, 1.07),
  new THREE.Vector3(-3.57, 7.92, -5.89),
  new THREE.Vector3(4.71, 15.00, 1.48),
  new THREE.Vector3(1.04, 10.51, 0.71),
  new THREE.Vector3(7.20, 8.89, 0.73),
  new THREE.Vector3(-0.90, 17.70, 6.40),
  new THREE.Vector3(6.87, 16.43, 2.50),
  new THREE.Vector3(-4.96, 16.04, 7.64),
  new THREE.Vector3(-6.41, 9.58, 7.38),
  new THREE.Vector3(8.05, 17.96, -3.81),
  new THREE.Vector3(-1.44, 16.83, 0.44),
  new THREE.Vector3(-1.35, 2.40, -7.51),
  new THREE.Vector3(3.65, 14.03, 3.10),
  new THREE.Vector3(8.50, 12.47, 4.30),
  new THREE.Vector3(7.15, 15.92, -0.59),
  new THREE.Vector3(-5.82, 6.86, 1.91),
  new THREE.Vector3(0.17, 4.77, 2.82),
  new THREE.Vector3(-5.78, 18.06, -5.03),
  new THREE.Vector3(-1.59, 14.86, -0.05),
  new THREE.Vector3(-0.02, 9.68, -8.17),
  new THREE.Vector3(2.43, 12.36, -8.32)
];


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

// const RevoluteJoint: React.FC<{
//   body1: RefObject<RapierRigidBody>,
//   body2: RefObject<RapierRigidBody>,
//   anchor: [number, number, number],
//   anchors?: [[number, number, number], [number, number, number]],
//   rotation?: [number, number, number]
// }> = ({ body1, body2, anchor, anchors = undefined, rotation = [0, 0, 1] }) => {
//   anchors ?
//     useRevoluteJoint(body1, body2, [...anchors, rotation]) :
//     useRevoluteJoint(body1, body2, [anchor, anchor, rotation]);
//   return null;
// };


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

  const springJoint = false;
  const objectScaleSize = 1.5;

  // let firstCollisionId: number | null = null;
  // const [currentDragged, setCurrentDragged] = useState<number | null>(null);

  const DraggableRigidBodyProps: Partial<DraggableRigidBodyProps> = {
    rigidBodyProps: {
      // gravityScale: 3.5,
      restitution: .1,
      angularDamping: .2,
      // linearDamping: 1.1,
    },
    jointConfig: {
      stiffness: 40
    },
    boundingBox: [[-10, 10], [.1, 20], [-10, 10]],
    dragControlsProps: {
      preventOverlap: true
    },
    onDragStart: () => setOrbitEnabled(false),
    onDragStop: () => setOrbitEnabled(true),
    enableSpringJoint: springJoint
  }

  useEffect(() => {
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


  const imageArray = Array.from({ length: 11 }, (v, i) => `${i + 1}.png`);
  const vhsArray = Array.from({ length: 5 }, (v, i) => `${i + 1}.jpg`);
  const cdsArray = Array.from({ length: 33 }, (v, i) => `${i + 1}.jpg`);
  const vinylsArray = Array.from({ length: 9 }, (v, i) => `${i + 1}.jpg`);
  const booksArray = Array.from({ length: 7 }, (v, i) => `${i + 1}.jpg`);
  const logosArray = Array.from({ length: 12 }, (v, i) => `${i + 1}.png`);

  return (
    <>

      <SmoothOrbitControls enableRotate={orbitEnabled} target={[0, 10, 0]} />

      <CdsModel
        texturesSrc={cdsArray.map(p => `/cds/${p}`)}
        groupProps={{ scale: .5 }}
        draggableRigidBodyProps={DraggableRigidBodyProps}
      />

      <DvdsModel
        texturesSrc={imageArray.map(p => `/films/${p}`)}
        groupProps={{}}
        draggableRigidBodyProps={DraggableRigidBodyProps}
      />

      <VinylsModel
        texturesSrc={vinylsArray.map(p => `/vinyls/${p}`)}
        groupProps={{}}
        draggableRigidBodyProps={DraggableRigidBodyProps}
      />

      <VhsModel
        texturesSrc={vhsArray.map(p => `/vhs/${p}`)}
        groupProps={{}}
        draggableRigidBodyProps={DraggableRigidBodyProps}
      />

      <BooksModel
        texturesSrc={booksArray.map(p => `/comics/${p}`)}
        groupProps={{}}
        draggableRigidBodyProps={DraggableRigidBodyProps}
      />


      {/* 
      {imageArray.map((p, i) => {
        return <DraggableRigidBody  {...DraggableRigidBodyProps}
          key={`dvd${i}`}

          groupProps={{ position: generatedPositions[7 + 5 + i] }}

          onDragStart={() => setOrbitEnabled(false)}
          onDragStop={() => setOrbitEnabled(true)}
          enableSpringJoint={springJoint}
          // rigidBodyProps={{ colliders: 'cuboid' }}
          rigidBodyProps={{ colliders: 'cuboid' }}

          visibleMesh={
            <DvdModel scale={.8} textureSrc={`/films/${p}`} />
          }
        />
      })} */}


      {/* {booksArray.map((p, i) => {
        return <DraggableRigidBody  {...DraggableRigidBodyProps}
          groupProps={{ position: generatedPositions[i] }}
          onDragStart={() => setOrbitEnabled(false)}
          onDragStop={() => setOrbitEnabled(true)}
          enableSpringJoint={springJoint}
          rigidBodyProps={{ colliders: 'cuboid', density: 1. }}
          visibleMesh={
            <BookModel scale={.9} textureSrc={`/comics/${p}`} />
          }
        />
      })} */}

      {/* {vhsArray.map((p, i) => {
        return <DraggableRigidBody  {...DraggableRigidBodyProps}
          key={`vhs${i}`}
          groupProps={{ position: generatedPositions[7 + i] }}
          onDragStart={() => setOrbitEnabled(false)}
          onDragStop={() => setOrbitEnabled(true)}
          enableSpringJoint={springJoint}
          rigidBodyProps={{ colliders: 'cuboid' }}
          visibleMesh={
            <VhsModel scale={.3} textureSrc={`/vhs/${p}`} />
          }
        />
      })} */}





      {/* {vinylsArray.map((p, i) => {
        return <DraggableRigidBody  {...DraggableRigidBodyProps}
          groupProps={{ position: generatedPositions[7 + 5 + 11 + 33 + i] }}
          onDragStart={() => setOrbitEnabled(false)}
          onDragStop={() => setOrbitEnabled(true)}
          // rigidBodyProps={{ colliders: '' }}
          enableSpringJoint={springJoint}
          // rigidBodyProps={{ colliders: 'cuboid' }}

          // groupProps={{ position: _ }}
          visibleMesh={
            <VinylModel scale={2} textureSrc={`/vinyls/${p}`} />
          }
        />
      })} */}

      {/* {logosArray.map((p, i) => {
        return <DraggableRigidBody  {...DraggableRigidBodyProps}
          groupProps={{ position: generatedPositions[7 + 5 + 11 + 33 + 9 + i] }}
          onDragStart={() => setOrbitEnabled(false)}
          onDragStop={() => setOrbitEnabled(true)}
          enableSpringJoint={springJoint}
          rigidBodyProps={{ colliders: 'cuboid', density: 20 }}
          visibleMesh={
            <TexturedPlane src={`/logos/${p}`} />
          }
        />
      })} */}


      
      <DraggableRigidBody  {...DraggableRigidBodyProps}
        groupProps={{ position: generatedPositions[78 + 0] }}
        onDragStart={() => setOrbitEnabled(false)}
        onDragStop={() => setOrbitEnabled(true)}
        enableSpringJoint={springJoint}
        // groupProps={{ position: _ }}
        rigidBodyProps={{ colliders: 'ball' }}
        visibleMesh={
          <MarioModel position={[0, 0, 0]} scale={objectScaleSize * .14} />
        }
      />

      <DraggableRigidBody  {...DraggableRigidBodyProps}
        groupProps={{ position: generatedPositions[78 + 1] }}
        onDragStart={() => setOrbitEnabled(false)}
        onDragStop={() => setOrbitEnabled(true)}
        enableSpringJoint={springJoint}
        // groupProps={{ position: _ }}
        visibleMesh={
          <ZombieModel scale={objectScaleSize * .6} />
        }
      />

      <DraggableRigidBody  {...DraggableRigidBodyProps}
        groupProps={{ position: generatedPositions[78 + 2] }}
        onDragStart={() => setOrbitEnabled(false)}
        onDragStop={() => setOrbitEnabled(true)}
        enableSpringJoint={springJoint}
        // groupProps={{ position: _ }}
        visibleMesh={
          <Ak47Model scale={objectScaleSize * 0.04} />
        }
      />

      <DraggableRigidBody  {...DraggableRigidBodyProps}
        groupProps={{ position: generatedPositions[78 + 3] }}
        onDragStart={() => setOrbitEnabled(false)}
        onDragStop={() => setOrbitEnabled(true)}
        enableSpringJoint={springJoint}
        // groupProps={{ position: _ }}
        rigidBodyProps={{ colliders: 'ball' }}
        visibleMesh={
          <ApeModel scale={objectScaleSize * .8} />
        }
      />

      <DraggableRigidBody  {...DraggableRigidBodyProps}
        groupProps={{ position: generatedPositions[78 + 5] }}
        onDragStart={() => setOrbitEnabled(false)}
        onDragStop={() => setOrbitEnabled(true)}
        enableSpringJoint={springJoint}
        // groupProps={{ position: _ }}
        rigidBodyProps={{ colliders: 'cuboid' }}

        visibleMesh={
          <CarModel scale={objectScaleSize * .1} />
        }
      />

      <DraggableRigidBody  {...DraggableRigidBodyProps}
        groupProps={{ position: generatedPositions[78 + 6] }}
        onDragStart={() => setOrbitEnabled(false)}
        onDragStop={() => setOrbitEnabled(true)}
        enableSpringJoint={springJoint}
        // groupProps={{ position: _ }}
        rigidBodyProps={{ colliders: 'ball' }}

        visibleMesh={
          <ClankModel scale={objectScaleSize * .7} />
        }
      />

      <DraggableRigidBody  {...DraggableRigidBodyProps}
        groupProps={{ position: generatedPositions[78 + 7] }}
        onDragStart={() => setOrbitEnabled(false)}
        onDragStop={() => setOrbitEnabled(true)}
        enableSpringJoint={springJoint}
        // groupProps={{ position: _ }}
        rigidBodyProps={{ colliders: 'cuboid' }}

        visibleMesh={
          <ControllerModel scale={objectScaleSize * .005} />
        }
      />

      <DraggableRigidBody  {...DraggableRigidBodyProps}
        groupProps={{ position: generatedPositions[78 + 8] }}
        onDragStart={() => setOrbitEnabled(false)}
        onDragStop={() => setOrbitEnabled(true)}
        enableSpringJoint={springJoint}
        // groupProps={{ position: _ }}
        rigidBodyProps={{ colliders: 'cuboid' }}

        visibleMesh={
          <CrashModel scale={objectScaleSize * .01} />
        }
      />

      <DraggableRigidBody  {...DraggableRigidBodyProps}
        groupProps={{ position: generatedPositions[78 + 9] }}
        onDragStart={() => setOrbitEnabled(false)}
        onDragStop={() => setOrbitEnabled(true)}
        enableSpringJoint={springJoint}
        // groupProps={{ position: _ }}
        visibleMesh={
          <DaftpunkModel scale={objectScaleSize * 3.7} />
        }
      />

      <DraggableRigidBody  {...DraggableRigidBodyProps}
        groupProps={{ position: generatedPositions[78 + 10] }}
        onDragStart={() => setOrbitEnabled(false)}
        onDragStop={() => setOrbitEnabled(true)}
        enableSpringJoint={springJoint}
        // groupProps={{ position: _ }}
        rigidBodyProps={{ colliders: 'trimesh' }}

        visibleMesh={
          <Deadmau5Model scale={objectScaleSize * .05} />
        }
      />

      <DraggableRigidBody  {...DraggableRigidBodyProps}
        groupProps={{ position: generatedPositions[78 + 11] }}
        onDragStart={() => setOrbitEnabled(false)}
        onDragStop={() => setOrbitEnabled(true)}
        enableSpringJoint={springJoint}
        // groupProps={{ position: _ }}
        rigidBodyProps={{ colliders: 'cuboid' }}

        visibleMesh={
          <DexterModel scale={objectScaleSize * .1} />
        }
      />

      <DraggableRigidBody  {...DraggableRigidBodyProps}
        groupProps={{ position: generatedPositions[78 + 13] }}
        onDragStart={() => setOrbitEnabled(false)}
        onDragStop={() => setOrbitEnabled(true)}
        enableSpringJoint={springJoint}
        // groupProps={{ position: _ }}
        visibleMesh={
          <GbcModel scale={objectScaleSize * .7} />
        }
      />

      <DraggableRigidBody  {...DraggableRigidBodyProps}
        groupProps={{ position: generatedPositions[78 + 14] }}
        onDragStart={() => setOrbitEnabled(false)}
        onDragStop={() => setOrbitEnabled(true)}
        enableSpringJoint={springJoint}
        // groupProps={{ position: _ }}
        rigidBodyProps={{ colliders: 'cuboid', density: 10, angularDamping: .5 }}
        visibleMesh={
          <HaloModel scale={objectScaleSize * 1} />
        }
      />
      <DraggableRigidBody  {...DraggableRigidBodyProps}
        groupProps={{ position: generatedPositions[78 + 15] }}
        onDragStart={() => setOrbitEnabled(false)}
        onDragStop={() => setOrbitEnabled(true)}
        enableSpringJoint={springJoint}
        // groupProps={{ position: _ }}
        rigidBodyProps={{ colliders: 'ball' }}
        visibleMesh={
          <KanyeModel scale={objectScaleSize * 2} />
        }
      />
      <DraggableRigidBody  {...DraggableRigidBodyProps}
        groupProps={{ position: generatedPositions[78 + 16] }}
        onDragStart={() => setOrbitEnabled(false)}
        onDragStop={() => setOrbitEnabled(true)}
        enableSpringJoint={springJoint}
        // groupProps={{ position: _ }}
        rigidBodyProps={{ colliders: 'ball' }}

        visibleMesh={
          <KlonoaModel scale={objectScaleSize * .27} />
        }
      />
      <DraggableRigidBody  {...DraggableRigidBodyProps}
        groupProps={{ position: generatedPositions[78 + 17] }}
        onDragStart={() => setOrbitEnabled(false)}
        onDragStop={() => setOrbitEnabled(true)}
        enableSpringJoint={springJoint}
        // groupProps={{ position: _ }}
        rigidBodyProps={{ colliders: 'cuboid' }}
        visibleMesh={
          <MinecraftModel scale={objectScaleSize * 1.8} />
        }
      />

      <DraggableRigidBody  {...DraggableRigidBodyProps}
        groupProps={{ position: generatedPositions[78 + 19] }}
        onDragStart={() => setOrbitEnabled(false)}
        onDragStop={() => setOrbitEnabled(true)}
        enableSpringJoint={springJoint}
        // groupProps={{ position: _ }}
        rigidBodyProps={{ colliders: 'ball' }}

        visibleMesh={
          <RaymanModel scale={objectScaleSize * 1.3} />
        }
      />
      <DraggableRigidBody  {...DraggableRigidBodyProps}
        groupProps={{ position: generatedPositions[78 + 20] }}
        onDragStart={() => setOrbitEnabled(false)}
        onDragStop={() => setOrbitEnabled(true)}
        enableSpringJoint={springJoint}
        // groupProps={{ position: _ }}
        rigidBodyProps={{ colliders: 'cuboid', density: 10, angularDamping: .5 }}
        visibleMesh={
          <SlyModel scale={objectScaleSize * 1} />
        }
      />

      <DraggableRigidBody  {...DraggableRigidBodyProps}
        groupProps={{ position: generatedPositions[78 + 21] }}
        onDragStart={() => setOrbitEnabled(false)}
        onDragStop={() => setOrbitEnabled(true)}
        enableSpringJoint={springJoint}
        // groupProps={{ position: _ }}
        rigidBodyProps={{ colliders: 'cuboid' }}

        visibleMesh={
          <SnakeModel scale={objectScaleSize * .13} />
        }
      />
      <DraggableRigidBody  {...DraggableRigidBodyProps}
        groupProps={{ position: generatedPositions[78 + 22] }}
        onDragStart={() => setOrbitEnabled(false)}
        onDragStop={() => setOrbitEnabled(true)}
        enableSpringJoint={springJoint}
        // groupProps={{ position: _ }}
        visibleMesh={
          <SteveModel scale={objectScaleSize * .06} />
        }
      />
      <DraggableRigidBody  {...DraggableRigidBodyProps}
        groupProps={{ position: generatedPositions[78 + 23] }}
        onDragStart={() => setOrbitEnabled(false)}
        onDragStop={() => setOrbitEnabled(true)}
        enableSpringJoint={springJoint}
        // groupProps={{ position: _ }}
        rigidBodyProps={{ colliders: 'cuboid' }}
        visibleMesh={
          <TankModel scale={objectScaleSize * .8} />
        }
      />

      <DraggableRigidBody  {...DraggableRigidBodyProps}
        groupProps={{ position: generatedPositions[78 + 26] }}
        onDragStart={() => setOrbitEnabled(false)}
        onDragStop={() => setOrbitEnabled(true)}
        enableSpringJoint={springJoint}
        // groupProps={{ position: _ }}
        rigidBodyProps={{ colliders: 'cuboid' }}

        visibleMesh={
          <ZeldaModel scale={objectScaleSize * .05} />
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