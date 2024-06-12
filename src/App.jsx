import { Canvas } from '@react-three/fiber'

import { Bloom, EffectComposer } from '@react-three/postprocessing'

import Experience from './components/Experience'
import { Suspense } from 'react'

export default function App() {
  return (
    <>
      <Canvas shadows camera={{ position: [-5, 1, 6], fov: 25 }}>
        <fog attach='fog' args={['#16a04b', 12, 30]} />
        <Suspense fallback={null}>
          <Experience />
        </Suspense>

        <EffectComposer>
          <Bloom
            mipmapBlur
            luminanceThreshold={1}
            intensity={1.42}
            radius={0.72}
          />
        </EffectComposer>
      </Canvas>
    </>
  )
}
