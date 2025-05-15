import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useAudio } from "../lib/stores/useAudio";
import JarvisUI from "./JarvisUI";

const experiences = [
  {
    company: "World Retail Exchange",
    role: "App Developer",
    period: "2025 - Present",
    achievements: [
      "Published 50+ apps for top global retailers",
      "Designed and implemented a white-labelling system",
      "Led a team of 5 developers to deliver projects on time",
      "Optimized app performance, reducing load time by 40%",
      "Integrated payment gateways and security features"
    ],
    logo: "https://via.placeholder.com/100"
  },
  {
    company: "TechStart Solutions",
    role: "Frontend Developer",
    period: "2024 - 2025",
    achievements: [
      "Built responsive web applications using React",
      "Developed custom UI components and libraries",
      "Collaborated with designers to implement pixel-perfect interfaces",
      "Improved website accessibility according to WCAG standards",
      "Mentored junior developers in frontend technologies"
    ],
    logo: "https://via.placeholder.com/100"
  }
];

const ExperienceCard = ({ experience, index }: { experience: typeof experiences[0], index: number }) => {
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
    hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.6, 
        delay: index * 0.2 
      } 
    }
  };
  
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: index * 0.2 + 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={cardVariants}
      className="hud-element p-6 mb-8 relative group"
      onMouseEnter={() => playHit()}
    >
      <div className="hud-corner hud-corner-tl"></div>
      <div className="hud-corner hud-corner-tr"></div>
      <div className="hud-corner hud-corner-bl"></div>
      <div className="hud-corner hud-corner-br"></div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0 flex items-start justify-center">
          {/* Company logo placeholder - we'll use a styled div instead of an image */}
          <div className="w-20 h-20 bg-marvel-red/20 rounded-full flex items-center justify-center border border-marvel-gold/30">
            <span className="text-marvel-gold font-bold">{experience.company.split(' ').map(word => word[0]).join('')}</span>
          </div>
        </div>
        
        <div className="flex-grow">
          <h3 className="text-2xl font-bold text-white mb-1">{experience.role}</h3>
          <div className="flex items-center mb-3">
            <h4 className="text-lg text-marvel-gold">{experience.company}</h4>
            <span className="mx-2 text-gray-500">•</span>
            <span className="text-sm text-gray-400">{experience.period}</span>
          </div>
          
          <motion.ul variants={listVariants} className="space-y-2">
            {experience.achievements.map((achievement, i) => (
              <motion.li 
                key={i} 
                variants={itemVariants}
                className="flex items-start"
              >
                <span className="text-marvel-gold mr-2">›</span>
                <span className="text-gray-300">{achievement}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
      
      {/* Scanning effect that appears on hover */}
      <motion.div 
        initial={{ scaleX: 0, opacity: 0 }}
        whileHover={{ scaleX: 1, opacity: 0.1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-marvel-gold to-transparent origin-left"
      />
    </motion.div>
  );
};

const ExperienceSection = () => {
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
      <JarvisUI reversed />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={titleVariants}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-marvel-gold">Work Experience</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            On Field Experience of Web & App Development.
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          {experiences.map((experience, index) => (
            <ExperienceCard key={experience.company} experience={experience} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;
