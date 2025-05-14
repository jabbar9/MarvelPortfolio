import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import { useAudio } from "../lib/stores/useAudio";
import { 
  OrbitControls, 
  Stars, 
  Text, 
  useGLTF, 
  Environment, 
  ContactShadows,
  Float
} from "@react-three/drei";
import ParticleEffects from "./ParticleEffects";
import * as THREE from "three";
import { ChevronDown, Cpu, Database, FileCode, Terminal, Github, Linkedin } from "lucide-react";

// New Iron Man model from the generated file
const IronManModel = ({ scale = 2.5 }) => {
  const { scene } = useGLTF('/models/ironman.glb');
  const modelRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  
  // Handle cursor pointer and highlight effects
  useEffect(() => {
    document.body.style.cursor = hovered ? 'grab' : 'auto';
    return () => { document.body.style.cursor = 'auto'; };
  }, [hovered]);
  
  useEffect(() => {
    if (scene) {
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.castShadow = true;
          object.receiveShadow = true;
          if (object.material) {
            object.material.metalness = 0.9;
            object.material.roughness = 0.1;
          }
        }
      });
    }
  }, [scene]);
  
  // Pulsating effect for hover state
  useFrame((state) => {
    if (modelRef.current) {
      // Add subtle breathing animation
      const t = state.clock.getElapsedTime();
      modelRef.current.rotation.y = Math.sin(t / 4) * 0.2;
      
      if (hovered) {
        // Highlight effect when hovered
        const pulse = Math.sin(t * 3) * 0.05 + 1;
        modelRef.current.scale.set(scale * pulse, scale * pulse, scale * pulse);
      }
    }
  });
  
  return (
    <Float
      speed={2} // Animation speed
      rotationIntensity={0.2} // Rotation intensity
      floatIntensity={0.5} // Float intensity
    >
      <group 
        ref={modelRef} 
        scale={[scale, scale, scale]} 
        position={[0, -1, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <primitive object={scene} />
        
        {/* Lights to illuminate the model */}
        <pointLight
          position={[0, 1, 2]}
          intensity={2}
          color="#0a84ff"
          distance={5}
        />
        
        {/* Highlight glow when hovered */}
        {hovered && (
          <pointLight
            position={[0, 0, 2]}
            intensity={4}
            color="#0a84ff"
            distance={5}
          />
        )}
      </group>
    </Float>
  );
};

// Futuristic welcome circle animation
const WelcomeCircle = ({ delay = 0 }) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: [0, 0.2, 0.5, 0.2, 0] }}
      transition={{ 
        duration: 2,
        delay: delay,
        repeat: Infinity,
        repeatDelay: 3
      }}
      className="absolute rounded-full border border-[#0a84ff]/30"
      style={{
        width: `${100 + delay * 50}px`,
        height: `${100 + delay * 50}px`
      }}
    />
  );
};

const HeroSection = () => {
  const { playHit } = useAudio();
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Update time for Jarvis UI
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleDownloadResume = () => {
    playHit();
    // Open resume in a new tab
    window.open("/resume.pdf", "_blank");
  };

  const handleViewWork = () => {
    playHit();
    // Scroll to projects section
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  // Simulate typing terminal text
  const [terminalText, setTerminalText] = useState('');
  const fullText = '> Initializing personal frontend developer skillset\n> Loading React.js components... done\n> Loading Three.js engine... done\n> Loading UI/UX design skills... done\n> System ready';
  
  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      if (index < fullText.length) {
        setTerminalText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, 50);
    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="section hero-gradient flex flex-col items-center justify-center relative overflow-hidden jarvis-grid"
    >
      {/* Background particles */}
      <ParticleEffects count={80} />
      
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-8 z-10">
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          {/* Animated Welcome Circles */}
          <div className="relative flex items-center justify-center lg:justify-start mb-4">
            <WelcomeCircle delay={0} />
            <WelcomeCircle delay={0.5} />
            <WelcomeCircle delay={1} />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="relative z-10 bg-black/40 backdrop-blur-sm px-3 py-2 rounded-md border border-[#0a84ff]/30 text-xs font-mono text-[#0a84ff]"
            >
              JARVIS SYSTEM INITIALIZED
            </motion.div>
          </div>
          
          <motion.h1 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
          >
            <span className="text-white">Hi, I'm </span>
            <span className="text-gradient">John Doe</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl mb-8 text-gray-300 font-light"
          >
            Web Developer | UI/UX Enthusiast | Creative Technologist
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <button 
              onClick={handleViewWork}
              className="jarvis-button primary group w-full sm:w-auto py-3 px-8 flex items-center justify-center space-x-2"
            >
              <FileCode size={18} />
              <span>View My Work</span>
            </button>
            
            <button 
              onClick={handleDownloadResume}
              className="jarvis-button w-full sm:w-auto py-3 px-8 flex items-center justify-center space-x-2"
            >
              <Terminal size={18} />
              <span>Download Resume</span>
            </button>
          </motion.div>
          
          {/* Terminal window */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-8 hidden lg:block"
          >
            <div className="hud-element p-4 relative overflow-hidden bg-black/70">
              <div className="hud-corner hud-corner-tl"></div>
              <div className="hud-corner hud-corner-tr"></div>
              <div className="hud-corner hud-corner-bl"></div>
              <div className="hud-corner hud-corner-br"></div>
              
              <div className="flex items-center mb-2 space-x-1">
                <div className="w-3 h-3 rounded-full bg-red-500 opacity-50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 opacity-50"></div>
                <div className="flex-1 text-center text-xs text-white/50 font-mono">terminal</div>
              </div>
              
              <pre className="text-xs text-[#0a84ff] font-mono whitespace-pre-wrap">
                {terminalText}
                <span className="inline-block w-2 h-4 bg-white/70 ml-1 animate-pulse"></span>
              </pre>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="w-full lg:w-1/2 h-[450px] md:h-[600px] relative perspective jarvis-scan"
        >
          <div className="w-full h-full hud-element border border-[#0a84ff]/30 rounded overflow-hidden">
            <Canvas 
              camera={{ position: [0, 0, 3.5], fov: 40 }} 
              shadows
              dpr={[1, 2]} // Better render quality
              gl={{ 
                antialias: true,
                alpha: true,
                powerPreference: 'high-performance'
              }}
            >
              <color attach="background" args={["#000000"]} />
              <fog attach="fog" args={['#000000', 5, 20]} />
              <ambientLight intensity={0.2} />
              <spotLight position={[5, 5, 5]} angle={0.15} penumbra={1} intensity={0.8} castShadow />
              
              <Suspense fallback={null}>
                {/* Environment creates a more realistic scene with reflections */}
                <Environment preset="city" />
                
                {/* The main 3D model */}
                <IronManModel scale={2.5} />
                
                {/* Floor shadow */}
                <ContactShadows
                  opacity={0.4}
                  scale={5}
                  blur={2.5}
                  far={2}
                  resolution={256}
                  color="#0a84ff"
                />
                
                {/* Interactive controls */}
                <OrbitControls 
                  enableZoom={false}
                  enablePan={false}
                  minPolarAngle={Math.PI / 4}
                  maxPolarAngle={Math.PI / 1.8}
                  rotateSpeed={0.5}
                  dampingFactor={0.1}
                  enableDamping={true}
                />
                
                {/* Background stars */}
                <Stars radius={100} depth={50} count={3000} factor={5} fade speed={1} />
              </Suspense>
            </Canvas>
            
            {/* Scanning animation overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a84ff]/5 to-transparent pointer-events-none" style={{
              animation: 'scan 4s ease-in-out infinite',
              backgroundSize: '100% 5px',
              zIndex: 10
            }}></div>
            
            {/* Grid overlay for tech effect */}
            <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-20"></div>
          </div>
          
          {/* HUD elements around the 3D model */}
          <div className="absolute top-5 right-5 hud-element px-3 py-1 text-xs z-10 backdrop-blur-sm">
            <div className="hud-corner hud-corner-tl"></div>
            <div className="hud-corner hud-corner-tr"></div>
            <div className="hud-corner hud-corner-bl"></div>
            <div className="hud-corner hud-corner-br"></div>
            <div className="flex items-center space-x-2">
              <Cpu size={12} className="text-[#0a84ff]" />
              <span className="text-[#0a84ff]">MODEL: MARK 42</span>
            </div>
          </div>
          
          <div className="absolute bottom-5 left-5 hud-element px-3 py-1 text-xs z-10 backdrop-blur-sm">
            <div className="hud-corner hud-corner-tl"></div>
            <div className="hud-corner hud-corner-tr"></div>
            <div className="hud-corner hud-corner-bl"></div>
            <div className="hud-corner hud-corner-br"></div>
            <div className="flex items-center space-x-2">
              <Database size={12} className="text-[#0a84ff]" />
              <span className="text-[#0a84ff]">INTERACTIVE MODEL</span>
            </div>
          </div>
          
          {/* Social links in futuristic style */}
          <div className="absolute top-5 left-5 flex space-x-2 z-10">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-black/50 border border-[#0a84ff]/30 text-[#0a84ff] hover:bg-[#0a84ff]/20 hover:border-[#0a84ff] transition-all duration-300 backdrop-blur-sm"
            >
              <Github size={16} />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-black/50 border border-[#0a84ff]/30 text-[#0a84ff] hover:bg-[#0a84ff]/20 hover:border-[#0a84ff] transition-all duration-300 backdrop-blur-sm"
            >
              <Linkedin size={16} />
            </a>
          </div>
          
          <div className="absolute bottom-5 right-5 px-2 py-1 bg-black/40 backdrop-blur-sm rounded border border-[#0a84ff]/20 text-xs font-mono text-[#0a84ff]/80 z-10">
            {currentTime.toLocaleTimeString('en-US', { hour12: false })}
          </div>
          
          {/* Interactive hint */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap px-3 py-1 text-sm text-[#0a84ff] font-mono bg-black/50 backdrop-blur-sm border border-[#0a84ff]/30 rounded-full z-10 pointer-events-none"
            style={{ animationName: 'fadeInOut', animationDuration: '3s', animationIterationCount: 2 }}
          >
            Click and drag to interact
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/60"
      >
        <p className="text-xs font-mono text-[#0a84ff]/80 mb-2">SCROLL DOWN TO EXPLORE</p>
        <div className="w-8 h-8 rounded-full flex items-center justify-center border border-[#0a84ff]/30 bg-black/30 animate-bounce">
          <ChevronDown size={16} className="text-[#0a84ff]" />
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
