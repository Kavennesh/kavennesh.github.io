import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Download, ExternalLink, Mail, Phone, MapPin, Github, Linkedin, Instagram, Code, Award, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';
import ParticlesBackground from '@/components/ParticlesBackground';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import CodingProfilesSection from '@/components/CodingProfilesSection';
import SocialLinksSection from '@/components/SocialLinksSection';

const Index = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const sections = [
    { id: 'hero', component: HeroSection, title: 'Home' },
    { id: 'about', component: AboutSection, title: 'About' },
    { id: 'skills', component: SkillsSection, title: 'Skills' },
    { id: 'projects', component: ProjectsSection, title: 'Projects' },
    { id: 'coding', component: CodingProfilesSection, title: 'Coding Profiles' },
    { id: 'contact', component: ContactSection, title: 'Contact' },
    { id: 'social', component: SocialLinksSection, title: 'Social Links' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const nextSection = () => {
    setCurrentSection((prev) => (prev + 1) % sections.length);
  };

  const prevSection = () => {
    setCurrentSection((prev) => (prev - 1 + sections.length) % sections.length);
  };

  const goToSection = (index: number) => {
    setCurrentSection(index);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold text-white">Loading Portfolio...</h2>
        </motion.div>
      </div>
    );
  }

  const CurrentSectionComponent = sections[currentSection].component;

  return (
    <div className="relative min-h-screen overflow-hidden">
      <ParticlesBackground />
      
      <Navigation 
        sections={sections} 
        currentSection={currentSection} 
        onSectionChange={goToSection} 
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="min-h-screen"
        >
          <CurrentSectionComponent 
            onNext={nextSection}
            onPrev={prevSection}
            isFirst={currentSection === 0}
            isLast={currentSection === sections.length - 1}
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 flex flex-col gap-4">
        <Button
          onClick={prevSection}
          variant="outline"
          size="icon"
          className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
          disabled={currentSection === 0}
        >
          <ChevronDown className="h-4 w-4 rotate-180" />
        </Button>
        <Button
          onClick={nextSection}
          variant="outline"
          size="icon"
          className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
          disabled={currentSection === sections.length - 1}
        >
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>

      {/* Section indicators */}
      <div className="fixed right-4 bottom-8 z-40 flex flex-col gap-2">
        {sections.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSection(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSection ? 'bg-purple-400 scale-150' : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;
