import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { User, Code, Lightbulb, Award, Cpu } from "lucide-react";

const AboutSection = () => {
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
  
  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        delay: 0.2
      } 
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({ 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        delay: 0.3 + (i * 0.1)
      } 
    })
  };
  
  const qualities = [
    {
      icon: <Code size={24} />,
      title: "Clean Code",
      description: "I write clean, maintainable code with a focus on readability and performance."
    },
    {
      icon: <Lightbulb size={24} />,
      title: "Problem Solver",
      description: "I approach complex challenges with creative solutions and analytical thinking."
    },
    {
      icon: <Award size={24} />,
      title: "Quality Focus",
      description: "I believe in delivering pixel-perfect UIs with attention to the smallest details."
    },
    {
      icon: <Cpu size={24} />,
      title: "Continuous Learner",
      description: "I constantly stay updated with the latest technologies and best practices."
    }
  ];
  
  return (
    <div className="section bg-background relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 bg-[url('/textures/sky.png')] opacity-5 bg-cover bg-center"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={titleVariants}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-marvel-gold">The Person Behind the Suit</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Get to know the developer behind the digital creations.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate={controls}
            className="relative"
          >
            <div className="hud-element p-6 relative overflow-hidden">
              <div className="hud-corner hud-corner-tl"></div>
              <div className="hud-corner hud-corner-tr"></div>
              <div className="hud-corner hud-corner-bl"></div>
              <div className="hud-corner hud-corner-br"></div>
              
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 bg-marvel-red/50 p-3 rounded-full">
                  <User size={24} className="text-marvel-gold" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Abdul Jabbar</h3>
                  <p className="text-marvel-gold">Web Developer & UI/UX Enthusiast</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-4">
                Proficient in building and deploying full-stack applications using React, Node.js, MongoDB, and AWS. My work spans secure authentication, responsive design, and seamless payment integrations, with a focus on white-labeled mobile app deployment.
              </p>
              
              <p className="text-gray-300 mb-4">
                As Web Development Lead for the Google Cloud Study Jam through the Google Developer Students Club, I mentored peers, led collaborative sessions, and inspired innovation.
              </p>
              
              <p className="text-gray-300">
                Holding a Computer Science degree and certifications in Java, DSA, and Web Development, I bring a strong foundation in both frontend and backend development, always prioritizing efficient, scalable, and user-centric solutions.
              </p>
              
              {/* Animated border */}
              <div className="absolute bottom-0 left-0 w-full h-1 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-marvel-red via-marvel-gold to-marvel-red animate-pulse"></div>
              </div>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {qualities.map((quality, index) => (
              <motion.div
                key={quality.title}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate={controls}
                className="hud-element p-5 relative hover:transform hover:scale-105 transition-transform duration-300"
              >
                <div className="hud-corner hud-corner-tl"></div>
                <div className="hud-corner hud-corner-tr"></div>
                <div className="hud-corner hud-corner-bl"></div>
                <div className="hud-corner hud-corner-br"></div>
                
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex-shrink-0 bg-marvel-red/30 p-2 rounded text-marvel-gold">
                    {quality.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{quality.title}</h3>
                </div>
                
                <p className="text-gray-400">{quality.description}</p>
                
                {/* Corner decorations */}
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-marvel-gold/30"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-marvel-gold/30"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
