
import { 
  Code2, 
  Trophy, 
  Brain, 
  ShieldCheck, 
  Terminal, 
  Zap, 
  Cpu, 
  Bot, 
  Puzzle, 
  Mic2, 
  Gamepad2, 
  Map,
  Globe
} from 'lucide-react';

export type EventDetail = {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  category: "Tech Track" | "Workshops" | "IoT Zone" | "Fun & Mind" | "Gaming";
  iconName: string;
  imgId: string;
  color: string;
  rules: string[];
  prize: string;
  isTechnical: boolean;
};

export const eventsData: EventDetail[] = [
  {
    slug: "flagship-hackathon",
    title: "Flagship Hackathon",
    description: "24-hour intense coding challenge focusing on AI for Good, Sustainability, and FinTech.",
    longDescription: "Our signature 24-hour hackathon brings together the brightest minds to solve real-world problems. This year's themes focus on building sustainable solutions, leveraging AI for social impact, and innovating in the financial technology sector. Mentors from industry leaders will be present to guide teams through their development process.",
    category: "Tech Track",
    iconName: "Code2",
    imgId: "event-coding",
    color: "text-primary",
    rules: ["Teams of 2-4 members", "Original code only", "Mandatory check-ins every 6 hours", "Final presentation to the jury"],
    prize: "$5,000 Total Pool",
    isTechnical: true
  },
  {
    slug: "project-exhibition",
    title: "Project Exhibition",
    description: "Live showcase of prototypes, working projects & research judged by industry experts.",
    longDescription: "A platform for students to exhibit their innovative projects and research findings. Whether it's a hardware prototype or a complex software solution, this exhibition allows you to pitch your work to industry veterans and academic experts. Outstanding projects may receive incubation support.",
    category: "Tech Track",
    iconName: "Trophy",
    imgId: "hero-tech",
    color: "text-accent",
    rules: ["Max 3 members per project", "Functional prototype required", "Poster presentation mandatory", "Q&A session with judges"],
    prize: "Seed Funding Opportunities",
    isTechnical: true
  },
  {
    slug: "ai-ml-workshop",
    title: "AI / ML Workshop",
    description: "Hands-on session with certification covering modern Artificial Intelligence & Machine Learning.",
    longDescription: "Dive deep into the world of neural networks, deep learning, and generative models. This hands-on workshop provides practical experience with popular frameworks and covers the deployment of AI models in real-world scenarios. Participants receive a verified certification upon completion.",
    category: "Workshops",
    iconName: "Brain",
    imgId: "event-ai",
    color: "text-blue-400",
    rules: ["Personal laptop required", "Basic Python knowledge recommended", "100% attendance for certificate", "Pre-installation of tools is mandatory"],
    prize: "Professional Certification",
    isTechnical: true
  },
  {
    slug: "cybersecurity-essentials",
    title: "Cybersecurity Essentials",
    description: "Master the fundamentals of digital defense and threat mitigation in this certified workshop.",
    longDescription: "Learn the core principles of network security, ethical hacking, and vulnerability assessment. This workshop covers defensive strategies against modern cyber threats and provides a pathway to professional security certifications.",
    category: "Workshops",
    iconName: "ShieldCheck",
    imgId: "hero-tech",
    color: "text-red-400",
    rules: ["Laptop with virtualization support", "Ethics agreement signature required", "Practical lab completion", "Final assessment test"],
    prize: "Security Specialist Badge",
    isTechnical: true
  },
  {
    slug: "full-stack-workshop",
    title: "Full-Stack Web Dev",
    description: "Modern web development workshop focusing on Next.js, Tailwind, and Firebase integration.",
    longDescription: "Build scalable and performant web applications using the latest industry standards. This session covers frontend architecture, serverless backends, and deployment strategies for production-grade apps.",
    category: "Workshops",
    iconName: "Globe",
    imgId: "event-coding",
    color: "text-indigo-400",
    rules: ["Basic JS/TS knowledge", "Development environment setup", "Complete a mini-project", "Participation in code review"],
    prize: "Tech Aura Dev Certificate",
    isTechnical: true
  },
  {
    slug: "blind-coding",
    title: "Blind Coding",
    description: "The ultimate challenge: code without syntax highlighting or auto-complete. Only logic remains.",
    longDescription: "Testing the pure logic and muscle memory of developers. In this competition, syntax highlighting, auto-completion, and even the monitor itself might be disabled at certain phases. It's a true test of a programmer's mastery over their chosen language.",
    category: "Tech Track",
    iconName: "Terminal",
    imgId: "event-coding",
    color: "text-green-400",
    rules: ["Solo participation", "Fixed time limit: 30 mins", "No internet access", "Compilation errors result in disqualification"],
    prize: "Mechanical Keyboard Pro",
    isTechnical: true
  },
  {
    slug: "coding-speed-test",
    title: "Coding Speed Test",
    description: "Lightning-fast competitive programming with real-time leaderboard tracking.",
    longDescription: "A high-pressure environment where speed meets accuracy. Solve a series of algorithmic challenges as fast as possible. The live leaderboard keeps the adrenaline pumping as participants climb to the top.",
    category: "Tech Track",
    iconName: "Zap",
    imgId: "hero-tech",
    color: "text-yellow-400",
    rules: ["Standard platform login", "Pre-registered ID required", "No external help", "Automated grading system"],
    prize: "Premium Tech Subscription",
    isTechnical: true
  },
  {
    slug: "iot-exhibition",
    title: "IoT Exhibition",
    description: "Display of smart devices and innovative connected solutions from across the country.",
    longDescription: "Witness the future of the internet of things. This exhibition showcases smart home devices, industrial IoT solutions, and wearable technology designed by student innovators. Explore how connected devices are reshaping our daily lives.",
    category: "IoT Zone",
    iconName: "Cpu",
    imgId: "event-robotics",
    color: "text-cyan-400",
    rules: ["Functional hardware required", "Technical documentation", "Safety certification for power", "5-minute demo slot"],
    prize: "Innovation Excellence Award",
    isTechnical: true
  },
  {
    slug: "robo-rush",
    title: "ROBO Rush",
    description: "High-octane robotics challenges: line followers, obstacle courses, and mini combat bots.",
    longDescription: "The arena awaits! Experience the thrill of autonomous and remote-controlled robotics. From precision line followers navigating complex tracks to the brute force of mini combat bots, Robo Rush is where engineering meets entertainment.",
    category: "IoT Zone",
    iconName: "Bot",
    imgId: "event-robotics",
    color: "text-orange-400",
    rules: ["Standard bot dimensions", "No pyrotechnics", "Two retry attempts allowed", "Weight categories apply"],
    prize: "Robotics Kit + Cash Prize",
    isTechnical: true
  },
  {
    slug: "maths-quiz",
    title: "Maths Quiz",
    description: "Test your logic with puzzles, quantitative aptitude, and brain-bending teasers.",
    longDescription: "A mental marathon for those who find beauty in numbers. The quiz covers everything from complex calculus to logical puzzles that will challenge your thinking speed and accuracy.",
    category: "Fun & Mind",
    iconName: "Puzzle",
    imgId: "hero-tech",
    color: "text-yellow-400",
    rules: ["Solo or Teams of 2", "Multiple Choice Rounds", "Rapid Fire Finale", "No calculators allowed"],
    prize: "Logic Master Trophy",
    isTechnical: false
  },
  {
    slug: "debate",
    title: "Debate",
    description: "Topical showdowns on AI ethics and the impact of social media on mental health.",
    longDescription: "Engage in critical discussions about the technologies shaping our world. From the ethical implications of AI to the sociological impact of digital platforms, this is the place to voice your perspective and challenge conventional wisdom.",
    category: "Fun & Mind",
    iconName: "Mic2",
    imgId: "hero-tech",
    color: "text-pink-400",
    rules: ["Opening statements (3m)", "Rebuttal phase (2m)", "Closing remarks (2m)", "Respectful conduct mandatory"],
    prize: "Best Orator Award",
    isTechnical: false
  },
  {
    slug: "esports-tournament",
    title: "eSports Tournament",
    description: "Battle for glory in BGMI and Free Fire. Available in team and solo formats.",
    longDescription: "The ultimate digital arena. Join hundreds of players in a battle for survival and strategic dominance. Our professionally managed tournament features live casting and real-time streaming of the final matches.",
    category: "Gaming",
    iconName: "Gamepad2",
    imgId: "event-gaming",
    color: "text-purple-400",
    rules: ["Stable mobile device required", "No emulators allowed", "Standard game rules apply", "Team lead must be present 15m early"],
    prize: "Gaming Peripheral Bundle",
    isTechnical: false
  },
  {
    slug: "treasure-hunt",
    title: "Treasure Hunt",
    description: "A campus-wide adventure filled with riddles and high-stakes team challenges.",
    longDescription: "Solve the clues to unlock the secrets of the campus. This physical and mental challenge requires teamwork, lateral thinking, and a bit of speed as you navigate from one waypoint to the next.",
    category: "Fun & Mind",
    iconName: "Map",
    imgId: "hero-tech",
    color: "text-teal-400",
    rules: ["Teams of 4", "Smartphone with QR scanner", "Stay within campus boundaries", "No physical tampering with clues"],
    prize: "Adventure Quest Mystery Box",
    isTechnical: false
  }
];
