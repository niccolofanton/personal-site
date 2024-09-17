import * as THREE from 'three';
import { useThree, useFrame, ThreeElements } from '@react-three/fiber';
import { RapierRigidBody, useSpringJoint, RigidBody, CuboidCollider, RigidBodyProps } from '@react-three/rapier';
import React, { useState, useRef, ReactElement, useImperativeHandle, forwardRef } from 'react';
import { DragControls } from '@react-three/drei';
import { DragControlsProps } from '@react-three/drei/web/DragControls';

export interface DraggableRigidBodyProps {
    boundingBox?: {
        minX: number,
        maxX: number,
        minY: number,
        maxY: number,
        minZ: number,
        maxZ: number,
    },
    dragControlsProps?: DragControlsProps,
    rigidBodyProps?: RigidBodyProps,
    visibleMesh: ReactElement<ThreeElements['mesh']>,
    invisibleMesh?: ReactElement<ThreeElements['mesh']>,
}

// Interfaccia per il tipo di ref che vogliamo esporre
interface DraggableRigidBodyRef {
    getInvisibleMesh: () => THREE.Mesh | null;
    getVisibleMesh: () => THREE.Mesh | null;
}

const DraggableRigidBody = forwardRef<DraggableRigidBodyRef, DraggableRigidBodyProps>(
    (props, ref) => {

        const [isDragging, setIsDragging] = useState(false)

        const visibleRigidBodyRef = useRef<RapierRigidBody>(null);
        const invisibibleRigidBodyRef = useRef<RapierRigidBody>(null);
        const visibleMeshRef = useRef<THREE.Mesh>(null);
        const invisibleMeshRef = useRef<THREE.Mesh>(null);
        const { scene } = useThree();

        useImperativeHandle(ref, () => ({
            getInvisibleMesh: () => invisibleMeshRef.current,
            getVisibleMesh: () => visibleMeshRef.current,
        }));

        useSpringJoint(
            invisibibleRigidBodyRef,
            visibleRigidBodyRef,
            [[0, 0, 0], [0, 0, 0], 0, 500, 0]
        );

        useFrame(() => {
            if (
                isDragging ||
                visibleRigidBodyRef.current?.isSleeping() ||
                !visibleMeshRef.current ||
                !invisibleMeshRef.current
            ) return;

            // updates position and rotation witout influence from parent objects
            const pmV = visibleMeshRef.current?.parent;
            const pmI = invisibleMeshRef.current?.parent;

            if (!pmV || !pmI) return;

            scene.attach(visibleMeshRef.current);
            scene.attach(invisibleMeshRef.current);

            const pos = visibleMeshRef.current.position;
            invisibleMeshRef.current.position.set(pos.x, pos.y, pos.z);
            invisibleMeshRef.current.setRotationFromEuler(visibleMeshRef.current.rotation);

            pmV.attach(visibleMeshRef.current);
            pmI.attach(invisibleMeshRef.current);

            if (!invisibibleRigidBodyRef.current) return;
            invisibibleRigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, false)
            invisibibleRigidBodyRef.current.setAngvel({ x: 0, y: 0, z: 0 }, false)
        })

        const startDragging = () => {
            if (!invisibibleRigidBodyRef.current) return;

            invisibibleRigidBodyRef.current.setBodyType(2, true);
            setIsDragging(true)
        }

        const stopDragging = () => {
            if (!invisibibleRigidBodyRef.current) return;

            invisibibleRigidBodyRef.current.setBodyType(0, true);
            setIsDragging(false)
        }

        const getBoxedPosition = (position: THREE.Vector3) => {
            if (!props.boundingBox) return position;

            position.setY(Math.min(Math.max(props.boundingBox.minY, position.y), props.boundingBox.maxY));
            position.setX(Math.min(Math.max(props.boundingBox.minX, position.x), props.boundingBox.maxX));
            position.setZ(Math.min(Math.max(props.boundingBox.minZ, position.z), props.boundingBox.maxZ));

            return position;
        }

        const onDrag = () => {
            if (isDragging && invisibibleRigidBodyRef.current && invisibleMeshRef.current) {
                // update position
                const position = new THREE.Vector3()
                invisibleMeshRef.current.getWorldPosition(position)
                invisibibleRigidBodyRef.current.setTranslation(getBoxedPosition(position), false)

                // update rotation
                const quaternion = new THREE.Quaternion()
                invisibleMeshRef.current.getWorldQuaternion(quaternion)
                invisibibleRigidBodyRef.current.resetForces(false)
            }
        }

        return (
            <group>

                {/* we use 2 colliders with a joint for the "elastic effect" */}
                <RigidBody type={'dynamic'} ref={invisibibleRigidBodyRef} collisionGroups={2} {...props} >
                    <CuboidCollider args={[.01, .01, .01]}></CuboidCollider>
                </RigidBody>

                {/* handle mouse movements */}
                <DragControls
                    onDragStart={startDragging}
                    onDrag={onDrag}
                    onDragEnd={stopDragging}
                    {...props.dragControlsProps}
                >
                    {React.cloneElement(props.invisibleMesh ?? props.visibleMesh, { ref: invisibleMeshRef })}
                </DragControls>

                <RigidBody
                    ref={visibleRigidBodyRef}
                    type={'dynamic'}
                    colliders={'hull'}
                    {...props.rigidBodyProps}
                >
                    {React.cloneElement(props.visibleMesh, { ref: visibleMeshRef })}
                </RigidBody>

            </group>
        )


    }
);


export default DraggableRigidBody;