import { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
import { useAudio } from "../lib/stores/useAudio";
import { Github, ExternalLink, Brain, Box, BarChart3, CheckCircle } from "lucide-react";
import { projects } from "../lib/data";

const ProjectCard = ({ project, index }: { project: typeof projects[0], index: number }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.2 });
  const { playHit } = useAudio();
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        delay: index * 0.2 
      } 
    }
  };

  // Icon based on project type
  const getProjectIcon = () => {
    switch (project.type) {
      case "AI Application":
        return <Brain size={20} className="text-[#0a84ff]" />;
      case "3D Web Application":
        return <Box size={20} className="text-[#0a84ff]" />;
      case "Data Visualization":
        return <BarChart3 size={20} className="text-[#0a84ff]" />;
      default:
        return <Brain size={20} className="text-[#0a84ff]" />;
    }
  };
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={cardVariants}
      layout
      className="group relative hud-element overflow-hidden bg-black/60 backdrop-blur-sm"
      onMouseEnter={() => {
        setHovered(true);
        playHit();
      }}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setExpanded(!expanded)}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      style={{ height: expanded ? "auto" : "400px" }}
    >
      <div className="hud-corner hud-corner-tl"></div>
      <div className="hud-corner hud-corner-tr"></div>
      <div className="hud-corner hud-corner-bl"></div>
      <div className="hud-corner hud-corner-br"></div>
      
      {/* Expanding header */}
      <motion.div 
        className="relative z-20 p-5 bg-black/80"
        layout
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            {getProjectIcon()}
            <h3 className="text-xl font-bold text-white">{project.title}</h3>
          </div>
          <span className="text-xs text-[#0a84ff] font-mono uppercase bg-[#0a84ff]/10 px-2 py-1 rounded border border-[#0a84ff]/30">
            {project.type}
          </span>
        </div>
        
        <motion.p 
          layout
          className="text-gray-300 text-sm mb-4 line-clamp-2"
        >
          {project.description}
        </motion.p>
      </motion.div>

      {/* Image with scanning overlay */}
      <div className="h-[200px] relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-cover bg-center"
          layout
          initial={{ scale: 1 }}
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 1.5 }}
          style={{ backgroundImage: `url(${project.image})` }}
        />
        
        {/* HUD scanning effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50 z-10"></div>
        <div className="absolute inset-0 z-10">
          <div className="absolute inset-x-0 h-[1px] bg-[#0a84ff]/50 top-1/4 animate-[scan_4s_ease-in-out_infinite]"></div>
        </div>
        
        {/* Iron Man targeting UI elements */}
        <AnimatePresence>
          {hovered && (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-dashed border-[#0a84ff]/30 rounded-full z-10"
                style={{ animationName: 'spin', animationDuration: '20s', animationIterationCount: 'infinite', animationTimingFunction: 'linear' }}
              ></motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 z-10 pointer-events-none"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle cx="50" cy="50" r="48" stroke="#0a84ff" strokeWidth="0.5" fill="none" opacity="0.3" />
                  <circle cx="50" cy="50" r="40" stroke="#0a84ff" strokeWidth="0.5" fill="none" opacity="0.5" />
                  <circle cx="50" cy="50" r="3" fill="#0a84ff" />
                  
                  {/* Corner brackets */}
                  <path d="M10,10 L20,10 M10,10 L10,20" stroke="#0a84ff" strokeWidth="1" fill="none" />
                  <path d="M90,10 L80,10 M90,10 L90,20" stroke="#0a84ff" strokeWidth="1" fill="none" />
                  <path d="M10,90 L20,90 M10,90 L10,80" stroke="#0a84ff" strokeWidth="1" fill="none" />
                  <path d="M90,90 L80,90 M90,90 L90,80" stroke="#0a84ff" strokeWidth="1" fill="none" />
                </svg>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
      
      {/* Expanding content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="p-5 border-t border-[#0a84ff]/20 bg-black/80"
          >
            <h4 className="text-sm text-[#0a84ff] mb-2 font-mono uppercase">Key Features</h4>
            <ul className="mb-4 space-y-2">
              {project.features.map((feature, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  className="text-sm text-gray-300 flex items-start space-x-2"
                >
                  <CheckCircle size={16} className="text-[#0a84ff] flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>
            
            <h4 className="text-sm text-[#0a84ff] mb-2 font-mono uppercase">Technologies</h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 + 0.3 }}
                  className="text-xs bg-[#0a84ff]/10 text-[#0a84ff] px-2 py-1 rounded-sm border border-[#0a84ff]/20"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Bottom actions bar */}
      <motion.div 
        className="p-5 flex justify-between items-center border-t border-[#0a84ff]/20 bg-black/80 relative z-20"
        layout
      >
        <div className="flex space-x-4">
          <a 
            href={project.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-[#0a84ff] transition-colors duration-300 bg-black/30 p-2 rounded-full border border-[#0a84ff]/20 hover:border-[#0a84ff]/60"
            onClick={(e) => e.stopPropagation()}
          >
            <Github size={18} />
          </a>
          <a 
            href={project.demo} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-[#0a84ff] transition-colors duration-300 bg-black/30 p-2 rounded-full border border-[#0a84ff]/20 hover:border-[#0a84ff]/60"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={18} />
          </a>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-xs text-[#0a84ff] font-mono underline"
          onClick={(e) => {
            e.stopPropagation();
            setExpanded(!expanded);
          }}
        >
          {expanded ? "Less Details" : "More Details"}
        </motion.button>
      </motion.div>
      
      {/* Status indicator */}
      <div className="absolute top-5 right-5 flex items-center space-x-1 z-20">
        <div className="w-2 h-2 rounded-full bg-[#0a84ff] animate-pulse"></div>
        <span className="text-[9px] text-[#0a84ff]/80 font-mono">ONLINE</span>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const controls = useAnimation();
  const inView = useInView(ref, { once: false, amount: 0.2 });
  
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5
      } 
    }
  };
  
  return (
    <div className="section bg-black relative overflow-hidden jarvis-grid">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={titleVariants}
          className="mb-16 text-center"
        >
          <motion.div 
            className="inline-block mb-3 px-3 py-1 bg-black/60 border border-[#0a84ff]/30 rounded-full"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-sm text-[#0a84ff] font-mono">FEATURED PROJECTS</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            Recent <span className="text-[#0a84ff]">Missions</span>
          </h2>
          
          <p className="text-gray-400 max-w-3xl mx-auto">
            Interactive showcases of my work. Click on any project card to expand and view more details.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;
