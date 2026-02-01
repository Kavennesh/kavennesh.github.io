import React, { useState, useEffect, useRef } from "react";
import ParticlesBackground from "@/components/ParticlesBackground";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import CodingProfilesSection from "@/components/CodingProfilesSection";
import SocialLinksSection from "@/components/SocialLinksSection";
import IntroLoader from "@/components/IntroLoader";
import ExperienceSection from "@/components/ExperienceSection";

const Index = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const [showIntro, setShowIntro] = useState(true);

  // ✅ Option B: hide nav when project modal is open
  const [projectOpen, setProjectOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    sessionStorage.removeItem("intro_seen"); // remove later if you want show-once
    setShowIntro(true);
  }, []);

  const handleIntroDone = () => {
    sessionStorage.setItem("intro_seen", "1");
    setShowIntro(false);
    setCurrentSection(0);
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  };

  const sections = [
    { id: "hero", component: HeroSection, title: "Home" },
    { id: "about", component: AboutSection, title: "About" },
    { id: "experience", component: ExperienceSection, title: "Experience" },
    { id: "skills", component: SkillsSection, title: "Skills" },
    { id: "projects", component: ProjectsSection, title: "Projects" },
    { id: "coding", component: CodingProfilesSection, title: "Coding Profiles" },
    { id: "social", component: SocialLinksSection, title: "Social Links" },
    { id: "contact", component: ContactSection, title: "Contact" },
  ];

  // ✅ Track current section based on scroll — but NOT during intro or while modal open
  useEffect(() => {
    if (showIntro) return;
    if (projectOpen) return;

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

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [showIntro, projectOpen]);

  const scrollToSection = (index: number) => {
    const section = sectionsRef.current[index];
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const nextSection = () => {
    const nextIndex = Math.min(currentSection + 1, sections.length - 1);
    scrollToSection(nextIndex);
  };

  const prevSection = () => {
    const prevIndex = Math.max(currentSection - 1, 0);
    scrollToSection(prevIndex);
  };

  return (
    <div className="relative">
      <ParticlesBackground />

      <IntroLoader show={showIntro} onDone={handleIntroDone} />

      {/* ✅ Option B: Hide Navigation when project modal is open */}
      {!projectOpen && (
        <Navigation
          sections={sections}
          currentSection={currentSection}
          onSectionChange={scrollToSection}
        />
      )}

      <div className="relative z-10">
        {sections.map((section, index) => {
          const SectionComponent = section.component;

          // Pass open/close only to Projects section
          const extraProps =
            section.id === "projects"
              ? {
                  onOpen: () => setProjectOpen(true),
                  onClose: () => setProjectOpen(false),
                }
              : {};

          return (
            <div
              key={section.id}
              ref={(el) => {
                if (el) sectionsRef.current[index] = el;
              }}
              id={section.id}
              className="min-h-screen scroll-mt-28 md:scroll-mt-40"
            >
              <SectionComponent
                onNext={nextSection}
                onPrev={prevSection}
                isFirst={index === 0}
                isLast={index === sections.length - 1}
                {...extraProps}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Index;
