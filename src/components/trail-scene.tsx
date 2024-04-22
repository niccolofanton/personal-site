// import { Canvas, useFrame, useThree } from '@react-three/fiber'
// import { EffectComposer, Bloom, N8AO, ASCII } from '@react-three/postprocessing'
// import { OrbitControls, OrthographicCamera } from '@react-three/drei'
// import { use, useEffect, useRef, useState } from 'react'
// import { useControls } from 'leva'
// import { BlurPass, Resizer, KernelSize as KS, Resolution } from 'postprocessing'
// import { Mesh, MeshBasicMaterial, Object3DEventMap, SphereGeometry } from 'three'

// interface SceneProps {
//   className?: string;
// }

// interface Trail { x: number, y: number }[]

// const Trail = (props: { trail: Trail }) => {
//   const refMesh = useRef<Mesh>();

//   useFrame(s => {
//     if (refMesh.current) {

//       refMesh.current.position.setX(props.trail.x);
//       refMesh.current.position.setY(props.trail.y);
//     }
//   });

//   return <mesh ref={refMesh} >
//     {/* <torusGeometry args={[1, 0.4, 16, 100]} /> */}
//     <sphereGeometry args={[.01, 16, 16]} />
//     <meshBasicMaterial attach="material" color="red" />
//   </mesh>;
// }

// export const TrailScene = (props: SceneProps) => {

//   const composerRef = useRef();
//   const [trail, setTrail] = useState({ x: 0, y: 0 });

//   let width = 1;
//   let height = 1;

//   useEffect(() => {
//     width = window.innerWidth;
//     height = window.innerHeight;
//     document.addEventListener('mousemove', (event) => {
//       setTrail({
//         x: -(event.clientX / window.innerWidth * 2 - 1),
//         y: event.clientY / window.innerHeight * -2 + 1
//       })
//     })
//   }, []);


//   return (
//     <div className={`${props.className}`}>
//       <Canvas onCreated={state => {
//         // state.camera.position.z = 10;
//         // state.camera.zoom = 5
//         // state.camera.updateProjectionMatrix()
//       }}>

//         <OrthographicCamera
//           makeDefault
//           zoom={1}
//           top={height / 2}
//           bottom={-height / 2}
//           left={width / 2}
//           right={-width / 2}
//           near={1}
//           far={20}
//           position={[0, 0, 1]}
//         />

//         <Trail trail={trail} />
//         {/* <mesh position={[0, 0, 0]} >
//           <torusGeometry args={[1, 0.4, 16, 100]} />
//           <meshBasicMaterial attach="material" wireframe={false} />
//         </mesh> */}
//         <EffectComposer ref={composerRef} >
//           {/* <N8AO {...p} /> */}
//           {/* <ASCII {...props2} /> */}
//           {/* <N8AO {...AOconf} /> */}
//           <ASCII />
//         </EffectComposer>

//         {/* {trail.map((point, index) =>
//           <mesh position={[0, 0, 0]}>
//             <torusGeometry args={[10, 10, 10]} />
//             <meshBasicMaterial attach="material" color="red" />
//           </mesh>)} */}

//       </Canvas>
//     </div>
//   );
// }