import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

interface AboutSectionProps {
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

interface TerminalLine {
  type: 'command' | 'output' | 'prompt';
  content: string;
  timestamp?: string;
}

const AboutSection: React.FC<AboutSectionProps> = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: 'output', content: 'Welcome to Kavin\'s Terminal Interface' },
    { type: 'output', content: 'Type "help" to see available commands' },
    { type: 'prompt', content: '' }
  ]);
  const [showCursor, setShowCursor] = useState(true);
  const [showTerminal, setShowTerminal] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands = {
    whoami: 'Kavennesh - Full time Cyber Security student@ FIU\n\nSpecializing in Red Teaming • Network Security • Threat Detection • Incident Response • Ethical Hacking \n\nMission: Safeguarding systems through proactive defense, adversarial thinking, and smart strategy \nValues: Vigilance • Integrity • Resilience',
    help: 'Available commands:\n  whoami    - Display about information\n  clear     - Clear terminal screen\n  help      - Show this help message',
    clear: 'CLEAR_COMMAND'
  };

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorTimer);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    // Trigger terminal animation after component mounts
    const timer = setTimeout(() => {
      setShowTerminal(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const newHistory = [...history];
    
    // Add the command to history
    newHistory[newHistory.length - 1] = { 
      type: 'command', 
      content: `$ ${cmd}` 
    };

    if (trimmedCmd === 'clear') {
      setHistory([
        { type: 'output', content: 'Welcome to Kavin\'s Terminal Interface' },
        { type: 'output', content: 'Type "help" to see available commands' },
        { type: 'prompt', content: '' }
      ]);
    } else if (commands[trimmedCmd as keyof typeof commands]) {
      const output = commands[trimmedCmd as keyof typeof commands];
      newHistory.push({ type: 'output', content: output });
      newHistory.push({ type: 'prompt', content: '' });
      setHistory(newHistory);
    } else if (trimmedCmd !== '') {
      newHistory.push({ 
        type: 'output', 
        content: `Command not found: ${cmd}\nType "help" for available commands` 
      });
      newHistory.push({ type: 'prompt', content: '' });
      setHistory(newHistory);
    } else {
      newHistory.push({ type: 'prompt', content: '' });
      setHistory(newHistory);
    }
    
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
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
            About Me
          </h2>
        </motion.div>

        <div className="relative">
          {/* Animated green shape */}
          <motion.div
            initial={{ x: -200, opacity: 0 }}
            animate={showTerminal ? { x: 0, opacity: 0.1 } : { x: -200, opacity: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute -left-10 top-10 w-32 h-32 bg-green-500 rounded-full blur-xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gray-900 rounded-lg border border-gray-700 shadow-2xl overflow-hidden relative z-10"
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
                <span className="text-gray-400 text-sm">kavin@portfolio:~</span>
              </div>
            </div>

            {/* Terminal Content */}
            <div 
              ref={terminalRef}
              className="p-6 h-96 overflow-y-auto cursor-text"
              onClick={handleTerminalClick}
            >
              <div className="font-mono text-sm space-y-2">
                {history.map((line, index) => (
                  <div key={index}>
                    {line.type === 'command' && (
                      <div className="text-green-400">{line.content}</div>
                    )}
                    {line.type === 'output' && (
                      <div className="text-gray-300 whitespace-pre-line">{line.content}</div>
                    )}
                    {line.type === 'prompt' && index === history.length - 1 && (
                      <div className="flex items-center text-green-400">
                        <span className="text-gray-500">$ </span>
                        <input
                          ref={inputRef}
                          type="text"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyPress={handleKeyPress}
                          className="bg-transparent border-none outline-none text-green-400 flex-1 font-mono caret-green-400"
                          autoComplete="off"
                          spellCheck="false"
                        />
                        {showCursor && <span className="bg-green-400 text-gray-900 ml-1">_</span>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12 grid md:grid-cols-3 gap-6"
        >
          {[
            { label: 'Years Experience', value: '1+' },
            { label: 'CTF Challenges', value: '10+' },
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
