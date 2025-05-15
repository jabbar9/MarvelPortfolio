import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "../lib/stores/useAudio";
import { Menu, X, Volume2, VolumeX, Home, FolderOpen, User, Send, Shield, Github, Linkedin } from "lucide-react";

// Simplified navigation links as requested
const navLinks = [
  { href: "#hero", label: "Home", icon: <Home size={18} /> },
  { href: "#projects", label: "Projects", icon: <FolderOpen size={18} /> },
  { href: "#about", label: "About", icon: <User size={18} /> },
  { href: "#contact", label: "Contact", icon: <Send size={18} /> },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { isMuted, toggleMute, backgroundMusic, playHit } = useAudio();
  const { toggleBackgroundMusic, isPlaying } = useAudio();


  // Handle scroll event to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update current time for Jarvis UI
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Play background music when user interacts with the page
  const handleStartMusic = () => {
    if (backgroundMusic) {
      toggleMute();
      if (isMuted) {
        backgroundMusic.play().catch(e => console.log("Audio play prevented:", e));
      } else {
        backgroundMusic.pause();
      }
    }
    playHit();
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    playHit();
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
          isScrolled ? "bg-black/80 backdrop-blur-md border-b border-[#0a84ff]/30" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <a href="#hero" className="flex items-center group" onClick={handleNavClick}>
                <div className="flex items-center justify-center w-10 h-10 bg-[#0a84ff]/20 rounded-full mr-3 overflow-hidden border border-[#0a84ff]/30 group-hover:border-[#0a84ff] transition-colors duration-300">
                  <Shield size={20} className="text-[#0a84ff]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[#0a84ff] text-xl font-bold tracking-wider font-orbitron">
                    J.A.R.V.I.S
                  </span>
                  <span className="text-white/60 text-[10px] mt-[-4px]">
                    Just A Rather Very Intelligent System
                  </span>
                </div>
              </a>
            </div>

            {/* Jarvis status bar */}
            <div className="hidden md:flex items-center space-x-4 text-xs text-white/60 font-mono">
              <div>
                {currentTime.toLocaleTimeString('en-US', { hour12: false })}
              </div>
              <div className="px-2 py-0.5 bg-[#0a84ff]/20 rounded border border-[#0a84ff]/30">
                SYSTEM ONLINE
              </div>
            </div>

            {/* Desktop menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-2">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={handleNavClick}
                    className="relative text-white hover:text-[#0a84ff] px-3 py-2 text-sm font-medium tracking-wider transition-colors duration-300 overflow-hidden group flex items-center space-x-2 border border-transparent hover:border-[#0a84ff]/30 rounded-md"
                  >
                    <span className="text-[#0a84ff]">{link.icon}</span>
                    <span>{link.label}</span>
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#0a84ff]/50 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                  </a>
                ))}
                
                {/* Social media links */}
                <div className="h-5 w-[1px] bg-[#0a84ff]/30 mx-2"></div>
                
                <a 
                  href="https://github.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center h-8 w-8 text-white hover:text-[#0a84ff] transition-colors duration-300 border border-transparent hover:border-[#0a84ff]/30 rounded-full bg-[#0a84ff]/10"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github size={16} />
                </a>
                
                <a 
                  href="https://linkedin.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center h-8 w-8 text-white hover:text-[#0a84ff] transition-colors duration-300 border border-transparent hover:border-[#0a84ff]/30 rounded-full bg-[#0a84ff]/10"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Linkedin size={16} />
                </a>
                
                <div className="h-5 w-[1px] bg-[#0a84ff]/30 mx-2"></div>
                
                 <button
        onClick={toggleBackgroundMusic}
        className="bg-blue-600 text-white px-4 py-2 rounded ml-4"
      >
        {isPlaying ? "Pause Music" : "Play Music"}
      </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={handleStartMusic}
                className="text-white hover:text-[#0a84ff] p-2 mr-2 rounded-full transition-colors duration-300"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(!mobileMenuOpen);
                  playHit();
                }}
                className="text-white hover:text-[#0a84ff] rounded-md p-2 transition-colors duration-300 border border-transparent hover:border-[#0a84ff]/30"
                aria-expanded={mobileMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed top-16 inset-x-0 z-30 bg-black/90 backdrop-blur-md border-b border-[#0a84ff]/20"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleNavClick}
                  className="text-white hover:bg-[#0a84ff]/10 hover:text-[#0a84ff] flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium border border-transparent hover:border-[#0a84ff]/30 transition-all duration-300"
                >
                  <span className="text-[#0a84ff]">{link.icon}</span>
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
            
            {/* Social links */}
            <div className="px-4 py-3 border-t border-[#0a84ff]/20 flex items-center justify-center space-x-4">
              <a 
                href="https://github.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center h-10 w-10 text-white hover:text-[#0a84ff] transition-colors duration-300 border border-[#0a84ff]/30 hover:border-[#0a84ff] rounded-full bg-[#0a84ff]/10"
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={20} />
              </a>
              
              <a 
                href="https://linkedin.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center h-10 w-10 text-white hover:text-[#0a84ff] transition-colors duration-300 border border-[#0a84ff]/30 hover:border-[#0a84ff] rounded-full bg-[#0a84ff]/10"
                onClick={(e) => e.stopPropagation()}
              >
                <Linkedin size={20} />
              </a>
            </div>
            
            {/* Mobile Jarvis status */}
            <div className="px-4 py-2 flex justify-between text-xs text-white/60 font-mono border-t border-[#0a84ff]/20">
              <div>
                {currentTime.toLocaleTimeString('en-US', { hour12: false })}
              </div>
              <div className="px-2 py-0.5 bg-[#0a84ff]/20 rounded border border-[#0a84ff]/30">
                SYSTEM ONLINE
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
