import React, { useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { Github, ExternalLink } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  points: string[];
}

const projects: Project[] = [
  {
    title: 'Web Based Food Making and Review Application',
    description: 'A Website based on MERN STACK for user knowledge.',
    technologies: ['MongoDB', 'React', 'Node.js', 'Express'],
    points: [
      'Facilitating users to bookmark the food they want to have.',
      'Displays ingredients and health benefits of the food items.',
      'Recommends food recipes based on their interests.'
    ]
  },
  {
    title: 'Zomato Restaurant Search and Listing Application',
    description: 'A MERN STACK-based project for restaurant discovery and filtering.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
    points: [
      'Implemented restaurant search with filters based on location, cuisine, price, and images.',
      'Enabled restaurant listings with pagination and detailed restaurant information.'
    ]
  },
  {
  title: "Lost and Found Application",
  description: "A FULL STACK-based web application that enables users to report, find their belongings",
  technologies: ["React", "Node.js", "Express", "MongoDB",'Machine Learning'],
  points: [
    "Developed lost and found item reporting with support for image uploads, location tagging, and feature extraction.",
    "Implemented intelligent matching logic using cosine similarity on feature vectors to identify potential matches between lost and found items.",
    "Enabled item listings with filtering based on city, item type and geolocation",
    "Integrated email notifications to alert users of potential item matches for user engagement."
  ]
}
,
  {
    title: 'URL SHortener',
    description: 'A MERN STACK-based project for shortening a length URL',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
    points: [
      'Implemented to shorten any URL.',
      'Provides analytics, QR and other visual representations regarding the URL.',
      'Designed a user-friendly dashboard to manage and track all shortened URLs.',
      'Ensured secure redirection and validation to prevent misuse or broken links.'
    ]
  }
];

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });

  return (
    <section id="projects" ref={sectionRef} className="py-20 bg-[#0a192f] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-3xl font-bold mb-12 relative before:content-[''] before:absolute before:w-16 before:h-1 before:bg-blue-300 before:-bottom-4 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Projects
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <div 
                key={index}
                className={`bg-[#112240] p-6 rounded-md shadow-md group hover:transform hover:-translate-y-2 transition-all duration-300 flex flex-col h-full relative transition-all duration-700 ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${200 + (index * 100)}ms` }}
              >
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-300 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <ul className="list-disc pl-5 space-y-1 text-gray-300 mb-6">
                  {project.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="text-xs text-blue-300 bg-blue-900/20 px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      <Github size={20} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;