import React, { useEffect, useState } from 'react';
import { ChevronDown, Mail, Phone, Github, Linkedin, ExternalLink, Code, Database, Wrench, User, GraduationCap, Briefcase, FolderOpen, MessageCircle } from 'lucide-react';

// Custom hook for intersection observer with enhanced options
const useIntersectionObserver = (threshold = 0.1, rootMargin = '0px') => {
  const [isVisible, setIsVisible] = useState(false);
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [element, threshold, rootMargin]);

  return [setElement, isVisible] as const;
};

// Enhanced animation component wrapper with multiple animation types
const AnimatedSection: React.FC<{ 
  children: React.ReactNode; 
  className?: string; 
  delay?: number;
  animation?: 'fadeUp' | 'fadeIn' | 'fadeLeft' | 'fadeRight' | 'scale' | 'slideUp';
}> = ({ 
  children, 
  className = '', 
  delay = 0,
  animation = 'fadeUp'
}) => {
  const [setRef, isVisible] = useIntersectionObserver(0.1, '-50px');

  const getAnimationClasses = () => {
    const baseClasses = 'transition-all duration-1000 ease-out';
    
    switch (animation) {
      case 'fadeIn':
        return `${baseClasses} ${isVisible ? 'opacity-100' : 'opacity-0'}`;
      case 'fadeLeft':
        return `${baseClasses} ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'}`;
      case 'fadeRight':
        return `${baseClasses} ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'}`;
      case 'scale':
        return `${baseClasses} ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`;
      case 'slideUp':
        return `${baseClasses} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`;
      default: // fadeUp
        return `${baseClasses} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`;
    }
  };

  return (
    <div
      ref={setRef}
      className={`${getAnimationClasses()} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Staggered animation for groups of elements
const StaggeredContainer: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  const [setRef, isVisible] = useIntersectionObserver(0.1);
  
  return (
    <div ref={setRef} className={className}>
      {React.Children.map(children, (child, index) => (
        <div
          className={`transition-all duration-700 ease-out ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: `${index * 150}ms` }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

// Floating animation component
const FloatingElement: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  return (
    <div 
      className="animate-float"
      style={{ 
        animationDelay: `${delay}ms`,
        animation: `float 6s ease-in-out infinite ${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

// Smooth scroll function with enhanced easing
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const offsetTop = element.offsetTop - 80;
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }
};

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    // Loading animation
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Navbar visibility logic
      if (currentScrollY < 10) {
        // Always show navbar at the top
        setNavbarVisible(true);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setNavbarVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px
        setNavbarVisible(false);
      }
      
      setLastScrollY(currentScrollY);

      // Active section detection
      const sections = ['hero', 'about', 'education', 'projects', 'experience', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const projects = [
    {
      title: "Lost and Found Web Application",
      description: "A Website for reporting and finding lost items using machine learning with automated email notifications and image matching.",
      technologies: ["React.js", "Node.js", "Express", "MongoDB", "ML"],
      features: [
        "Automated email notifications for matching items",
        "ML-powered image and text analysis",
        "Return status tracking system"
      ],
      url: "https://github.com/Uddaayy/lost-and-found.git"
    },
    {
      title: "Recipe Bookmark and Nutrition Application",
      description: "A comprehensive MERN stack application for food enthusiasts to bookmark recipes and track nutritional information.",
      technologies: ["MongoDB", "React.js", "Node.js", "Express"],
      features: [
        "Recipe bookmarking system",
        "Ingredient analysis",
        "Health benefits display"
      ],
      url: "https://github.com/Uddaayy/Food.git"
    },
    {
      title: "Zomato Restaurant Search and Listing Application",
      description: "A MERN Stack based project for restaurant discovery and filtering.",
      technologies: ["React.js", "TypeScript", "Node.js", "MongoDB"],
      features: [
        "Search and filter restaurants by cuisine, price",
        "Enabled listings with pagination",
        "Provided detailed restaurant information"
      ],
      url: "https://github.com/Uddaayy/Zomato-listing-searching.git"
    },
    {
      title: "URL Shortener",
      description:"A web application that converts lengthy URLs into customized, shortened links for easier navigation",
      technologies: ["React.js", "Node.js", "MongoDB", "Tailwind"],
      features: [
        "Custom URL generation",
        "Link analytics dashboard",
        "Responsive UI "
      ],
      url: "https://github.com/Uddaayy/ShortURL.git"
    },
    {
      title: "FoodConnect",
      description: "FoodConnect is a specialized CRM system built to coordinate and manage stakeholders in the food donation ecosystem, including donors, partners, and beneficiaries.",
      technologies: ["Salesforce CRM","Apex","SOQL","Triggers","Flows", "Lightning Web Components (LWC)"],
      features: [
  "Automated food donation tracking",
  "Custom dashboards and reports",
  "Workflow automation for donation approvals"
],
url: "https://github.com/Uddaayy/Salesforce-Virtual-Internship.git"
    },
    {
  title: "DCVerse AI Dashboard",
  description: "Tracks social media metrics across platforms with automated reports.",
  technologies: ["React.js", "TypeScript","Tailwind"],
  features: [
    "Cross-platform data sync",
    "Responsive design",
    "Engagement insights dashboard"
  ],
  url: "https://github.com/Uddaayy/DCVerse.git"
}

  ];

  const skills = {
    "Programming Languages": ["C/C++", "JavaScript", "HTML/CSS", "SQL", "TypeScript" ,"Java", "Python(Basics)"],
    "Frameworks & Libraries":["Express.js","Flutter","React.js","C++ STL", "OpenCV"],
    "Tools & Technologies": ["VS Code", "Git", "GitHub", "MongoDB","Node.js","Postman"],
    "Soft Skills": ["Self-learning", "Presentation", "Quick Socializing", "Team Collaboration"]
  };

  return (
    <div className={`bg-black text-white min-h-screen transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Custom CSS for animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.6); }
        }
        
        .animate-gradient { animation: gradient-shift 8s ease infinite; }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        
        .glass-effect {
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          background-color: rgba(0, 0, 0, 0.7);
        }
        
        .hover-lift {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hover-lift:hover {
          transform: translateY(-8px) scale(1.02);
        }
        
        .text-glow {
          text-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
        }
        
        .border-animated {
          position: relative;
          background: linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.1), transparent);
          background-size: 200% 200%;
          animation: gradient-shift 4s ease infinite;
        }
        
        .smooth-scroll {
          scroll-behavior: smooth;
        }
      `}</style>

      {/* Cursor follower effect */}
      <div 
        className="fixed w-6 h-6 bg-blue-400/20 rounded-full pointer-events-none z-50 transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: `scale(${mousePosition.x && mousePosition.y ? 1 : 0})`
        }}
      />

      {/* Navigation with scroll behavior - FIXED */}
      <nav className={`fixed top-0 left-0 right-0 z-50 glass-effect border-b border-blue-500/20 transition-all duration-500 ${
        navbarVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <AnimatedSection animation="fadeRight" delay={0}>
              <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent text-glow">
                UDAY
              </div>
            </AnimatedSection>
            <div className="hidden md:flex space-x-8">
  {['About', 'Education', 'Projects', 'Experience', 'Skills', 'Contact'].map((item, index) => (
    <button
      key={item}
      onClick={() => scrollToSection(item.toLowerCase())}
      className={`text-sm font-medium transform transition duration-500 hover:text-blue-400 hover:scale-110 ${
        activeSection === item.toLowerCase()
          ? 'text-blue-400 scale-110'
          : 'text-gray-300'
      }`}
      style={{
        transitionDelay: `${index * 50}ms`,
      }}
    >
      {item}
    </button>
  ))}
</div>

          </div>
        </div>
      </nav>

      {/* Hero Section with enhanced parallax - FIXED */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-black to-black animate-gradient"></div>
        
        {/* Floating background elements */}
        <div className="absolute inset-0">
          <FloatingElement delay={0}>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          </FloatingElement>
          <FloatingElement delay={2000}>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
          </FloatingElement>
          <FloatingElement delay={4000}>
            <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-blue-300/5 rounded-full blur-2xl"></div>
          </FloatingElement>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <AnimatedSection animation="scale" delay={300}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent text-glow animate-gradient">
                Uday Prabhas B
              </span>
            </h1>
          </AnimatedSection>
          
          <AnimatedSection animation="fadeUp" delay={600}>
            <p className="text-xl md:text-2xl text-gray-300 mb-4 transition-all duration-700">
              Full Stack Developer & Computer Science Student
            </p>
          </AnimatedSection>
          
          <AnimatedSection animation="fadeUp" delay={900}>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto transition-all duration-700">
              Passionate about creating innovative web solutions with modern technologies. 
            </p>
          </AnimatedSection>
          
          <AnimatedSection animation="scale" delay={1200}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button
                onClick={() => scrollToSection('projects')}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full text-white font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-500 transform hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25 animate-pulse-glow"
              >
                View My Work
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3 border border-blue-500 rounded-full text-blue-400 font-semibold hover:bg-blue-500/10 transition-all duration-500 transform hover:scale-105 hover:border-blue-400"
              >
                Get In Touch
              </button>
            </div>
          </AnimatedSection>
          
          <AnimatedSection animation="fadeUp" delay={1500}>
            <div className="animate-bounce">
              <ChevronDown 
                className="mx-auto text-blue-400 cursor-pointer hover:text-blue-300 transition-all duration-300 hover:scale-125" 
                size={32}
                onClick={() => scrollToSection('about')}
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* About Section with enhanced cards */}
      <section id="about" className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeUp">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
                <User className="text-blue-400 animate-pulse" />
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  About Me
                </span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto animate-gradient"></div>
            </div>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection animation="fadeRight" delay={200}>
              <div className="space-y-6">
                <p className="text-lg text-gray-300 leading-relaxed transition-all duration-500 hover:text-gray-200">
                  I'm a passionate Computer Science Engineering student at Gayatri Vidya Parishad College of Engineering, 
                  Visakhapatnam, with a strong foundation in web development and a keen interest in emerging technologies.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed transition-all duration-500 hover:text-gray-200">
                  With hands-on experience in the MERN stack and a CGPA of 8.91, I'm dedicated to creating innovative 
                  solutions that bridge the gap between technology and user experience. My journey includes internships, 
                  workshops, and multiple project developments that have shaped my technical expertise.
                </p>
                <StaggeredContainer className="flex flex-wrap gap-4 mt-8">
                  <a 
                    href="mailto:udayprabhas005@gmail.com"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 rounded-lg hover:bg-blue-600/30 transition-all duration-300 hover-lift"
                  >
                    <Mail size={18} />
                    <span>Email Me</span>
                  </a>
                  <a 
                    href="https://github.com/uddaayy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 rounded-lg hover:bg-blue-600/30 transition-all duration-300 hover-lift"
                  >
                    <Github size={18} />
                    <span>GitHub</span>
                  </a>
                  <a 
                    href="https://linkedin.com/in/uday-prabhas"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 rounded-lg hover:bg-blue-600/30 transition-all duration-300 hover-lift"
                  >
                    <Linkedin size={18} />
                    <span>LinkedIn</span>
                  </a>
                </StaggeredContainer>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="fadeLeft" delay={400}>
              <div className="bg-gradient-to-br from-blue-900/20 to-black/40 p-8 rounded-2xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-500 hover-lift glass-effect">
                <h3 className="text-2xl font-semibold mb-6 text-blue-400">Quick Facts</h3>
                <StaggeredContainer className="space-y-4">
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-600/10 transition-colors duration-300">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-gray-300">Roll No: 322103310033</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-600/10 transition-colors duration-300">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-gray-300">CGPA: 8.91/10</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-600/10 transition-colors duration-300">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-gray-300">Location: Visakhapatnam, India</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-600/10 transition-colors duration-300">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-gray-300">Graduation: 2026</span>
                  </div>
                </StaggeredContainer>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Education Section with timeline effect */}
      <section id="education" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeUp">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
                <GraduationCap className="text-blue-400 animate-pulse" />
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  Education
                </span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto animate-gradient"></div>
            </div>
          </AnimatedSection>
          
          <AnimatedSection animation="scale" delay={200}>
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-blue-900/20 to-black/40 p-8 rounded-2xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-500 hover-lift glass-effect border-animated">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-blue-400 mb-2 text-glow">
                      Bachelor of Technology in Computer Science and Engineering
                    </h3>
                    <p className="text-xl text-gray-300 mb-2 transition-colors duration-300 hover:text-gray-200">
                      Gayatri Vidya Parishad College of Engineering, Visakhapatnam
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg text-blue-400 font-semibold">2022 - 2026</p>
                    <p className="text-lg text-green-400 font-semibold animate-pulse">CGPA: 8.91</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h4 className="text-lg font-semibold text-blue-300 mb-3">Key Coursework</h4>
                    <StaggeredContainer>
                      {["Data Structures & Algorithms", "Database Management Systems", "Web Technologies", "Operating Systems"].map((course) => (
                        <div key={course} className="flex items-center gap-2 p-2 rounded-lg hover:bg-blue-600/10 transition-all duration-300">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
                          <span className="text-gray-300 transition-colors duration-300 hover:text-gray-200">{course}</span>
                        </div>
                      ))}
                    </StaggeredContainer>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-blue-300 mb-3">Achievements</h4>
                    <StaggeredContainer>
                      {["Consistent academic performance", "Active in technical workshops", "Multiple project implementations"].map((achievement) => (
                        <div key={achievement} className="flex items-center gap-2 p-2 rounded-lg hover:bg-blue-600/10 transition-all duration-300">
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-gray-300 transition-colors duration-300 hover:text-gray-200">{achievement}</span>
                        </div>
                      ))}
                    </StaggeredContainer>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section id="projects" className="py-20 bg-gradient-to-b from-black to-gray-900">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <AnimatedSection animation="fadeUp">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
          <FolderOpen className="text-blue-400 animate-pulse" />
          <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Projects
          </span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mb-4 animate-gradient"></div>
        <p className="text-gray-400 max-w-2xl mx-auto transition-colors duration-300 hover:text-gray-300">
          A showcase of my technical projects demonstrating proficiency in full-stack development, 
          machine learning, and modern web technologies.
        </p>
      </div>
    </AnimatedSection>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <AnimatedSection key={index} animation="scale" delay={index * 150}>
          <div className="bg-gradient-to-br from-blue-900/20 to-black/40 p-6 rounded-2xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-500 hover-lift h-full flex flex-col glass-effect group">
            
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-semibold text-blue-400 flex-1 text-glow group-hover:text-blue-300 transition-colors duration-300">
                {project.title}
              </h3>
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 flex-shrink-0 transform group-hover:scale-110 transition-all duration-300"
                >
                  <ExternalLink className="text-gray-400 hover:text-blue-400" size={20} />
                </a>
              )}
            </div>

            <p className="text-gray-300 mb-4 flex-grow transition-colors duration-300 group-hover:text-gray-200">
              {project.description}
            </p>

            <div className="mb-4">
              <h4 className="text-sm font-semibold text-blue-300 mb-2">Key Features:</h4>
              <ul className="space-y-1">
                {project.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="text-sm text-gray-400 flex items-start gap-2 transition-colors duration-300 hover:text-gray-300"
                  >
                    <div className="w-1 h-1 bg-blue-400 rounded-full mt-2 flex-shrink-0 animate-pulse"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2 mt-auto">
              {project.technologies.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-2 py-1 bg-blue-600/20 text-blue-300 text-xs rounded-full border border-blue-500/30 transition-all duration-300 hover:bg-blue-600/30 hover:scale-105"
                  style={{ transitionDelay: `${techIndex * 50}ms` }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </AnimatedSection>
      ))}
    </div>
  </div>
</section>


      {/* Experience Section with timeline animations */}
<section id="experience" className="py-20 bg-black">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <AnimatedSection animation="fadeUp">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
          <Briefcase className="text-blue-400 animate-pulse" />
          <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Experience
          </span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto animate-gradient"></div>
      </div>
    </AnimatedSection>

    <div className="max-w-4xl mx-auto space-y-8">
      {/* Matric Services */}
      <AnimatedSection animation="fadeLeft" delay={200}>
        <div className="bg-gradient-to-br from-blue-900/20 to-black/40 p-8 rounded-2xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-500 hover-lift glass-effect border-animated">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
            <div>
              <h3 className="text-2xl font-semibold text-blue-400 mb-2 text-glow">Web & App Development Intern</h3>
              <p className="text-xl text-gray-300 mb-2 transition-colors duration-300 hover:text-gray-200">Matric Services</p>
              <p className="text-gray-400">Remote</p>
            </div>
            <div className="text-right">
              <p className="text-lg text-blue-400 font-semibold">May - Jun 2025</p>
            </div>
          </div>

          <StaggeredContainer>
            {[
              "Contributed to the development of a web application facilitating healthy snack box delivery to schools",
              "Worked on both frontend and backend to enable order placement, tracking, and school-wise distribution",
              "Explored mobile app development by converting the web application into a cross-platform app using Flutter",
              "Collaborated remotely with a team, following weekly updates and using Git for version control"
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-blue-600/10 transition-all duration-300">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0 animate-pulse"></div>
                <span className="text-gray-300 transition-colors duration-300 hover:text-gray-200">{item}</span>
              </div>
            ))}
          </StaggeredContainer>
        </div>
      </AnimatedSection>

      {/* Salesforce */}
      <AnimatedSection animation="fadeRight" delay={300}>
        <div className="bg-gradient-to-br from-blue-900/20 to-black/40 p-8 rounded-2xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-500 hover-lift glass-effect border-animated">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
            <div>
              <h3 className="text-2xl font-semibold text-blue-400 mb-2 text-glow">Salesforce Developer Intern</h3>
              <p className="text-xl text-gray-300 mb-2 transition-colors duration-300 hover:text-gray-200">Salesforce</p>
              <p className="text-gray-400">Online</p>
            </div>
            <div className="text-right">
              <p className="text-lg text-blue-400 font-semibold">Nov 2024 - Jan 2025</p>
            </div>
          </div>

          <StaggeredContainer>
            {[
              "Gained in-depth knowledge of Salesforce CRM, including customization, automation, and integration.",
              "Worked on the FoodConnect project to build CRM solutions for food distribution and community support.",
              "Developed scalable applications using Flow, Apex, SOQL, and Lightning Web Components (LWC).",
              "Built real-world Salesforce apps with maintainable code and best practices.",
              "Enhanced business workflows by delivering tailored CRM features aligned with organizational needs."
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-blue-600/10 transition-all duration-300">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0 animate-pulse"></div>
                <span className="text-gray-300 transition-colors duration-300 hover:text-gray-200">{item}</span>
              </div>
            ))}
          </StaggeredContainer>
        </div>
      </AnimatedSection>

      {/* Datapro */}
      <AnimatedSection animation="fadeLeft" delay={400}>
        <div className="bg-gradient-to-br from-blue-900/20 to-black/40 p-8 rounded-2xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-500 hover-lift glass-effect border-animated">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
            <div>
              <h3 className="text-2xl font-semibold text-blue-400 mb-2 text-glow">MERN Workshop Participant</h3>
              <p className="text-xl text-gray-300 mb-2 transition-colors duration-300 hover:text-gray-200">Datapro</p>
              <p className="text-gray-400">Offline</p>
            </div>
            <div className="text-right">
              <p className="text-lg text-blue-400 font-semibold">Aug - Sept 2024</p>
            </div>
          </div>

          <StaggeredContainer>
            {[
              "Gained hands-on experience in web development using the MERN stack (MongoDB, Express.js, React.js, Node.js)",
              "Implemented basic styling and layout features to ensure a clean and user-friendly interface",
              "Developed a dynamic web application featuring food reviews and nutritional insights",
              "Integrated React.js with MongoDB for real-time data handling"
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-blue-600/10 transition-all duration-300">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0 animate-pulse"></div>
                <span className="text-gray-300 transition-colors duration-300 hover:text-gray-200">{item}</span>
              </div>
            ))}
          </StaggeredContainer>
        </div>
      </AnimatedSection>
    </div>
  </div>
</section>


      {/* Skills Section with animated skill cards */}
      <section id="skills" className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeUp">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
                <Wrench className="text-blue-400 animate-pulse" />
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  Skills & Technologies
                </span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto animate-gradient"></div>
            </div>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(skills).map(([category, skillList], index) => (
              <AnimatedSection key={category} animation="scale" delay={index * 200}>
                <div className="bg-gradient-to-br from-blue-900/20 to-black/40 p-6 rounded-2xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-500 h-full hover-lift glass-effect group">
                  <div className="flex items-center gap-3 mb-6">
                    {category === "Programming Languages" && <Code className="text-blue-400 animate-pulse group-hover:scale-110 transition-transform duration-300" size={24} />}
                    {category === "Libraries & Frameworks" && <Database className="text-blue-400 animate-pulse group-hover:scale-110 transition-transform duration-300" size={24} />}
                    {category === "Tools & Technologies" && <Wrench className="text-blue-400 animate-pulse group-hover:scale-110 transition-transform duration-300" size={24} />}
                    {category === "Soft Skills" && <User className="text-blue-400 animate-pulse group-hover:scale-110 transition-transform duration-300" size={24} />}
                    <h3 className="text-lg font-semibold text-blue-400 text-glow">{category}</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {skillList.map((skill, skillIndex) => (
                      <div 
                        key={skillIndex}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-600/10 transition-all duration-300 transform hover:translate-x-2"
                        style={{ transitionDelay: `${skillIndex * 100}ms` }}
                      >
                        <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0 animate-pulse"></div>
                        <span className="text-gray-300 transition-colors duration-300 hover:text-gray-200">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section with enhanced form animations */}
      <section id="contact" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeUp">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
                <MessageCircle className="text-blue-400 animate-pulse" />
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  Get In Touch
                </span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mb-4 animate-gradient"></div>
              <p className="text-gray-400 max-w-2xl mx-auto transition-colors duration-300 hover:text-gray-300">
                I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <AnimatedSection animation="fadeRight" delay={200}>
              <div className="space-y-8">
                <h3 className="text-2xl font-semibold text-blue-400 mb-6 text-glow">Let's Connect</h3>
                
                <StaggeredContainer className="space-y-6">
                  {[
                    { icon: Mail, label: "Email", value: "udayprabhas005@gmail.com", href: "mailto:udayprabhas005@gmail.com" },
                    { icon: Phone, label: "Phone", value: "+91-9701704507", href: "tel:+919701704507" },
                    { icon: Github, label: "GitHub", value: "github.com/uddaayy", href: "https://github.com/uddaayy" },
                    { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/uday-prabhas", href: "https://linkedin.com/in/uday-prabhas" }
                  ].map((contact, index) => (
                    <a 
                      key={index}
                      href={contact.href}
                      target={contact.href.startsWith('http') ? '_blank' : undefined}
                      rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-4 p-4 bg-gradient-to-br from-blue-900/20 to-black/40 rounded-xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-500 group hover-lift glass-effect"
                    >
                      <div className="p-3 bg-blue-600/20 rounded-lg group-hover:bg-blue-600/30 transition-all duration-300 group-hover:scale-110">
                        <contact.icon className="text-blue-400 group-hover:text-blue-300 transition-colors duration-300" size={24} />
                      </div>
                      <div>
                        <p className="text-white font-semibold group-hover:text-blue-100 transition-colors duration-300">{contact.label}</p>
                        <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{contact.value}</p>
                      </div>
                    </a>
                  ))}
                </StaggeredContainer>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="fadeLeft" delay={400}>
              <div className="bg-gradient-to-br from-blue-900/20 to-black/40 p-8 rounded-2xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-500 glass-effect border-animated">
                <h3 className="text-2xl font-semibold text-blue-400 mb-6 text-glow">Send a Message</h3>
                
                <form className="space-y-6">
                  <div className="transform transition-all duration-300 hover:scale-105">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-4 py-3 bg-black/40 border border-blue-500/30 rounded-lg focus:border-blue-400 focus:outline-none text-white placeholder-gray-400 transition-all duration-300 focus:scale-105"
                      placeholder="Your Name"
                    />
                  </div>
                  
                  <div className="transform transition-all duration-300 hover:scale-105">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-3 bg-black/40 border border-blue-500/30 rounded-lg focus:border-blue-400 focus:outline-none text-white placeholder-gray-400 transition-all duration-300 focus:scale-105"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div className="transform transition-all duration-300 hover:scale-105">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      className="w-full px-4 py-3 bg-black/40 border border-blue-500/30 rounded-lg focus:border-blue-400 focus:outline-none text-white placeholder-gray-400 resize-none transition-all duration-300 focus:scale-105"
                      placeholder="Your message here..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-500 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 animate-pulse-glow"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Enhanced Footer - FIXED */}
      <footer className="py-12 bg-gradient-to-t from-gray-900 to-black border-t border-blue-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeUp">
            <div className="text-center space-y-4">
              <div className="flex justify-center items-center gap-6 mb-6">
                <a 
                  href="mailto:udayprabhas005@gmail.com"
                  className="p-3 bg-blue-600/20 rounded-full hover:bg-blue-600/30 transition-all duration-300 transform hover:scale-110 hover:rotate-12"
                >
                  <Mail className="text-blue-400 hover:text-blue-300 transition-colors duration-300" size={20} />
                </a>
                <a 
                  href="https://github.com/uddaayy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-blue-600/20 rounded-full hover:bg-blue-600/30 transition-all duration-300 transform hover:scale-110 hover:rotate-12"
                >
                  <Github className="text-blue-400 hover:text-blue-300 transition-colors duration-300" size={20} />
                </a>
                <a 
                  href="https://linkedin.com/in/uday-prabhas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-blue-600/20 rounded-full hover:bg-blue-600/30 transition-all duration-300 transform hover:scale-110 hover:rotate-12"
                >
                  <Linkedin className="text-blue-400 hover:text-blue-300 transition-colors duration-300" size={20} />
                </a>
              </div>
              
              <div className="space-y-2">
                <p className="text-gray-300 font-medium text-lg transition-colors duration-300 hover:text-blue-400">
                  Borra Uday Prabhas
                </p>
                <p className="text-gray-400 transition-colors duration-300 hover:text-gray-300">
                  © 2025 Built with React & Tailwind CSS
                </p>
                <p className="text-gray-500 text-sm transition-colors duration-300 hover:text-gray-400">
                  Designed with passion for clean code and exceptional user experience
                </p>
              </div>
              
              <div className="pt-6">
                <div className="w-20 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto animate-gradient"></div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </footer>
    </div>
  );
}

export default App;