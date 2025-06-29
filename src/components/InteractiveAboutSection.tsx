
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

interface InteractiveAboutSectionProps {
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const InteractiveAboutSection: React.FC<InteractiveAboutSectionProps> = () => {
  const [userInput, setUserInput] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [currentPrompt, setCurrentPrompt] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const prompts = [
    'Enter your name:',
    'What do you do?',
    'What are your skills?',
    'What drives you?',
    'Your mission statement:'
  ];

  const [responses, setResponses] = useState<string[]>([]);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorTimer);
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentPrompt]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && userInput.trim()) {
      const newResponses = [...responses];
      newResponses[currentPrompt] = userInput;
      setResponses(newResponses);
      setUserInput('');
      
      if (currentPrompt < prompts.length - 1) {
        setCurrentPrompt(currentPrompt + 1);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

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
            Interactive Profile
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-black/90 rounded-lg border border-gray-700 shadow-2xl overflow-hidden"
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
              <span className="text-gray-400 text-sm">user@interactive-profile:~</span>
            </div>
          </div>

          {/* Terminal Content */}
          <div className="p-6 h-96 overflow-y-auto">
            <div className="font-mono text-sm space-y-3">
              {/* Previous responses */}
              {responses.map((response, index) => (
                <div key={index} className="space-y-1">
                  <div className="text-gray-400">
                    <span className="text-gray-500">$ </span>
                    {prompts[index]}
                  </div>
                  <div className="text-green-400 ml-2">{response}</div>
                </div>
              ))}
              
              {/* Current prompt */}
              {currentPrompt < prompts.length && (
                <div className="space-y-1">
                  <div className="text-gray-400">
                    <span className="text-gray-500">$ </span>
                    {prompts[currentPrompt]}
                  </div>
                  <div className="flex items-center ml-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={userInput}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      className="bg-transparent text-green-400 outline-none flex-1 font-mono"
                      placeholder="Type your response..."
                    />
                    {showCursor && <span className="bg-green-400 text-black ml-1">_</span>}
                  </div>
                </div>
              )}

              {/* Completion message */}
              {currentPrompt >= prompts.length && (
                <div className="mt-6 space-y-2">
                  <div className="text-green-400">
                    <span className="text-gray-500">$ </span>
                    profile_complete
                  </div>
                  <div className="text-gray-400 ml-2">
                    Interactive profile setup complete. Ready for collaboration!
                    {showCursor && <span className="bg-green-400 text-black ml-1">_</span>}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-400 text-sm">
            Type your responses and press Enter to continue. Your input will appear in green.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default InteractiveAboutSection;
