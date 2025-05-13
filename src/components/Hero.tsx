import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="h-screen flex items-center bg-[#0a192f] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-blue-300 mb-5 opacity-0 animate-fadeIn">Hi, my name is</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 opacity-0 animate-fadeIn animation-delay-200">
            Borra Uday Prabhas.
          </h1>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-300 mb-6 opacity-0 animate-fadeIn animation-delay-400">
            I build things for the web.
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl opacity-0 animate-fadeIn animation-delay-600">
            I'm a Computer Science student specializing in building exceptional digital experiences.
            Currently, I'm focused on building accessible, user-friendly web applications with MERN stack.
          </p>
          <button 
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="border-2 border-blue-300 text-blue-300 px-6 py-3 rounded hover:bg-blue-300/10 transition-all duration-300 opacity-0 animate-fadeIn animation-delay-800"
          >
            Check out my work
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;