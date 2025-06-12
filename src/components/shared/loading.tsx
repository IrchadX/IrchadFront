import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Sphere, Ring } from "@react-three/drei";
import { Suspense, useRef, useState, useEffect } from "react";
import * as THREE from "three";

function FloatingParticles() {
  const particlesRef = useRef();
  const particles = useRef([]);

  useEffect(() => {
    // Create particle positions
    const positions = new Float32Array(50 * 3);
    for (let i = 0; i < 50; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    particles.current = positions;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.005;
      particlesRef.current.rotation.x += 0.002;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={50}
          array={particles.current}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#2B7A78" transparent opacity={0.6} />
    </points>
  );
}

function MorphingSphere() {
  const meshRef = useRef();
  const [scale, setScale] = useState(1);

  useFrame((state) => {
    if (meshRef.current) {
      // Morphing animation
      const time = state.clock.elapsedTime;
      meshRef.current.rotation.x = time * 0.3;
      meshRef.current.rotation.y = time * 0.5;

      // Breathing effect
      const breathe = 1 + Math.sin(time * 2) * 0.1;
      meshRef.current.scale.setScalar(breathe);

      // Color shifting
      const hue = (time * 0.1) % 1;
      meshRef.current.material.color.setHSL(0.48 + hue * 0.1, 0.6, 0.4);
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1, 2]} />
      <meshStandardMaterial
        color="#2B7A78"
        wireframe={false}
        transparent
        opacity={0.8}
        emissive="#2B7A78"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

function OrbitingRings() {
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();

  useFrame((state) => {
    if (ring1Ref.current && ring2Ref.current && ring3Ref.current) {
      const time = state.clock.elapsedTime;

      ring1Ref.current.rotation.x = time * 0.5;
      ring1Ref.current.rotation.z = time * 0.3;

      ring2Ref.current.rotation.y = time * 0.7;
      ring2Ref.current.rotation.x = time * 0.2;

      ring3Ref.current.rotation.z = time * 0.4;
      ring3Ref.current.rotation.y = time * 0.6;
    }
  });

  return (
    <group>
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2, 0.05, 8, 32]} />
        <meshStandardMaterial color="#2B7A78" transparent opacity={0.7} />
      </mesh>
      <mesh ref={ring2Ref}>
        <torusGeometry args={[2.5, 0.03, 8, 32]} />
        <meshStandardMaterial color="#17252A" transparent opacity={0.5} />
      </mesh>
      <mesh ref={ring3Ref}>
        <torusGeometry args={[1.8, 0.04, 8, 32]} />
        <meshStandardMaterial color="#3AAFA9" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

function PulsingText() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev === "...") return "";
        return prev + ".";
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-[#17252A] text-2xl font-bold tracking-wider">
      <span className="bg-gradient-to-r from-[#2B7A78] to-[#3AAFA9] bg-clip-text text-transparent">
        LOADING
      </span>
      <span className="text-[#2B7A78] ml-1 w-8 inline-block">{dots}</span>
    </div>
  );
}

function GlowingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 2));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-64 h-1 bg-opacity-20 rounded-full overflow-hidden mt-4">
      <div
        className="h-full bg-gradient-to-r from-[#2B7A78] to-[#3AAFA9] rounded-full transition-all duration-100 ease-out shadow-lg"
        style={{
          width: `${progress}%`,
          boxShadow: "0 0 10px #2B7A78, 0 0 20px #2B7A78, 0 0 30px #2B7A78",
        }}
      />
    </div>
  );
}

export default function LoadingSpinner() {
  return (
    <div className="w-full h-[30vh] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Subtle background animation */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#2B7A78] rounded-full animate-pulse blur-xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-[#3AAFA9] rounded-full animate-pulse blur-xl delay-500"></div>
      </div>

      <div className="w-60 h-60 mb-8 relative">
        <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            color="#FCFFFE"
          />
          <pointLight position={[-5, -5, -5]} intensity={0.5} color="#3AAFA9" />

          <Suspense
            fallback={
              <Html center>
                <div className="text-[#2B7A78]">Initializing...</div>
              </Html>
            }>
            <MorphingSphere />
            <OrbitingRings />
            <FloatingParticles />
          </Suspense>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={1}
            enableDamping
            dampingFactor={0.05}
          />
        </Canvas>
      </div>

      <div className="flex flex-col items-center space-y-3">
        <PulsingText />
        <GlowingProgressBar />

        <div className="text-[#17252A] text-sm opacity-70 mt-2 animate-fade-in">
          Preparing your experience
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 0.7;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 2s ease-out infinite alternate;
        }
      `}</style>
    </div>
  );
}
