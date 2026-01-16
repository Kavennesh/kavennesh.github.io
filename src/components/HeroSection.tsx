import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onNext }) => {
  const words = useMemo(
    () => ["Cyber Security Enthusiastic", "Red Teaming", "CTF Player", "Gamer"],
    []
  );

  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];

    // speeds
    const typeSpeed = 85;
    const deleteSpeed = 45;

    // pauses
    const pauseAfterTyped = 900;
    const pauseAfterDeleted = 250;

    let timeout = 0;

    if (!isDeleting) {
      // typing
      timeout = window.setTimeout(() => {
        setText(current.substring(0, text.length + 1));
      }, typeSpeed);

      // finished typing full word -> pause then delete
      if (text === current) {
        window.clearTimeout(timeout);
        timeout = window.setTimeout(() => setIsDeleting(true), pauseAfterTyped);
      }
    } else {
      // deleting
      timeout = window.setTimeout(() => {
        setText(current.substring(0, text.length - 1));
      }, deleteSpeed);

      // finished deleting -> next word
      if (text === "") {
        window.clearTimeout(timeout);
        timeout = window.setTimeout(() => {
          setIsDeleting(false);
          setWordIndex((i) => (i + 1) % words.length);
        }, pauseAfterDeleted);
      }
    }

    return () => window.clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words]);

  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Kavennesh_Resume.pdf";
    link.click();
  };

  return (
    <div className="min-h-screen pt-24 md:pt-28 flex items-start justify-center relative z-10 px-4">
      <div className="text-center max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <motion.h1
            className="text-6xl md:text-8xl font-bold text-white mb-3 bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Kavennesh
          </motion.h1>

          {/* typing line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 mb-4 h-7 leading-tight"
          >
            <span className="font-mono">
              {text}
              <span className="animate-pulse">|</span>
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Building secure, intelligent, and resilient digital environments.
            <br />
            <span className="inline-block mt-3">
              Passionate about offensive and defensive security—from identifying system vulnerabilities to implementing proactive defense strategies.
            </span>
            <br />
            <span className="inline-block mt-3">
              Skilled in penetration testing, threat detection, and network security. I aim to turn complex attack surfaces into manageable and well-protected systems.
            </span>
            <br />
            <span className="inline-block mt-3">
              Let’s connect and collaborate on securing the future of digital!
            </span>
          </motion.p>


          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              onClick={onNext}
              size="lg"
              className="bg-gradient-to-r from-gray-700 to-black hover:from-gray-800 hover:to-gray-900 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Explore My Work
              <ChevronDown className="ml-2 h-5 w-5" />
            </Button>

            <Button
              onClick={handleDownloadResume}
              variant="outline"
              size="lg"
              className="border-2 border-gray-400 text-gray-400 hover:bg-gray-400 hover:text-white px-8 py-4 text-lg rounded-full transition-all duration-300"
            >
              <Download className="mr-2 h-5 w-5" />
              Download Resume
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/50 cursor-pointer"
            onClick={onNext}
          >
            <ChevronDown className="h-8 w-8" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
