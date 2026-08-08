/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import { Storm } from './Storm';
import { Overlay } from './Overlay';

export default function App() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const maxScroll = Math.max(1, target.scrollHeight - target.clientHeight);
    scrollProgress.current = target.scrollTop / maxScroll;
  };

  return (
    <div className="w-full h-screen bg-[#020203] text-gray-100 overflow-hidden relative">
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, -5, 60], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: false, powerPreference: "high-performance" }}
        >
          <color attach="background" args={['#090d13']} />
          <fog attach="fog" args={['#090d13', 40, 100]} />
          <Suspense fallback={null}>
            <Storm scrollProgress={scrollProgress} />
            <Preload all />
          </Suspense>
        </Canvas>
      </div>

      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="absolute inset-0 z-10 overflow-y-auto overflow-x-hidden scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <Overlay />
      </div>
    </div>
  );
}
