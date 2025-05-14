import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { useAudio } from "../lib/stores/useAudio";
import IronManModel from "../models/IronMan";
import ParticleEffects from "./ParticleEffects";

const HeroSection = () => {
  const { playHit } = useAudio();
  const containerRef = useRef<HTMLDivElement>(null);

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

  return (
    <div 
      ref={containerRef}
      className="section hero-gradient flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Background particles */}
      <ParticleEffects count={100} />
      
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-8 z-10">
        <div className="w-full lg:w-1/2 text-center lg:text-left">
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
              className="group relative bg-marvel-red hover:bg-marvel-red/90 text-white py-3 px-8 rounded-md overflow-hidden transition-all duration-300"
            >
              <span className="relative z-10">View My Work</span>
              <span className="absolute inset-0 bg-marvel-gold transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 z-0 opacity-20"></span>
            </button>
            
            <button 
              onClick={handleDownloadResume}
              className="group relative bg-transparent border-2 border-marvel-gold text-marvel-gold hover:text-white py-3 px-8 rounded-md overflow-hidden transition-all duration-300"
            >
              <span className="relative z-10">Download Resume</span>
              <span className="absolute inset-0 bg-marvel-gold transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 z-0"></span>
            </button>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="w-full lg:w-1/2 h-[350px] md:h-[450px] relative perspective"
        >
          <div className="w-full h-full">
            <Canvas camera={{ position: [0, 1, 5], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
              <pointLight position={[-10, -10, -10]} intensity={0.5} />
              
              <Suspense fallback={null}>
                <IronManModel position={[0, -1, 0]} scale={1.5} />
              </Suspense>
            </Canvas>
          </div>
          
          {/* HUD elements around the 3D model */}
          <div className="absolute top-5 right-5 hud-element px-3 py-1 text-sm">
            <div className="hud-corner hud-corner-tl"></div>
            <div className="hud-corner hud-corner-tr"></div>
            <div className="hud-corner hud-corner-bl"></div>
            <div className="hud-corner hud-corner-br"></div>
            <span className="text-marvel-gold">MK III</span>
          </div>
          
          <div className="absolute bottom-5 left-5 hud-element px-3 py-1 text-sm">
            <div className="hud-corner hud-corner-tl"></div>
            <div className="hud-corner hud-corner-tr"></div>
            <div className="hud-corner hud-corner-bl"></div>
            <div className="hud-corner hud-corner-br"></div>
            <span className="text-marvel-gold">DRAG TO ROTATE</span>
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/60"
      >
        <p className="text-sm mb-2">Scroll Down to Explore</p>
        <svg 
          className="w-6 h-6 animate-bounce" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 14l-7 7m0 0l-7-7m7 7V3" 
          />
        </svg>
      </motion.div>
    </div>
  );
};

export default HeroSection;
