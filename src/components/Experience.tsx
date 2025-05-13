import React, { useRef } from 'react';
import { useInView } from '../hooks/useInView';

interface ExperienceItem {
  title: string;
  company: string;
  date: string;
  location: string;
  points: string[];
}

const experiences: ExperienceItem[] = [
  {
    title: 'Salesforce Developer Internship',
    company: 'Salesforce',
    date: 'Nov 2024 - Jan 2025',
    location: 'Online',
    points: [
      'Acquired in-depth knowledge of Salesforce CRM platform, including customization, automation, and integration.',
      'Worked on the FoodConnect project, leveraging Salesforce to create solutions for food distribution and community support.',
      'Developed expertise in using Salesforce tools like Flow, Apex, SOQL, and Lightning Web Components (LWC).',
      'Gained hands-on experience in building scalable and maintainable Salesforce applications for real-world scenarios.',
      'Exhibited proficiency in enhancing business workflows and delivering customized Salesforce solutions aligned with organizational goals.'
    ]
  },
  {
    title: 'Web Developer Intern',
    company: 'Matric Services',
    date: 'May - Jun 2024',
    location: 'Remote',
    points: [
      'Worked as an Intern on a live project focused on delivering daily snackboxes and personalized healthy diet plans to customers.',
      'Contributed to the development of full-stack features using the MERN (MongoDB, Express.js, React.js, Node.js) stack to support dynamic user interactions and real-time order management',
      'Implemented responsive user interfaces with React.js and ensured smooth backend integration with Node.js and Express, while managing data through MongoDB.'
    ]
  }
];

const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });

  return (
    <section id="experience" ref={sectionRef} className="py-20 bg-[#0a192f] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-3xl font-bold mb-12 relative before:content-[''] before:absolute before:w-16 before:h-1 before:bg-blue-300 before:-bottom-4 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Experience
          </h2>
          
          <div className="space-y-10">
            {experiences.map((exp, index) => (
              <div 
                key={index}
                className={`bg-[#112240] p-6 rounded-md shadow-md transition-all duration-700 ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${200 + (index * 100)}ms` }}
              >
                <div className="flex flex-col md:flex-row justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{exp.title}</h3>
                    <p className="text-blue-300">{exp.company}</p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <p className="text-gray-400">{exp.date}</p>
                    <p className="text-gray-400 text-right">{exp.location}</p>
                  </div>
                </div>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  {exp.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;