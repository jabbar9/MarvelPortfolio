// Project data - Reduced to 3 highlighted projects with AI/tech focus
export const projects = [
  {
    title: "Hotel Booking System Development",
    description: `Developed a full-stack Hotel Booking System with React.js,
 TypeScript, MongoDB Atlas, and Express, creating 20+ React
 components and 15+ API endpoints. `,
    image:
      "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    technologies: [
      "React",
      "Typescript",
      "MongoDB Atlas",
      "Express",
      "Tailwind CSS",
    ],
    github: "https://github.com/jabbar9/mern-booking-app",
    demo: "https://mern-booking-app-79tr.onrender.com/",
    type: "Web Application",
    features: [
      "Auth system with secure access control",
      "Image handling via Cloudinary",
      "Tested flows ensuring uptime & UX",
    ],
  },
  {
    title: "Food Ordering Website Development",
    description: `Built a responsive Food Ordering Website using React for
 dynamic front-end interactions and MongoDB for scalable data
 storage. Integrated Stripe for secure payment processing.`,
    image:
      "https://images.pexels.com/photos/7054889/pexels-photo-7054889.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    technologies: [
      "React",
      "Typescript",
      "MongoDB Atlas",
      "Stripe",
      "AWS - EC2",
    ],
    github: "https://github.com/jabbar9/food-delivery",
    demo: "https://food-delivery-frontend-3orv.onrender.com",
    type: "Web Application",
    features: [
      "Stripe integration for secure payments",
      "Secure auth with Express.js",
      "Optimized deployment on Render",
    ],
  },
  {
    title: "Portolio Website",
    description:
      "A futuristic data visualization dashboard inspired by Tony Stark's Jarvis. Features real-time analytics, predictive insights, and voice controls.",
    image:
      "https://images.pexels.com/photos/7054528/pexels-photo-7054528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    technologies: [
      "React",
      "Typescript",
      "MongoDB Atlas",
      "Express",
      "Tailwind CSS",
    ],
    github: "https://github.com/jabbar9/PortfolioWebsite",
    demo: "https://jabbar9.github.io/PortfolioWebsite/",
    type: "Web Application",
    features: [
      "Responsive UI with smooth scroll",
      "GitHub Pages for fast deployment",
      "Complete AI Generated Code",
    ],
  },
];

// Skill categories
export const skillCategories = [
  {
    name: "Frontend",
    skills: [
      { name: "React", level: 90 },
      { name: "React Native", level: 85 },
      { name: "Next.js", level: 88 },
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 90 },
      { name: "JavaScript", level: 92 },
      { name: "Tailwind", level: 88 },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js", level: 82 },
      { name: "Express.js", level: 80 },
      { name: "MongoDB", level: 78 },
      { name: "SQL", level: 75 },
      { name: "Firebase", level: 80 },
    ],
  },
  {
    name: "Tools",
    skills: [
      { name: "Git", level: 85 },
      { name: "GitHub", level: 88 },
      { name: "Figma", level: 78 },
      { name: "VS Code", level: 90 },
      { name: "Webpack", level: 75 },
    ],
  },
  {
    name: "Other",
    skills: [
      { name: "Three.js", level: 70 },
      { name: "GSAP", level: 75 },
      { name: "Testing", level: 65 },
      { name: "Responsive Design", level: 92 },
      { name: "Performance Optimization", level: 80 },
    ],
  },
];

// Experience data
export const experiences = [
  {
    company: "World Retail Exchange",
    role: "App Developer",
    period: "2019 - Present",
    achievements: [
      "Published 50+ apps for top global retailers",
      "Designed and implemented a white-labelling system",
      "Led a team of developers to deliver projects on time",
      "Optimized app performance, reducing load time by 40%",
      "Integrated payment gateways and security features",
    ],
    logo: "/company-logo-1.svg",
  },
  {
    company: "TechStart Solutions",
    role: "Frontend Developer",
    period: "2017 - 2019",
    achievements: [
      "Built responsive web applications using React",
      "Developed custom UI components and libraries",
      "Collaborated with designers to implement pixel-perfect interfaces",
      "Improved website accessibility according to WCAG standards",
      "Mentored junior developers in frontend technologies",
    ],
    logo: "/company-logo-2.svg",
  },
  {
    company: "Digital Innovations",
    role: "Web Developer Intern",
    period: "2016 - 2017",
    achievements: [
      "Assisted in developing and maintaining multiple client websites",
      "Implemented responsive designs for mobile compatibility",
      "Created interactive features using JavaScript and jQuery",
      "Collaborated with the design team on UI improvements",
      "Optimized websites for search engines and performance",
    ],
    logo: "/company-logo-3.svg",
  },
];

// Testimonials data if needed
export const testimonials = [
  {
    name: "Jane Smith",
    role: "CEO at TechCorp",
    text: "John delivered an exceptional website that exceeded our expectations. His attention to detail and technical expertise are impressive.",
    image: "/testimonial-1.jpg",
  },
  {
    name: "Michael Johnson",
    role: "Marketing Director",
    text: "Working with John was a pleasure. He understood our vision and transformed it into a beautiful, functional website.",
    image: "/testimonial-2.jpg",
  },
  {
    name: "Emily Brown",
    role: "Startup Founder",
    text: "John's technical skills and creativity helped us launch our platform ahead of schedule. He's responsive and delivers quality work.",
    image: "/testimonial-3.jpg",
  },
];
