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
  Float,
  Html,
} from "@react-three/drei";
import ParticleEffects from "./ParticleEffects";
import * as THREE from "three";
import {
  ChevronDown,
  Cpu,
  Database,
  FileCode,
  Terminal,
  Github,
  Linkedin,
} from "lucide-react";
import JarvisUI from "./JarvisUI";

// Type defintion for model props
type IronManModelProps = {
  scale?: number;
  position?: [number, number, number];
};

// New Iron Man model from the generated file - increased scale and improved lighting
const IronManModel = ({
  scale = 5,
  position = [0, -1, 0],
}: IronManModelProps) => {
  const { scene } = useGLTF("/models/ironman.glb");
  const modelRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Handle cursor pointer and highlight effects
  useEffect(() => {
    document.body.style.cursor = hovered ? "grab" : "auto";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered]);

  // Enhance model materials
  useEffect(() => {
    if (scene) {
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.castShadow = true;
          object.receiveShadow = true;
          if (object.material) {
            object.material.metalness = 0.9;
            object.material.roughness = 0.1;
            // Enhance reflections for more dramatic look
            object.material.envMapIntensity = 2;
          }
        }
      });
    }
  }, [scene]);

  // Smoother animation for the model
  useFrame((state) => {
    if (modelRef.current) {
      // Gentle floating motion
      const t = state.clock.getElapsedTime();
      modelRef.current.rotation.y = Math.sin(t / 6) * 0.15;

      // Subtle up/down movement
      const floatY = Math.sin(t / 3) * 0.1;
      modelRef.current.position.y = position[1] + floatY;

      if (hovered) {
        // Highlight effect when hovered
        const pulse = Math.sin(t * 3) * 0.03 + 1;
        modelRef.current.scale.set(scale * pulse, scale * pulse, scale * pulse);
      }
    }
  });

  return (
    <group>
      <Float
        speed={1.5} // Animation speed
        rotationIntensity={0.1} // Rotation intensity
        floatIntensity={0.3} // Float intensity
      >
        <group
          ref={modelRef}
          scale={[scale, scale, scale]}
          position={position}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <primitive object={scene} />

          {/* Enhanced lighting to make model pop */}
          <pointLight
            position={[0, 1, 2]}
            intensity={3}
            color="#0a84ff"
            distance={7}
          />

          <pointLight
            position={[-2, 0, 1]}
            intensity={1.5}
            color="#ffffff"
            distance={7}
          />

          {/* Highlight glow when hovered */}
          {hovered && (
            <>
              <pointLight
                position={[0, 0, 2]}
                intensity={5}
                color="#0a84ff"
                distance={7}
              />
              <pointLight
                position={[0, 2, 0]}
                intensity={3}
                color="#0a84ff"
                distance={5}
              />
            </>
          )}
        </group>
      </Float>

      {/* Rotating holographic elements around the model */}
      <group position={position}>
        <HolographicRing radius={1.5} height={4} />
      </group>
    </group>
  );
};

// Type definition for ring props
type HolographicRingProps = {
  radius?: number;
  height?: number;
};

// Holographic ring that rotates around the model
const HolographicRing = ({
  radius = 1.5,
  height = 3,
}: HolographicRingProps) => {
  const ringRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ringRef.current) {
      // Constant rotation animation
      ringRef.current.rotation.y += 0.003;
    }
  });

  return (
    <group ref={ringRef}>
      <mesh>
        <cylinderGeometry args={[radius, radius, height, 32, 1, true]} />
        <meshBasicMaterial
          color="#0a84ff"
          opacity={0.1}
          transparent={true}
          wireframe={true}
        />
      </mesh>
    </group>
  );
};

// Type definition for welcome circle props
type WelcomeCircleProps = {
  delay?: number;
};

// Futuristic welcome circle animation
const WelcomeCircle = ({ delay = 0 }: WelcomeCircleProps) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: [0, 0.2, 0.5, 0.2, 0] }}
      transition={{
        duration: 2,
        delay: delay,
        repeat: Infinity,
        repeatDelay: 3,
      }}
      className="absolute rounded-full border border-[#0a84ff]/30"
      style={
        {
          width: `${100 + delay * 50}px`,
          height: `${100 + delay * 50}px`,
        } as React.CSSProperties
      }
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

  const handleViewProjects = () => {
    playHit();
    // Scroll to projects section
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleContactMe = () => {
    playHit();
    // Scroll to contact section
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  // Terminal state variables
  const [terminalText, setTerminalText] = useState("");
  const [isLoadingPackages, setIsLoadingPackages] = useState(false);
  const [loadedPackages, setLoadedPackages] = useState<string[]>([]);
  const [loadingPercentage, setLoadingPercentage] = useState(0);

  const fullText =
    "> Initializing J.A.R.V.I.S interface\n> Loading frontend modules... done\n> Calibrating 3D renderer... done\n> Establishing neural network... done\n> System ready for interaction";

  // List of packages for simulated npm install
  const packagesToInstall = [
    "react-three-fiber",
    "three",
    "framer-motion",
    "tailwindcss",
    "gsap",
    "typescript",
    "drei",
    "zustand",
    "react-query",
    "vitejs",
    "@react-three/postprocessing",
    "react-spring",
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
    }, 20); // Faster typing

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
        setLoadedPackages((prev) => [...prev, packagesToInstall[packageIndex]]);
        packageIndex++;
        percentage = Math.floor(
          (packageIndex / packagesToInstall.length) * 100
        );
        setLoadingPercentage(percentage);
      } else {
        // Reset to start over with loading animation
        setLoadedPackages([]);
        packageIndex = 0;
        setLoadingPercentage(0);
      }
    }, 600); // Faster package installation

    return () => clearInterval(intervalId);
  }, [isLoadingPackages]);

  return (
    <div
      ref={containerRef}
      id="hero"
      className="min-h-screen w-full relative flex flex-col justify-center items-center bg-black overflow-hidden"
    >
      {/* Particle background */}
      <div className="absolute inset-0 z-0">
        <ParticleEffects count={100} />
      </div>

      {/* Grid background */}
      <div className="absolute inset-0 z-0 grid-bg"></div>

      {/* Holographic circle background */}
      <div className="absolute bottom-0 left-0 w-full h-[500px] tech-circles"></div>

      {/* Main content container - using a layout similar to the reference site */}
      <div className="w-full h-full relative z-10">
        <div className="container mx-auto h-screen flex flex-col-reverse lg:flex-row items-center justify-between">
          {/* LEFT SIDE - Text content */}
          <div className="w-full lg:w-1/3 text-white py-8 lg:py-0 px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
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
                className="text-4xl sm:text-5xl md:text-6xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                  Abdul Jabbar
                </span>
              </motion.h1>

              <motion.h2
                className="text-2xl md:text-3xl text-[#0a84ff] font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <JarvisUI />
                Full Stack Web Developer
              </motion.h2>

              <motion.p
                className="text-gray-300 max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Dynamic Full-Stack Developer with a solid Computer Science
                background, skilled in problem-solving and delivering innovative
                web solutions to drive success.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4 mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <a
                  onClick={handleViewProjects}
                  className="jarvis-button-primary cursor-pointer"
                >
                  <span className="relative z-10">View Projects</span>
                </a>
                <a
                  onClick={handleContactMe}
                  className="jarvis-button-secondary cursor-pointer"
                >
                  <span className="relative z-10">Contact Me</span>
                </a>
              </motion.div>

              {/* Terminal window with continuous package installation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-6 max-w-full"
              >
                <div className="w-full terminal-window">
                  <div className="terminal-header flex items-center px-4 py-2">
                    <div className="w-3 h-3 rounded-full bg-red-500 opacity-70 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-70 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500 opacity-70"></div>
                    <div className="flex-1 text-center text-xs text-white/70 font-mono">
                      terminal@jarvis:~
                    </div>
                  </div>

                  <div className="h-32 overflow-auto terminal-scroll">
                    <div className="text-xs text-[#0a84ff] font-mono whitespace-pre-wrap p-2">
                      {terminalText}

                      {terminalText.length === fullText.length && (
                        <div className="mt-2">
                          <span className="text-green-400">➜</span>{" "}
                          <span className="text-purple-400">~/projects</span>{" "}
                          <span className="text-white">
                            npm install --save-dev
                          </span>
                          {isLoadingPackages && (
                            <div className="mt-1">
                              <div className="text-gray-400 mb-1">
                                Installing packages... {loadingPercentage}%
                              </div>

                              <div className="w-full h-1 bg-gray-800 rounded-full mt-1 mb-2">
                                <div
                                  className="h-full bg-[#0a84ff] rounded-full"
                                  style={{
                                    width: `${loadingPercentage}%`,
                                    transition: "width 0.3s ease",
                                  }}
                                ></div>
                              </div>

                              <div className="grid grid-cols-2 gap-x-1 gap-y-0.5 text-[10px]">
                                {loadedPackages.map((pkg, idx) => (
                                  <div
                                    key={`${pkg}-${idx}`}
                                    className="text-green-400 flex items-center"
                                  >
                                    <span className="text-xs mr-1">✓</span>{" "}
                                    {pkg}
                                  </div>
                                ))}

                                {loadedPackages.length <
                                  packagesToInstall.length && (
                                  <div className="text-yellow-400 animate-pulse flex items-center">
                                    <span className="text-xs mr-1">⟳</span>{" "}
                                    {packagesToInstall[loadedPackages.length]}
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="mt-2 flex items-center">
                        <span className="text-green-400">➜</span>{" "}
                        <span className="text-purple-400">~/projects</span>{" "}
                        <span className="text-white ml-1">_</span>
                        <span className="inline-block w-2 h-4 bg-white/70 ml-1 animate-pulse"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Social links in futuristic style */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="flex space-x-4 mt-4"
              >
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hud-element p-3 rounded-lg transition-all duration-300 hover:bg-[#0a84ff]/20"
                >
                  <Linkedin className="w-5 h-5 text-[#0a84ff]" />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hud-element p-3 rounded-lg transition-all duration-300 hover:bg-[#0a84ff]/20"
                >
                  <Github className="w-5 h-5 text-[#0a84ff]" />
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT SIDE - Much larger 3D Model container taking 2/3 of the space like in the reference */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="w-full lg:w-2/3 h-[400px] sm:h-[500px] md:h-[600px] lg:h-screen relative"
          >
            {/* 3D canvas container */}
            <div className="absolute inset-0">
              <Canvas
                shadows
                camera={{ position: [0, 0, 10], fov: 45 }}
                gl={{ preserveDrawingBuffer: true }}
                className="w-full h-full"
              >
                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  rotateSpeed={0.5}
                  minPolarAngle={Math.PI / 4}
                  maxPolarAngle={Math.PI / 1.8}
                />
                <ambientLight intensity={0.5} />
                <spotLight
                  position={[10, 10, 10]}
                  angle={0.15}
                  penumbra={1}
                  intensity={2}
                  castShadow
                />
                <pointLight position={[-10, -10, -10]} intensity={1.5} />

                <Suspense fallback={null}>
                  {/* Environment creates a more realistic scene with reflections */}
                  <Environment preset="night" />

                  {/* The main 3D model with much larger scale */}
                  <IronManModel scale={6} position={[0, -1, 0]} />

                  {/* Enhanced contact shadows */}
                  <ContactShadows
                    opacity={0.6}
                    scale={15}
                    blur={2.5}
                    far={15}
                    resolution={512}
                    color="#000000"
                  />
                </Suspense>
              </Canvas>
            </div>

            {/* HUD elements overlay */}
            <div className="absolute inset-0 pointer-events-none">
              {/* DRAG instruction moved below the model's feet */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hud-element px-5 py-3 text-base backdrop-blur-md border-2 border-[#0a84ff]/70 z-10">
                <div className="flex items-center space-x-3">
                  <Database size={20} className="text-[#0a84ff]" />
                  <span className="text-[#0a84ff] font-bold tracking-wide">
                    DRAG TO ROTATE MODEL
                  </span>
                </div>
              </div>

              {/* HUD corners */}
              <div className="absolute top-0 left-0 w-[100px] h-[100px] border-t-2 border-l-2 border-[#0a84ff]/30"></div>
              <div className="absolute top-0 right-0 w-[100px] h-[100px] border-t-2 border-r-2 border-[#0a84ff]/30"></div>
              <div className="absolute bottom-0 left-0 w-[100px] h-[100px] border-b-2 border-l-2 border-[#0a84ff]/30"></div>
              <div className="absolute bottom-0 right-0 w-[100px] h-[100px] border-b-2 border-r-2 border-[#0a84ff]/30"></div>

              {/* Top status elements */}
              <div className="absolute top-6 right-6 hud-element px-3 py-1 text-sm backdrop-blur-sm">
                <div className="flex items-center space-x-2">
                  <Cpu size={14} className="text-[#0a84ff]" />
                  <span className="text-[#0a84ff]">MODEL: MARK 42</span>
                </div>
              </div>

              <div className="absolute top-6 left-6 px-3 py-1 bg-black/40 backdrop-blur-sm rounded border border-[#0a84ff]/20 text-sm font-mono text-[#0a84ff]/80">
                {currentTime.toLocaleTimeString("en-US", { hour12: false })}
              </div>

              {/* Scanning lines effect */}
              <div className="absolute inset-0 scanning-lines opacity-10"></div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll down indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        onClick={() =>
          document
            .getElementById("skills")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <div className="flex flex-col items-center">
          <span className="text-xs text-[#0a84ff] mb-2 font-mono">
            SCROLL DOWN
          </span>
          <div className="w-6 h-10 rounded-full border-2 border-[#0a84ff]/30 flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-[#0a84ff]"
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
