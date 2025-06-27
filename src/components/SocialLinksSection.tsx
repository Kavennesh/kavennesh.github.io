
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Twitter, Mail, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface SocialLinksSectionProps {
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const SocialLinksSection: React.FC<SocialLinksSectionProps> = () => {
  const socialLinks = [
    {
      id: 1,
      name: 'GitHub',
      username: '@johndoe',
      description: 'Open source projects and code repositories',
      followers: '2.5K',
      url: 'https://github.com/johndoe',
      icon: Github,
      gradient: 'from-gray-700 to-gray-900',
      hoverColor: 'hover:text-gray-300'
    },
    {
      id: 2,
      name: 'LinkedIn',
      username: '@johndoe',
      description: 'Professional network and career updates',
      followers: '5.2K',
      url: 'https://linkedin.com/in/johndoe',
      icon: Linkedin,
      gradient: 'from-blue-600 to-blue-800',
      hoverColor: 'hover:text-blue-400'
    },
    {
      id: 3,
      name: 'Instagram',
      username: '@johndoe',
      description: 'Behind the scenes and daily life',
      followers: '1.8K',
      url: 'https://instagram.com/johndoe',
      icon: Instagram,
      gradient: 'from-pink-500 to-purple-600',
      hoverColor: 'hover:text-pink-400'
    },
    {
      id: 4,
      name: 'Twitter',
      username: '@johndoe',
      description: 'Tech insights and thoughts',
      followers: '3.1K',
      url: 'https://twitter.com/johndoe',
      icon: Twitter,
      gradient: 'from-blue-400 to-blue-600',
      hoverColor: 'hover:text-blue-300'
    }
  ];

  const quickActions = [
    {
      title: 'Send Email',
      description: 'Get in touch directly',
      icon: Mail,
      action: () => window.open('mailto:john.doe@email.com'),
      gradient: 'from-red-500 to-pink-500'
    },
    {
      title: 'Download Resume',
      description: 'Get my latest CV',
      icon: ExternalLink,
      action: () => {
        const link = document.createElement('a');
        link.href = '/resume.pdf';
        link.download = 'John_Doe_Resume.pdf';
        link.click();
      },
      gradient: 'from-green-500 to-emerald-500'
    }
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
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Find me on social media and let's build something amazing together. I love connecting with fellow developers and creators.
          </p>
        </motion.div>

        {/* Social Links Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {socialLinks.map((social, index) => (
            <motion.div
              key={social.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => window.open(social.url, '_blank')}
            >
              <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 overflow-hidden h-full group-hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 bg-gradient-to-r ${social.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <social.icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className={`text-2xl font-bold text-white ${social.hoverColor} transition-colors duration-300`}>
                          {social.name}
                        </h3>
                        <p className="text-gray-400">{social.username}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold text-lg">{social.followers}</div>
                      <div className="text-gray-400 text-sm">followers</div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">{social.description}</p>
                  
                  <div className="flex items-center gap-2 text-gray-400 group-hover:text-white transition-colors duration-300">
                    <span>Visit Profile</span>
                    <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
            >
              <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group"
                    onClick={action.action}>
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${action.gradient} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <action.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{action.title}</h3>
                  <p className="text-gray-300">{action.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Final Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl p-12 border border-indigo-500/30">
            <motion.h3 
              className="text-4xl font-bold text-white mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              Thank You for Visiting!
            </motion.h3>
            <motion.p 
              className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              I'm always excited to connect with fellow developers, designers, and creators. 
              Whether you want to collaborate on a project, discuss technology, or just say hello, 
              I'd love to hear from you!
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button 
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-8 py-4 text-lg"
                onClick={() => window.open('mailto:john.doe@email.com')}
              >
                <Mail className="mr-2 h-5 w-5" />
                Get In Touch
              </Button>
              <Button 
                variant="outline"
                className="border-2 border-indigo-400 text-indigo-400 hover:bg-indigo-400 hover:text-white px-8 py-4 text-lg"
                onClick={() => window.open('https://github.com/johndoe', '_blank')}
              >
                <Github className="mr-2 h-5 w-5" />
                Follow My Work
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SocialLinksSection;
