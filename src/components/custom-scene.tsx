import { Bloom, EffectComposer, HueSaturation, N8AO, SSAO, TiltShift2 } from '@react-three/postprocessing';
import { Physics, CuboidCollider } from "@react-three/rapier";
import { Environment, PerformanceMonitor, Preload, Shadow, SoftShadows } from '@react-three/drei';
import { ContainerModel } from './Container-model';
import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import { Attractor } from "@react-three/rapier-addons";
import * as THREE from 'three';
import { Perf } from 'r3f-perf'
import { useControls } from 'leva';
import { BlendFunction } from 'postprocessing'

function round(number: number, precision = 0) {
  const factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

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

const FluctuatingValue = () => {
  const a = useRef(4);
  const b = useRef(1);

  const [s, setS] = useState(4);

  useEffect(() => {
    const intervalId = setInterval(() => {

      if (a.current >= 6.5) {
        b.current = -1; // Change to decreasing
      } else if (a.current <= 3) {
        b.current = 1; // Change to increasing
      }
      a.current += (0.6 * b.current);

      setS(a.current)
    }, 200); // Change the interval time as needed

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);


  return (
    <Attractor position={[0, 10, 0]} range={s} strength={-0.95} />
  );
};

export default FluctuatingValue;


interface ContainerSceneProps {
  className?: string;
}
export const ContainerScene = (props: ContainerSceneProps) => {

  const AOconf = {
    aoRadius: 1,
    intensity: 2,
    aoSamples: 10,
    denoiseSamples: 10,
    denoiseRadius: 10,
  }

  const asciiConf = {
    characters: ' .*#@',
    fontSize: 40,
    cellSize: 16
  }

  const [force, setForce] = useState(.22);
  // const [gravity, setGravity] = useState(-9.81);
  const [gravity, setGravity] = useState(0);
  const [dpr, setDpr] = useState(1.5)

  useEffect(() => {
    // setTimeout(() => setForce(0), 2000)
    // setTimeout(() => setGravity(0),9000)
    // setTimeout(() => setForce(.4), 9000)
  }, []);

  const {
    saturation
  } = useControls({
    saturation: { value: .08, step: .01 },
  })

  const aoConfig = useControls('aoConf', {
    aoRadius: { value: 5, min: 0, max: 20, step: 0.01 },
    intensity: { value: 2.3, min: 0, max: 20, step: 0.01 },
    aoSamples: { value: 7, min: 0, max: 20, step: 1 },
    denoiseSamples: { value: 7, min: 0, max: 20, step: 1 },
    denoiseRadius: { value: 5, min: 0, max: 20, step: 0.01 },
    // distanceFalloff: { value: 1, min: 0, max: 10, step: 0.1 },
    quality: {
      value: 'high',
      options: ['performance', 'low', 'medium', 'high', 'ultra']
    },
    halfRes: true,
    // depthAwareUpsampling: true,
    // screenSpaceRadius: false,
    // renderMode: {
    //   value: 0,
    //   options: [0, 1, 2, 3, 4]
    // }
  })

  const bloom = useControls('Bloom', {
    intensity: { value: 2, min: 0, max: 2, step: .01 },
    luminanceThreshold: { value: .3, min: 0, max: 2, step: .01 },
    luminanceSmoothing: { value: 2, min: 0, max: 2, step: .01 },
  })

  const tiltShiftConfig = useControls('TiltShift2', {
    blendFunction: {
      value: BlendFunction.NORMAL,
      options: {
        Normal: BlendFunction.NORMAL,
        Add: BlendFunction.ADD,
        Subtract: BlendFunction.SUBTRACT,
        Multiply: BlendFunction.MULTIPLY,
        // Add other blend functions as needed
      }
    },
    blur: { value: 0.19, min: 0, max: 1, step: 0.01 },
    taper: { value: 0.43, min: 0, max: 1, step: 0.01 },
    start: {
      value: [.5, .5],
      x: { min: -10, max: 10, step: 0.01 },
      y: { min: -10, max: 10, step: 0.01 }
    },
    // end: {
    //   value: [0, 0],
    //   x: { min: -10, max: 10, step: 0.01 },
    //   y: { min: -10, max: 10, step: 0.01 }
    // },
    samples: { value: 6, min: 1, max: 20, step: 1 },
    direction: {
      value: [-.5, .4],
      x: { min: -1, max: 1, step: 0.1 },
      y: { min: -1, max: 1, step: 0.1 }
    }
  })

  return (
    <div className={`${props.className} fixed top-[-150px] w-[100%] `}  >
      <Canvas
        linear
        flat
        dpr={dpr}
        gl={{ antialias: false }}
        performance={{ min: 0.5 }}
        onCreated={state => {
          state.gl.outputColorSpace = THREE.SRGBColorSpace;

          state.gl.setClearColor('#262626')
          // state.camera.position.x = -6.55;
          state.camera.position.y = 10;
          state.camera.position.z = 20;
          // state.camera.zoom = 2.3;
          // state.camera.lookAt(0, 0, 0);
          state.camera.updateProjectionMatrix()
          // state.gl.setPixelRatio(1.5);
        }}>

        {/* <PerformanceMonitor onChange={({ factor }) => setDpr(round(0.5 + 1.5 * factor, 1))} /> */}
        {/* <Perf /> */}
        <Preload all />

        <Suspense>

          <EffectComposer>
            <N8AO {...(aoConfig as any)} />
            <Bloom {...bloom}></Bloom>
            <HueSaturation saturation={saturation} />
            <TiltShift2 {...tiltShiftConfig} />
          </EffectComposer>

          {/* <Environment preset="city" /> */}
          
          <hemisphereLight intensity={0.1} color="white" groundColor="black" />
          <Environment
            files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/evening_road_01_2k.hdr"
            ground={{ height: 10, radius: 80, scale: 60 }}
          />

          {/* <ambientLight intensity={0.1} /> */}

          {/* <directionalLight castShadow position={[2.5, 8, 5]} intensity={1} shadow-mapSize={1024}>
            <orthographicCamera attach="shadow-camera" args={[-10, 10, -10, 10, 0.1, 50]} />
          </directionalLight> */}

          {/* <primitive object={new AxesHelper(5)} /> */}

          <Physics debug={false} gravity={[0, gravity, 0]} paused={false}>

            <Attractor position={[0, 10, 0]} range={40} strength={force} />

            {/* <FluctuatingValue /> */}
            <ContainerModel position={[0, 0, -.2]}></ContainerModel>

            <Shadow rotation={[-Math.PI / 2, 0, 0]} scale={40} position={[0, 0, 0]} color="black" opacity={.8} />


            {/* <Door/> */}
            <CuboidCollider position={[0, -3, 0]} args={[10, 3, 10]} collisionGroups={interactionGroupCommon} />
            <CuboidCollider position={[0, 23, 0]} args={[10, 3, 10]} />
            <CuboidCollider position={[-13, 10, 0]} args={[10, 3, 10]} rotation={[0, 0, Math.PI / 2]} />
            <CuboidCollider position={[13, 10, 0]} args={[10, 3, 10]} rotation={[0, 0, Math.PI / 2]} />
            <CuboidCollider position={[0, 10, 13]} args={[10, 3, 10]} rotation={[Math.PI / 2, 0, 0]} />
            <CuboidCollider position={[0, 10, -13]} args={[10, 3, 10]} rotation={[Math.PI / 2, 0, 0]} />

          </Physics>

        </Suspense>
      </Canvas>
    </div >
  );
}