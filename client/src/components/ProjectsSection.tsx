import { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useAudio } from "../lib/stores/useAudio";
import { Github, ExternalLink } from "lucide-react";
import { projects } from "../lib/data";

const ProjectCard = ({ project, index }: { project: typeof projects[0], index: number }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.2 });
  const { playHit } = useAudio();
  const [hovered, setHovered] = useState(false);
  
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
        delay: index * 0.1 
      } 
    }
  };
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={cardVariants}
      className="group relative hud-element overflow-hidden"
      onMouseEnter={() => {
        setHovered(true);
        playHit();
      }}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="hud-corner hud-corner-tl"></div>
      <div className="hud-corner hud-corner-tr"></div>
      <div className="hud-corner hud-corner-bl"></div>
      <div className="hud-corner hud-corner-br"></div>
      
      {/* Target reticle that appears when hovering */}
      {hovered && (
        <>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
            <div className="w-20 h-20 border-2 border-marvel-gold rounded-full opacity-50 animate-ping"></div>
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
            <div className="w-10 h-10 border border-marvel-gold rounded-full"></div>
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
            <div className="w-2 h-2 bg-marvel-gold rounded-full"></div>
          </div>
          
          {/* Repulsor beam from center of screen to project */}
          <div className="repulsor-beam"></div>
        </>
      )}
      
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
          <p className="text-gray-400 text-sm h-20 overflow-hidden">{project.description}</p>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span 
              key={tech} 
              className="text-xs bg-marvel-red/20 text-marvel-gold px-2 py-1 rounded-sm"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            <a 
              href={project.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-marvel-gold transition-colors duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={20} />
            </a>
            <a 
              href={project.demo} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-marvel-gold transition-colors duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={20} />
            </a>
          </div>
          
          <div className="text-xs text-marvel-gold font-medium uppercase tracking-wider">
            {project.type}
          </div>
        </div>
      </div>
      
      {/* Preview image that slides up on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-transparent z-[-1]"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 z-[-2]"
        style={{ 
          backgroundImage: `url(${project.image})`,
          transform: hovered ? "scale(1.1)" : "scale(1)"
        }}
      ></div>
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
    <div className="section bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/textures/sky.png')] opacity-5 bg-cover bg-center"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={titleVariants}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-marvel-gold">Mission Portfolio</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Key operations completed in the field of web development.
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
