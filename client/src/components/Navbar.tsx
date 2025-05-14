import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "../lib/stores/useAudio";
import { Menu, X, Volume2, VolumeX } from "lucide-react";

const navLinks = [
  { href: "#hero", label: "Home" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isMuted, toggleMute, backgroundMusic, playHit } = useAudio();

  // Handle scroll event to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
          isScrolled ? "bg-background/80 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <a href="#hero" className="flex items-center" onClick={handleNavClick}>
                <span className="text-marvel-gold text-xl font-bold tracking-wider">
                  JOHN<span className="text-marvel-red">DOE</span>
                </span>
              </a>
            </div>

            {/* Desktop menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={handleNavClick}
                    className="relative text-white hover:text-marvel-gold px-3 py-2 text-sm font-medium tracking-wider transition-colors duration-300 overflow-hidden group"
                  >
                    <span>{link.label}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-marvel-gold transition-all duration-300 group-hover:w-full"></span>
                  </a>
                ))}
                <button
                  onClick={handleStartMusic}
                  className="text-white hover:text-marvel-gold p-2 rounded-full transition-colors duration-300"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={handleStartMusic}
                className="text-white hover:text-marvel-gold p-2 mr-2 rounded-full transition-colors duration-300"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(!mobileMenuOpen);
                  playHit();
                }}
                className="text-white hover:text-marvel-gold rounded-md p-2 transition-colors duration-300"
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
            className="md:hidden fixed top-16 inset-x-0 z-30 bg-background/95 backdrop-blur-md border-b border-marvel-red/20"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleNavClick}
                  className="text-white hover:bg-marvel-red/10 hover:text-marvel-gold block px-3 py-2 rounded-md text-base font-medium border border-transparent hover:border-marvel-gold/30 transition-all duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
