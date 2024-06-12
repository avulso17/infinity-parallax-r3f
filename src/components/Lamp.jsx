import React, { useRef } from 'react'

import { useGLTF } from '@react-three/drei'

export default function LampModel(props) {
  const group = useRef()

  const { nodes, materials } = useGLTF('./models/lamp.gltf')

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes.Cylinder096.geometry}
        material={materials['Black.012']}
      />
      <mesh geometry={nodes.Cylinder096_1.geometry}>
        <meshBasicMaterial color={[1.2, 1.2, 0.6]} toneMapped={false} />
      </mesh>
    </group>
  )
}

useGLTF.preload('./models/lamp.gltf')
