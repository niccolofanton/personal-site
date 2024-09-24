import React, { forwardRef } from 'react';
import { useLoader, MeshProps, GroupProps } from '@react-three/fiber';
import * as THREE from 'three';

interface TexturedPlaneProps extends GroupProps {
    src: string;
    scale?: number;
}

const TexturedPlane = forwardRef<THREE.Group, TexturedPlaneProps>(
    ({ src, scale = 1, ...props }, ref) => {
        const texture = useLoader(THREE.TextureLoader, src);

        return (
            <group {...props} ref={ref}>
                <mesh>
                    <planeGeometry args={[1, 1]} />
                    <meshBasicMaterial map={texture} transparent side={THREE.DoubleSide} />
                </mesh>

                <mesh>
                    <boxGeometry args={[1, 1, .1]} />
                    <meshBasicMaterial visible={false} />
                </mesh>
            </group>
        );
    }
);

export default TexturedPlane;
