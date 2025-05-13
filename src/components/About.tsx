import React, { useEffect, useRef } from 'react';
import { useInView } from '../hooks/useInView';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.2 });

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-[#0a192f] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-3xl font-bold mb-12 relative before:content-[''] before:absolute before:w-16 before:h-1 before:bg-blue-300 before:-bottom-4 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            About Me
          </h2>
          
          <div className={`transition-all duration-700 delay-200 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <p className="text-gray-300 mb-6">
              Hello! I'm Uday Prabhas, a Computer Science Engineering student at Gayatri Vidya Parishad College 
              of Engineering, Visakhapatnam. I'm passionate about web development and building applications 
              that solve real-world problems.
            </p>
            
            <div className="bg-[#112240] p-6 rounded-md shadow-md mb-8">
              <h3 className="text-xl font-semibold mb-4">Education</h3>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <p className="font-medium">Bachelor of Technology in Computer Science and Engineering</p>
                  <p className="text-gray-400">Gayatri Vidya Parishad College of Engineering, Visakhapatnam</p>
                </div>
                <div className="mt-2 md:mt-0 flex flex-col items-start md:items-end">
                  <p className="text-blue-300">2022 - 2026</p>
                  <p className="text-gray-400">CGPA: 9.08</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;