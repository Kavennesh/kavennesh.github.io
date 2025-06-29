
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  sections: Array<{ id: string; title: string; component: React.ComponentType<any> }>;
  currentSection: number;
  onSectionChange: (index: number) => void;
}

const Navigation: React.FC<NavigationProps> = ({ sections, currentSection, onSectionChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSectionClick = (index: number) => {
    onSectionChange(index);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="outline"
          size="icon"
          className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
        >
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Desktop navigation */}
      <nav className="fixed top-8 left-1/2 transform -translate-x-1/2 z-40 hidden md:block">
        <div className="bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
          <div className="flex gap-6">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => handleSectionClick(index)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  index === currentSection
                    ? 'bg-gray-700 text-white shadow-lg'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-4 z-40 md:hidden"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
              <div className="flex flex-col gap-2">
                {sections.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => handleSectionClick(index)}
                    className={`px-4 py-2 rounded-xl transition-all duration-300 text-left ${
                      index === currentSection
                        ? 'bg-gray-700 text-white shadow-lg'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
