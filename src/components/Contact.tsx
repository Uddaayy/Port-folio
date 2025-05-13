import React, { useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { Phone, Mail, Github, Linkedin } from 'lucide-react';

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.2 });

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-[#0a192f] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-3xl font-bold mb-12 relative before:content-[''] before:absolute before:w-16 before:h-1 before:bg-blue-300 before:-bottom-4 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Contact
          </h2>
          
          <div className={`text-center mb-12 transition-all duration-700 delay-200 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h3 className="text-2xl font-semibold mb-4">Get In Touch</h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              I'm currently looking for new opportunities to apply my skills and knowledge. 
              Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
          </div>
          
          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12 transition-all duration-700 delay-400 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <a 
              href="tel:+919701704507" 
              className="bg-[#112240] p-6 rounded-md shadow-md flex items-center gap-4 hover:bg-[#1d3557] transition-colors"
            >
              <Phone className="text-blue-300" />
              <div>
                <h4 className="font-semibold">Phone</h4>
                <p className="text-gray-300">+91-9701704507</p>
              </div>
            </a>
            
            <a 
              href="mailto:udayprabhas005@gmail.com" 
              className="bg-[#112240] p-6 rounded-md shadow-md flex items-center gap-4 hover:bg-[#1d3557] transition-colors"
            >
              <Mail className="text-blue-300" />
              <div>
                <h4 className="font-semibold">Email</h4>
                <p className="text-gray-300">udayprabhas005@gmail.com</p>
              </div>
            </a>
            
            <a 
              href="https://github.com/uddaayy" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#112240] p-6 rounded-md shadow-md flex items-center gap-4 hover:bg-[#1d3557] transition-colors"
            >
              <Github className="text-blue-300" />
              <div>
                <h4 className="font-semibold">GitHub</h4>
                <p className="text-gray-300">github.com/uddaayy</p>
              </div>
            </a>
            
            <a 
              href="https://linkedin.com/in/uday-prabhas" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#112240] p-6 rounded-md shadow-md flex items-center gap-4 hover:bg-[#1d3557] transition-colors"
            >
              <Linkedin className="text-blue-300" />
              <div>
                <h4 className="font-semibold">LinkedIn</h4>
                <p className="text-gray-300">linkedin.com/in/uday-prabhas</p>
              </div>
            </a>
          </div>
          
          <div className={`text-center transition-all duration-700 delay-600 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <p className="text-gray-400">
              Designed & Built by Borra Uday Prabhas
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;