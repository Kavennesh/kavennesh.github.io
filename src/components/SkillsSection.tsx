
import React from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Database, Globe, Smartphone, Zap } from 'lucide-react';



interface SkillsSectionProps {
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const SkillsSection: React.FC<SkillsSectionProps> = () => {
  const skills = [
    { name: 'Python', level: 90, icon: Code, color: 'from-gray-600 to-gray-800' },
    { name: 'Network Security', level: 90, icon: Globe, color: 'from-gray-500 to-gray-700' },
    { name: 'Penetration Testing', level: 60, icon: Database, color: 'from-gray-700 to-gray-900' },
    { name: 'Linux', level: 90, icon: Palette, color: 'from-gray-400 to-gray-600' },
    { name: 'Bash scripting', level: 60, icon: Smartphone, color: 'from-gray-800 to-black' },
    { name: 'Metasploit Framework', level: 87, icon: Zap, color: 'from-gray-600 to-gray-800' }
  ];

  const softSkills = [
    'Problem Solving',
    'Team Leadership',
    'Communication',
    'Project Management',
    'Mentoring',
    'Adaptability'
  ];

  return (
    <div className="min-h-screen flex items-center justify-center relative z-10 px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent">
            My Skills
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A comprehensive toolkit for creating exceptional digital experiences.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Technical Skills */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-3xl font-bold text-white mb-8 text-center lg:text-left">Technical Skills</h3>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${skill.color} rounded-full flex items-center justify-center`}>
                      <skill.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-semibold">{skill.name}</span>
                        <span className="text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
                          className={`h-2 bg-gradient-to-r ${skill.color} rounded-full`}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Soft Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-3xl font-bold text-white mb-8 text-center lg:text-left">Soft Skills</h3>
            <div className="grid grid-cols-2 gap-4">
              {softSkills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 text-center hover:bg-white/10 transition-all duration-300 group"
                >
                  <span className="text-white font-medium group-hover:text-gray-300 transition-colors duration-300">
                    {skill}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-12 bg-gradient-to-r from-gray-800/30 to-black/30 rounded-2xl p-8 border border-gray-600/30"
            >
              <h4 className="text-2xl font-bold text-white mb-4">Always Learning</h4>
              <p className="text-gray-300 leading-relaxed">
                Technology evolves rapidly, and I'm committed to staying current with the latest 
                trends, tools, and best practices. I regularly attend conferences, take online 
                courses, and contribute to open-source projects to expand my knowledge and skills.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
