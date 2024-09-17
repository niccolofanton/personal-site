import * as THREE from 'three';
import { useThree, useFrame, ThreeElements, GroupProps } from '@react-three/fiber';
import { RapierRigidBody, RigidBody, RigidBodyProps, useSpringJoint } from '@react-three/rapier';
import React, { useState, useRef, ReactElement, useImperativeHandle, forwardRef } from 'react';
import { DragControls } from '@react-three/drei';
import { DragControlsProps } from '@react-three/drei/web/DragControls';

export const DEFAULT_SPRING_JOINT_CONFIG = {
    restLength: 0,
    stiffness: 500,
    damping: 0,
}

export interface DraggableRigidBodyProps {
    id?: number,
    boundingBox?: [[number, number] | undefined, [number, number] | undefined, [number, number] | undefined]
    dragControlsProps?: Partial<DragControlsProps>,
    rigidBodyProps?: RigidBodyProps,

    groupProps?: GroupProps,
    visibleMesh: ReactElement<ThreeElements['mesh']>,
    invisibleMesh?: ReactElement<ThreeElements['mesh']>,

    enableSpringJoint?: boolean,
    jointConfig?: {
        restLength: number,
        stiffness: number,
        damping: number
    }

    onDragStart?: (key: number | undefined) => void,
    onDragStop?: (key: number | undefined) => void,
    currentDragged?: number | null
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

        const visibleRigidBodyRef = useRef<RapierRigidBody>(null);
        const visibleMeshRef = useRef<THREE.Mesh>(null);

        const invisibibleRigidBodyRef = useRef<RapierRigidBody>(null);
        const invisibleMeshRef = useRef<THREE.Mesh>(null);

        useImperativeHandle(ref, () => ({
            getInvisibleMesh: () => invisibleMeshRef.current,
            getVisibleMesh: () => visibleMeshRef.current,
        }));

        useSpringJoint(
            invisibibleRigidBodyRef,
            visibleRigidBodyRef,
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
                invisibibleRigidBodyRef.current &&
                !invisibibleRigidBodyRef.current.isSleeping() &&
                !isDragging
            ) {
                invisibibleRigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, false)
                invisibibleRigidBodyRef.current.setAngvel({ x: 0, y: 0, z: 0 }, false)
            }

            if (
                !invisibleMeshRef.current || !visibleMeshRef.current ||
                isDragging || visibleRigidBodyRef.current?.isSleeping()
            ) return;

            /**
             * ? this code syncs the invisible mesh to the visible one
             * ? when it's moving without user input (after user stops
             * ? dragging or RigidBody is moving)
             */

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
        })

        const getBoxedPosition = (position: THREE.Vector3) => {
            if (!props.boundingBox) return position;

            const box = props.boundingBox;

            if (box[0]) {
                position.setX(Math.min(Math.max(box[0][0], position.x), box[0][1]));
            }

            if (box[1]) {
                position.setY(Math.min(Math.max(box[1][0], position.y), box[1][1]));

                if (position.y < 0.5) {
                    console.log(position.y);
                }

            }

            if (box[2]) {
                position.setZ(Math.min(Math.max(box[2][0], position.z), box[2][1]));
            }

            return position;
        }

        const startDragging = () => {
            // another is being dragged
            if (props.currentDragged !== null) return

            // fire event
            if (props.onDragStart) {
                props.onDragStart(props.id)
            }

            setIsDragging(true)

            if (invisibibleRigidBodyRef.current) {
                invisibibleRigidBodyRef.current.setBodyType(2, true);
                invisibibleRigidBodyRef.current.wakeUp()
                return;
            }

            if (!visibleRigidBodyRef.current) return;
            visibleRigidBodyRef.current.setBodyType(2, true);
            visibleRigidBodyRef.current.wakeUp()
        }

        const onDrag = () => {
            if (!isDragging || !visibleRigidBodyRef.current || !invisibleMeshRef.current) return;
            if (props.id !== props.currentDragged) {
                stopDragging();
                return;
            }

            // update position
            const position = new THREE.Vector3()
            invisibleMeshRef.current.getWorldPosition(position)

            if (invisibibleRigidBodyRef.current) {
                invisibibleRigidBodyRef.current.setNextKinematicTranslation(position)
                return
            }

            visibleRigidBodyRef.current.setNextKinematicTranslation(getBoxedPosition(position))
        }

        const stopDragging = () => {
            if (props.onDragStop) {
                props.onDragStop(props.id)
            }

            if (invisibibleRigidBodyRef.current) {
                invisibibleRigidBodyRef.current.setBodyType(0, true);
                setIsDragging(false)
                return;
            }

            if (!visibleRigidBodyRef.current) return;
            visibleRigidBodyRef.current.setBodyType(0, true);
            setIsDragging(false)
        }

        return (
            <group {...props.groupProps}>

                {
                    props.enableSpringJoint &&
                    (
                        //  we use 2 colliders with a joint for the "elastic effect" 
                        <RigidBody type={'dynamic'} ref={invisibibleRigidBodyRef} collisionGroups={2}  >
                            <mesh>
                                <sphereGeometry args={[.2, 10, 10]} />
                                <meshStandardMaterial color={"red"} wireframe={false} visible={true} />
                            </mesh>
                        </RigidBody>
                    )
                }

                {/* handle mouse movements */}
                <DragControls
                    onDragStart={startDragging}
                    onDrag={onDrag}
                    onDragEnd={stopDragging}
                    {...props.dragControlsProps}
                >
                    {React.cloneElement(props.invisibleMesh ?? props.visibleMesh, { ref: invisibleMeshRef, key: 'visible', visible: false })}
                </DragControls>

                <RigidBody
                    ref={visibleRigidBodyRef}
                    type={'dynamic'}
                    colliders={'hull'}
                    {...props.rigidBodyProps}
                >
                    {React.cloneElement(props.visibleMesh, { ref: visibleMeshRef, key: 'invisible' })}
                </RigidBody>

            </group >
        )
    }
);


export default DraggableRigidBody;