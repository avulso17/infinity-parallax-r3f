import { useRef } from 'react'

import { useGLTF } from '@react-three/drei'

export default function TreeModel(props) {
  const group = useRef()

  const { nodes, materials } = useGLTF('./models/tree.gltf')

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes.treeD_graveyard.geometry}
        material={materials['DarkWood.015']}
      />
    </group>
  )
}

useGLTF.preload('./models/tree.gltf')
