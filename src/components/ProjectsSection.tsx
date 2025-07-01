import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink,Github,Smartphone, Globe,Zap,ShieldCheck,ImagePlus,TerminalSquare} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ProjectsSectionProps {
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      title: 'VPN Detection & Blocking System',
      description: 'Detects and blocks VPN usage through packet analysis and known IP mapping.',
      longDescription:'A network security solution designed to detect and block unauthorized VPN activity using packet sniffing and IP address pattern matching. The system captures source and destination IPs and compares them against known VPN ranges to flag suspicious connections. This enhances organizational security by preventing policy violations, malware exposure, and data exfiltration through encrypted VPN tunnels.',
      image: '/vpn.png',
      technologies: ['Python', 'Scapy', 'Wireshark', 'Packet Sniffing', 'Firewall Rules', 'SSL/TLS Analysis', 'Network Security'],
      githubUrl: 'https://github.com/Kavennesh/vpn_detector_front',
      icon: ShieldCheck,
      gradient: 'from-blue-700 to-cyan-800'
    },
    {
      id: 2,
      title: 'Enhance Image Generator',
      description: 'A deep learning-based tool that enhances low-light or low-quality images using PyTorch and HDR reconstruction techniques.',
      longDescription:'The Enhanced Image Generator is a Python-based image enhancement system that uses deep learning to improve the quality of low-light or low-contrast images. Leveraging PyTorch and custom-trained models (weights.pth), the system reconstructs high dynamic range (HDR) versions of input images. It processes images using advanced transformations, luminance adjustments, and tone mapping techniques to produce visually richer outputs. This project is ideal for scenarios where clarity, brightness, and detail enhancement are essential — such as photography restoration, scientific imaging, and low-light surveillance.',
      image: '/enhance.png',
      technologies: ['Python', 'PyTorch', 'NumPy', 'OpenCV', 'HDR Imaging', 'Image Processing'],
      githubUrl: 'https://github.com/Kavennesh/Enhanced-image-Generator',
      icon: ShieldCheck,
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      id: 3,
      title: 'Personal SSH Server via Ngrok',
      description: 'A secure SSH server setup using Ngrok on Debian-based systems, providing global access without static IP or port forwarding.',
      longDescription:'This project enables users to configure a globally accessible SSH server on Debian or Ubuntu machines by tunneling port 22 through Ngrok. The guide walks through the complete setup including OpenSSH installation, user creation, Ngrok configuration, and an optional systemd-based auto-start on boot. This eliminates the need for public IPs or router configurations, providing encrypted remote SSH access via a simple, portable setup. Ideal for homelabs, personal servers, or virtual machines running in restricted network environments.',
      image: '/ssh.png',
      technologies: ['Debian/Ubuntu','OpenSSH','Ngrok','Systemd','Shell Scripting','Remote Access'  ],
      githubUrl: 'https://github.com/Kavennesh/Personal-SSH-Server-via-Ngrok',
      icon: TerminalSquare,
      gradient: 'from-yellow-500 to-orange-500'
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center relative z-10 px-4 py-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A showcase of my recent work and the technologies I love working with.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 overflow-hidden h-full">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300`} />
                  <div className="absolute top-4 right-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${project.gradient} rounded-full flex items-center justify-center`}>
                      <project.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-white/10 text-white/80 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={() => setSelectedProject(project.id)}
                      variant="outline"
                      size="sm"
                      className="flex-1 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
                    >
                      View Details
                    </Button>

                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        <Github className="h-4 w-4" />
                      </Button>
                    </a>

                    
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-slate-900 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {(() => {
                  const project = projects.find(p => p.id === selectedProject);
                  if (!project) return null;

                  return (
                    <>
                      <div className="flex justify-between items-start mb-6">
                        <h3 className="text-3xl font-bold text-white">{project.title}</h3>
                        <Button
                          onClick={() => setSelectedProject(null)}
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-white"
                        >
                          ×
                        </Button>
                      </div>

                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-64 object-cover rounded-xl mb-6"
                      />

                      <p className="text-gray-300 mb-6 leading-relaxed">
                        {project.longDescription}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-4">
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                          <Button variant="outline" className="w-full border-white/20 text-white">
                            <Github className="mr-2 h-4 w-4" />
                            Source Code
                          </Button>
                        </a>
                      </div>
                    </>
                  );
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProjectsSection;
