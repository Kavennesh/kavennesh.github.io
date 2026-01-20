
import React from 'react';
import { cubicBezier, motion } from 'framer-motion';
import { ExternalLink, Trophy, Star, Code, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CodingProfilesSectionProps {
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const CodingProfilesSection: React.FC<CodingProfilesSectionProps> = () => {
  const profiles = [
    {
      id: 1,
      name: 'Tryhackme',
      username: '@kavennesh',
      description: 'Top 2% in India Region',
      stats: {
        solved: '100+ Rooms',
        rating: '51377',
        rank: 'Wizard'
      },
      url: 'https://tryhackme.com/p/kavennesh', 
      icon: Trophy,
      gradient: 'from-gray-600 to-gray-800',
      bgColor: 'bg-gray-600/10'
    },
    {
      id: 2,
      name: 'HackTheBox',
      username: '@Kavennesh',
      description: 'Programming challenges and competitions',
      stats: {
        solved: '20+ Rooms',
        rating: ' Bronze',
        rank: '#898 Global'
      },
      url: 'https://app.hackthebox.com/profile/overview/kavennesh',
      icon: Trophy,
      gradient: 'from-gray-500 to-gray-700',
      bgColor: 'bg-gray-500/10'
    },
  ];

  const achievements = [
    {
      title: 'Top 3 in Weekly league',
      description: 'Regular Participation in weekly challenge',
      icon: Trophy,
      color: 'text-gray-400'
    },
    {
      title: 'Active CTF player',
      description: 'Participated 5+ CTF competition',
      icon: Code,
      color: 'text-gray-300'
    },
    {
      title: '130+ Day Streak',
      description: 'Consistent daily practice in Tryhackme',
      icon: Award,
      color: 'text-gray-500'
    },
    {
      title: 'HomeLab Enthusiastic',
      description: 'Deployed my own homelab for Learning new things in a private environment',
      icon: Star,
      color: 'text-gray-400'
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center relative z-10 px-4 py-20 pt-32">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-10 bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent">
            Coding Profiles
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            My journey in competitive programming and algorithm solving across various platforms.
          </p>
        </motion.div>

        {/* Coding Platforms */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {profiles.map((profile, index) => (
            <motion.div
              key={profile.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 overflow-hidden h-full">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${profile.gradient} rounded-xl flex items-center justify-center`}>
                        <profile.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{profile.name}</h3>
                        <p className="text-gray-400">{profile.username}</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="bg-white/5 backdrop-blur-md border-white/10 text-white hover:bg-purple-500/20 hover:shadow-[0_0_10px_rgba(168,85,247,0.4)] transition-all"
                      onClick={() => window.open(profile.url, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>

                  </div>
                  
                  <p className="text-gray-300 mb-6">{profile.description}</p>
                  
                  <div className={`${profile.bgColor} rounded-xl p-4 mb-4`}>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-white font-bold text-lg">{profile.stats.solved}</div>
                        <div className="text-gray-400 text-sm">Problems</div>
                      </div>
                      <div>
                        <div className="text-white font-bold text-lg">{profile.stats.rating}</div>
                        <div className="text-gray-400 text-sm">Rating</div>
                      </div>
                      <div>
                        <div className="text-white font-bold text-lg">{profile.stats.rank}</div>
                        <div className="text-gray-400 text-sm">Rank</div>
                      </div>
                    </div>
                  </div>

                  <Button
                    className={`w-full bg-gradient-to-r ${profile.gradient} hover:opacity-90 text-white group-hover:scale-105 transition-all duration-300`}
                    onClick={() => window.open(profile.url, '_blank')}
                  >
                    View Profile
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">Key Achievements</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 text-center hover:bg-white/10 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 ${achievement.color} mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <achievement.icon className="w-full h-full" />
                </div>
                <h4 className="text-white font-bold mb-2">{achievement.title}</h4>
                <p className="text-gray-400 text-sm">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-16"
        >
        <div className="bg-gradient-to-r from-gray-800/30 to-black/30 rounded-2xl p-8 border border-gray-600/30">
          <h3 className="text-2xl font-bold text-white mb-4">Let's Hack Together!</h3>
          <p className="text-gray-300 mb-6">
            Interested in Capture The Flag (CTF) challenges or cybersecurity problem-solving? Feel free to connect with me on TryHackMe or LinkedIn.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://tryhackme.com/p/kavennesh" target="_blank" rel="noopener noreferrer">
              <Button className="bg-gradient-to-r from-green-700 to-emerald-800 hover:from-green-800 hover:to-emerald-900 text-white px-8 py-3">
              Connect on TryHackMe
              <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
           </a>

            <a href="https://www.linkedin.com/in/kavenneshbv" target="_blank" rel="noopener noreferrer">
              <Button className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-8 py-3">
              Connect on LinkedIn
              <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
         </div>
        </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CodingProfilesSection;
