import React, { useRef } from 'react'

import { useGLTF } from '@react-three/drei'

export default function Zombie2Model(props) {
  const group = useRef()

  const { nodes, materials } = useGLTF('./models/zombie_2.gltf')

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={nodes.LeftFootCtrl} />
      <primitive object={nodes.RightFootCtrl} />
      <primitive object={nodes.HipsCtrl} />
      <skinnedMesh
        geometry={nodes.characterMedium.geometry}
        material={materials['skin.001']}
        skeleton={nodes.characterMedium.skeleton}
      />
    </group>
  )
}

useGLTF.preload('./models/zombie_2.gltf')
