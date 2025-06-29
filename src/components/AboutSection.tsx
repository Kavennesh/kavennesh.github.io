
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
    { type: 'output', content: 'Welcome to John\'s Terminal Interface' },
    { type: 'output', content: 'Type "help" to see available commands' },
    { type: 'prompt', content: '' }
  ]);
  const [showCursor, setShowCursor] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands = {
    whoami: 'John Doe - Full Stack Developer\n\n5+ years building digital solutions\nPassionate about creating meaningful user experiences\nSpecializing in React, TypeScript, Node.js, and Python\n\nMission: Solving problems through clean code & design\nValues: Passion • Purpose • Performance',
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
        { type: 'output', content: 'Welcome to John\'s Terminal Interface' },
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

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="rounded-lg border border-gray-700 shadow-2xl overflow-hidden"
          style={{ backgroundColor: '#0d1117' }}
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
          <div 
            ref={terminalRef}
            className="p-6 h-96 overflow-y-auto cursor-text"
            onClick={handleTerminalClick}
            style={{ backgroundColor: '#0d1117' }}
          >
            <div className="font-mono text-sm space-y-2">
              {history.map((line, index) => (
                <div key={index}>
                  {line.type === 'command' && (
                    <div style={{ color: '#00ff00' }}>{line.content}</div>
                  )}
                  {line.type === 'output' && (
                    <div className="text-gray-300 whitespace-pre-line">{line.content}</div>
                  )}
                  {line.type === 'prompt' && index === history.length - 1 && (
                    <div className="flex items-center">
                      <span style={{ color: '#00ff00' }}>$ </span>
                      <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="bg-transparent border-none outline-none flex-1 font-mono"
                        style={{ color: '#00ff00', caretColor: 'transparent' }}
                        autoComplete="off"
                        spellCheck="false"
                      />
                      <span 
                        className={`ml-0 ${showCursor ? 'opacity-100' : 'opacity-0'}`}
                        style={{ 
                          color: '#00ff00',
                          backgroundColor: '#00ff00',
                          width: '8px',
                          height: '16px',
                          display: 'inline-block'
                        }}
                      >
                        &nbsp;
                      </span>
                    </div>
                  )}
                </div>
              ))}
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
