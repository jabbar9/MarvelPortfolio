import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useAnimations, Trail, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { Group } from "three";
import { useScroll } from "framer-motion";

type IronManFlyingProps = {
  scrollContainer: React.RefObject<HTMLDivElement>;
};

const IronManFlying = ({ scrollContainer }: IronManFlyingProps) => {
  // Create a simplified Iron Man model for the flying animation
  const group = useRef<Group>(null);
  const { camera } = useThree();
  
  // Use scroll position to control Iron Man's flight path
  const { scrollYProgress } = useScroll({
    container: scrollContainer
  });
  
  // Target position for Iron Man
  const targetPosition = useRef(new THREE.Vector3(0, 0, 0));
  const currentVelocity = useRef(new THREE.Vector3(0, 0, 0));
  
  useFrame((state, delta) => {
    if (!group.current) return;
    
    // Calculate the scroll progress (0 to 1)
    const progress = scrollYProgress.get();
    
    // Make Iron Man fly along a path based on scroll
    const time = state.clock.getElapsedTime();
    
    // Path calculation
    // At start, Iron Man is center screen
    // As user scrolls, Iron Man flies in a gentle wave pattern
    const xPos = Math.sin(progress * Math.PI * 2) * 2; // Wave along X axis
    const yPos = 2 - progress * 4; // Move from top to bottom as user scrolls
    const zPos = -5 + Math.sin(time * 0.5) * 0.5; // Slight back and forth on Z
    
    targetPosition.current.set(xPos, yPos, zPos);
    
    // Smooth movement with velocity
    const acceleration = 0.8; // Adjust for responsiveness
    const damping = 0.8; // Adjust for smoothness
    
    const direction = new THREE.Vector3().subVectors(
      targetPosition.current,
      group.current.position
    );
    
    // Apply forces
    currentVelocity.current.add(
      direction.clone().multiplyScalar(acceleration * delta)
    );
    currentVelocity.current.multiplyScalar(damping);
    
    // Apply velocity to position
    group.current.position.add(currentVelocity.current);
    
    // Make Iron Man face the direction of movement with some lag
    if (currentVelocity.current.length() > 0.01) {
      const lookAtPos = group.current.position.clone().add(
        currentVelocity.current.clone().normalize()
      );
      group.current.lookAt(lookAtPos);
      
      // Tilt in the direction of movement
      group.current.rotation.z = -currentVelocity.current.x * 0.5;
    }
    
    // Add a slight wobble for flying effect
    group.current.rotation.x = Math.sin(time * 2) * 0.05;
    group.current.rotation.y = Math.cos(time * 1.5) * 0.05;
  });
  
  return (
    <group ref={group} position={[0, 2, -5]} scale={0.5}>
      {/* Simplified Iron Man model made with basic shapes */}
      <group>
        {/* Body */}
        <mesh castShadow>
          <capsuleGeometry args={[0.5, 1.2, 4, 8]} />
          <meshStandardMaterial color="#9E1B32" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Head */}
        <mesh castShadow position={[0, 1, 0]}>
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshStandardMaterial color="#9E1B32" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Eyes */}
        <mesh position={[0.15, 1.05, 0.3]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#F6BE00" emissive="#F6BE00" emissiveIntensity={2} />
        </mesh>
        <mesh position={[-0.15, 1.05, 0.3]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#F6BE00" emissive="#F6BE00" emissiveIntensity={2} />
        </mesh>
        
        {/* Arms */}
        <mesh castShadow position={[0.7, 0.2, 0]}>
          <capsuleGeometry args={[0.2, 1, 4, 8]} />
          <meshStandardMaterial color="#9E1B32" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh castShadow position={[-0.7, 0.2, 0]}>
          <capsuleGeometry args={[0.2, 1, 4, 8]} />
          <meshStandardMaterial color="#9E1B32" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Legs */}
        <mesh castShadow position={[0.3, -1, 0]}>
          <capsuleGeometry args={[0.25, 1, 4, 8]} />
          <meshStandardMaterial color="#9E1B32" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh castShadow position={[-0.3, -1, 0]}>
          <capsuleGeometry args={[0.25, 1, 4, 8]} />
          <meshStandardMaterial color="#9E1B32" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Chest Arc Reactor */}
        <mesh position={[0, 0.3, 0.5]}>
          <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
          <meshStandardMaterial color="#F6BE00" emissive="#F6BE00" emissiveIntensity={2} />
        </mesh>
      </group>
      
      {/* Hand repulsor trails */}
      <Trail 
        width={0.5}
        length={5}
        color={new THREE.Color("#F6BE00")}
        attenuation={(width) => width * 0.5}
      >
        <mesh position={[0.7, -0.3, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color="#F6BE00" transparent opacity={0.8} />
        </mesh>
      </Trail>
      
      <Trail 
        width={0.5}
        length={5}
        color={new THREE.Color("#F6BE00")}
        attenuation={(width) => width * 0.5}
      >
        <mesh position={[-0.7, -0.3, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color="#F6BE00" transparent opacity={0.8} />
        </mesh>
      </Trail>
      
      {/* Feet repulsor trails */}
      <Trail 
        width={0.5}
        length={8}
        color={new THREE.Color("#F6BE00")}
        attenuation={(width) => width * 0.5}
      >
        <mesh position={[0.3, -1.6, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshBasicMaterial color="#F6BE00" transparent opacity={0.8} />
        </mesh>
      </Trail>
      
      <Trail 
        width={0.5}
        length={8}
        color={new THREE.Color("#F6BE00")}
        attenuation={(width) => width * 0.5}
      >
        <mesh position={[-0.3, -1.6, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshBasicMaterial color="#F6BE00" transparent opacity={0.8} />
        </mesh>
      </Trail>
      
      {/* Sparkles for added effect */}
      <Sparkles 
        count={20}
        scale={[3, 3, 3]}
        size={0.4}
        speed={0.3}
        color="#F6BE00"
      />
      
      {/* Light to illuminate the model */}
      <pointLight position={[0, 0, 2]} intensity={1} color="#F6BE00" />
    </group>
  );
};

export default IronManFlying;
