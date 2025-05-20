import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useAudio } from "../lib/stores/useAudio";
import JarvisUI from "./JarvisUI";

const skills = [
  { name: "React", level: 90, category: "Frontend" },
  { name: "React Native", level: 85, category: "Frontend" },
  { name: "Next.js", level: 88, category: "Frontend" },
  { name: "HTML5", level: 95, category: "Frontend" },
  { name: "CSS3", level: 90, category: "Frontend" },
  { name: "JavaScript", level: 92, category: "Frontend" },
  { name: "Tailwind", level: 88, category: "Frontend" },
  { name: "Node.js", level: 82, category: "Backend" },
  { name: "Express.js", level: 80, category: "Backend" },
  { name: "Git", level: 85, category: "Tools" },
  { name: "GitHub", level: 88, category: "Tools" },
  { name: "Figma", level: 78, category: "Tools" },
  { name: "Firebase", level: 75, category: "Tools" },
  { name: "Three.js", level: 70, category: "3D" },
];

const SkillCard = ({ skill, index }: { skill: typeof skills[0], index: number }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.3 });
  const { playHit } = useAudio();
  
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
  
  const progressVariants = {
    hidden: { width: 0 },
    visible: { 
      width: `${skill.level}%`,
      transition: { 
        duration: 1, 
        delay: index * 0.1 + 0.3,
        ease: "easeOut"
      } 
    }
  };
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={cardVariants}
      className="hud-element p-4 relative group"
      onMouseEnter={() => playHit()}
    >
      <div className="hud-corner hud-corner-tl"></div>
      <div className="hud-corner hud-corner-tr"></div>
      <div className="hud-corner hud-corner-bl"></div>
      <div className="hud-corner hud-corner-br"></div>
      
      <div className="mb-2 flex justify-between items-center">
        <h3 className="text-lg font-medium text-white">{skill.name}</h3>
        <span className="text-sm text-marvel-gold">{skill.category}</span>
      </div>
      
      <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-marvel-gold rounded-full"
          variants={progressVariants}
        />
      </div>
      
      <span className="absolute -top-2 -right-2 bg-marvel-red text-white text-xs px-1.5 py-0.5 rounded-sm">
        {skill.level}%
      </span>
      
      {/* Scanning effect that appears on hover */}
      <motion.div 
        initial={{ scaleY: 0, opacity: 0 }}
        whileHover={{ scaleY: 1, opacity: 0.2 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 bg-gradient-to-b from-transparent via-marvel-gold to-transparent origin-top"
      />
    </motion.div>
  );
};

const SkillsSection = () => {
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
      {/* Background line grid for futuristic effect */}
      <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 z-0">
        {Array.from({ length: 48 }).map((_, index) => (
          <div 
            key={index} 
            className="border border-marvel-gold/5"
          />
        ))}
      </div>
      
      <JarvisUI />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={titleVariants}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-marvel-gold">Technical Arsenal</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Equipped with cutting-edge technologies to build powerful web experiences.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
