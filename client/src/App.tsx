import { Suspense, useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Loader } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useAudio } from "./lib/stores/useAudio";

// Components
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import ExperienceSection from "./components/ExperienceSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import ScrollProgress from "./components/ScrollProgress";
import IronManFlying from "./components/IronManFlying";
import Footer from "./components/Footer";

// Sound effects setup
const App = () => {
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { setBackgroundMusic, setHitSound, setSuccessSound, playAll  } = useAudio();
  const [audioStarted, setAudioStarted] = useState(false);


  useEffect(() => {
  const handlePlayMusic = () => {
    const bgMusic = new Audio("/sounds/Endgame.mp3");
    bgMusic.loop = true;
    bgMusic.volume = 0.5;

    bgMusic.play()
      .then(() => {
        console.log("🎵 Music started");
      })
      .catch((err) => {
        console.error("❌ Music play failed:", err);
      });

    window.removeEventListener("click", handlePlayMusic);
  };

  // Add listener for any click to start the music
  window.addEventListener("click", handlePlayMusic);

  return () => window.removeEventListener("click", handlePlayMusic);
}, []);




  // Initialize audio with Avengers audio
  useEffect(() => {
    // Load Marvel Avengers themed background music
    // Using Avengers Assemble audio as requested
    const bgMusic = new Audio("/sounds/avengers.mp3");
    bgMusic.loop = true;
    bgMusic.volume = 0.5;
    setBackgroundMusic(bgMusic);

    // Load hit sound (for UI interactions)
    const hit = new Audio("/sounds/Endgame.mp3");
    hit.volume = 0.3;
    setHitSound(hit);

    // Load success sound (for form submissions, etc.)
    const success = new Audio("/sounds/success.mp3");
    success.volume = 0.5;
    setSuccessSound(success);

    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [setBackgroundMusic, setHitSound, setSuccessSound]);

  return (
    <>
      <Helmet>
        <title>Abdul Jabbar | Web Developer | App Developer</title>
        <meta name="description" content="Interactive Marvel-themed 3D portfolio of Abdul Jabbar - Web Developer, UI/UX Enthusiast & Creative Technologist" />
      </Helmet>

      <AnimatePresence>
        {loading ? (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
          >
            {/* Grid overlay */}
            <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
            
            {/* Scanning effect */}
            <div 
              className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a84ff]/10 to-transparent" 
              style={{ 
                animation: 'scan 3s ease-in-out infinite',
                backgroundSize: '100% 5px'
              }}
            ></div>
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-32 h-32 relative"
            >
              {/* Pulsating circle */}
              <motion.div 
                className="absolute inset-0 rounded-full border-2 border-[#0a84ff]/50"
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              ></motion.div>
              
              {/* Inner circles */}
              <div className="absolute inset-4 rounded-full border border-[#0a84ff]/30 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#0a84ff]/10 border border-[#0a84ff] flex items-center justify-center">
                  <span className="text-[#0a84ff] font-bold text-2xl font-mono">JD</span>
                </div>
              </div>
              
              {/* Rotating outer ring */}
              <motion.div 
                className="absolute inset-[-10px] rounded-full border-2 border-dashed border-[#0a84ff]/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              ></motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12 flex flex-col items-center"
            >
              <h2 className="text-xl text-white font-mono mb-3">
                <span className="text-[#0a84ff]">JARVIS</span> SYSTEM
              </h2>
              
              <div className="w-64 h-2 bg-black/60 rounded-full overflow-hidden border border-[#0a84ff]/20">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="h-full bg-gradient-to-r from-[#0a84ff]/60 to-[#0a84ff] rounded-full"
                ></motion.div>
              </div>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
                className="mt-4 text-xs text-[#0a84ff] font-mono"
              >
                INITIALIZING INTERFACE...
              </motion.p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="bg-background text-white relative">
        {/* 3D canvas for flying Iron Man that follows scroll */}
        <Canvas
          className="fixed inset-0 pointer-events-none z-20"
          camera={{ position: [0, 0, 5], fov: 75 }}
          gl={{ alpha: true }}
        >
          <Suspense fallback={null}>
            <IronManFlying scrollContainer={scrollContainerRef} />
          </Suspense>
        </Canvas>

        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[url('/textures/sky.png')] opacity-5 bg-cover bg-center" />
        </div>

        <Navbar />
        <ScrollProgress />

        <main
          ref={scrollContainerRef}
          className="relative z-10 overflow-x-hidden"
        >
          <section id="hero" className="min-h-screen">
            <HeroSection />
          </section>

          <section id="skills">
            <SkillsSection />
          </section>

          <section id="projects">
            <ProjectsSection />
          </section>

          <section id="experience">
            <ExperienceSection />
          </section>

          <section id="about">
            <AboutSection />
          </section>

          <section id="contact">
            <ContactSection />
          </section>
          
          <Footer />
        </main>

        <Loader 
          containerStyles={{
            background: "black",
            zIndex: 100
          }}
          innerStyles={{
            backgroundColor: "#0a84ff",
          }}
          barStyles={{
            backgroundColor: "#FFFFFF",
          }}
          dataStyles={{
            color: "#FFFFFF",
            fontFamily: "monospace",
            fontSize: "14px"
          }}
          dataInterpolation={(p) => `JARVIS OS LOADING ${p.toFixed(0)}%`}
        />
      </div>
    </>
  );
};

export default App;
