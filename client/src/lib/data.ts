// Project data
export const projects = [
  {
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce platform with React, Node.js, and Stripe integration for payments. Features include product filtering, cart management, and user authentication.",
    image: "https://pixabay.com/get/g7b951a1de785097e0812f6a5975b10b28e1063c7d45327d2b5bc242b770fdfdb0919aff800857c6280d0c5dc423367ec2542bb41cb609920fd879a474c12f190_1280.jpg",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "JWT"],
    github: "https://github.com",
    demo: "https://example.com",
    type: "Full Stack"
  },
  {
    title: "Real-time Chat Application",
    description: "A real-time messaging platform built with React and Firebase. Includes features like user presence, message read status, and media sharing capabilities.",
    image: "https://pixabay.com/get/ge2bd56a13b775bb49199fcf44ca2c4c048856c85fd496bf4dc6cc126ad97b7ec6b114bb3851a14bf40f4beafb4cc956140fb124bff64114dc78cc0a32a1e671b_1280.jpg",
    technologies: ["React", "Firebase", "Firestore", "Material UI"],
    github: "https://github.com",
    demo: "https://example.com",
    type: "Frontend"
  },
  {
    title: "Task Management System",
    description: "A productivity app for team task management with drag-and-drop interfaces, task assignments, deadlines, and progress tracking.",
    image: "https://pixabay.com/get/g52b3d0ed12b78850348b8fdf131514cf1370c3ae77d217496e3a53f98837969c8b77ff3de923470fb0c6ec0a496e5798cd6e55aa3f59918dfeaa4f2300078f08_1280.jpg",
    technologies: ["React", "Redux", "Express", "MongoDB", "Socket.io"],
    github: "https://github.com",
    demo: "https://example.com",
    type: "Full Stack"
  },
  {
    title: "Portfolio Website",
    description: "A responsive portfolio website showcasing creative work with animations, filtering, and contact functionality.",
    image: "https://pixabay.com/get/g6d0aabf5cee6143f3ae943e2df0b68d194c26780f80b98c4f62bc946ddaaf7e2c68aa2f3fb7ee06a05585c11841285d8c660d1742181d1c9362e4d7b165bfcea_1280.jpg",
    technologies: ["React", "GSAP", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com",
    demo: "https://example.com",
    type: "Frontend"
  },
  {
    title: "Weather Dashboard",
    description: "A weather app with 7-day forecasts, location detection, and interactive data visualization for temperature, humidity, and wind conditions.",
    image: "https://pixabay.com/get/gaed0dca3ca37856622a542b817563a811da97d29031ff63503fb6d43021de3fec18510b161aecb6e9bb4f90eec84455e0ded5b2e345c7471060b6f6f0ce2d6fc_1280.jpg",
    technologies: ["React", "Chart.js", "OpenWeather API", "Geolocation API"],
    github: "https://github.com",
    demo: "https://example.com",
    type: "Frontend"
  },
  {
    title: "Fitness Tracker",
    description: "A mobile-responsive fitness tracking application with workout planning, progress visualization, and social sharing features.",
    image: "https://pixabay.com/get/gaad4732fb91a744beff4b01bb73b15385d62b946df3d70625e6f90821e2a8f3c31ee1ee19261288c191747a56c0b9ee296d1d388d6489cc5e3a3b8866c64361b_1280.jpg",
    technologies: ["React", "Node.js", "Express", "MongoDB", "D3.js"],
    github: "https://github.com",
    demo: "https://example.com",
    type: "Full Stack"
  }
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
    ]
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js", level: 82 },
      { name: "Express.js", level: 80 },
      { name: "MongoDB", level: 78 },
      { name: "SQL", level: 75 },
      { name: "Firebase", level: 80 },
    ]
  },
  {
    name: "Tools",
    skills: [
      { name: "Git", level: 85 },
      { name: "GitHub", level: 88 },
      { name: "Figma", level: 78 },
      { name: "VS Code", level: 90 },
      { name: "Webpack", level: 75 },
    ]
  },
  {
    name: "Other",
    skills: [
      { name: "Three.js", level: 70 },
      { name: "GSAP", level: 75 },
      { name: "Testing", level: 65 },
      { name: "Responsive Design", level: 92 },
      { name: "Performance Optimization", level: 80 },
    ]
  }
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
      "Led a team of 5 developers to deliver projects on time",
      "Optimized app performance, reducing load time by 40%",
      "Integrated payment gateways and security features"
    ],
    logo: "/company-logo-1.svg"
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
      "Mentored junior developers in frontend technologies"
    ],
    logo: "/company-logo-2.svg"
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
      "Optimized websites for search engines and performance"
    ],
    logo: "/company-logo-3.svg"
  }
];

// Testimonials data if needed
export const testimonials = [
  {
    name: "Jane Smith",
    role: "CEO at TechCorp",
    text: "John delivered an exceptional website that exceeded our expectations. His attention to detail and technical expertise are impressive.",
    image: "/testimonial-1.jpg"
  },
  {
    name: "Michael Johnson",
    role: "Marketing Director",
    text: "Working with John was a pleasure. He understood our vision and transformed it into a beautiful, functional website.",
    image: "/testimonial-2.jpg"
  },
  {
    name: "Emily Brown",
    role: "Startup Founder",
    text: "John's technical skills and creativity helped us launch our platform ahead of schedule. He's responsive and delivers quality work.",
    image: "/testimonial-3.jpg"
  }
];
