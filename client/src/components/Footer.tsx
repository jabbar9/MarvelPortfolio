import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ArrowUp, Github, Linkedin, Mail, Shield, Twitter } from 'lucide-react';

const Footer = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Update current time for Jarvis UI
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  
  // Track scroll position for progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      const height = document.body.scrollHeight - window.innerHeight;
      const progress = (position / height) * 100;
      setScrollPosition(progress);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <footer className="bg-black relative z-10 border-t border-[#0a84ff]/20">
      {/* Scan line effect */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#0a84ff]/40 to-transparent"></div>
      
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
      
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Logo and tagline */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-12 h-12 bg-[#0a84ff]/10 rounded-full flex items-center justify-center border border-[#0a84ff]/30 mr-3">
                <Shield size={24} className="text-[#0a84ff]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">JARVIS<span className="text-[#0a84ff]">UI</span></h3>
                <p className="text-xs font-mono text-gray-400">Just A Rather Very Intelligent System</p>
              </div>
            </motion.div>
            
            <p className="text-gray-400 text-sm">
              A futuristic web developer portfolio inspired by Tony Stark's Jarvis interface.
              Built with React, Three.js, and Framer Motion.
            </p>
            
            {/* Jarvis status indicator */}
            <div className="flex items-center space-x-2 bg-black/50 px-3 py-1.5 rounded-full border border-[#0a84ff]/20">
              <div className="w-2 h-2 rounded-full bg-[#0a84ff] animate-pulse"></div>
              <div className="text-xs font-mono text-[#0a84ff]/80 flex items-center">
                <span>SYSTEM ACTIVE</span>
                <span className="mx-2 opacity-50">|</span>
                <span className="text-white/70">{currentTime.toLocaleTimeString('en-US', { hour12: false })}</span>
              </div>
            </div>
          </div>
          
          {/* Quick links */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h3 className="text-white text-lg font-bold mb-2 flex items-center">
              <span className="text-[#0a84ff] mr-2">01.</span>Navigation
            </h3>
            
            <div className="grid grid-cols-2 gap-3 w-full">
              <a href="#hero" className="footer-link">
                Home
              </a>
              <a href="#projects" className="footer-link">
                Projects
              </a>
              <a href="#skills" className="footer-link">
                Skills
              </a>
              <a href="#about" className="footer-link">
                About
              </a>
              <a href="#experience" className="footer-link">
                Experience
              </a>
              <a href="#contact" className="footer-link">
                Contact
              </a>
            </div>
            
            {/* Technical specs "Easter egg" */}
            <div className="w-full p-3 bg-black/50 border border-[#0a84ff]/20 rounded-md mt-4">
              <h4 className="text-[#0a84ff] text-xs font-mono mb-2">SYSTEM SPECS</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col">
                  <span className="text-gray-500 text-xs">Frontend</span>
                  <span className="text-white text-xs">React + TypeScript</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500 text-xs">3D Rendering</span>
                  <span className="text-white text-xs">Three.js + React Three Fiber</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500 text-xs">Animation</span>
                  <span className="text-white text-xs">Framer Motion + GSAP</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500 text-xs">Styling</span>
                  <span className="text-white text-xs">Tailwind CSS</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact and social links */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h3 className="text-white text-lg font-bold mb-2 flex items-center">
              <span className="text-[#0a84ff] mr-2">02.</span>Connect
            </h3>
            
            <div className="w-full space-y-3">
              <a 
                href="mailto:contact@example.com" 
                className="w-full flex items-center px-4 py-2 bg-black/40 border border-[#0a84ff]/30 rounded-md hover:bg-[#0a84ff]/10 transition-colors text-white"
              >
                <Mail size={18} className="mr-3 text-[#0a84ff]" />
                <span>contact@example.com</span>
              </a>
              
              <div className="flex space-x-3">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center py-2 bg-black/40 border border-[#0a84ff]/30 rounded-md hover:bg-[#0a84ff]/10 transition-colors text-white"
                >
                  <Github size={18} className="text-[#0a84ff]" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center py-2 bg-black/40 border border-[#0a84ff]/30 rounded-md hover:bg-[#0a84ff]/10 transition-colors text-white"
                >
                  <Linkedin size={18} className="text-[#0a84ff]" />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center py-2 bg-black/40 border border-[#0a84ff]/30 rounded-md hover:bg-[#0a84ff]/10 transition-colors text-white"
                >
                  <Twitter size={18} className="text-[#0a84ff]" />
                </a>
              </div>
            </div>
            
            {/* Scroll progress */}
            <div className="w-full mt-auto">
              <div className="flex justify-between text-xs font-mono text-gray-500 mb-1">
                <span>Scroll Position</span>
                <span>{Math.round(scrollPosition)}%</span>
              </div>
              <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden border border-[#0a84ff]/20">
                <div
                  className="h-full bg-gradient-to-r from-[#0a84ff]/60 to-[#0a84ff] rounded-full"
                  style={{ width: `${scrollPosition}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright bar */}
      <div className="border-t border-[#0a84ff]/20 py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Abdul Jabbar. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-6">
            <button 
              onClick={handleScrollToTop}
              className="flex items-center space-x-2 text-[#0a84ff] text-sm hover:text-white transition-colors"
            >
              <ArrowUp size={16} />
              <span>Back to Top</span>
            </button>
            
            <div className="flex items-center text-xs">
              <span className="text-gray-400 mr-2">Powered by</span>
              <span className="text-[#0a84ff] font-mono">JARVIS.UI</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;