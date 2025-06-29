
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Command {
  input: string;
  output: string;
  timestamp: string;
}

const TerminalInterface = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Command[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const aboutContent = `
> System Information
> ==================
> 
> Name: [Your Name]
> Role: Full Stack Developer
> Location: [Your Location]
> 
> About Me:
> --------
> I am a passionate software developer with expertise in modern web technologies.
> I specialize in creating interactive, user-friendly applications with clean code
> and elegant design. My experience spans across frontend and backend development,
> with a focus on React, TypeScript, and modern development practices.
> 
> Skills: JavaScript, TypeScript, React, Node.js, Python, SQL, Git
> Interests: Cybersecurity, AI/ML, Open Source, Terminal Interfaces
> 
> Type 'help' for available commands.
`;

  const helpContent = `
> Available Commands:
> ==================
> 
> whoami    - Display information about me
> clear     - Clear the terminal screen
> help      - Show this help message
> date      - Display current date and time
> skills    - List my technical skills
> contact   - Show contact information
> 
> Tip: Use Tab for command completion
`;

  const skillsContent = `
> Technical Skills:
> =================
> 
> Frontend:     React, TypeScript, HTML5, CSS3, Tailwind CSS
> Backend:      Node.js, Python, Express.js, RESTful APIs
> Database:     PostgreSQL, MongoDB, Redis
> Tools:        Git, Docker, VS Code, Linux Terminal
> Cloud:        AWS, Vercel, Netlify
> Other:        GraphQL, Jest, Webpack, Framer Motion
`;

  const contactContent = `
> Contact Information:
> ===================
> 
> Email:    your.email@example.com
> GitHub:   github.com/yourusername
> LinkedIn: linkedin.com/in/yourprofile
> Website:  yourwebsite.com
> 
> Feel free to reach out for collaboration opportunities!
`;

  const commands = {
    whoami: aboutContent,
    help: helpContent,
    skills: skillsContent,
    contact: contactContent,
    clear: '',
    date: () => `> Current date and time: ${new Date().toLocaleString()}`,
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const command = input.toLowerCase().trim();
    const timestamp = new Date().toLocaleTimeString();

    if (command === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    let output = '';
    if (command in commands) {
      const commandOutput = commands[command as keyof typeof commands];
      output = typeof commandOutput === 'function' ? commandOutput() : commandOutput;
    } else {
      output = `> Command not found: ${command}\n> Type 'help' for available commands.`;
    }

    setHistory(prev => [...prev, { input, output, timestamp }]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const availableCommands = Object.keys(commands);
      const matches = availableCommands.filter(cmd => cmd.startsWith(input.toLowerCase()));
      if (matches.length === 1) {
        setInput(matches[0]);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl h-[80vh] bg-black/90 backdrop-blur-sm border border-green-500/30 rounded-lg shadow-2xl overflow-hidden"
      >
        {/* Terminal Header */}
        <div className="bg-gray-900/80 px-4 py-2 border-b border-green-500/30 flex items-center gap-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-green-400 font-mono text-sm ml-4">terminal@portfolio:~$</span>
        </div>

        {/* Terminal Content */}
        <div
          ref={terminalRef}
          className="h-full p-4 overflow-y-auto font-mono text-sm"
          onClick={() => inputRef.current?.focus()}
        >
          {/* Welcome Message */}
          <div className="text-green-400 mb-4">
            <div className="text-green-300">Welcome to Portfolio Terminal v1.0</div>
            <div className="text-green-500">Type 'help' to see available commands.</div>
            <div className="text-gray-500">---</div>
          </div>

          {/* Command History */}
          {history.map((cmd, index) => (
            <div key={index} className="mb-4">
              <div className="text-green-400">
                <span className="text-gray-500">user@portfolio:~$ </span>
                <span className="text-green-300">{cmd.input}</span>
              </div>
              {cmd.output && (
                <pre className="text-green-200 mt-1 whitespace-pre-wrap">
                  {cmd.output}
                </pre>
              )}
            </div>
          ))}

          {/* Current Input */}
          <form onSubmit={handleSubmit} className="flex items-center">
            <span className="text-gray-500 mr-2">user@portfolio:~$ </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent text-green-300 outline-none flex-1 font-mono"
              placeholder="Type a command..."
              autoComplete="off"
            />
            <span className="text-green-400 animate-pulse ml-1">█</span>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default TerminalInterface;
