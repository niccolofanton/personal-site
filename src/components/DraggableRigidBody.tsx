import * as THREE from 'three';
import { useThree, useFrame, ThreeElements, GroupProps } from '@react-three/fiber';
import { InstancedRigidBodies, RapierRigidBody, RigidBody, RigidBodyProps, useSpringJoint } from '@react-three/rapier';
import React, { useState, useRef, ReactElement, useImperativeHandle, forwardRef, Ref, useEffect } from 'react';
import { CustomDragControls, CustomDragControlsProps } from './CustomDragControls';
import { interactionGroupB } from './custom-scene';

export const DEFAULT_SPRING_JOINT_CONFIG = {
    restLength: 0,
    stiffness: 100000,
    damping: 0,
    collisionGroups: 2
}

export interface DraggableRigidBodyProps {
    groupProps?: GroupProps, /** set position coordinates here */

    boundingBox?: [
        [number, number] | undefined,
        [number, number] | undefined,
        [number, number] | undefined
    ] /** x, y and z min and max drag coordinates */

    dragControlsProps?: Partial<CustomDragControlsProps>,
    rigidBodyProps?: Partial<RigidBodyProps>,

    visibleComponentRef?: React.RefObject<THREE.Mesh | THREE.Group>,
    visibleMesh: ReactElement<ThreeElements['mesh']>,
    invisibleMesh?: ReactElement<ThreeElements['mesh']>, /** defaults to visibleMesh, invisibleMesh is used for the DragControls */

    enableSpringJoint?: boolean, /** enables wobbly physics */

    jointConfig?: {
        restLength?: number,
        stiffness?: number,
        damping?: number,
        springJointCollisionGroups?: number,
    } /** rapier SpringJoint props */

    instanceMode?: boolean

    onDragStart?: () => void,
    onDragStop?: () => void,
}

// Interfaccia per il tipo di ref che vogliamo esporre
interface DraggableRigidBodyRef {
    getInvisibleMesh: () => THREE.Mesh | null;
    getVisibleMesh: () => THREE.Mesh | null;
}

const DraggableRigidBody = forwardRef<DraggableRigidBodyRef, DraggableRigidBodyProps>(
    (props, ref) => {

        const [isDragging, setIsDragging] = useState(false)
        const { scene } = useThree();

        const rigidBodyRef = useRef<RapierRigidBody>(null);
        const jointRigidBodyRef = useRef<RapierRigidBody>(null);

        const meshRef = useRef<THREE.Mesh>(null);

        // console.log(props.visibleComponentRef);

        const invisibleDragControlsMeshRef = useRef<THREE.Mesh>(null);

        useImperativeHandle(ref, () => ({
            getInvisibleMesh: () => invisibleDragControlsMeshRef.current,
            getVisibleMesh: () => meshRef.current,
        }));

        // useEffect(() => {

        //     if(props.visibleComponentRef){
        //         meshRef = props.visibleComponentRef;
        //     }

        // }, [])

        useSpringJoint(
            jointRigidBodyRef,
            rigidBodyRef,
            [
                [0, 0, 0],
                [0, 0, 0],
                props.jointConfig?.restLength ?? DEFAULT_SPRING_JOINT_CONFIG.restLength,
                props.jointConfig?.stiffness ?? DEFAULT_SPRING_JOINT_CONFIG.stiffness,
                props.jointConfig?.damping ?? DEFAULT_SPRING_JOINT_CONFIG.damping,
            ]
        );

        useFrame(() => {
            // removes unwanted joint movement when not dragged
            if (
                jointRigidBodyRef.current &&
                !jointRigidBodyRef.current.isSleeping() &&
                !isDragging
            ) {
                jointRigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, false)
                jointRigidBodyRef.current.setAngvel({ x: 0, y: 0, z: 0 }, false)
            }

            // console.log(props.current);


            if (
                !invisibleDragControlsMeshRef.current ||
                (!meshRef.current && !props.visibleComponentRef?.current) ||
                isDragging ||
                rigidBodyRef.current?.bodyType() === 2 ||
                rigidBodyRef.current?.isSleeping()
            ) return;

            /**
             * ? this code syncs the invisible mesh to the visible one
             * ? when it's moving without user input (after user stops
             * ? dragging or RigidBody is moving)
             */

            // updates position and rotation without influence from parent objects

            const ref = props.visibleComponentRef?.current??meshRef.current;

            const pmV = ref?.parent;
            const pmI = invisibleDragControlsMeshRef.current?.parent;

            if (!pmV || !pmI) return;

            scene.attach(ref);
            scene.attach(invisibleDragControlsMeshRef.current);

            const pos = ref.position;
            invisibleDragControlsMeshRef.current.position.set(pos.x, pos.y, pos.z);
            invisibleDragControlsMeshRef.current.setRotationFromEuler(ref.rotation);

            pmV.attach(ref);
            pmI.attach(invisibleDragControlsMeshRef.current);
        })

        const getBoxedPosition = (position: THREE.Vector3) => {
            if (!props.boundingBox) return position;

            const box = props.boundingBox;

            if (box[0]) {
                position.setX(Math.min(Math.max(box[0][0], position.x), box[0][1]));
            }

            if (box[1]) {
                position.setY(Math.min(Math.max(box[1][0], position.y), box[1][1]));
            }

            if (box[2]) {
                position.setZ(Math.min(Math.max(box[2][0], position.z), box[2][1]));
            }

            return position;
        }

        const startDragging = () => {
            setIsDragging(true)

            if (props.onDragStart) props.onDragStart();

            if (props.enableSpringJoint && jointRigidBodyRef.current && rigidBodyRef.current) {
                jointRigidBodyRef.current.setBodyType(2, true);
                rigidBodyRef.current.setLinearDamping(8);
                jointRigidBodyRef.current.wakeUp()
                return;
            }

            if (!rigidBodyRef.current) return;
            rigidBodyRef.current.setBodyType(2, true);
            rigidBodyRef.current.wakeUp()
        }

        const onDrag = () => {
            if (!isDragging || !rigidBodyRef.current || !invisibleDragControlsMeshRef.current) return;

            // skip update if RigidBody type is not updated
            if (!props.enableSpringJoint && rigidBodyRef.current.bodyType() !== 2) return;
            if (props.enableSpringJoint && jointRigidBodyRef.current && jointRigidBodyRef.current.bodyType() !== 2) return;

            // update position
            const position = new THREE.Vector3()
            invisibleDragControlsMeshRef.current.getWorldPosition(position)

            if (props.enableSpringJoint && jointRigidBodyRef.current) {
                jointRigidBodyRef.current.setNextKinematicTranslation(position)
                return
            }

            rigidBodyRef.current.setNextKinematicTranslation(getBoxedPosition(position))
        }

        const stopDragging = () => {
            if (props.onDragStop) props.onDragStop();

            if (props.enableSpringJoint && jointRigidBodyRef.current && rigidBodyRef.current) {
                jointRigidBodyRef.current.setBodyType(0, true);
                rigidBodyRef.current.setLinearDamping(props.jointConfig?.damping ?? 0);
                setIsDragging(false)
                return;
            }

            if (!rigidBodyRef.current) return;
            rigidBodyRef.current.setBodyType(0, true);
            setIsDragging(false)
        }

        return (
            <group {...props.groupProps}>

                {
                    props.enableSpringJoint &&
                    (
                        //  we use 2 colliders with a joint for the "wobbly effect", this RigidBody is on another collisionGroups
                        <RigidBody type={'dynamic'} ref={jointRigidBodyRef}
                            collisionGroups={props.jointConfig?.springJointCollisionGroups ?? DEFAULT_SPRING_JOINT_CONFIG.collisionGroups}>
                            <mesh>
                                <boxGeometry args={[.01, .01, .01]} />
                                <meshStandardMaterial visible={false} />
                            </mesh>
                        </RigidBody>
                    )
                }

                {/* handle mouse movements */}
                <CustomDragControls
                    onDragStart={startDragging}
                    onDrag={onDrag}
                    onDragEnd={stopDragging}
                    {...props.dragControlsProps}
                >
                    {React.cloneElement(props.invisibleMesh ?? props.visibleMesh, { ref: invisibleDragControlsMeshRef, key: 'invisible', visible: false })}
                </CustomDragControls>

                {/* // handle physics */}
                <RigidBody
                    ref={rigidBodyRef}
                    type={'dynamic'}
                    colliders={'hull'}
                    // collisionGroups={interactionGroupB}
                    {...props.rigidBodyProps}
                // mass={1}
                >
                    {React.cloneElement(props.visibleMesh, { ref: (props.visibleComponentRef as any) ?? meshRef, key: 'visible' })}
                    {/* {props.visibleMesh} */}
                </RigidBody>

            </group >
        )
    }
);

export default DraggableRigidBody;