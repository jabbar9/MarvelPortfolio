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

  // Terminal state variables
  const [terminalText, setTerminalText] = useState('');
  const [isLoadingPackages, setIsLoadingPackages] = useState(false);
  const [loadedPackages, setLoadedPackages] = useState<string[]>([]);
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  
  const fullText = '> Initializing personal frontend developer skillset\n> Loading React.js components... done\n> Loading Three.js engine... done\n> Loading UI/UX design skills... done\n> System ready';
  
  // List of packages for simulated npm install
  const packagesToInstall = [
    'react-three-fiber', 
    'three', 
    'framer-motion', 
    'tailwindcss', 
    'gsap', 
    'typescript',
    'drei',
    'zustand',
    'react-query',
    'vitejs'
  ];
  
  // Initial typing animation
  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      if (index < fullText.length) {
        setTerminalText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(intervalId);
        // Start package loading animation after initial text is done
        setIsLoadingPackages(true);
      }
    }, 30);
    
    return () => clearInterval(intervalId);
  }, []);
  
  // Continuous package loading animation
  useEffect(() => {
    if (!isLoadingPackages) return;
    
    let packageIndex = 0;
    let percentage = 0;
    
    const intervalId = setInterval(() => {
      if (packageIndex < packagesToInstall.length) {
        // Add next package
        setLoadedPackages(prev => [...prev, packagesToInstall[packageIndex]]);
        packageIndex++;
        percentage = Math.floor((packageIndex / packagesToInstall.length) * 100);
        setLoadingPercentage(percentage);
      } else {
        // Reset to start over with loading animation
        setLoadedPackages([]);
        packageIndex = 0;
        setLoadingPercentage(0);
      }
    }, 800);
    
    return () => clearInterval(intervalId);
  }, [isLoadingPackages]);

  return (
    <div 
      ref={containerRef}
      className="section hero-gradient flex flex-col items-center justify-center relative overflow-hidden jarvis-grid"
    >
      {/* Background particles */}
      <ParticleEffects count={80} />
      
      <div className="container mx-auto px-4 mt-16 md:mt-0 relative z-10 min-h-[80vh] flex flex-col lg:flex-row items-center justify-between">
        {/* Left side - Text Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0">
          {/* Animated Welcome Circles */}
          <div className="relative flex items-center justify-center lg:justify-start mb-4">
            <WelcomeCircle delay={0} />
            <WelcomeCircle delay={0.5} />
            <WelcomeCircle delay={1} />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="relative z-10 bg-black/60 backdrop-blur-md px-3 py-2 rounded-md border border-[#0a84ff]/50 text-xs font-mono text-[#0a84ff]"
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
          
          {/* Terminal window with continuous text animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-8 hidden lg:block max-w-[90%]"
          >
            <div className="hud-element p-4 relative overflow-hidden bg-black/80 border border-[#0a84ff]/60">
              <div className="hud-corner hud-corner-tl"></div>
              <div className="hud-corner hud-corner-tr"></div>
              <div className="hud-corner hud-corner-bl"></div>
              <div className="hud-corner hud-corner-br"></div>
              
              <div className="flex items-center mb-2 space-x-1">
                <div className="w-3 h-3 rounded-full bg-red-500 opacity-70"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-70"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 opacity-70"></div>
                <div className="flex-1 text-center text-xs text-white/70 font-mono">terminal@jarvis:~</div>
              </div>
              
              <div className="h-48 overflow-auto terminal-scroll">
                <div className="text-xs text-[#0a84ff] font-mono whitespace-pre-wrap">
                  {/* Initial system messages */}
                  {terminalText}
                  
                  {/* Command prompt after initialization */}
                  {terminalText.length === fullText.length && (
                    <div className="mt-3">
                      <span className="text-green-400">➜</span> <span className="text-purple-400">~/projects</span> <span className="text-white">npm install --save-dev</span>
                      
                      {/* Package loading simulation */}
                      {isLoadingPackages && (
                        <div className="mt-1">
                          <div className="text-gray-400 mb-1">
                            Installing packages... {loadingPercentage}%
                          </div>
                          
                          {/* Progress bar */}
                          <div className="w-full h-1 bg-gray-800 rounded-full mt-1 mb-2">
                            <div 
                              className="h-full bg-[#0a84ff] rounded-full"
                              style={{ width: `${loadingPercentage}%`, transition: 'width 0.3s ease' }}
                            ></div>
                          </div>
                          
                          {/* Package list with animations */}
                          <div className="grid grid-cols-2 gap-x-2">
                            {loadedPackages.map((pkg, idx) => (
                              <div key={`${pkg}-${idx}`} className="text-green-400 flex items-center">
                                <span className="text-xs mr-1">✓</span> {pkg}
                              </div>
                            ))}
                            
                            {/* Current loading package with blinking animation */}
                            {loadedPackages.length < packagesToInstall.length && (
                              <div className="text-yellow-400 animate-pulse flex items-center">
                                <span className="text-xs mr-1">⟳</span> {packagesToInstall[loadedPackages.length]}
                              </div>
                            )}
                          </div>
                          
                          {loadedPackages.length === packagesToInstall.length && (
                            <div className="text-green-400 mt-1">
                              All packages installed successfully!
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Git operations */}
                  <div className="mt-3">
                    <span className="text-green-400">➜</span> <span className="text-purple-400">~/projects</span> <span className="text-white">git commit -m "feat: add 3D model integration"</span>
                    <div className="text-gray-400 mt-1">[main 42f8b3d] feat: add 3D model integration</div>
                  </div>
                  
                  {/* System scanning */}
                  <div className="mt-3">
                    <span className="text-green-400">➜</span> <span className="text-purple-400">~/projects</span> <span className="text-white">scanning system...</span>
                    <div className="text-[#0a84ff] mt-1 terminal-scanning">
                      Analyzing components...<br/>
                      Optimizing render pipeline...<br/>
                      System ready.
                    </div>
                  </div>
                  
                  {/* Command prompt */}
                  <div className="mt-3 flex items-center">
                    <span className="text-green-400">➜</span> <span className="text-purple-400">~/projects</span> <span className="text-white ml-1">_</span>
                    <span className="inline-block w-2 h-4 bg-white/70 ml-1 animate-pulse"></span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Social links in futuristic style */}
          <div className="flex space-x-2 mt-8 justify-center lg:justify-start">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-black/70 border border-[#0a84ff]/50 text-[#0a84ff] hover:bg-[#0a84ff]/20 hover:border-[#0a84ff] transition-all duration-300 backdrop-blur-md"
            >
              <Github size={18} />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-black/70 border border-[#0a84ff]/50 text-[#0a84ff] hover:bg-[#0a84ff]/20 hover:border-[#0a84ff] transition-all duration-300 backdrop-blur-md"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>
        
        {/* Right side - 3D Model - larger container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="w-full lg:w-5/8 h-[500px] md:h-[700px] relative"
        >
          {/* 3D model container with interactive framing */}
          <div className="absolute inset-0 rounded-xl overflow-hidden hud-element border border-[#0a84ff]/50">
            <div className="hud-corner hud-corner-tl"></div>
            <div className="hud-corner hud-corner-tr"></div>
            <div className="hud-corner hud-corner-bl"></div>
            <div className="hud-corner hud-corner-br"></div>
            
            {/* The model canvas */}
            <Canvas 
              camera={{ position: [0, 0, 3], fov: 45 }} 
              shadows
              dpr={[1, 2]}
              gl={{ 
                antialias: true,
                alpha: true,
                powerPreference: 'high-performance'
              }}
              className="touch-auto"
            >
              <color attach="background" args={["#000011"]} />
              <fog attach="fog" args={['#000033', 5, 15]} />
              <ambientLight intensity={0.3} />
              <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={1} castShadow />
              <pointLight position={[-5, 5, 5]} intensity={0.5} color="#0a84ff" />
              
              <Suspense fallback={null}>
                {/* Environment creates a more realistic scene with reflections */}
                <Environment preset="night" />
                
                {/* The main 3D model - bigger scale */}
                <IronManModel scale={4} />
                
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
                  enableZoom={true}
                  maxZoom={1.5}
                  minZoom={0.8}
                  enablePan={false}
                  minPolarAngle={Math.PI / 6}
                  maxPolarAngle={Math.PI / 1.5}
                  rotateSpeed={0.5}
                  dampingFactor={0.1}
                  enableDamping={true}
                  autoRotate={false}
                />
                
                {/* Background stars */}
                <Stars radius={100} depth={50} count={2000} factor={4} fade speed={1} />
              </Suspense>
            </Canvas>
            
            {/* Overlay effects */}
            <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-20"></div>
            <div className="absolute inset-0 pointer-events-none" style={{
              background: 'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.4) 100%)'
            }}></div>
            
            {/* Scanning effect */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                className="absolute inset-x-0 h-[2px] bg-[#0a84ff]/40"
                animate={{ top: ['-10%', '110%'] }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatType: "loop"
                }}
              />
            </div>
            
            {/* Status and controls */}
            <div className="absolute top-4 right-4 hud-element px-3 py-1 text-xs backdrop-blur-sm">
              <div className="flex items-center space-x-2">
                <Cpu size={12} className="text-[#0a84ff]" />
                <span className="text-[#0a84ff]">MODEL: MARK 42</span>
              </div>
            </div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hud-element px-4 py-2 text-base backdrop-blur-md border-2 border-[#0a84ff]/70 z-10">
              <div className="flex items-center space-x-3">
                <Database size={20} className="text-[#0a84ff]" />
                <span className="text-[#0a84ff] font-bold tracking-wide">DRAG TO ROTATE MODEL</span>
              </div>
            </div>
            
            <div className="absolute top-4 left-4 px-2 py-1 bg-black/40 backdrop-blur-sm rounded border border-[#0a84ff]/20 text-xs font-mono text-[#0a84ff]/80">
              {currentTime.toLocaleTimeString('en-US', { hour12: false })}
            </div>
            
            {/* Interactive hint tooltip */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 1, 1, 0],
                y: [0, -5, -5, 0]
              }}
              transition={{ 
                duration: 3,
                times: [0, 0.3, 0.7, 1],
                repeat: 2,
                delay: 1
              }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 text-sm text-white bg-[#0a84ff]/20 backdrop-blur-md border border-[#0a84ff]/50 rounded-md pointer-events-none z-10"
            >
              <div className="flex items-center space-x-2">
                <span className="text-[#0a84ff]">↖</span>
                <span className="font-mono">Click and drag to interact</span>
                <span className="text-[#0a84ff]">↗</span>
              </div>
            </motion.div>
          </div>
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
