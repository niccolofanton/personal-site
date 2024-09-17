import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Physics, RigidBody, useRevoluteJoint } from "@react-three/rapier";
import * as THREE from 'three';

const RevoluteJoint: React.FC<{ body1: React.RefObject<THREE.Object3D>, body2: React.RefObject<THREE.Object3D>, anchor1: [number, number, number] , anchor2: [number, number, number] }> = ({ body1, body2, anchor1, anchor2 }) => {
    useRevoluteJoint(body1, body2, [anchor1, anchor2, [0, 1, 0]]);
    return null;
};

export function Door() {
    const doorRef = useRef();
    const frameRef = useRef();
    const jointRef = useRef();

    // Posizione iniziale della porta e del telaio
    const doorPosition = [0, 1, .8];
    const framePosition = [0, 1, 0];

    // // Aggiungiamo un revolute joint tra la porta e il telaio
    // useRevoluteJoint(frameRef, doorRef, [
    //     {
    //         worldAnchor: [0, 1, 0], // Punto di ancoraggio della cerniera
    //         axis: [0, 1, 0], // L'asse attorno a cui ruota la porta (asse Y)
    //     },
    // ]);

    return (
        <>
            {/* Telaio della porta (statico) */}
            <RigidBody ref={frameRef} type="fixed">
                <mesh position={framePosition}>
                    <boxGeometry args={[0.1, 2, 1]} />
                    <meshStandardMaterial color="grey" />
                </mesh>
            </RigidBody>

            {/* Porta (rigida, connessa tramite joint) */}
            <RigidBody ref={doorRef} colliders="cuboid">
                <mesh position={doorPosition}>
                    <boxGeometry args={[0.1, 2, 1]} />
                    <meshStandardMaterial color="red" />
                </mesh>
            </RigidBody>


            <RevoluteJoint body1={frameRef} body2={doorRef} anchor1={[0, 0, .5]} anchor2={[.2, 0, 0]} />
            <RevoluteJoint body1={frameRef} body2={doorRef} anchor1={[0, -.5, .5]} anchor2={[.2, -.5, 0]} />
            {/* <RevoluteJoint body1={frameRef} body2={doorRef} anchor1={[1, 2, 0]} anchor2={[1, 2, 0]} /> */}

        </>
    );
}
