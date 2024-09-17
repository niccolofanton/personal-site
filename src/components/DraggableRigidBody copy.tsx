import * as THREE from 'three';
import { useThree, useFrame, MeshProps, MaterialProps, BoxGeometryProps, ThreeElements } from '@react-three/fiber';
import { RapierRigidBody, useSpringJoint, RigidBody, CuboidCollider, RigidBodyProps } from '@react-three/rapier';
import React, { useState, useRef, ReactElement, useImperativeHandle, forwardRef } from 'react';
import { DragControls } from '@react-three/drei';
import { DragControlsProps } from '@react-three/drei/web/DragControls';

export interface DraggableRigidBodyProps2 {
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
    // invisibleMesh: ReactElement<ThreeElements['mesh']>,
    visibleMesh: ReactElement<ThreeElements['mesh']>,
}

// Interfaccia per il tipo di ref che vogliamo esporre
interface DraggableRigidBodyRef {
    // getInvisibleMesh: () => THREE.Mesh | null;
    getVisibleMesh: () => THREE.Mesh | null;
}

const DraggableRigidBody2 = forwardRef<DraggableRigidBodyRef, DraggableRigidBodyProps2>(
    (props, ref) => {

        const [isDragging, setIsDragging] = useState(false)

        const visibleRigidBodyRef = useRef<RapierRigidBody>(null);
        // const invisibibleRigidBodyRef = useRef<RapierRigidBody>(null);
        const visibleMeshRef = useRef<THREE.Mesh>(null);
        // const invisibleMeshRef = useRef<THREE.Mesh>(null);
        const { scene } = useThree();

        useImperativeHandle(ref, () => ({
            // getInvisibleMesh: () => invisibleMeshRef.current,
            getVisibleMesh: () => visibleMeshRef.current,
        }));

        // useSpringJoint(
        //     invisibibleRigidBodyRef,
        //     visibleRigidBodyRef,
        //     [[0, 0, 0], [0, 0, 0], 0, 500, 0]
        // );

        useFrame(() => {
            if (
                isDragging ||
                visibleRigidBodyRef.current?.isSleeping() ||
                !visibleMeshRef.current
                // || !invisibleMeshRef.current
            ) return;

            // // updates position and rotation witout influence from parent objects
            // const pmV = visibleMeshRef.current?.parent;
            // const pmI = invisibleMeshRef.current?.parent;

            // if (!pmV || !pmI) return;

            // scene.attach(visibleMeshRef.current);
            // scene.attach(invisibleMeshRef.current);

            // const pos = visibleMeshRef.current.position;
            // invisibleMeshRef.current.position.set(pos.x, pos.y, pos.z);
            // invisibleMeshRef.current.setRotationFromEuler(visibleMeshRef.current.rotation);

            // pmV.attach(visibleMeshRef.current);
            // pmI.attach(invisibleMeshRef.current);

            // if (!invisibibleRigidBodyRef.current) return;
            // invisibibleRigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, false)
            // invisibibleRigidBodyRef.current.setAngvel({ x: 0, y: 0, z: 0 }, false)
        })

        const startDragging = () => {
            if (!visibleRigidBodyRef.current) return;

            setIsDragging(true)
            visibleRigidBodyRef.current.setBodyType(2, true);
            visibleRigidBodyRef.current.setEnabledTranslations(false, false, false, false);
            visibleRigidBodyRef.current.setEnabledRotations(false, false, false, false);

        }

        const stopDragging = () => {
            if (!visibleRigidBodyRef.current) return;

            setIsDragging(false)
            visibleRigidBodyRef.current.setBodyType(0, true);
            visibleRigidBodyRef.current.setEnabledTranslations(true, true, true, true);
            visibleRigidBodyRef.current.setEnabledRotations(true, true, true, true);


        }

        const getBoxedPosition = (position: THREE.Vector3) => {
            if (!props.boundingBox) return position;

            position.setY(Math.min(Math.max(props.boundingBox.minY, position.y), props.boundingBox.maxY));
            position.setX(Math.min(Math.max(props.boundingBox.minX, position.x), props.boundingBox.maxX));
            position.setZ(Math.min(Math.max(props.boundingBox.minZ, position.z), props.boundingBox.maxZ));

            return position;
        }

        const onDrag = () => {
            // if (isDragging && invisibibleRigidBodyRef.current && invisibleMeshRef.current) {
            //     // update position
            //     const position = new THREE.Vector3()
            //     invisibleMeshRef.current.getWorldPosition(position)
            //     invisibibleRigidBodyRef.current.setTranslation(getBoxedPosition(position), false)

            //     // update rotation
            //     const quaternion = new THREE.Quaternion()
            //     invisibleMeshRef.current.getWorldQuaternion(quaternion)
            //     invisibibleRigidBodyRef.current.resetForces(false)
            // }

            console.log(visibleRigidBodyRef);
            

            if (!isDragging) return;
            if (!visibleRigidBodyRef.current) return;
            if (!visibleMeshRef.current) return;

            // updates position and rotation witout influence from parent objects
            const pmV = visibleMeshRef.current?.parent;
            if (!pmV) return;

            scene.attach(visibleMeshRef.current);
            // update position
            const position = new THREE.Vector3()
            visibleMeshRef.current.getWorldPosition(position)
            visibleRigidBodyRef.current.setNextKinematicTranslation(getBoxedPosition(position))

            // update rotation
            const quaternion = new THREE.Quaternion()
            visibleMeshRef.current.getWorldQuaternion(quaternion)
            visibleRigidBodyRef.current.setNextKinematicRotation(quaternion);
            visibleRigidBodyRef.current.resetForces(false)

            pmV.attach(visibleMeshRef.current);
        }

        return (
            <group>



                {/* we use 2 colliders with a joint for the "elastic effect" */}
                {/* <RigidBody type={'dynamic'} ref={invisibibleRigidBodyRef} collisionGroups={2} {...props} >
                    <CuboidCollider args={[.01, .01, .01]}></CuboidCollider>
                </RigidBody> */}



                {/* handle mouse movements */}
                <DragControls
                    onDragStart={startDragging}
                    onDrag={onDrag}
                    onDragEnd={stopDragging}
                    {...props.dragControlsProps}
                >
                    {/* {React.cloneElement(props.invisibleMesh, { ref: invisibleMeshRef })} */}

                    <RigidBody
                        ref={visibleRigidBodyRef}
                        type={'dynamic'}
                        {...props.rigidBodyProps}
                    >
                        {React.cloneElement(props.visibleMesh, { ref: visibleMeshRef })}
                    </RigidBody>

                </DragControls>




            </group>
        )


    }
);


export default DraggableRigidBody2;