import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useAudio } from '../lib/stores/useAudio';

type IronManModelProps = {
  position?: [number, number, number];
  scale?: number;
};

const IronManModel = ({ position = [0, 0, 0], scale = 1 }: IronManModelProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const { playHit } = useAudio();
  const [hovered, setHovered] = useState(false);
  const [rotating, setRotating] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const rotationSpeed = useRef({ x: 0, y: 0 });
  
  // Material refs for reactive updates
  const redMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const goldMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const glowMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  
  // Create materials
  useEffect(() => {
    if (redMaterialRef.current) {
      redMaterialRef.current.color = new THREE.Color('#9E1B32');
      redMaterialRef.current.metalness = 0.9;
      redMaterialRef.current.roughness = 0.1;
    }
    
    if (goldMaterialRef.current) {
      goldMaterialRef.current.color = new THREE.Color('#F6BE00');
      goldMaterialRef.current.metalness = 0.9;
      goldMaterialRef.current.roughness = 0.1;
    }
    
    if (glowMaterialRef.current) {
      glowMaterialRef.current.color = new THREE.Color('#F6BE00');
      glowMaterialRef.current.emissive = new THREE.Color('#F6BE00');
      glowMaterialRef.current.emissiveIntensity = 2;
    }
  }, []);
  
  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    // Apply auto-rotation when enabled
    if (autoRotate) {
      groupRef.current.rotation.y += delta * 0.5;
    } else if (rotating) {
      // Apply momentum-based rotation when manually rotating
      groupRef.current.rotation.y += rotationSpeed.current.x * delta * 5;
      groupRef.current.rotation.x += rotationSpeed.current.y * delta * 5;
      
      // Dampen rotation speed over time
      rotationSpeed.current.x *= 0.95;
      rotationSpeed.current.y *= 0.95;
      
      // If rotation speed is very low, stop rotating
      if (
        Math.abs(rotationSpeed.current.x) < 0.001 && 
        Math.abs(rotationSpeed.current.y) < 0.001
      ) {
        setRotating(false);
        setAutoRotate(true);
      }
    }
    
    // Make the arc reactor and eyes pulse
    const pulseFactor = Math.sin(state.clock.getElapsedTime() * 3) * 0.2 + 0.8;
    
    // Update the glow material's emission intensity
    if (glowMaterialRef.current) {
      glowMaterialRef.current.emissiveIntensity = 2 * pulseFactor;
    }
  });
  
  const handlePointerDown = (e: THREE.Event) => {
    e.stopPropagation();
    setAutoRotate(false);
    if (e.nativeEvent instanceof PointerEvent) {
      lastMousePos.current.x = e.nativeEvent.clientX;
      lastMousePos.current.y = e.nativeEvent.clientY;
    }
    playHit();
  };
  
  const handlePointerUp = (e: THREE.Event) => {
    e.stopPropagation();
    setRotating(true);
  };
  
  const handlePointerMove = (e: THREE.Event) => {
    e.stopPropagation();
    if (!autoRotate && !rotating && groupRef.current && e.nativeEvent instanceof PointerEvent) {
      // Calculate rotation based on mouse movement
      const deltaX = e.nativeEvent.clientX - lastMousePos.current.x;
      const deltaY = e.nativeEvent.clientY - lastMousePos.current.y;
      
      groupRef.current.rotation.y += deltaX * 0.01;
      groupRef.current.rotation.x += deltaY * 0.01;
      
      // Limit vertical rotation to prevent model flipping
      groupRef.current.rotation.x = Math.max(
        -Math.PI / 4, 
        Math.min(Math.PI / 4, groupRef.current.rotation.x)
      );
      
      // Set rotation speed for momentum
      rotationSpeed.current.x = deltaX * 0.01;
      rotationSpeed.current.y = deltaY * 0.01;
      
      lastMousePos.current.x = e.nativeEvent.clientX;
      lastMousePos.current.y = e.nativeEvent.clientY;
    }
  };
  
  return (
    <group 
      ref={groupRef} 
      position={[position[0], position[1], position[2]]} 
      scale={scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
      dispose={null}
    >
      {/* Main Body Parts */}
      <group>
        {/* Head */}
        <mesh castShadow receiveShadow position={[0, 1.6, 0]}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial 
            ref={redMaterialRef as any} 
            color="#9E1B32" 
            metalness={0.9} 
            roughness={0.1}
          />
        </mesh>
        
        {/* Face Plate */}
        <mesh castShadow receiveShadow position={[0, 1.6, 0.2]}>
          <sphereGeometry args={[0.38, 32, 32, 0, Math.PI, 0, Math.PI / 2]} />
          <meshStandardMaterial 
            ref={goldMaterialRef as any} 
            color="#F6BE00" 
            metalness={0.9} 
            roughness={0.1}
          />
        </mesh>
        
        {/* Eyes */}
        <mesh position={[0.15, 1.7, 0.3]}>
          <boxGeometry args={[0.1, 0.05, 0.05]} />
          <meshStandardMaterial 
            ref={glowMaterialRef as any} 
            color="#F6BE00" 
            emissive="#F6BE00" 
            emissiveIntensity={2}
          />
        </mesh>
        
        <mesh position={[-0.15, 1.7, 0.3]}>
          <boxGeometry args={[0.1, 0.05, 0.05]} />
          <meshStandardMaterial 
            color="#F6BE00" 
            emissive="#F6BE00" 
            emissiveIntensity={2}
          />
        </mesh>
        
        {/* Torso */}
        <mesh castShadow receiveShadow position={[0, 0.9, 0]}>
          <capsuleGeometry args={[0.5, 0.8, 8, 16]} />
          <meshStandardMaterial 
            color="#9E1B32" 
            metalness={0.9} 
            roughness={0.1}
          />
        </mesh>
        
        {/* Arc Reactor */}
        <mesh position={[0, 1.1, 0.4]}>
          <cylinderGeometry args={[0.15, 0.15, 0.05, 32]} />
          <meshStandardMaterial 
            color="#F6BE00" 
            emissive="#F6BE00" 
            emissiveIntensity={3}
          />
        </mesh>
        
        {/* Shoulders */}
        <mesh castShadow receiveShadow position={[-0.5, 1.2, 0]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial 
            color="#9E1B32" 
            metalness={0.9} 
            roughness={0.1}
          />
        </mesh>
        
        <mesh castShadow receiveShadow position={[0.5, 1.2, 0]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial 
            color="#9E1B32" 
            metalness={0.9} 
            roughness={0.1}
          />
        </mesh>
        
        {/* Arms */}
        {/* Left Arm */}
        <mesh castShadow receiveShadow position={[-0.65, 0.9, 0]}>
          <capsuleGeometry args={[0.15, 0.5, 4, 16]} />
          <meshStandardMaterial 
            color="#9E1B32" 
            metalness={0.9} 
            roughness={0.1}
          />
        </mesh>
        
        <mesh castShadow receiveShadow position={[-0.75, 0.4, 0]}>
          <capsuleGeometry args={[0.12, 0.4, 4, 16]} />
          <meshStandardMaterial 
            color="#F6BE00" 
            metalness={0.9} 
            roughness={0.1}
          />
        </mesh>
        
        {/* Right Arm */}
        <mesh castShadow receiveShadow position={[0.65, 0.9, 0]}>
          <capsuleGeometry args={[0.15, 0.5, 4, 16]} />
          <meshStandardMaterial 
            color="#9E1B32" 
            metalness={0.9} 
            roughness={0.1}
          />
        </mesh>
        
        <mesh castShadow receiveShadow position={[0.75, 0.4, 0]}>
          <capsuleGeometry args={[0.12, 0.4, 4, 16]} />
          <meshStandardMaterial 
            color="#F6BE00" 
            metalness={0.9} 
            roughness={0.1}
          />
        </mesh>
        
        {/* Hand Repulsors */}
        <mesh position={[-0.75, 0.1, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial 
            color="#F6BE00" 
            emissive="#F6BE00" 
            emissiveIntensity={1}
          />
        </mesh>
        
        <mesh position={[0.75, 0.1, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial 
            color="#F6BE00" 
            emissive="#F6BE00" 
            emissiveIntensity={1}
          />
        </mesh>
        
        {/* Legs */}
        {/* Left Leg */}
        <mesh castShadow receiveShadow position={[-0.3, 0, 0]}>
          <capsuleGeometry args={[0.2, 0.8, 4, 16]} />
          <meshStandardMaterial 
            color="#9E1B32" 
            metalness={0.9} 
            roughness={0.1}
          />
        </mesh>
        
        <mesh castShadow receiveShadow position={[-0.3, -0.6, 0]}>
          <capsuleGeometry args={[0.15, 0.6, 4, 16]} />
          <meshStandardMaterial 
            color="#F6BE00" 
            metalness={0.9} 
            roughness={0.1}
          />
        </mesh>
        
        {/* Right Leg */}
        <mesh castShadow receiveShadow position={[0.3, 0, 0]}>
          <capsuleGeometry args={[0.2, 0.8, 4, 16]} />
          <meshStandardMaterial 
            color="#9E1B32" 
            metalness={0.9} 
            roughness={0.1}
          />
        </mesh>
        
        <mesh castShadow receiveShadow position={[0.3, -0.6, 0]}>
          <capsuleGeometry args={[0.15, 0.6, 4, 16]} />
          <meshStandardMaterial 
            color="#F6BE00" 
            metalness={0.9} 
            roughness={0.1}
          />
        </mesh>
        
        {/* Foot Repulsors */}
        <mesh position={[-0.3, -1.1, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial 
            color="#F6BE00" 
            emissive="#F6BE00" 
            emissiveIntensity={1}
          />
        </mesh>
        
        <mesh position={[0.3, -1.1, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial 
            color="#F6BE00" 
            emissive="#F6BE00" 
            emissiveIntensity={1}
          />
        </mesh>
        
        {/* Details - Flight Stabilizers */}
        <mesh position={[0, 0.6, -0.4]}>
          <boxGeometry args={[0.4, 0.2, 0.1]} />
          <meshStandardMaterial 
            color="#9E1B32" 
            metalness={0.9} 
            roughness={0.1}
          />
        </mesh>
        
        {/* Helmet Details */}
        <mesh position={[0, 1.6, 0.4]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.3, 8]} />
          <meshStandardMaterial 
            color="#F6BE00" 
            metalness={0.9} 
            roughness={0.1}
          />
        </mesh>
      </group>
      
      {/* Hover effect - subtle glow when hovered */}
      {hovered && (
        <pointLight 
          position={[0, 0, 2]} 
          intensity={1} 
          color="#F6BE00" 
          distance={5}
        />
      )}
      
      {/* Permanent subtle lighting */}
      <pointLight 
        position={[0, 1.1, 1]} 
        intensity={0.6} 
        color="#F6BE00" 
        distance={3}
      />
      
      {/* Environment light */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
    </group>
  );
};

export default IronManModel;
