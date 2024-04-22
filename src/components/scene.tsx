import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, Bloom, N8AO, ASCII } from '@react-three/postprocessing'
import { OrbitControls } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import { useControls } from 'leva'
import { BlurPass, Resizer, KernelSize as KS, Resolution } from 'postprocessing'

interface SceneProps {
  className?: string;
}
const RandomObjects = () => {

  // useFrame(() => {
  //   objects.forEach((mesh) => {
  //     // mesh.rotation.x += 0.01;
  //     // mesh.rotation.y += 0.01;
  //   });
  // });

  const getRandomGeometry = () => {
    const geometries = ['BoxGeometry', 'SphereGeometry', 'ConeGeometry', 'TorusGeometry', 'RingGeometry', 'CylinderGeometry', 'ConeGeometry', 'TorusGeometry'];
    return geometries[Math.floor(Math.random() * geometries.length)];
  }


  const generateRandomObjects = () => {
    const objects: any[] = [];

    for (let i = 0; i < 20; i++) {
      let x = 0;
      let y = 0;
      let z = 0;

      do {
        x = Math.random() * 10 - 5;
        y = Math.random() * 10 - 5;
        z = Math.random() * 10 - 5;
      } while (objects.some((obj: any) => Math.sqrt((obj.x - x) ** 2 + (obj.y - y) ** 2 + (obj.z - z) ** 2) < 3));

      objects.push({
        type: getRandomGeometry(),
        x,
        y,
        z
      });
    }

    return objects;
  }

  return generateRandomObjects().map((mesh, index) =>
    // draw a random mesh
    <mesh key={index} position={[mesh.x, mesh.y, mesh.z]}>
      {/* pick random geometry like sphere, square, cone, ecc */}
      {mesh.type === 'BoxGeometry' && <boxGeometry args={[1, 1, 1]} />}
      {mesh.type === 'SphereGeometry' && <sphereGeometry args={[1, 16, 16]} />}
      {mesh.type === 'ConeGeometry' && <coneGeometry args={[1, 1, 16]} />}
      {mesh.type === 'TorusGeometry' && <torusGeometry args={[1, 0.4, 16, 100]} />}
      {mesh.type === 'TorusKnotGeometry' && <torusKnotGeometry args={[1, 0.4, 16, 100]} />}
      {mesh.type === 'DodecahedronGeometry' && <dodecahedronGeometry args={[1, 0]} />}
      {mesh.type === 'IcosahedronGeometry' && <icosahedronGeometry args={[1, 0]} />}
      {mesh.type === 'OctahedronGeometry' && <octahedronGeometry args={[1, 0]} />}
      {mesh.type === 'TetrahedronGeometry' && <tetrahedronGeometry args={[1, 0]} />}
      {mesh.type === 'RingGeometry' && <ringGeometry args={[1, 1, 16]} />}
      {mesh.type === 'PlaneGeometry' && <planeGeometry args={[1, 1]} />}
      {mesh.type === 'CircleGeometry' && <circleGeometry args={[1, 16]} />}
      {mesh.type === 'CylinderGeometry' && <cylinderGeometry args={[1, 1, 1, 16]} />}
      {mesh.type === 'ConeGeometry' && <coneGeometry args={[1, 1, 16]} />}
      {mesh.type === 'TorusGeometry' && <torusGeometry args={[1, 0.4, 16, 100]} />}
      {mesh.type === 'TorusKnotGeometry' && <torusKnotGeometry args={[1, 0.4, 16, 100]} />}
      {mesh.type === 'LatheGeometry' && <latheGeometry args={[[], 16]} />}
      <meshBasicMaterial attach="material" wireframe={false} />
      {/* <meshWireframeMaterial attach="material" /> */}
    </mesh>

  );
};


const Objects = () => {



  const generateObject = () => {
    const objects: any[] = [];

    for (let i = 0; i < 1; i++) {
      let x = 0;
      let y = 0;
      let z = 0;

      objects.push({
        x,
        y,
        z
      });
    }

    return objects;
  }

  return generateObject().map((mesh, index) =>
    // draw a random mesh
    <mesh key={index} position={[mesh.x, mesh.y, mesh.z]} rotation={[0,-Math.PI/2,0]}>
      <torusGeometry args={[1, 0.4, 16, 100]} />
      <meshBasicMaterial attach="material" wireframe={false} />
      {/* <meshWireframeMaterial attach="material" /> */}
    </mesh>

  );
};

export const Scene = (props: SceneProps) => {

  // const props2 = useControls({
  //   font: { value: 'Arial', options: ['Arial', 'Helvetica', 'Times New Roman'] },
  //   characters: { value: '.*#@', placeholder: 'Enter characters' },
  //   fontSize: { value: 40, min: 8, max: 100, step: 1 },
  //   cellSize: { value: 16, min: 5, max: 100, step: 1 },
  // });


  // const p = useControls({
  //   aoRadius: { value: 1.4, min: 1, max: 5, step: 0.1 },
  //   intensity: { value: 8, min: 1, max: 100, step: 1 },
  //   // quality: 'performance' | 'low' | 'medium' | 'high' | 'ultra',
  //   aoSamples: { value: 1, min: 1, max: 100, step: 1 },
  //   denoiseSamples: { value: 10, min: 1, max: 100, step: 1 },
  //   denoiseRadius: { value: 40, min: 1, max: 100, step: 1 },
  //   // color: { value: '#ffffff', placeholder: 'Enter color' },
  //   // halfRes: boolean,
  // })

  const AOconf = {
    aoRadius: 1.4,
    intensity: 8,
    aoSamples: 1,
    denoiseSamples: 10,
    denoiseRadius: 40,
  }

  const asciiConf = {
    characters: ' .*#@',
    fontSize: 40,
    cellSize: 16
  }

  return (
    <div className={`${props.className}`}>
      <Canvas onCreated={state => {
        state.camera.position.z = 10;
        state.camera.zoom = 5
        state.camera.updateProjectionMatrix()
        state.gl.setPixelRatio(2);
      }}>
        {/* <camera position={[0, 0, 50]}  /> */}
        {/* <EffectComposer>
          <N8AO />
          <Bloom  {...props} />
        </EffectComposer> */}

        <EffectComposer>
          {/* <N8AO {...p} /> */}
          {/* <ASCII {...props2} /> */}
          <N8AO {...AOconf} />
          <ASCII {...asciiConf} />
        </EffectComposer>

        {/* <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial attach="material" color="hotpink" />
        </mesh> */}


        {/* <RandomObjects /> */}
        <Objects />

        <OrbitControls autoRotate={true} enableZoom={false} autoRotateSpeed={1} />

        <camera position={[0, 0, 0]} />
      </Canvas>
    </div>
  );
}