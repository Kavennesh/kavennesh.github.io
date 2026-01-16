import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code, Palette, Database, Globe, Smartphone, Zap } from "lucide-react";

interface SkillsSectionProps {
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const SkillsSection: React.FC<SkillsSectionProps> = () => {
  const skills = [
    { name: "Python", level: 90, icon: Code, color: "from-gray-600 to-gray-800" },
    { name: "Network Security", level: 90, icon: Globe, color: "from-gray-500 to-gray-700" },
    { name: "Penetration Testing", level: 60, icon: Database, color: "from-gray-700 to-gray-900" },
    { name: "Linux", level: 90, icon: Palette, color: "from-gray-400 to-gray-600" },
    { name: "Bash scripting", level: 60, icon: Smartphone, color: "from-gray-800 to-black" },
    { name: "Metasploit Framework", level: 87, icon: Zap, color: "from-gray-600 to-gray-800" },
  ];

  const softSkills = [
    "Analytical Thinking",
    "Problem Solving",
    "Incident Response Mindset",
    "Attention to Detail",
    "Risk Assessment",
    "Communication Skills",
    "Team Collaboration",
    "Adaptability",
    "Continuous Learning",
    "Time Management",
  ];

  const tools = [
    { name: "Burp Suite", icon: "/burpsuite.png" },
    { name: "Metasploit", icon: "/metasploit.png" },
    { name: "Wireshark", icon: "/wireshark.avif" },
    { name: "Nmap", icon: "/nmap.png" },
    { name: "SQLmap", icon: "/Sqlmap.png" },
    { name: "Hydra", icon: "/hydra.jpg" },
    { name: "Kali Linux", icon: "/kali_linux.png" },
    { name: "Linux", icon: "/linux.jpg" },
    { name: "Docker", icon: "/docker.png" },
    { name: "Python", icon: "/Python.png" },
    { name: "Bash", icon: "/bash.png" },
  ];

  const certifications = [
    {
      title: "CNSP – Certified Network Security Practitioner",
      issuer: "The SecOps Group",
      year: "2025",
      credential:
        "Network security fundamentals, threat analysis, and defensive security concepts",
      status: "Completed",
      link: "https://www.linkedin.com/in/kavenneshbv/",
    },
    {
      title: "eJPT – Junior Penetration Tester",
      issuer: "INE / eLearnSecurity",
      year: "2025",
      credential: "Hands-on penetration testing fundamentals and network exploitation",
      status: "In Progress",
      link: "",
    },
  ];

  // ✅ Progress bar animation trigger (on scroll into view)
  const techRef = useRef<HTMLDivElement | null>(null);
  const techInView = useInView(techRef, { amount: 0.25, once: false });

  return (
    <div className="min-h-screen flex items-center justify-center relative z-10 px-4 py-20">
      <div className="max-w-7xl mx-auto w-full">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent">
            My Skills
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A comprehensive toolkit for modern cybersecurity engineering.
          </p>
        </motion.div>

        {/* Tools */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center lg:text-left">
            Tools
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
            {tools.map((tool) => (
              <div
                key={tool.name}
                className="group relative bg-white/5 border border-white/10 rounded-2xl px-4 py-4 flex items-center gap-3 hover:bg-white/10 transition"
              >
                <div className="h-11 w-11 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden">
                  <img
                    src={tool.icon}
                    alt={tool.name}
                    className="h-8 w-8 object-contain"
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
                <span className="text-white text-sm font-medium">{tool.name}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* 3 Columns */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Technical */}
          <div ref={techRef as any}>
            <h3 className="text-3xl font-bold text-white mb-8">Technical Skills</h3>

            <div className="space-y-6">
              {skills.map((skill, i) => (
                <div
                  key={skill.name}
                  className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${skill.color} rounded-full flex items-center justify-center`}
                    >
                      <skill.icon className="h-6 w-6 text-white" />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-semibold">{skill.name}</span>
                        <span className="text-gray-300">{skill.level}%</span>
                      </div>

                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-2 bg-gradient-to-r ${skill.color} rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: techInView ? `${skill.level}%` : "0%" }}
                          transition={{ duration: 1.2, delay: i * 0.08 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div>
            <h3 className="text-3xl font-bold text-white mb-8">Soft Skills</h3>

            <div className="grid grid-cols-2 gap-4">
              {softSkills.map((s) => (
                <div
                  key={s}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 text-white text-center hover:bg-white/10 transition"
                >
                  {s}
                </div>
              ))}
            </div>

            <div className="mt-12 bg-gradient-to-r from-gray-800/30 to-black/30 rounded-2xl p-8 border border-gray-600/30">
              <h4 className="text-2xl font-bold text-white mb-4">Always Learning</h4>
              <p className="text-gray-300 leading-relaxed">
                Technology evolves rapidly, and I'm committed to staying current with the latest
                trends, tools, and best practices.
              </p>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-3xl font-bold text-white mb-8">Certifications</h3>

            <div className="space-y-6">
              {certifications.map((cert) => (
                <div
                  key={cert.title}
                  className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-6 hover:bg-white/10 transition"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h4 className="text-lg font-semibold text-white leading-snug">
                      {cert.title}
                    </h4>

                    <span
                      className={`shrink-0 text-xs px-3 py-1 rounded-full font-medium ${
                        cert.status === "Completed"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {cert.status}
                    </span>
                  </div>

                  <p className="text-gray-300 mt-2">
                    {cert.issuer} • {cert.year}
                  </p>

                  <p className="text-gray-400 mt-2 text-sm">{cert.credential}</p>

                  {cert.status === "Completed" && cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center mt-4 text-cyan-400 hover:text-cyan-300 transition"
                    >
                      View Certificate →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
