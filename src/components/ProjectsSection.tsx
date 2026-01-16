import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Github,
  ShieldCheck,
  Image,
  Server,
  KeyRound,
  Radar,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProjectsSectionProps {
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;

  // Option B hooks
  onOpen?: () => void;
  onClose?: () => void;
}

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
  glowColor?: string; // "168,85,247"
};

const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = "",
  glowColor = "168,85,247",
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useTransform(my, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mx, [-0.5, 0.5], [-10, 10]);

  const rX = useSpring(rotateX, { stiffness: 250, damping: 18 });
  const rY = useSpring(rotateY, { stiffness: 250, damping: 18 });

  const glowX = useSpring(useTransform(mx, [-0.5, 0.5], [0, 100]), {
    stiffness: 220,
    damping: 20,
  });
  const glowY = useSpring(useTransform(my, [-0.5, 0.5], [0, 100]), {
    stiffness: 220,
    damping: 20,
  });

  const [hovered, setHovered] = useState(false);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1

    mx.set(px - 0.5);
    my.set(py - 0.5);
  };

  const onLeave = () => {
    setHovered(false);
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      style={{
        transformStyle: "preserve-3d",
        rotateX: rX,
        rotateY: rY,
      }}
      className={`relative will-change-transform ${className}`}
    >
      {/* glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${glowX}% ${glowY}%, rgba(${glowColor},0.22), transparent 55%)`,
          transition: "opacity 220ms ease",
        }}
      />

      {/* subtle border shimmer */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/10" />

      {/* content */}
      <div className="relative">{children}</div>
    </motion.div>
  );
};

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpen, onClose }) => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const projects = useMemo(
    () => [
      {
        id: 1,
        title: "VPN Detection & Blocking System",
        description:
          "Detects and blocks VPN usage through packet analysis and known IP mapping.",
        longDescription:
          "A network security solution designed to detect and block unauthorized VPN activity using packet sniffing and IP address pattern matching. The system captures source and destination IPs and compares them against known VPN ranges to flag suspicious connections. This enhances organizational security by preventing policy violations, malware exposure, and data exfiltration through encrypted VPN tunnels.",
        image: "/vpn.png",
        technologies: [
          "Python",
          "Scapy",
          "Wireshark",
          "Packet Sniffing",
          "Firewall Rules",
          "SSL/TLS Analysis",
          "Network Security",
        ],
        githubUrl: "https://github.com/Kavennesh/vpn_detector_front",
        icon: ShieldCheck,
        gradient: "from-blue-700 to-cyan-800",
      },
      {
        id: 2,
        title: "Enhance Image Generator",
        description:
          "A deep learning-based tool that enhances low-light or low-quality images using PyTorch and HDR reconstruction techniques.",
        longDescription:
          "The Enhanced Image Generator is a Python-based image enhancement system that uses deep learning to improve the quality of low-light or low-contrast images. Leveraging PyTorch and custom-trained models (weights.pth), the system reconstructs high dynamic range (HDR) versions of input images. It processes images using advanced transformations, luminance adjustments, and tone mapping techniques to produce visually richer outputs.",
        image: "/enhance.png",
        technologies: [
          "Python",
          "PyTorch",
          "NumPy",
          "OpenCV",
          "HDR Imaging",
          "Image Processing",
        ],
        githubUrl: "https://github.com/Kavennesh/Enhanced-image-Generator",
        icon: Image,
        gradient: "from-green-500 to-emerald-500",
      },
      {
        id: 3,
        title: "Personal SSH Server via Ngrok",
        description:
          "A secure SSH server setup using Ngrok on Debian-based systems, providing global access without static IP or port forwarding.",
        longDescription:
          "This project enables users to configure a globally accessible SSH server on Debian or Ubuntu machines by tunneling port 22 through Ngrok. The guide walks through OpenSSH installation, user creation, Ngrok configuration, and optional systemd auto-start on boot.",
        image: "/ssh.png",
        technologies: [
          "Debian/Ubuntu",
          "OpenSSH",
          "Ngrok",
          "Systemd",
          "Shell Scripting",
          "Remote Access",
        ],
        githubUrl: "https://github.com/Kavennesh/Personal-SSH-Server-via-Ngrok",
        icon: Server,
        gradient: "from-yellow-500 to-orange-500",
      },
      {
        id: 4,
        title: "Password Manager Web App",
        description:
          "A secure password manager that allows users to store, encrypt, and manage credentials safely.",
        longDescription:
          "Built using React + Node.js to provide a secure interface for storing credentials. Passwords are encrypted (AES) and access is protected using authentication flows. Includes strength validation and copy-to-clipboard.",
        image: "/password-manager.png",
        technologies: [
          "React",
          "Node.js",
          "Express",
          "AES Encryption",
          "Tailwind CSS",
          "JWT Authentication",
          "Local Storage",
        ],
        githubUrl: "https://github.com/Kavennesh/password-manager-web",
        icon: KeyRound,
        gradient: "from-indigo-500 to-blue-500",
      },
      {
        id: 5,
        title: "Automated Network Enumerator",
        description:
          "Python-based red teaming tool for automated network reconnaissance.",
        longDescription:
          "Automated Network Enumerator (ANE) is a Python-based, CLI-driven network enumeration tool designed for ethical red teaming, eJPT-level learning, and foundational network reconnaissance. It provides a clean, modular, extensible recon engine suitable for labs, portfolios, and professional demonstrations.",
        image: "/ane_image.png",
        technologies: [
          "Python",
          "Nmap",
          "Socket Programming",
          "Multithreading",
          "Host Discovery",
          "TCP Port Scanning",
          "Service Enumeration",
          "Recon Automation",
          "CLI Tooling",
          "JSON / HTML Reporting",
        ],
        githubUrl: "https://github.com/Kavennesh/Automated-Network-Enumerator",
        icon: Radar,
        gradient: "from-gray-700 to-gray-900",
      },
    ],
    []
  );

  const openProject = (id: number) => {
    setSelectedProject(id);
    onOpen?.();
  };

  const closeProject = () => {
    setSelectedProject(null);
    onClose?.();
  };

  // lock body scroll while modal open
  useEffect(() => {
    if (!selectedProject) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow || "";
    };
  }, [selectedProject]);

  // ESC to close
  useEffect(() => {
    if (!selectedProject) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeProject();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProject]);

  return (
    <div className="min-h-screen flex items-center justify-center relative z-10 px-4 py-20">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto">
            Premium, cyber-focused builds — clean UI, real functionality, and
            strong security fundamentals.
          </p>
        </motion.div>

        {/* layout */}
        <div className="grid gap-8">
          {/* top row */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Featured big card (ANE) */}
            {projects
              .filter((p) => p.id === 5)
              .map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <TiltCard glowColor="168,85,247" className="rounded-2xl">
                    <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 overflow-hidden h-full group rounded-2xl">
                      <div className="relative overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-64 object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
                        />
                        <div className="absolute top-4 left-4 text-[10px] tracking-wider uppercase px-2 py-1 rounded-full bg-white/10 border border-white/10 text-white/80">
                          Featured
                        </div>
                        <div className="absolute top-4 right-4">
                          <div
                            className={`w-12 h-12 bg-gradient-to-r ${project.gradient} rounded-full flex items-center justify-center`}
                          >
                            <project.icon className="h-6 w-6 text-white" />
                          </div>
                        </div>
                      </div>

                      <CardContent className="p-6">
                        <h3 className="text-2xl font-bold text-white mb-3">
                          {project.title}
                        </h3>
                        <p className="text-gray-300 mb-4 leading-relaxed">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.technologies.slice(0, 10).map((tech) => (
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
                            onClick={() => openProject(project.id)}
                            variant="outline"
                            size="sm"
                            className="flex-1 bg-white/5 backdrop-blur-md border-purple-400/40 text-purple-300 hover:bg-purple-400/10 hover:text-white transition-all"
                          >
                            View Details
                          </Button>

                          {project.githubUrl && (
                            <Button
                              asChild
                              size="sm"
                              className="bg-white/5 backdrop-blur-md border-white/10 text-white hover:bg-white/10 hover:scale-105 transition-all shadow-sm"
                            >
                              <a
                                href={project.githubUrl.replace(/\.git$/, "")}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Open GitHub repository"
                              >
                                <Github className="h-4 w-4" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </TiltCard>
                </motion.div>
              ))}

            {/* VPN tall card */}
            {projects
              .filter((p) => p.id === 1)
              .map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                >
                  <TiltCard glowColor="34,211,238" className="rounded-2xl">
                    <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 overflow-hidden h-full group rounded-2xl">
                      <div className="relative overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-64 object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
                        />
                        <div className="absolute top-4 right-4">
                          <div
                            className={`w-12 h-12 bg-gradient-to-r ${project.gradient} rounded-full flex items-center justify-center`}
                          >
                            <project.icon className="h-6 w-6 text-white" />
                          </div>
                        </div>
                      </div>

                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-white mb-3">
                          {project.title}
                        </h3>
                        <p className="text-gray-300 mb-4 leading-relaxed">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.technologies.slice(0, 8).map((tech) => (
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
                            onClick={() => openProject(project.id)}
                            variant="outline"
                            size="sm"
                            className="flex-1 bg-white/5 backdrop-blur-md border-purple-400/40 text-purple-300 hover:bg-purple-400/10 hover:text-white transition-all"
                          >
                            View Details
                          </Button>

                          {project.githubUrl && (
                            <Button
                              asChild
                              size="sm"
                              className="bg-white/5 backdrop-blur-md border-white/10 text-white hover:bg-white/10 hover:scale-105 transition-all shadow-sm"
                            >
                              <a
                                href={project.githubUrl.replace(/\.git$/, "")}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Open GitHub repository"
                              >
                                <Github className="h-4 w-4" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </TiltCard>
                </motion.div>
              ))}
          </div>

          {/* bottom row */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects
              .filter((p) => ![5, 1].includes(p.id))
              .map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.08 + index * 0.06 }}
                >
                  <TiltCard glowColor="168,85,247" className="rounded-2xl">
                    <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 overflow-hidden h-full group rounded-2xl">
                      <div className="relative overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-44 object-cover group-hover:scale-[1.04] transition-transform duration-500"
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
                        />
                        <div className="absolute top-4 right-4">
                          <div
                            className={`w-11 h-11 bg-gradient-to-r ${project.gradient} rounded-full flex items-center justify-center`}
                          >
                            <project.icon className="h-5 w-5 text-white" />
                          </div>
                        </div>
                      </div>

                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-white mb-3">
                          {project.title}
                        </h3>
                        <p className="text-gray-300 mb-4 leading-relaxed">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.technologies.slice(0, 6).map((tech) => (
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
                            onClick={() => openProject(project.id)}
                            variant="outline"
                            size="sm"
                            className="flex-1 bg-white/5 backdrop-blur-md border-purple-400/40 text-purple-300 hover:bg-purple-400/10 hover:text-white transition-all"
                          >
                            View Details
                          </Button>

                          {project.githubUrl && (
                            <Button
                              asChild
                              size="sm"
                              className="bg-white/5 backdrop-blur-md border-white/10 text-white hover:bg-white/10 hover:scale-105 transition-all shadow-sm"
                            >
                              <a
                                href={project.githubUrl.replace(/\.git$/, "")}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Open GitHub repository"
                              >
                                <Github className="h-4 w-4" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </TiltCard>
                </motion.div>
              ))}
          </div>
        </div>

        {/* ========================= MODAL ========================= */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={closeProject}
            >
              <motion.div
                initial={{ scale: 0.92, opacity: 0, y: 14 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.92, opacity: 0, y: 14 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
                className="bg-slate-900 rounded-2xl p-6 md:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-white/10"
                onClick={(e) => e.stopPropagation()}
              >
                {(() => {
                  const project = projects.find((p) => p.id === selectedProject);
                  if (!project) return null;

                  return (
                    <>
                      <div className="flex justify-between items-start gap-4 mb-5">
                        <div>
                          <h3 className="text-2xl md:text-3xl font-bold text-white">
                            {project.title}
                          </h3>
                          <p className="text-gray-400 mt-1">
                            {project.description}
                          </p>
                        </div>

                        <button
                          onClick={closeProject}
                          className="text-gray-400 hover:text-white transition text-2xl leading-none px-2"
                          aria-label="Close modal"
                        >
                          ×
                        </button>
                      </div>

                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-56 md:h-72 object-cover rounded-xl mb-6"
                      />

                      <p className="text-gray-300 mb-6 leading-relaxed">
                        {project.longDescription}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-7">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        {project.githubUrl && (
                          <>
                            <a
                              href={project.githubUrl.replace(/\.git$/, "")}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 text-white py-3 rounded-lg flex justify-center items-center gap-2 hover:bg-white/10 transition-all"
                            >
                              <Github className="h-4 w-4" />
                              <span>Source Code</span>
                            </a>

                            <a
                              href={project.githubUrl.replace(/\.git$/, "")}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 text-white py-3 rounded-lg flex justify-center items-center gap-2 hover:bg-white/10 transition-all"
                            >
                              <ExternalLink className="h-4 w-4" />
                              <span>Open Repo</span>
                            </a>
                          </>
                        )}
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
