import { Bloom, EffectComposer, N8AO } from '@react-three/postprocessing';
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";
import { Environment, OrbitControls, OrthographicCamera } from '@react-three/drei';
import { ContainerModel } from './Container-model';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { AxesHelper } from 'three';
import { Door } from './Door';

interface ContainerSceneProps {
  className?: string;
}
export const ContainerScene = (props: ContainerSceneProps) => {

  const AOconf = {
    aoRadius: 1,
    intensity: 5,
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
    <div className={`${props.className}`}>

      <Canvas onCreated={state => {
        state.camera.position.z = 5;
        state.camera.position.y = 5;
        state.camera.position.x = -5;


        state.camera.lookAt(0, 0, 0);
        state.camera.updateProjectionMatrix()
        state.gl.setPixelRatio(2);
      }}>

        {/* <OrthographicCamera/> */}

        <Suspense>

          {/* <camera position={[0, 0, 50]} /> */}
{/* 
          <EffectComposer>
            <N8AO {...AOconf} />
            <Bloom intensity={.2}></Bloom>
          </EffectComposer> */}

          <OrbitControls autoRotate={false} enableRotate={false} enableZoom={true} autoRotateSpeed={1} />

          <ambientLight intensity={3} />

          <Environment preset="city" />

          {/* <primitive object={new AxesHelper(5)} /> */}

          <Physics debug={true} gravity={[0, -9.81, 0]} paused={false}>
            <ContainerModel></ContainerModel>


            {/* <Door/> */}
            <CuboidCollider position={[0, -1, 0]} args={[10, 1, 10]} />
            <CuboidCollider position={[0, 10, 0]} args={[10, 1, 10]} />
            <CuboidCollider position={[-10, 10, 0]} args={[10, 1, 10]} rotation={[0,0, Math.PI/2]} />
            <CuboidCollider position={[10, 10, 0]} args={[10, 1, 10]} rotation={[0,0, Math.PI/2]} />
            <CuboidCollider position={[0, 10, 10]} args={[10, 1, 10]} rotation={[Math.PI/2,0, 0]} />
            <CuboidCollider position={[0, 10, -10]} args={[10, 1, 10]} rotation={[Math.PI/2,0, 0]} />


            {/* <CuboidCollider position={[0, -.2, 0]} args={[3, .1, 4]} />
            <CuboidCollider position={[0, 2.8, 0]} args={[3, .1, 4]} />
            <CuboidCollider position={[-1.5, 2.8, 0]} args={[3, .1, 4]} rotation={[0, 0, Math.PI / 2]} />
            <CuboidCollider position={[1.7, 2.8, 0]} args={[3, .1, 4]} rotation={[0, 0, Math.PI / 2]} />
            <CuboidCollider position={[0, 2.8, 4.5]} args={[3, .1, 4]} rotation={[Math.PI / 2, 0, 0]} />
            <CuboidCollider position={[0, 2.8, -3.6]} args={[3, .1, 4]} rotation={[Math.PI / 2, 0, 0]} /> */}




          </Physics>

        </Suspense>

      </Canvas>
    </div>
  );
}