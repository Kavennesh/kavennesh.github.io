import React, { useMemo, useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  GraduationCap,
  Briefcase,
  ShieldCheck,
  Calendar,
  MapPin,
  Terminal,
} from "lucide-react";

/* ================= TYPES ================= */

type Accent = "purple" | "cyan";

type Entry = {
  org: string;
  role: string;
  time: string;
  location?: string;
  points: string[]; // ✅ everything is points
  tags?: string[];
  accent: Accent;
};

/* ================= STYLES ================= */

const accentStyles = (accent: Accent) => {
  if (accent === "purple") {
    return {
      dot: "bg-purple-400 shadow-[0_0_18px_rgba(168,85,247,0.65)]",
      ring: "border-purple-400/35",
      glow:
        "hover:shadow-[0_0_28px_rgba(168,85,247,0.20)] hover:border-purple-400/40",
      tag: "bg-purple-500/15 text-purple-200 border-purple-500/20",
      header: "from-purple-200 to-indigo-200",
      wash:
        "bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.18),transparent_55%)]",
      rail:
        "bg-gradient-to-b from-purple-400/90 via-purple-400/40 to-transparent",
    };
  }
  return {
    dot: "bg-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.65)]",
    ring: "border-cyan-400/35",
    glow:
      "hover:shadow-[0_0_28px_rgba(34,211,238,0.20)] hover:border-cyan-400/40",
    tag: "bg-cyan-500/15 text-cyan-100 border-cyan-500/20",
    header: "from-cyan-100 to-gray-200",
    wash:
      "bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.18),transparent_55%)]",
    rail:
      "bg-gradient-to-b from-cyan-400/90 via-cyan-400/40 to-transparent",
  };
};

const container: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, staggerChildren: 0.12 },
  },
};

const card: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.985 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55 } },
};

/* ================= SUB COMPONENTS ================= */

const PanelHeader = ({
  title,
  subtitle,
  icon,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="h-12 w-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center">
      {icon}
    </div>
    <div>
      <h3 className="text-2xl font-semibold text-white">{title}</h3>
      <p className="text-sm text-white/55">{subtitle}</p>
    </div>
  </div>
);

const TimelinePanel = ({
  entries,
  panelKey,
  inView,
  railProgress,
}: {
  entries: Entry[];
  panelKey: "work" | "edu";
  inView: boolean;
  railProgress: any;
}) => {
  const railHeight = useTransform(railProgress, [0, 1], ["0%", "100%"]);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className="relative"
    >
      {/* Rail (always on LEFT for both panels) */}
      <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10" />
      <motion.div
        style={{ height: railHeight }}
        className={[
          "absolute left-4 top-0 w-px",
          panelKey === "work"
            ? accentStyles("purple").rail
            : accentStyles("cyan").rail,
        ].join(" ")}
      />

      <div className="space-y-7">
        {entries.map((it, idx) => {
          const styles = accentStyles(it.accent);
          const id = `${panelKey}-${idx}`;

          return (
            <motion.div key={id} variants={card} className="relative pl-10">
              {/* Dot */}
              <div
                className={[
                  "absolute top-7 left-4 -translate-x-1/2 w-3.5 h-3.5 rounded-full",
                  styles.dot,
                ].join(" ")}
              />
              <div
                className={[
                  "absolute top-[18px] left-4 -translate-x-1/2 w-8 h-8 rounded-full border",
                  styles.ring,
                ].join(" ")}
              />

              {/* Pulse */}
              <motion.div
                className={[
                  "absolute top-7 left-4 -translate-x-1/2 rounded-full",
                  it.accent === "purple" ? "bg-purple-400/30" : "bg-cyan-400/30",
                ].join(" ")}
                style={{ width: 14, height: 14 }}
                animate={
                  inView ? { opacity: [0.25, 0.6, 0.25], scale: [1, 2, 1] } : {}
                }
                transition={{
                  duration: 2.2,
                  repeat: inView ? Infinity : 0,
                  ease: "easeInOut",
                }}
              />

              {/* Card */}
              <div
                className={[
                  "group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 transition",
                  "hover:-translate-y-1",
                  styles.glow,
                ].join(" ")}
              >
                <div
                  className={[
                    "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition",
                    styles.wash,
                  ].join(" ")}
                />

                <div className="relative">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-white/60">
                    <Terminal className="h-3.5 w-3.5" />
                    parsed_entry
                  </div>

                  <h4 className="mt-3 font-mono text-lg md:text-xl text-white">
                    <span
                      className={[
                        "font-semibold bg-gradient-to-r bg-clip-text text-transparent",
                        styles.header,
                      ].join(" ")}
                    >
                      {it.role}
                    </span>
                  </h4>

                  <p className="text-white/85 mt-1">{it.org}</p>

                  <div className="flex flex-wrap gap-3 mt-3 text-xs text-white/60">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {it.time}
                    </span>
                    {it.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {it.location}
                      </span>
                    )}
                  </div>

                  {/* ✅ ALL CONTENT AS POINTS */}
                  <ul className="mt-4 space-y-2 text-gray-300 text-sm list-disc list-inside">
                    {it.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>

                  {it.tags && it.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {it.tags.map((t) => (
                        <span
                          key={t}
                          className={[
                            "px-3 py-1 text-[11px] rounded-full border",
                            styles.tag,
                          ].join(" ")}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

/* ================= MAIN COMPONENT ================= */

const ExperienceSection: React.FC = () => {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(wrapRef, { amount: 0.25, once: false });

  /* Scroll-driven line animation */
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start 0.85", "end 0.25"],
  });

  const railProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 22,
    mass: 0.6,
  });

  /* ================= DATA ================= */

  const workItems = useMemo<Entry[]>(
    () => [
      {
        org: "Florida International University",
        role: "Student Teaching Assistant",
        time: "January 2025 – Present",
        location: "Miami, FL",
        points: [
          "Conducted hands-on instruction for cybersecurity and SQL Server lab sessions.",
          "Mentored students with lab debugging, assignments, and exam preparation support.",
          "Collaborated with faculty to improve lab delivery and learning outcomes.",
          "Assisted with course operations: grading support, materials coordination, and student guidance.",
        ],
        tags: ["Cybersecurity Labs", "Linux Administration", "Secure Networking", "Technical Instruction"],
        accent: "purple",
      },
      {
        org: "INTER DECCAAN SOLUTIONS",
        role: "Network Security Analyst Intern",
        time: "December 2023 – February 2024",
        location: "India (Remote)",
        points: [
          "Supported network monitoring tasks and basic security event review.",
          "Helped identify suspicious traffic patterns during threat detection activities.",
          "Performed entry-level vulnerability checks and documented findings for the team.",
        ],
        tags: ["Penetration Testing", "Vulnerability Exploitation", "Network Reconnaissance", "Attack Surface Mapping", "Adversary Simulation"],        accent: "purple",
      },
    ],
    []
  );

  const educationItems = useMemo<Entry[]>(
    () => [
      {
        org: "Florida International University",
        role: "Master’s in Cyber Security",
        time: "August 2024 – April 2026",
        location: "Miami, FL",
        points: [
          "Graduate program focused on security engineering and applied defense concepts.",
          "Hands-on coursework and lab work aligned with real-world security practices.",
          "GPA: 3.7 / 4.0",
        ],
        accent: "cyan",
      },
      {
        org: "Sri Krishna College of Engineering and Technology",
        role: "B.E. Computer Science",
        time: "November 2020 – April 2024",
        location: "India",
        points: [
          "Built strong computer science foundation in systems, programming, and networks.",
          "Completed academic projects and practical implementations across core CS topics.",
          "GPA: 9.1 / 10.0",
        ],
        accent: "cyan",
      },
    ],
    []
  );

  return (
    <section className="min-h-screen px-4 py-24 relative z-10">
      <div className="max-w-6xl mx-auto" ref={wrapRef}>
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs tracking-[0.25em] uppercase text-white/70">
            <ShieldCheck className="h-4 w-4" />
            Career Timeline
          </div>

          <h2 className="mt-5 text-5xl md:text-6xl font-bold text-white">
            Experience{" "}
            <span className="bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent">
              & Education
            </span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6 md:p-7">
            <PanelHeader
              title="Work Experience"
              subtitle="Professional roles + impact"
              icon={<Briefcase className="h-6 w-6 text-purple-200" />}
            />
            <TimelinePanel
              entries={workItems}
              panelKey="work"
              inView={inView}
              railProgress={railProgress}
            />
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6 md:p-7">
            <PanelHeader
              title="Education"
              subtitle="Academic track + GPA"
              icon={<GraduationCap className="h-6 w-6 text-cyan-200" />}
            />
            <TimelinePanel
              entries={educationItems}
              panelKey="edu"
              inView={inView}
              railProgress={railProgress}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
