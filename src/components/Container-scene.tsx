import { Bloom, EffectComposer, N8AO } from '@react-three/postprocessing';
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";
import { Environment, OrbitControls, OrthographicCamera, ScrollControls, Shadow, SoftShadows } from '@react-three/drei';
import { ContainerModel } from './Container-model';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { AxesHelper } from 'three';
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
import { InceptionModel } from './models/Inception';
import { KanyeModel } from './models/Kanye';
import { KlonoaModel } from './models/Klonoa';

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
import SmoothOrbitControls from './SmoothOrbitControls';
import { MarioModel } from './models/Mario';



// Definizione dei gruppi di interazione
const GROUP_COMMON = 0b0001 << 16; // Gruppo comune (bit alto)
const GROUP_A = 0b0010 << 16; // Gruppo A separato
const GROUP_B = 0b0100 << 16; // Gruppo B separato

// Definizione delle maschere di interazione
const MASK_COMMON = 0b0001; // Il gruppo comune può interagire con tutti (A, B e COMMON)
const MASK_A = 0b0010 | MASK_COMMON; // Il gruppo A può interagire con A e COMMON
const MASK_B = 0b0100 | MASK_COMMON; // Il gruppo B può interagire con B e COMMON

// Combinazione dei gruppi e delle maschere
const interactionGroupCommon = GROUP_COMMON | (MASK_A | MASK_B); // Il gruppo comune interagisce con A, B e se stesso
export const interactionGroupA = GROUP_A | MASK_A; // Il gruppo A interagisce con se stesso e con il gruppo comune
export const interactionGroupB = GROUP_B | MASK_B; // Il gruppo B interagisce con se stesso e con il gruppo comune


interface ContainerSceneProps {
  className?: string;
}
export const ContainerScene = (props: ContainerSceneProps) => {

  const AOconf = {
    aoRadius: 1,
    intensity: 1,
    aoSamples: 10,
    denoiseSamples: 10,
    denoiseRadius: 10,
  }

  const asciiConf = {
    characters: ' .*#@',
    fontSize: 40,
    cellSize: 16
  }

  return (
    <div className={`${props.className} fixed top-0 w-[100%]`}  >


      <Canvas

        shadows

        onCreated={state => {

          state.gl.setClearColor('#262626')
          state.camera.position.x = -6.55;
          state.camera.position.y = 50;
          state.camera.position.z = 40;
          state.camera.zoom = 4;



          state.camera.lookAt(0, 0, 0);
          state.camera.updateProjectionMatrix()
          state.gl.setPixelRatio(1);
        }}>

        {/* <OrthographicCamera/> */}

        <Suspense>

          {/* <camera position={[0, 0, 50]} /> */}

          <EffectComposer>
            <N8AO {...AOconf} />
            <Bloom intensity={.2}></Bloom>
          </EffectComposer>


          {/* <ambientLight intensity={1} /> */}
          <Environment preset="city" />


          {/* <SoftShadows /> */}

          {/* <fog attach="fog" args={["grey", 0, 100]} /> */}
          
          <ambientLight intensity={0.5} />
          <directionalLight castShadow position={[2.5, 8, 5]} intensity={1} shadow-mapSize={1024}>
            <orthographicCamera attach="shadow-camera" args={[-10, 10, -10, 10, 0.1, 50]} />
          </directionalLight>

          


          {/* <mesh receiveShadow position={[0, -.1, 0]} rotation={[-Math.PI / 2, 0, 0]} >
            <planeGeometry args={[6, 12]} />
            <meshStandardMaterial color={'#454545'} />
          </mesh> */}

          {/* <primitive object={new AxesHelper(5)} /> */}

          <Physics debug={false} gravity={[0, 0, 0]} paused={false}>

            <ContainerModel position={[0, 0, -.2]}></ContainerModel>

            {/* <Door/> */}
            <CuboidCollider position={[0, -1, 0]} args={[10, 1, 10]} collisionGroups={interactionGroupCommon} />
            <CuboidCollider position={[0, 10, 0]} args={[10, 1, 10]} />
            <CuboidCollider position={[-10, 10, 0]} args={[10, 1, 10]} rotation={[0, 0, Math.PI / 2]} />
            <CuboidCollider position={[10, 10, 0]} args={[10, 1, 10]} rotation={[0, 0, Math.PI / 2]} />
            <CuboidCollider position={[0, 10, 10]} args={[10, 1, 10]} rotation={[Math.PI / 2, 0, 0]} />
            <CuboidCollider position={[0, 10, -10]} args={[10, 1, 10]} rotation={[Math.PI / 2, 0, 0]} />


            {/* <CuboidCollider position={[0, -.2, 0]} args={[3, .1, 4]} />
           <CuboidCollider position={[0, 2.8, 0]} args={[3, .1, 4]} />
           <CuboidCollider position={[-1.5, 2.8, 0]} args={[3, .1, 4]} rotation={[0, 0, Math.PI / 2]} />
           <CuboidCollider position={[1.7, 2.8, 0]} args={[3, .1, 4]} rotation={[0, 0, Math.PI / 2]} />
           <CuboidCollider position={[0, 2.8, 4.5]} args={[3, .1, 4]} rotation={[Math.PI / 2, 0, 0]} />
           <CuboidCollider position={[0, 2.8, -3.6]} args={[3, .1, 4]} rotation={[Math.PI / 2, 0, 0]} /> */}


          </Physics>

        </Suspense>
      </Canvas>


    </div >
  );
}