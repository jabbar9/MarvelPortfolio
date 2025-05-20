import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { useAudio } from '../lib/stores/useAudio';

type GLTFResult = GLTF & {
  nodes: {
    [key: string]: THREE.Mesh;
  };
  materials: {
    [key: string]: THREE.Material;
  };
};

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
  
  // Use our own simplified model since we don't have access to a real Iron Man model
  // This will create a simplified Iron Man using basic geometries
  
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
    
    // We would update material emissiveIntensity here if we had actual materials
  });
  
  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    setAutoRotate(false);
    lastMousePos.current.x = e.clientX;
    lastMousePos.current.y = e.clientY;
    playHit();
  };
  
  const handlePointerUp = (e: React.PointerEvent) => {
    e.stopPropagation();
    setRotating(true);
  };
  
  const handlePointerMove = (e: React.PointerEvent) => {
    e.stopPropagation();
    if (!autoRotate && !rotating && groupRef.current) {
      // Calculate rotation based on mouse movement
      const deltaX = e.clientX - lastMousePos.current.x;
      const deltaY = e.clientY - lastMousePos.current.y;
      
      groupRef.current.rotation.y += deltaX * 0.01;
      groupRef.current.rotation.x += deltaY * 0.01;
      
      // Set rotation speed for momentum
      rotationSpeed.current.x = deltaX * 0.01;
      rotationSpeed.current.y = deltaY * 0.01;
      
      lastMousePos.current.x = e.clientX;
      lastMousePos.current.y = e.clientY;
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
      {/* Main Body Parts (simplified version) */}
      <group>
        {/* Head */}
        <mesh castShadow receiveShadow position={[0, 1.6, 0]}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial 
            color="#9E1B32" 
            metalness={0.9} 
            roughness={0.1}
          />
        </mesh>
        
        {/* Face Plate */}
        <mesh castShadow receiveShadow position={[0, 1.6, 0.2]}>
          <sphereGeometry args={[0.38, 32, 32, 0, Math.PI, 0, Math.PI / 2]} />
          <meshStandardMaterial 
            color="#F6BE00" 
            metalness={0.9} 
            roughness={0.1}
          />
        </mesh>
        
        {/* Eyes */}
        <mesh position={[0.15, 1.7, 0.3]}>
          <boxGeometry args={[0.1, 0.05, 0.05]} />
          <meshStandardMaterial 
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
      </group>
      
      {/* Point light to enhance the glowing effect */}
      <pointLight 
        position={[0, 1.1, 1]} 
        intensity={1} 
        color="#F6BE00" 
        distance={5}
      />
    </group>
  );
};

export default IronManModel;
