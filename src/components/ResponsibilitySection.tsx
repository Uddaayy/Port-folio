import React, { useRef } from 'react';
import { useInView } from '../hooks/useInView';

const ResponsibilitySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.2 });

  return (
    <section ref={sectionRef} className="py-20 bg-[#0a192f] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-3xl font-bold mb-12 relative before:content-[''] before:absolute before:w-16 before:h-1 before:bg-blue-300 before:-bottom-4 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Positions of Responsibility
          </h2>
          
          <div className={`bg-[#112240] p-6 rounded-md shadow-md transition-all duration-700 delay-200 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h3 className="text-xl font-semibold mb-4">Computer Society of India (CSI) Volunteer</h3>
            <p className="text-gray-300 mb-2">Technical Event - Visakhapatnam</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              <li>Assisted in managing close to 200 attendees.</li>
              <li>Participated in different technical activities.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResponsibilitySection;