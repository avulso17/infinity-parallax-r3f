import { useEffect, useRef } from 'react'

import { useAnimations, useGLTF } from '@react-three/drei'

export default function SurvivorModel(props) {
  const group = useRef()

  const { nodes, materials, animations } = useGLTF('./models/survivor.gltf')

  const { actions } = useAnimations(animations, group)

  // useEffect(() => {
  //   actions['course_jeune'].play()
  // }, [])

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

useGLTF.preload('./models/survivor.gltf')
