
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
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
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  const sections = [
    { id: 'hero', component: HeroSection, title: 'Home' },
    { id: 'about', component: AboutSection, title: 'About' },
    { id: 'skills', component: SkillsSection, title: 'Skills' },
    { id: 'projects', component: ProjectsSection, title: 'Projects' },
    { id: 'coding', component: CodingProfilesSection, title: 'Coding Profiles' },
    { id: 'social', component: SocialLinksSection, title: 'Social Links' },
    { id: 'contact', component: ContactSection, title: 'Contact' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      for (let i = sectionsRef.current.length - 1; i >= 0; i--) {
        const section = sectionsRef.current[i];
        if (section && scrollPosition >= section.offsetTop) {
          setCurrentSection(i);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    const section = sectionsRef.current[index];
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const nextSection = () => {
    const nextIndex = Math.min(currentSection + 1, sections.length - 1);
    scrollToSection(nextIndex);
  };

  const prevSection = () => {
    const prevIndex = Math.max(currentSection - 1, 0);
    scrollToSection(prevIndex);
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

  return (
    <div className="relative">
      <ParticlesBackground />
      
      <Navigation 
        sections={sections} 
        currentSection={currentSection} 
        onSectionChange={scrollToSection} 
      />

      <div className="relative z-10">
        {sections.map((section, index) => {
          const SectionComponent = section.component;
          return (
            <div
              key={section.id}
              ref={(el) => {
                if (el) sectionsRef.current[index] = el;
              }}
              id={section.id}
              className="min-h-screen"
            >
              <SectionComponent 
                onNext={nextSection}
                onPrev={prevSection}
                isFirst={index === 0}
                isLast={index === sections.length - 1}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Index;
