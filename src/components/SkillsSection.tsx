import React, { useMemo, useRef, useState, useEffect, useCallback } from "react";
import ParticlesBackground from "./ParticlesBackground";

/* ============================
   3D Sphere Math (TypeScript)
============================ */
type Projection = {
  x: number;
  y: number;
  depth: number;
  scale: number;
  opacity: number;
  blur: number;
  zIndex: number;
};

type GlobePoint = { x: number; y: number; depth: number };

function projectToSphere(lat: number, lon: number, rotY: number): Projection {
  const latR = (lat * Math.PI) / 180;
  const lonR = (lon * Math.PI) / 180;

  const x0 = Math.cos(latR) * Math.cos(lonR);
  const y0 = Math.sin(latR);
  const z0 = Math.cos(latR) * Math.sin(lonR);

  const cos = Math.cos(rotY);
  const sin = Math.sin(rotY);

  const x = x0 * cos + z0 * sin;
  const z = -x0 * sin + z0 * cos;
  const y = y0;

  const depth = (z + 1) / 2;

  return {
    x,
    y,
    depth,
    scale: 0.55 + depth * 0.55,
    opacity: 0.25 + depth * 0.75,
    blur: (1 - depth) * 2.5,
    zIndex: Math.floor(depth * 100),
  };
}

/* ============================
   Wireframe grid paths
============================ */
function generateWireframeLines(rotY: number, radius: number): GlobePoint[][] {
  const lines: GlobePoint[][] = [];
  const latCount = 7;
  const lonCount = 10;
  const segments = 80;

  // latitude rings
  for (let i = 0; i <= latCount; i++) {
    const lat = -90 + (180 / latCount) * i;
    const points: GlobePoint[] = [];
    for (let j = 0; j <= segments; j++) {
      const lon = -180 + (360 / segments) * j;
      const p = projectToSphere(lat, lon, rotY);
      points.push({ x: p.x * radius, y: p.y * radius, depth: p.depth });
    }
    lines.push(points);
  }

  // longitude meridians
  for (let i = 0; i < lonCount; i++) {
    const lon = -180 + (360 / lonCount) * i;
    const points: GlobePoint[] = [];
    for (let j = 0; j <= segments; j++) {
      const lat = -90 + (180 / segments) * j;
      const p = projectToSphere(lat, lon, rotY);
      points.push({ x: p.x * radius, y: p.y * radius, depth: p.depth });
    }
    lines.push(points);
  }

  return lines;
}

function pointsToPath(points: GlobePoint[]) {
  if (points.length < 2) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) d += ` L ${points[i].x} ${points[i].y}`;
  return d;
}

/* ============================
   Main SkillsSection
============================ */
type SkillItem = {
  name: string;
  icon: string;
  lat: number;
  lon: number;
  size: number;
};

type TechSkill = {
  name: string;
  level: number;
  icon: string; // emoji or small text icon for the left badge
};

type CertItem = {
  title: string;
  org: string;
  year: string;
  status: "In Progress" | "Completed";
  tone: "warning" | "success";
  desc: string;
  link?: string | null;
};

const SkillsSection: React.FC = () => {
  const [rotY, setRotY] = useState<number>(0);
  const [dragging, setDragging] = useState<boolean>(false);
  const [lastX, setLastX] = useState<number>(0);
  const [hovered, setHovered] = useState<string | null>(null);

  const animRef = useRef<number | null>(null);
  const rotRef = useRef<number>(0);

  // ✅ Globe icons
  const skills = useMemo<SkillItem[]>(
    () => [
      { name: "Python", icon: "/Python.png", lat: 10, lon: -90, size: 52 },
      { name: "Linux", icon: "/linux.jpg", lat: 25, lon: 80, size: 52 },
      { name: "Docker", icon: "/docker.png", lat: -30, lon: -40, size: 48 },
      { name: "Git", icon: "/git.png", lat: 40, lon: 150, size: 46 },
      { name: "Hydra", icon: "/hydra.jpg", lat: -5, lon: 30, size: 46 },
      { name: "Metasploit", icon: "/metasploit.png", lat: -40, lon: 120, size: 48 },
      { name: "Nmap", icon: "/nmap.png", lat: 0, lon: 170, size: 46 },
      { name: "Wireshark", icon: "/wireshark.avif", lat: -20, lon: -150, size: 46 },
      { name: "Burp Suite", icon: "/burpsuite.png", lat: 55, lon: -10, size: 46 },
      { name: "SQLmap", icon: "/Sqlmap.png", lat: -55, lon: -5, size: 44 },
      { name: "Kali Linux", icon: "/kali_linux.png", lat: 5, lon: 60, size: 46 },
      { name: "Bash", icon: "/bash.png", lat: 35, lon: -140, size: 44 },
    ],
    []
  );

  // ✅ Screenshot-style technical skills (progress cards)
  const technicalSkills = useMemo<TechSkill[]>(
    () => [
      { name: "Python", level: 90, icon: "⟷" },
      { name: "Network Security", level: 90, icon: "🌐" },
      { name: "Penetration Testing", level: 60, icon: "🗄️" },
      { name: "Linux", level: 90, icon: "🧠" },
      { name: "Bash scripting", level: 60, icon: "📱" },
    ],
    []
  );

  // ✅ Soft skills pills
  const softSkills = useMemo(
    () => [
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
    ],
    []
  );

  // ✅ Certifications cards
  const certifications = useMemo<CertItem[]>(
    () => [
      {
        title: "eJPT – Junior Penetration Tester",
        org: "INE / eLearnSecurity",
        year: "2025",
        status: "In Progress",
        tone: "warning",
        desc: "Hands-on penetration testing fundamentals and network exploitation",
        link: null,
      },
      {
        title: "Certified Cloud Security Practitioner – AWS (CCSP-AWS) – Merit",
        org: "The SecOps Group",
        year: "2026",
        status: "Completed",
        tone: "success",
        desc:
          "AWS cloud security fundamentals, IAM, threat mitigation, secure cloud architecture, and compliance best practices",
        link: "#",
      },
      {
        title: "CNSP – Certified Network Security Practitioner – Merit",
        org: "The SecOps Group",
        year: "2025",
        status: "Completed",
        tone: "success",
        desc: "Network security fundamentals, threat analysis, and defensive security concepts",
        link: "#",
      },
    ],
    []
  );

  // ✅ Slow auto rotation
  const startAutoRotate = useCallback(() => {
    if (animRef.current) cancelAnimationFrame(animRef.current);

    const startTime = performance.now();
    const startRot = rotRef.current;

    const loop = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const SPEED = 0.12; // slow + smooth
      rotRef.current = startRot + elapsed * SPEED;
      setRotY(rotRef.current);
      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
  }, []);

  useEffect(() => {
    startAutoRotate();
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [startAutoRotate]);

  // Drag handlers
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    setLastX(e.clientX);
    if (animRef.current) cancelAnimationFrame(animRef.current);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const dx = e.clientX - lastX;
    setLastX(e.clientX);
    rotRef.current += dx * 0.008;
    setRotY(rotRef.current);
  };

  const onPointerUp = () => {
    setDragging(false);
    startAutoRotate();
  };

  // Globe radius
  const R = 240;

  // Wireframe lines
  const wireLines = useMemo(() => generateWireframeLines(rotY, R), [rotY]);

  // Split wireframe into back/front for depth layering
  const frontLines: GlobePoint[][] = [];
  const backLines: GlobePoint[][] = [];

  wireLines.forEach((pts) => {
    let frontPts: GlobePoint[] = [];
    let backPts: GlobePoint[] = [];

    pts.forEach((p) => {
      if (p.depth >= 0.5) {
        if (backPts.length > 0) {
          backLines.push(backPts);
          backPts = [];
        }
        frontPts.push(p);
      } else {
        if (frontPts.length > 0) {
          frontLines.push(frontPts);
          frontPts = [];
        }
        backPts.push(p);
      }
    });

    if (frontPts.length > 1) frontLines.push(frontPts);
    if (backPts.length > 1) backLines.push(backPts);
  });

  // Sort skills by depth (back to front)
  const sortedSkills = useMemo(() => {
    return skills
      .map((s) => ({
        ...s,
        proj: projectToSphere(s.lat, s.lon, rotY),
      }))
      .sort((a, b) => a.proj.depth - b.proj.depth);
  }, [skills, rotY]);

  return (
    <section className="min-h-screen flex items-center justify-center relative z-10 px-4 py-20 overflow-hidden">
      {/* particles */}
      <ParticlesBackground />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Heading */}
        <div className="text-center mb-12">
          <div className="text-xs tracking-[0.35em] uppercase text-white/60 mb-3">TECH STACK</div>

          <h2 className="text-5xl md:text-6xl font-bold text-white">
            My{" "}
            <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Skills
            </span>
          </h2>

          <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto mt-4">
            Tools and technologies I use across offensive and defensive security.
          </p>
        </div>

        {/* Globe */}
        <div className="w-full flex justify-center">
          <div className="relative" style={{ width: R * 2 + 20, height: R * 2 + 20 }}>
            {/* soft glow behind globe */}
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: R * 2 + 60,
                height: R * 2 + 60,
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                background:
                  "radial-gradient(circle, rgba(168,85,247,0.15) 0%, rgba(99,102,241,0.06) 45%, transparent 72%)",
              }}
            />

            {/* outer rim */}
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: R * 2 + 4,
                height: R * 2 + 4,
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            />

            {/* Wireframe globe */}
            <svg
              className="absolute pointer-events-none"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                overflow: "visible",
              }}
              width={R * 2}
              height={R * 2}
              viewBox={`${-R} ${-R} ${R * 2} ${R * 2}`}
            >
              {backLines.map((pts, i) => (
                <path
                  key={`b${i}`}
                  d={pointsToPath(pts)}
                  fill="none"
                  stroke="rgba(139,92,246,0.12)"
                  strokeWidth="0.65"
                />
              ))}

              {frontLines.map((pts, i) => (
                <path
                  key={`f${i}`}
                  d={pointsToPath(pts)}
                  fill="none"
                  stroke="rgba(139,92,246,0.28)"
                  strokeWidth="0.8"
                />
              ))}
            </svg>

            {/* Drag layer */}
            <div
              className="absolute rounded-full cursor-grab active:cursor-grabbing"
              style={{
                width: R * 2,
                height: R * 2,
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                zIndex: 1,
              }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerLeave={onPointerUp}
            />

            {/* Icons */}
            {sortedSkills.map((skill) => {
              const { proj } = skill;
              const px = proj.x * R;
              const py = proj.y * R;
              const isHov = hovered === skill.name;

              return (
                <div
                  key={skill.name}
                  className="absolute flex flex-col items-center"
                  style={{
                    left: "50%",
                    top: "50%",
                    transform: `translate(calc(-50% + ${px}px), calc(-50% + ${py}px))`,
                    zIndex: proj.zIndex + 2,
                    opacity: proj.opacity,
                    filter: `blur(${proj.blur}px)`,
                    transition: dragging ? "none" : "transform 0.06s linear, opacity 0.06s linear",
                    pointerEvents: proj.depth > 0.35 ? "auto" : "none",
                  }}
                  onMouseEnter={() => setHovered(skill.name)}
                  onMouseLeave={() => setHovered(null)}
                  title={skill.name}
                >
                  <div
                    className="relative flex items-center justify-center rounded-2xl border backdrop-blur-md"
                    style={{
                      width: skill.size * proj.scale,
                      height: skill.size * proj.scale,
                      background: isHov ? "rgba(168,85,247,0.18)" : "rgba(255,255,255,0.06)",
                      borderColor: isHov ? "rgba(168,85,247,0.55)" : "rgba(255,255,255,0.10)",
                      boxShadow: isHov
                        ? "0 0 18px rgba(168,85,247,0.45), 0 0 44px rgba(168,85,247,0.18)"
                        : "none",
                      transform: isHov ? "scale(1.16)" : "scale(1)",
                      transition:
                        "transform 220ms cubic-bezier(.34,1.56,.64,1), box-shadow 220ms, background 220ms, border-color 220ms",
                    }}
                  >
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="object-contain"
                      style={{ width: "72%", height: "72%", pointerEvents: "none" }}
                      draggable={false}
                    />
                  </div>

                  {/* Label */}
                  <div
                    className="mt-2 text-center whitespace-nowrap"
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.82)",
                      opacity: isHov ? 1 : 0,
                      transform: isHov ? "translateY(0)" : "translateY(-4px)",
                      transition: "opacity 180ms, transform 180ms",
                      pointerEvents: "none",
                    }}
                  >
                    {skill.name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ===== Screenshot Layout (Technical / Soft / Certifications) ===== */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Technical Skills */}
          <div>
            <h3 className="text-3xl font-semibold text-white mb-6">Technical Skills</h3>

            <div className="space-y-5">
              {technicalSkills.map((s) => (
                <div
                  key={s.name}
                  className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/80">
                        {s.icon}
                      </div>
                      <div className="text-white font-medium">{s.name}</div>
                    </div>

                    <div className="text-white/70 font-medium">{s.level}%</div>
                  </div>

                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"
                      style={{ width: `${s.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Soft Skills + Always Learning */}
          <div>
            <h3 className="text-3xl font-semibold text-white mb-6 text-center lg:text-left">
              Soft Skills
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {softSkills.map((t) => (
                <div
                  key={t}
                  className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md py-4 px-4 text-center text-white/85"
                >
                  {t}
                </div>
              ))}
            </div>

            {/* Always Learning Card */}
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
              <h4 className="text-2xl font-semibold text-white mb-3">Always Learning</h4>
              <p className="text-white/70 leading-relaxed">
                Technology evolves rapidly, and I’m committed to staying current with the latest
                trends, tools, and best practices.
              </p>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-3xl font-semibold text-white mb-6">Certifications</h3>

            <div className="space-y-6">
              {certifications.map((c) => {
                const badge =
                  c.tone === "success"
                    ? "bg-emerald-500/15 text-emerald-300 border-emerald-400/20"
                    : "bg-amber-500/15 text-amber-300 border-amber-400/20";

                return (
                  <div
                    key={c.title}
                    className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="text-white text-lg font-semibold leading-snug">{c.title}</h4>

                      <span
                        className={`shrink-0 px-3 py-1 rounded-full border text-xs font-medium ${badge}`}
                      >
                        {c.status}
                      </span>
                    </div>

                    <div className="mt-2 text-white/60 text-sm">
                      {c.org} • {c.year}
                    </div>

                    <p className="mt-4 text-white/65 text-sm leading-relaxed">{c.desc}</p>

                    {c.link && (
                      <a
                        href={c.link}
                        className="inline-flex items-center gap-2 mt-4 text-sm text-cyan-300 hover:text-cyan-200"
                        target="_blank"
                        rel="noreferrer"
                      >
                        View Certificate →
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* pill row */}
        <div className="mt-10 flex flex-wrap justify-center gap-3 text-white/70 text-sm">
          {["Recon", "Threat Detection", "Network Analysis", "Linux", "Automation"].map((t) => (
            <span key={t} className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;