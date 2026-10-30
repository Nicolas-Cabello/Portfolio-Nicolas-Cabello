import { Canvas } from '@react-three/fiber';
import { Float } from '@react-three/drei';

function Shapes() {
  return (
    <>
      <Float speed={1.4} rotationIntensity={0.7} floatIntensity={0.8}>
        <mesh position={[-2.4, 0.8, 0]}>
          <icosahedronGeometry args={[0.48, 0]} />
          <meshStandardMaterial color="#7c3aed" wireframe />
        </mesh>
      </Float>
      <Float speed={1.1} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[2.3, -0.4, -0.4]}>
          <torusGeometry args={[0.38, 0.12, 12, 24]} />
          <meshStandardMaterial color="#06b6d4" wireframe />
        </mesh>
      </Float>
      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={0.6}>
        <mesh position={[1.5, 1.3, -0.8]}>
          <boxGeometry args={[0.42, 0.42, 0.42]} />
          <meshStandardMaterial color="#3b82f6" wireframe />
        </mesh>
      </Float>
    </>
  );
}

const FloatingObjects = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
    >
      <ambientLight intensity={0.7} />
      <pointLight position={[3, 2, 3]} color="#8b5cf6" intensity={20} />
      <Shapes />
    </Canvas>
  );
};

export default FloatingObjects;
