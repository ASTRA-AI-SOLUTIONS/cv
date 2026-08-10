import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface StormProps {
  scrollProgress: React.MutableRefObject<number>;
}

export function Storm({ scrollProgress }: StormProps) {
  const count = 30000; // Reduced for faster load time and better performance
  
  const [positions, offsets, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const offsets = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    
    // High-tech AI color palette: Deep Blue, Cyan, Purple, Neon Pink, and bright White
    const color1 = new THREE.Color('#00f0ff'); // Neon Cyan
    const color2 = new THREE.Color('#7000ff'); // Deep Purple
    const color3 = new THREE.Color('#ff0055'); // Neon Pink
    const color4 = new THREE.Color('#ffffff'); // White hot core
    
    for (let i = 0; i < count; i++) {
      // Create a massive central disk/galaxy formation
      const radius = Math.pow(Math.random(), 1.5) * 120.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      // Flatten the Y axis to create a disk, but keep some volumetric depth
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.cos(phi) * 0.15; // Flattened
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
      
      offsets[i] = Math.random(); // Random life offset (0 to 1)
      
      // Assign colors based on radius to create a glowing core and colorful edges
      const mixedColor = new THREE.Color();
      const r = Math.random();
      const distPercent = radius / 120.0;
      
      if (distPercent < 0.1) {
        mixedColor.copy(color4).lerp(color1, Math.random() * 0.5); // Core
      } else if (distPercent < 0.4) {
        mixedColor.copy(color1).lerp(color2, Math.random()); // Inner ring
      } else if (distPercent < 0.7) {
        mixedColor.copy(color2).lerp(color3, Math.random()); // Mid ring
      } else {
        mixedColor.copy(color3).lerp(color1, Math.random()); // Outer ring
      }
      
      // Add some random bright sparks everywhere
      if (Math.random() > 0.98) mixedColor.copy(color4);
      
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }
    
    return [positions, offsets, colors];
  }, [count]);

  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const groupRef = useRef<THREE.Group>(null);
  const mouseRef = useRef(new THREE.Vector2());

  useFrame((state) => {
    const { clock, mouse } = state;
    const time = clock.elapsedTime;
    
    // Smooth mouse follow (normalized -1 to 1)
    mouseRef.current.x = THREE.MathUtils.lerp(mouseRef.current.x, mouse.x, 0.05);
    mouseRef.current.y = THREE.MathUtils.lerp(mouseRef.current.y, mouse.y, 0.05);
    
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = time;
      materialRef.current.uniforms.uScrollOffset.value = scrollProgress.current;
      materialRef.current.uniforms.uMouse.value.copy(mouseRef.current);
    }
    
    if (groupRef.current) {
      // Gentle overall float and tilt based on mouse and scroll
      groupRef.current.rotation.y = time * 0.02 + mouseRef.current.x * 0.1;
      groupRef.current.rotation.x = mouseRef.current.y * 0.1;
      
      // Move the entire galaxy up slightly as you scroll down
      groupRef.current.position.y = scrollProgress.current * 30.0 - 10.0;
      
      // Tilt the galaxy progressively as you scroll to show different angles
      groupRef.current.rotation.x -= scrollProgress.current * Math.PI * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-aOffset" args={[offsets, 1]} />
          <bufferAttribute attach="attributes-aColor" args={[colors, 3]} />
        </bufferGeometry>
        <shaderMaterial
          ref={materialRef}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          uniforms={{
            uTime: { value: 0 },
            uScrollOffset: { value: 0 },
            uMouse: { value: new THREE.Vector2() }
          }}
          vertexShader={`
            uniform float uTime;
            uniform float uScrollOffset;
            uniform vec2 uMouse;
            
            attribute float aOffset;
            attribute vec3 aColor;
            
            varying vec3 vColor;
            varying float vAlpha;
            
            // --- Advanced Simplex 3D Noise & Curl Noise ---
            vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
            vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
            float snoise(vec3 v){ 
              const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
              const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
              vec3 i  = floor(v + dot(v, C.yyy) );
              vec3 x0 = v - i + dot(i, C.xxx) ;
              vec3 g = step(x0.yzx, x0.xyz);
              vec3 l = 1.0 - g;
              vec3 i1 = min( g.xyz, l.zxy );
              vec3 i2 = max( g.xyz, l.zxy );
              vec3 x1 = x0 - i1 + 1.0 * C.xxx;
              vec3 x2 = x0 - i2 + 2.0 * C.xxx;
              vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
              i = mod(i, 289.0 ); 
              vec4 p = permute( permute( permute( 
                         i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                       + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
                       + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
              float n_ = 1.0/7.0; 
              vec3  ns = n_ * D.wyz - D.xzx;
              vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  
              vec4 x_ = floor(j * ns.z);
              vec4 y_ = floor(j - 7.0 * x_ );    
              vec4 x = x_ *ns.x + ns.yyyy;
              vec4 y = y_ *ns.x + ns.yyyy;
              vec4 h = 1.0 - abs(x) - abs(y);
              vec4 b0 = vec4( x.xy, y.xy );
              vec4 b1 = vec4( x.zw, y.zw );
              vec4 s0 = floor(b0)*2.0 + 1.0;
              vec4 s1 = floor(b1)*2.0 + 1.0;
              vec4 sh = -step(h, vec4(0.0));
              vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
              vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
              vec3 p0 = vec3(a0.xy,h.x);
              vec3 p1 = vec3(a0.zw,h.y);
              vec3 p2 = vec3(a1.xy,h.z);
              vec3 p3 = vec3(a1.zw,h.w);
              vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
              p0 *= norm.x;
              p1 *= norm.y;
              p2 *= norm.z;
              p3 *= norm.w;
              vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
              m = m * m;
              return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
            }

            vec3 snoiseVec3( vec3 x ){
              float s  = snoise(vec3( x ));
              float s1 = snoise(vec3( x.y - 19.1 , x.z + 33.4 , x.x + 47.2 ));
              float s2 = snoise(vec3( x.z + 74.2 , x.x - 124.5 , x.y + 99.4 ));
              vec3 c = vec3( s , s1 , s2 );
              return c;
            }

            vec3 curlNoise( vec3 p ){
              const float e = .1;
              vec3 dx = vec3( e   , 0.0 , 0.0 );
              vec3 dy = vec3( 0.0 , e   , 0.0 );
              vec3 dz = vec3( 0.0 , 0.0 , e   );

              vec3 p_x0 = snoiseVec3( p - dx );
              vec3 p_x1 = snoiseVec3( p + dx );
              vec3 p_y0 = snoiseVec3( p - dy );
              vec3 p_y1 = snoiseVec3( p + dy );
              vec3 p_z0 = snoiseVec3( p - dz );
              vec3 p_z1 = snoiseVec3( p + dz );

              float x = p_y1.z - p_y0.z - p_z1.y + p_z0.y;
              float y = p_z1.x - p_z0.x - p_x1.z + p_x0.z;
              float z = p_x1.y - p_x0.y - p_y1.x + p_y0.x;

              const float divisor = 1.0 / ( 2.0 * e );
              return normalize( vec3( x , y , z ) * divisor );
            }
            // ------------------------------------------------

            void main() {
              vColor = aColor;
              
              // Particle life cycle (0.0 to 1.0)
              float time = uTime * 0.12;
              float age = fract(time + aOffset); 
              
              // Determine how far the particle will travel over its lifetime
              float travelDistance = 35.0 + aOffset * 20.0;
              float stepSize = (age * travelDistance) / 4.0;
              
              vec3 pos = position;
              
              // Apply base rotation for the entire galaxy
              float angle = uTime * 0.05 + length(pos.xz) * 0.01;
              float s = sin(angle);
              float c = cos(angle);
              pos.xz = mat2(c, -s, s, c) * pos.xz;
              
              // 4-Step Euler Integration to follow the Curl Noise Flow Field
              // This creates incredibly complex, fluid, and mathematically organic movements
              for(int i = 0; i < 4; i++) {
                  vec3 v = curlNoise(pos * 0.03 + uTime * 0.05);
                  pos += v * stepSize;
              }
              
              // Add subtle interactive mouse repulsion
              vec3 mouseWorld = vec3(uMouse.x * 60.0, uMouse.y * 60.0, 0.0);
              float dMouse = distance(pos.xy, mouseWorld.xy);
              if(dMouse < 40.0) {
                  float force = pow((40.0 - dMouse) / 40.0, 2.0);
                  pos.xy += normalize(pos.xy - mouseWorld.xy) * force * 15.0;
                  pos.z += force * 10.0; // Push particles towards the camera slightly
              }
              
              // Morph/Transition based on scroll offset (explode outward slightly)
              float expansion = smoothstep(0.0, 1.0, uScrollOffset) * 20.0;
              pos += normalize(pos) * expansion * aOffset;

              vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
              gl_Position = projectionMatrix * mvPosition;
              
              // Smooth bell-curve fade in and out based on particle age
              float fade = sin(age * 3.14159265);
              vAlpha = fade * fade * 0.9;
              
              // Depth fade (fade out particles that are too close or too far)
              vAlpha *= smoothstep(200.0, 30.0, -mvPosition.z);
              
              // Dynamic point size scaling for depth perception
              gl_PointSize = (2.0 + aOffset * 2.5) * (80.0 / max(-mvPosition.z, 1.0));
            }
          `}
          fragmentShader={`
            varying vec3 vColor;
            varying float vAlpha;
            
            void main() {
              // Convert square point to a soft circle
              vec2 coord = gl_PointCoord - vec2(0.5);
              float dist = length(coord);
              if (dist > 0.5) discard;
              
              // Smooth gaussian-like gradient for a soft, glowing particle
              float alpha = (0.5 - dist) * 2.0;
              alpha = pow(alpha, 1.5);
              
              // Add a bright, hot white core to the center of each particle
              vec3 core = vec3(1.0) * pow(alpha, 3.0) * 0.5;
              
              gl_FragColor = vec4(vColor * alpha + core, vAlpha * alpha);
            }
          `}
        />
      </points>
    </group>
  );
}
