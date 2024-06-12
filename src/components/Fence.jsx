import { useRef } from 'react'

import { useGLTF } from '@react-three/drei'

export default function FanceModel(props) {
  const group = useRef()

  const { nodes, materials } = useGLTF('./models/fence.gltf')

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes.Cylinder095.geometry}
        material={materials['Black.011']}
      />
      <mesh
        geometry={nodes.Cylinder095_1.geometry}
        material={materials['Stone.003']}
      />
    </group>
  )
}

useGLTF.preload('./models/fence.gltf')
