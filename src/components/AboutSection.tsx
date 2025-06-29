
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

interface AboutSectionProps {
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const AboutSection: React.FC<AboutSectionProps> = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  const terminalLines = [
    { command: 'whoami', output: 'John Doe - Full Stack Developer' },
    { command: 'cat experience.txt', output: '5+ years building digital solutions' },
    { command: 'ls skills/', output: 'React  TypeScript  Node.js  Python  UI/UX' },
    { command: 'cat passion.txt', output: 'Creating meaningful user experiences' },
    { command: 'echo $MISSION', output: 'Solving problems through clean code & design' },
    { command: 'cat values.txt', output: 'Passion • Purpose • Performance' }
  ];

  useEffect(() => {
    if (currentLine < terminalLines.length) {
      const line = terminalLines[currentLine];
      const fullText = `$ ${line.command}\n${line.output}`;
      
      if (currentText.length < fullText.length) {
        const timer = setTimeout(() => {
          setCurrentText(fullText.slice(0, currentText.length + 1));
        }, 50);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setCurrentLine(currentLine + 1);
          setCurrentText('');
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [currentText, currentLine]);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorTimer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center relative z-10 px-4 py-20">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent">
            About Me
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gray-900 rounded-lg border border-gray-700 shadow-2xl overflow-hidden"
        >
          {/* Terminal Header */}
          <div className="bg-gray-800 px-4 py-3 flex items-center gap-2 border-b border-gray-700">
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <Terminal className="h-4 w-4 text-gray-400" />
              <span className="text-gray-400 text-sm">john@portfolio:~</span>
            </div>
          </div>

          {/* Terminal Content */}
          <div className="p-6 h-96 overflow-hidden">
            <div className="font-mono text-sm space-y-2">
              {/* Completed lines */}
              {terminalLines.slice(0, currentLine).map((line, index) => (
                <div key={index} className="space-y-1">
                  <div className="text-gray-400">
                    <span className="text-gray-500">$ </span>
                    {line.command}
                  </div>
                  <div className="text-gray-300 ml-2">{line.output}</div>
                </div>
              ))}
              
              {/* Current typing line */}
              {currentLine < terminalLines.length && (
                <div className="space-y-1">
                  <div className="text-gray-400">
                    {currentText}
                    {showCursor && <span className="bg-gray-400 text-gray-900">_</span>}
                  </div>
                </div>
              )}

              {/* Completed state */}
              {currentLine >= terminalLines.length && (
                <div className="mt-4">
                  <div className="text-gray-400">
                    <span className="text-gray-500">$ </span>
                    <span className="animate-pulse">ready_for_collaboration</span>
                    {showCursor && <span className="bg-gray-400 text-gray-900 ml-1">_</span>}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12 grid md:grid-cols-3 gap-6"
        >
          {[
            { label: 'Years Experience', value: '5+' },
            { label: 'Projects Completed', value: '50+' },
            { label: 'Coffee Consumed', value: '∞' }
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                <div className="text-3xl font-bold text-gray-400 mb-2">{stat.value}</div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AboutSection;
