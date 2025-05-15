import { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
import { useAudio } from "../lib/stores/useAudio";
import { Github, ExternalLink, Brain, Box, BarChart3, CheckCircle, Maximize2, ChevronDown, Sparkles } from "lucide-react";
import { projects } from "../lib/data";

// Animated tech circles component
const TechCircle = ({ tech, index, total }: { tech: string, index: number, total: number }) => {
  const angle = (index / total) * 2 * Math.PI;
  const radius = 80; // Distance from center
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        delay: index * 0.1, 
        duration: 0.5, 
        type: "spring", 
        stiffness: 200 
      }}
      className="absolute flex items-center justify-center"
      style={{ 
        left: `calc(50% + ${x}px)`, 
        top: `calc(50% + ${y}px)`,
        transform: 'translate(-50%, -50%)'
      } as React.CSSProperties }
    >
      <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-black/80 border border-[#0a84ff] p-1 z-10">
        <div className="text-xs text-white whitespace-nowrap">{tech}</div>
      </div>
      <motion.div 
        className="absolute w-full h-full rounded-full border-2 border-[#0a84ff]/20"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </motion.div>
  );
};

// Scanning effect components
const ScanningLine = () => (
  <motion.div 
    className="absolute left-0 w-full h-[2px] bg-[#0a84ff]/60 z-10"
    style={{ position: "absolute" } as React.CSSProperties}
  initial={{ top: "0px" } as any}
  animate={{ top: "100px" } as any}
    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
  />
);

const InteractiveCircle = ({ size, delay = 0, duration = 5 }: { size: number, delay?: number, duration?: number }) => (
  <motion.div
    className="absolute rounded-full border border-[#0a84ff]/30"
    style={{ width: size, height: size, left: '50%', top: '50%' }as React.CSSProperties}
    initial={{ scale: 0.5, x: '-50%', y: '-50%', opacity: 0 }}
    animate={{ 
      scale: [0.5, 1, 0.5], 
      opacity: [0, 0.5, 0] 
    }}
    transition={{ 
      duration: duration, 
      repeat: Infinity, 
      delay: delay, 
      ease: "easeInOut" 
    }}
  />
);

const ProjectCard = ({ project, index }: { project: typeof projects[0], index: number }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.2 });
  const { playHit } = useAudio();
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showTechCircles, setShowTechCircles] = useState(false);
  
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
        duration: 0.8, 
        delay: index * 0.3,
        type: "spring",
        stiffness: 100,
        damping: 15
      } 
    }
  };

  // Icon based on project type
  const getProjectIcon = () => {
    switch (project.type) {
      case "AI Application":
        return <Brain size={24} className="text-[#0a84ff]" />;
      case "3D Web Application":
        return <Box size={24} className="text-[#0a84ff]" />;
      case "Data Visualization":
        return <BarChart3 size={24} className="text-[#0a84ff]" />;
      default:
        return <Brain size={24} className="text-[#0a84ff]" />;
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={cardVariants}
      layout
      className="group relative hover:z-20 backdrop-blur-lg"
      style={{ height: expanded ? "auto" : "450px" } as React.CSSProperties}
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-black/60 rounded-2xl shadow-[0_0_15px_rgba(10,132,255,0.3)] overflow-hidden border border-[#0a84ff]/30 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(10,132,255,0.5)] group-hover:border-[#0a84ff]/60"/>
      
      <div className="relative z-10 h-full flex flex-col">
        {/* Card header with project type and HUD corners */}
        <div className="relative p-6 pb-4">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#0a84ff] rounded-tl-md" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#0a84ff] rounded-tr-md" />
          
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0a84ff]/10 border border-[#0a84ff]/40">
                {getProjectIcon()}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
                <span className="text-xs font-mono text-[#0a84ff]">{project.type}</span>
              </div>
            </div>
            
            {/* Status indicator and maximize button */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-[#0a84ff] animate-pulse" />
                <span className="hidden md:inline text-[10px] text-[#0a84ff] font-mono uppercase">Active</span>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setExpanded(!expanded);
                  playHit();
                }}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-black/40 border border-[#0a84ff]/30 text-[#0a84ff] hover:bg-[#0a84ff]/20 transition-colors"
              >
                {expanded ? <ChevronDown size={16} /> : <Maximize2 size={16} />}
              </motion.button>
            </div>
          </div>
        </div>
        
        {/* Project image with holographic effects */}
        <div 
          className="relative w-full h-56 overflow-hidden"
          onMouseEnter={() => {
            setHovered(true);
            playHit();
            // Show tech circles on hover after a delay
            setTimeout(() => setShowTechCircles(true), 500);
          }}
          onMouseLeave={() => {
            setHovered(false);
            setShowTechCircles(false);
          }}
        >
          <motion.div 
            className="absolute inset-0 bg-cover bg-center"
            animate={{ scale: hovered ? 1.1 : 1 }}
            transition={{ duration: 3, type: "spring", stiffness: 50 }}
            style={{ backgroundImage: `url(${project.image})` } as React.CSSProperties}
          />
          
          {/* Overlay gradients and scanning effects */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 z-10" />
          <div className="absolute inset-0 bg-[#0a84ff]/5 z-10" />
          
          {hovered && (
            <>
              <ScanningLine />
              
              <div className="absolute inset-0 backdrop-blur-[1px] z-10" />
              
              {/* AI-style targeting interface */}
              <InteractiveCircle size={100} delay={0} duration={4} />
              <InteractiveCircle size={150} delay={0.5} duration={5} />
              <InteractiveCircle size={200} delay={1} duration={6} />
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
              >
                <svg className="w-32 h-32" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#0a84ff" strokeWidth="0.5" strokeDasharray="5,3" opacity="0.6" />
                  <circle cx="50" cy="50" r="2" fill="#0a84ff" />
                  
                  {/* Targeting lines */}
                  <motion.path 
                    d="M50,20 L50,35" 
                    stroke="#0a84ff" 
                    strokeWidth="1" 
                    fill="none"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.path 
                    d="M50,65 L50,80" 
                    stroke="#0a84ff" 
                    strokeWidth="1" 
                    fill="none"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.path 
                    d="M20,50 L35,50" 
                    stroke="#0a84ff" 
                    strokeWidth="1" 
                    fill="none"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.path 
                    d="M65,50 L80,50" 
                    stroke="#0a84ff" 
                    strokeWidth="1" 
                    fill="none"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </svg>
              </motion.div>
              
              {/* Technology nodes */}
              {showTechCircles && (
                <div className="absolute inset-0 z-30">
                  {project.technologies.slice(0, 5).map((tech, i) => (
                    <TechCircle 
                      key={tech} 
                      tech={tech} 
                      index={i} 
                      total={project.technologies.length} 
                    />
                  ))}
                </div>
              )}
            </>
          )}
          
          {/* Hover instruction */}
          {!hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
            >
              <div className="px-4 py-2 bg-black/70 rounded-full border border-[#0a84ff]/30 text-[#0a84ff] text-sm font-mono flex items-center space-x-2">
                <Sparkles size={14} />
                <span>Hover to Analyze</span>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Description section */}
        <div className="p-6 pt-4 flex-grow">
          <motion.p 
            className="text-gray-300 text-sm mb-4"
            animate={{ opacity: expanded ? 1 : 0.9 }}
          >
            {project.description}
          </motion.p>
          
          {/* Feature summary when not expanded */}
          {!expanded && (
            <div className="flex flex-wrap gap-2 mt-4">
              {project.features.map((feature, i) => (
                <span 
                  key={i}
                  className="inline-flex items-center space-x-1 text-xs px-2 py-1 rounded-full bg-[#0a84ff]/10 text-[#0a84ff] border border-[#0a84ff]/20"
                >
                  <CheckCircle size={10} />
                  <span>{feature}</span>
                </span>
              ))}
            </div>
          )}
        </div>
        
        {/* Expanded content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
              className="px-6 pb-6"
            >
              <div className="border-t border-[#0a84ff]/30 pt-4 mt-2">
                <h4 className="text-sm text-[#0a84ff] font-mono uppercase mb-3 flex items-center">
                  <Sparkles size={14} className="mr-2" />
                  Key Technologies
                </h4>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {project.technologies.map((tech, i) => (
                    <motion.div
                      key={tech}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center space-x-2"
                    >
                      <div className="w-2 h-2 rounded-full bg-[#0a84ff]" />
                      <span className="text-sm text-white">{tech}</span>
                    </motion.div>
                  ))}
                </div>
                
                <h4 className="text-sm text-[#0a84ff] font-mono uppercase mb-3 flex items-center">
                  <BarChart3 size={14} className="mr-2" />
                  Project Features
                </h4>
                
                <ul className="space-y-2 mb-6">
                  {project.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex items-start space-x-2 text-sm text-gray-300"
                    >
                      <CheckCircle size={16} className="text-[#0a84ff] mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Card footer with links */}
        <div className="p-6 pt-0 mt-auto">
          <div className="flex items-center justify-between">
            <div className="flex space-x-3">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-black/60 border border-[#0a84ff]/30 text-[#0a84ff] hover:bg-[#0a84ff]/20 hover:border-[#0a84ff]/60 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={18} />
              </motion.a>
              
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-black/60 border border-[#0a84ff]/30 text-[#0a84ff] hover:bg-[#0a84ff]/20 hover:border-[#0a84ff]/60 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={18} />
              </motion.a>
            </div>
            
            <div className="text-xs font-mono text-[#0a84ff]/60">
              {expanded ? (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => {
                    setExpanded(false);
                    playHit();
                  }}
                  className="flex items-center space-x-1 px-3 py-1 rounded-full border border-[#0a84ff]/30 hover:bg-[#0a84ff]/10 transition-colors"
                >
                  <ChevronDown size={14} />
                  <span>Collapse</span>
                </motion.button>
              ) : (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => {
                    setExpanded(true);
                    playHit();
                  }}
                  className="flex items-center space-x-1 px-3 py-1 rounded-full border border-[#0a84ff]/30 hover:bg-[#0a84ff]/10 transition-colors"
                >
                  <span>View Details</span>
                </motion.button>
              )}
            </div>
          </div>
        </div>
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
    <div id="projects" className="section bg-black relative overflow-hidden py-24">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black"></div>
      
      {/* Glowing lines in background */}
      <div className="absolute left-0 top-20 w-full h-[1px] bg-gradient-to-r from-transparent via-[#0a84ff]/30 to-transparent"></div>
      <div className="absolute left-0 bottom-20 w-full h-[1px] bg-gradient-to-r from-transparent via-[#0a84ff]/30 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={titleVariants}
          className="mb-20 text-center"
        >
          <motion.div 
            className="inline-block mb-5 px-4 py-1.5 bg-[#0a84ff]/10 border border-[#0a84ff]/30 rounded-full"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-sm text-[#0a84ff] font-mono uppercase tracking-wider">JARVIS OS // Projects Database</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Recent <span className="text-[#0a84ff]">Projects</span>
          </h2>
          
          <motion.p 
            className="text-lg text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Interactive showcases of cutting-edge development work. 
            Hover over projects to analyze technology stacks.
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;
