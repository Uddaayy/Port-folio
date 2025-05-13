import React, { useRef } from 'react';
import { useInView } from '../hooks/useInView';

interface SkillCategory {
  title: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Languages',
    skills: ['C/C++', 'JavaScript', 'HTML+CSS', 'Java', 'Python (Basics)']
  },
  {
    title: 'Libraries & Frameworks',
    skills: ['C++ STL', 'ReactJS', 'NodeJS']
  },
  {
    title: 'Tools & Technologies',
    skills: ['VSCode', 'Git', 'GitHub']
  },
  {
    title: 'Databases',
    skills: ['MongoDB', 'MySQL (Relational Database)']
  }
];

const coursework = [
  'Data Structures & Algorithms',
  'Database Management System',
  'Operating Systems',
  'Object Oriented Programming'
];

const interests = [
  'Web Design and Development',
  'Networking'
];

const softSkills = [
  'Self-learning',
  'Presentation',
  'Quick Socializing'
];

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });

  return (
    <section id="skills" ref={sectionRef} className="py-20 bg-[#0a192f] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-3xl font-bold mb-12 relative before:content-[''] before:absolute before:w-16 before:h-1 before:bg-blue-300 before:-bottom-4 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Skills
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {skillCategories.map((category, index) => (
              <div 
                key={index}
                className={`bg-[#112240] p-6 rounded-md shadow-md transition-all duration-700 ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${200 + (index * 100)}ms` }}
              >
                <h3 className="text-xl font-semibold mb-4 text-blue-300">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, i) => (
                    <span 
                      key={i} 
                      className="bg-[#1d3557] px-3 py-1 rounded-full text-sm hover:bg-blue-900 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-700 delay-600 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="bg-[#112240] p-6 rounded-md shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-blue-300">Coursework</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-300">
                {coursework.map((course, i) => (
                  <li key={i}>{course}</li>
                ))}
              </ul>
            </div>
            
            <div className="bg-[#112240] p-6 rounded-md shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-blue-300">Areas of Interest</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-300">
                {interests.map((interest, i) => (
                  <li key={i}>{interest}</li>
                ))}
              </ul>
            </div>
            
            <div className="bg-[#112240] p-6 rounded-md shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-blue-300">Soft Skills</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-300">
                {softSkills.map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;