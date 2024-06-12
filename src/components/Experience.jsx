import { useEffect, useRef } from 'react'

import { useControls } from 'leva'
import { useFrame } from '@react-three/fiber'
import { ContactShadows, Environment, OrbitControls } from '@react-three/drei'
import { randFloatSpread } from 'three/src/math/MathUtils.js'

import Fence from './Fence'
import LampPost from './Lamp'
import Survivor from './Survivor'
import TreeModel from './Tree'
import Zombie from './Zombie'

const OFFSET_X = 20
const LAMPS_NB = 10
const LAMPS_SPEED = 0.8
const TREES_NB = 18
const TREES_SPEED = 0.38
const FAR_TREES_NB = 22
const FAR_TREES_SPEED = 0.2
const FENCES_NB = 30
const FENCES_SPEED = 0.8
const RANDOMIZER_STRENGTH_SCALE = 0.42
const RANDOMIZER_STRENGTH_POSITION = 1

function MovingItem(props) {
  const ref = useRef()

  useFrame((_state, delta) => {
    ref.current.position.x += delta * props.speed

    if (ref.current.position.x >= OFFSET_X) {
      ref.current.position.x = -OFFSET_X
    }
  })

  useEffect(() => {
    if (props.randomizePosition) {
      ref.current.position.x += randFloatSpread(RANDOMIZER_STRENGTH_POSITION)
      ref.current.position.z += randFloatSpread(RANDOMIZER_STRENGTH_POSITION)
    }

    if (props.randomizeScale) {
      ref.current.scale.x += randFloatSpread(RANDOMIZER_STRENGTH_SCALE)
      ref.current.scale.y += randFloatSpread(RANDOMIZER_STRENGTH_SCALE)
      ref.current.scale.z += randFloatSpread(RANDOMIZER_STRENGTH_SCALE)
    }
  }, [props.randomizePosition, props.randomizeScale])

  return (
    <group ref={ref} {...props}>
      {props.children}
    </group>
  )
}

function Background() {
  const ref = useRef()

  const {
    lampsNb,
    treesNb,
    farTreesNb,
    fencesNb,
    lampsSpeed,
    treesSpeed,
    farTreesSpeed,
    fencesSpeed,
  } = useControls({
    lampsNb: {
      value: LAMPS_NB,
      min: 0,
      max: 100,
      step: 1,
    },
    treesNb: {
      value: TREES_NB,
      min: 0,
      max: 100,
      step: 1,
    },
    farTreesNb: {
      value: FAR_TREES_NB,
      min: 0,
      max: 100,
      step: 1,
    },
    fencesNb: {
      value: FENCES_NB,
      min: 0,
      max: 100,
      step: 1,
    },
    lampsSpeed: {
      value: LAMPS_SPEED,
      min: 0.1,
      max: 2,
      step: 0.01,
    },
    treesSpeed: {
      value: TREES_SPEED,
      min: 0.1,
      max: 2,
      step: 0.01,
    },
    farTreesSpeed: {
      value: FAR_TREES_SPEED,
      min: 0.1,
      max: 2,
      step: 0.01,
    },
    fencesSpeed: {
      value: FENCES_SPEED,
      min: 0.1,
      max: 2,
      step: 0.01,
    },
  })

  return (
    <group position={[0, 0, 0]} ref={ref}>
      {[...Array(lampsNb)].map((_v, index) => (
        <MovingItem
          key={index}
          speed={lampsSpeed}
          position={[-OFFSET_X + (index / lampsNb) * OFFSET_X * 2, 0, -1.5]}
          randomizePosition
        >
          <LampPost scale={[0.5, 0.5, 0.5]} />
        </MovingItem>
      ))}

      {[...Array(treesNb)].map((_v, index) => (
        <MovingItem
          key={index}
          speed={treesSpeed}
          position={[-OFFSET_X + (index / treesNb) * OFFSET_X * 2, 0, -3.5]}
          randomizeScale
          randomizePosition
        >
          <TreeModel scale={[0.42, 0.42, 0.42]} rotation={[0, 2.2, 0]} />
        </MovingItem>
      ))}

      {[...Array(farTreesNb)].map((_v, index) => (
        <MovingItem
          key={index}
          speed={farTreesSpeed}
          position={[-OFFSET_X + (index / farTreesNb) * OFFSET_X * 2, 0, -6]}
          randomizeScale
          randomizePosition
        >
          <TreeModel scale={[0.74, 0.74, 0.74]} rotation={[0, 0.23, 0]} />
        </MovingItem>
      ))}

      {[...Array(fencesNb)].map((_v, index) => (
        <MovingItem
          key={index}
          speed={fencesSpeed}
          position={[-OFFSET_X + (index / fencesNb) * OFFSET_X * 2, 0, 1]}
        >
          <Fence scale={[0.44, 0.44, 0.44]} />
        </MovingItem>
      ))}
    </group>
  )
}

export default function Experience() {
  return (
    <>
      <OrbitControls
        minAzimuthAngle={-Math.PI / 4}
        maxAzimuthAngle={Math.PI / 4}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
        minDistance={2}
        maxDistance={15}
      />
      <ambientLight intensity={0.2} />
      <Environment preset='sunset' intensity={0.7} blur={0.8} />
      <group position={[0, -1, 0]}>
        <Background />

        <Zombie
          rotation-y={-Math.PI / 2}
          position={[0.5, 0, 0]}
          scale={[0.42, 0.42, 0.42]}
        />
        <Survivor
          rotation-y={-Math.PI / 2}
          position={[-1, -0.02, 0]}
          scale={[0.42, 0.42, 0.42]}
        />

        {/* <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[170, 170]} />
          <meshStandardMaterial color='#16a04b' />
        </mesh> */}
        <ContactShadows opacity={0.42} scale={[16, 16]} />
      </group>
    </>
  )
}
