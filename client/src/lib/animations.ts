import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Initialize GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Animate element from opacity 0 to 1 when scrolled into view
 */
export const fadeInOnScroll = (
  element: string | Element,
  options: {
    delay?: number;
    duration?: number;
    y?: number;
    x?: number;
    start?: string;
    markers?: boolean;
  } = {}
) => {
  const {
    delay = 0,
    duration = 0.8,
    y = 30,
    x = 0,
    start = "top 80%",
    markers = false,
  } = options;

  gsap.fromTo(
    element,
    { opacity: 0, y, x },
    {
      opacity: 1,
      y: 0,
      x: 0,
      duration,
      delay,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start,
        markers,
      },
    }
  );
};

/**
 * Animate Iron Man to fly in a path around the element
 */
export const ironManFlyAnimation = (
  ironManElement: string | Element,
  containerElement: string | Element
) => {
  // Create a curved path animation
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: containerElement,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  });

  timeline.to(ironManElement, {
    motionPath: {
      path: [
        { x: -100, y: 0 },
        { x: 0, y: 100 },
        { x: 100, y: 0 },
        { x: 0, y: -100 },
        { x: -100, y: 0 },
      ],
      curviness: 1.5,
    },
    duration: 5,
    ease: "none",
  });

  return timeline;
};

/**
 * Create HUD scanning effect over an element
 */
export const hudScanEffect = (element: string | Element) => {
  const timeline = gsap.timeline({
    repeat: -1,
    repeatDelay: 1,
  });

  timeline
    .fromTo(
      element,
      { boxShadow: "0 0 0 0 rgba(246, 190, 0, 0)" },
      {
        boxShadow: "0 0 10px 1px rgba(246, 190, 0, 0.7)",
        duration: 0.5,
        ease: "power2.out",
      }
    )
    .to(element, {
      boxShadow: "0 0 0 0 rgba(246, 190, 0, 0)",
      duration: 0.5,
      ease: "power2.in",
    });

  return timeline;
};

/**
 * Create typing text animation for Jarvis UI
 */
export const typingAnimation = (
  element: string | Element,
  text: string,
  duration: number = 2
) => {
  const timeline = gsap.timeline();
  
  // First clear the element
  timeline.set(element, { innerHTML: "" });
  
  // Type the text one character at a time
  const chars = text.split("");
  chars.forEach((char, index) => {
    timeline.add(() => {
      const el = typeof element === "string" ? document.querySelector(element) : element;
      if (el) {
        el.innerHTML += char;
      }
    }, index * (duration / chars.length));
  });
  
  return timeline;
};

/**
 * Reveal section with Iron Man effect
 */
export const revealSection = (
  sectionElement: string | Element,
  options: {
    delay?: number;
    duration?: number;
    from?: "top" | "bottom" | "left" | "right";
  } = {}
) => {
  const { delay = 0, duration = 1, from = "bottom" } = options;
  
  let initialX = 0;
  let initialY = 0;
  
  switch (from) {
    case "top":
      initialY = -100;
      break;
    case "bottom":
      initialY = 100;
      break;
    case "left":
      initialX = -100;
      break;
    case "right":
      initialX = 100;
      break;
  }
  
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: sectionElement,
      start: "top 80%",
    },
  });
  
  timeline
    .fromTo(
      sectionElement,
      { 
        autoAlpha: 0,
        x: initialX,
        y: initialY,
      },
      {
        autoAlpha: 1,
        x: 0,
        y: 0,
        duration,
        delay,
        ease: "power2.out",
      }
    )
    .fromTo(
      `${sectionElement} > *`,
      { autoAlpha: 0, y: 20 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      },
      "-=0.3"
    );
  
  return timeline;
};
