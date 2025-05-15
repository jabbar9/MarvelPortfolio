import { useRef, useEffect, useState, FormEvent } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useAudio } from "../lib/stores/useAudio";
import { Mail, Github, Linkedin, Twitter, Send } from "lucide-react";
import JarvisUI from "./JarvisUI";

const ContactSection = () => {
  const ref = useRef(null);
  const controls = useAnimation();
  const inView = useInView(ref, { once: false, amount: 0.2 });
  const { playHit, playSuccess } = useAudio();
  
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
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
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    playHit();
    
    // Simulate form submission
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      playSuccess();
      
      // Reset form after submission
      setFormState({
        name: "",
        email: "",
        message: ""
      });
      
      // Reset submitted state after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, 1500);
  };
  
  const socialLinks = [
    { name: "GitHub", icon: <Github size={20} />, url: "https://github.com" },
    { name: "LinkedIn", icon: <Linkedin size={20} />, url: "https://linkedin.com" },
    { name: "Twitter", icon: <Twitter size={20} />, url: "https://twitter.com" }
  ];
  
  return (
    <div className="section bg-background relative overflow-hidden">
      <JarvisUI />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={titleVariants}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-marvel-gold">Mission Briefing</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Have a mission for me? Let's connect and discuss your project.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
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
              
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Mail className="mr-2 text-marvel-gold" />
                Contact Information
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg text-marvel-gold mb-2">Email</h4>
                  <p className="text-white">shaikhabduldev@gmail.com</p>
                </div>
                
                <div>
                  <h4 className="text-lg text-marvel-gold mb-2">Location</h4>
                  <p className="text-white">Mumbai Maharashtra, India</p>
                </div>
                
                <div>
                  <h4 className="text-lg text-marvel-gold mb-4">Connect</h4>
                  <div className="flex space-x-4">
                    {socialLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-marvel-red/20 hover:bg-marvel-red/40 text-white p-3 rounded-full transition-colors duration-300"
                        aria-label={link.name}
                        onMouseEnter={() => playHit()}
                      >
                        {link.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-10 p-4 border border-marvel-gold/30 rounded-md bg-marvel-red/10">
                <h4 className="text-marvel-gold mb-2">Available for Work</h4>
                <p className="text-gray-300 text-sm">
                  I'm currently available for freelance work and exciting projects. 
                  Let's build something amazing together!
                </p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate={controls}
            className="relative"
          >
            <div className="jarvis-ui relative overflow-hidden">
              <div className="hud-element p-6 relative">
                <div className="hud-corner hud-corner-tl"></div>
                <div className="hud-corner hud-corner-tr"></div>
                <div className="hud-corner hud-corner-bl"></div>
                <div className="hud-corner hud-corner-br"></div>
                
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-white">Send Message</h3>
                  <div className="px-2 py-1 bg-marvel-red/20 text-marvel-gold text-xs rounded">
                    J.A.R.V.I.S. INTERFACE
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-marvel-gold/30 focus:border-marvel-gold text-white rounded-md focus:outline-none focus:ring-1 focus:ring-marvel-gold transition-colors duration-300"
                      placeholder="Tony Stark"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-marvel-gold/30 focus:border-marvel-gold text-white rounded-md focus:outline-none focus:ring-1 focus:ring-marvel-gold transition-colors duration-300"
                      placeholder="tony@starkindustries.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-background border border-marvel-gold/30 focus:border-marvel-gold text-white rounded-md focus:outline-none focus:ring-1 focus:ring-marvel-gold transition-colors duration-300 resize-none"
                      placeholder="I'm looking for a web developer to help with a project..."
                    />
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      disabled={loading || submitted}
                      className={`w-full flex items-center justify-center py-3 px-6 rounded-md text-white transition-all duration-300 ${
                        submitted 
                          ? "bg-green-600 hover:bg-green-700" 
                          : "bg-marvel-red hover:bg-marvel-red/90"
                      } relative overflow-hidden group`}
                    >
                      <span className="relative z-10 flex items-center">
                        {loading ? (
                          "Processing..."
                        ) : submitted ? (
                          "Message Sent!"
                        ) : (
                          <>
                            Send Message <Send size={18} className="ml-2" />
                          </>
                        )}
                      </span>
                      
                      {/* Animated background effect */}
                      <span className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-r from-marvel-gold/0 via-marvel-gold/50 to-marvel-gold/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                    </button>
                  </div>
                </form>
                
                {/* Blinking cursor effect at bottom */}
                <div className="mt-8 h-5 flex items-center">
                  <span className="text-sm text-gray-500 mr-2">// End transmission</span>
                  <div className="w-2 h-4 bg-marvel-gold animate-pulse"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="mt-20 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Abdul Jabbar. Built with React, Three.js, and GSAP.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
