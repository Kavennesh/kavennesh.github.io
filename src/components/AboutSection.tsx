import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

interface AboutSectionProps {
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

interface TerminalLine {
  type: "command" | "output" | "prompt";
  content: string;
}

const AboutSection: React.FC<AboutSectionProps> = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: "output", content: "Welcome to Kavin's Terminal Interface" },
    { type: "output", content: 'Type "help" to see available commands' },
    { type: "prompt", content: "" },
  ]);

  const [showCursor, setShowCursor] = useState(true);
  const [showTerminal, setShowTerminal] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands = useMemo<Record<string, string>>(
    () => ({
      whoami:
        "Kavennesh - Full time Cyber Security student@ FIU\n\nSpecializing in Red Teaming • Network Security • Threat Detection • Incident Response • Ethical Hacking\n\nMission: Safeguarding systems through proactive defense, adversarial thinking, and smart strategy\nValues: Vigilance • Integrity • Resilience",
      education:
        "Bachelor of Science in Cyber Security\nFlorida International University (FIU)\nExpected Graduation: May 2025\n\nRelevant Coursework:\n- Network Security\n- Ethical Hacking\n- Digital Forensics\n- Cyber Threat Intelligence",
      help:
        'Available commands:\n  whoami      - Display about information\n  education   - Show education details\n  clear       - Clear terminal screen\n  help        - Show this help message',
      clear: "CLEAR_COMMAND",
    }),
    []
  );

  // blink cursor
  useEffect(() => {
    const cursorTimer = setInterval(() => setShowCursor((p) => !p), 500);
    return () => clearInterval(cursorTimer);
  }, []);

  // auto scroll
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

// focus input whenever history changes (new prompt added)
  useEffect(() => {
  inputRef.current?.focus();
  }, [history]);

  // show terminal animation slightly later
  useEffect(() => {
    const timer = setTimeout(() => setShowTerminal(true), 450);
    return () => clearTimeout(timer);
  }, []);

  const resetTerminal = () => {
    setHistory([
      { type: "output", content: "Welcome to Kavin's Terminal Interface" },
      { type: "output", content: 'Type "help" to see available commands' },
      { type: "prompt", content: "" },
    ]);
  };

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim();
    const key = cmd.toLowerCase();

    // Always clear the input immediately for snappy UX
    setInput("");

    // Update history based on previous state (IMPORTANT fix)
    setHistory((prev) => {
      const next = [...prev];

      // Ensure last line is a prompt (defensive)
      const last = next[next.length - 1];
      if (!last || last.type !== "prompt") {
        next.push({ type: "prompt", content: "" });
      }

      // Replace the last prompt with the typed command
      next[next.length - 1] = { type: "command", content: `$ ${cmd}` };

      // Empty enter -> just show a new prompt
      if (!key) {
        next.push({ type: "prompt", content: "" });
        return next;
      }

      // Clear
      if (key === "clear") {
        return [
          { type: "output", content: "Welcome to Kavin's Terminal Interface" },
          { type: "output", content: 'Type "help" to see available commands' },
          { type: "prompt", content: "" },
        ];
      }

      // Known command
      if (commands[key]) {
        next.push({ type: "output", content: commands[key] });
        next.push({ type: "prompt", content: "" }); // ✅ ALWAYS restore prompt
        return next;
      }

      // Unknown command
      next.push({
        type: "output",
        content: `Command not found: ${cmd}\nType "help" for available commands`,
      });
      const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
      e.preventDefault();
    handleCommand(input);
  }
};
      next.push({ type: "prompt", content: "" }); // ✅ ALWAYS restore prompt
      return next;
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleCommand(input);
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
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
          {/* green glow blob */}
          <motion.div
            initial={{ x: -200, opacity: 0 }}
            animate={showTerminal ? { x: 0, opacity: 0.12 } : { x: -200, opacity: 0 }}
            transition={{ duration: 1, delay: 0.35 }}
            className="absolute -left-10 top-10 w-32 h-32 bg-green-500 rounded-full blur-xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="bg-gray-900 rounded-lg border border-gray-700 shadow-2xl overflow-hidden relative z-10"
          >
            {/* header */}
            <div className="bg-gray-800 px-4 py-3 flex items-center gap-2 border-b border-gray-700">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Terminal className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400 text-sm">kavin@portfolio:~</span>
              </div>
            </div>

            {/* terminal content */}
            <div
              ref={terminalRef}
              className="p-6 h-96 overflow-y-auto cursor-text"
              onClick={handleTerminalClick}
            >
              <div className="font-mono text-sm space-y-2">
                {history.map((line, index) => (
                  <div key={index}>
                    {line.type === "command" && (
                      <div className="text-green-400">{line.content}</div>
                    )}

                    {line.type === "output" && (
                      <div className="text-gray-300 whitespace-pre-line">{line.content}</div>
                    )}

                    {line.type === "prompt" && index === history.length - 1 && (
                      <div className="flex items-center text-green-400">
                        <span className="text-gray-500">$ </span>
                        <input
                          ref={inputRef}
                          type="text"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyDown={handleKeyDown}
                          className="bg-transparent border-none outline-none text-green-400 flex-1 font-mono caret-green-400"
                          autoComplete="off"
                          spellCheck={false}
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

        {/* stats */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="mt-12 grid md:grid-cols-3 gap-6"
        >
          {[
            { label: "Years Experience", value: "1+" },
            { label: "CTF Challenges", value: "20+" },
            { label: "Coffee Consumed", value: "∞" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                <div className="text-3xl font-bold text-gray-300 mb-2">{stat.value}</div>
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
