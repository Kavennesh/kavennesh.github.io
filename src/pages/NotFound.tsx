import { Link, useLocation } from "react-router-dom";
import { useEffect, useMemo } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.error("404:", location.pathname);
    }
  }, [location.pathname]);

  // tiny deterministic “random” so it doesn’t change every re-render
  const glitchSeed = useMemo(() => {
    const p = location.pathname || "";
    let h = 0;
    for (let i = 0; i < p.length; i++) h = (h * 31 + p.charCodeAt(i)) >>> 0;
    return h.toString(16).slice(0, 6).toUpperCase();
  }, [location.pathname]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0a0b10] text-white flex items-center justify-center px-6">
      {/* Background noise + scanlines */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.10] noise" />
      <div className="pointer-events-none absolute inset-0 scanlines" />

      {/* Glow blobs */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[420px] w-[420px] rounded-full blur-3xl bg-fuchsia-500/20" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[420px] w-[420px] rounded-full blur-3xl bg-cyan-500/20" />

      <div className="relative max-w-2xl w-full text-center">
        {/* Glitch 404 */}
        <div className="relative inline-block select-none">
          <h1 className="glitch text-7xl md:text-8xl font-black tracking-tight" data-text="404">
            404
          </h1>
          <p className="mt-3 text-white/70 font-mono text-sm md:text-base">
            PATH NOT FOUND • <span className="text-white/90">{location.pathname}</span>
          </p>
          <p className="mt-1 text-white/50 font-mono text-xs">
            error_id: 0x{glitchSeed}
          </p>
        </div>

        {/* Card */}
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md p-6 md:p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
          <p className="text-white/80 leading-relaxed">
            Looks like you took a wrong turn. The page you’re trying to reach doesn’t exist
            (or got moved).
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition"
            >
              Return Home
            </Link>

            <button
              onClick={() => window.history.back()}
              className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-xl border border-white/15 bg-white/5 text-white/85 hover:bg-white/10 transition"
            >
              Go Back
            </button>
          </div>

          <div className="mt-6 text-xs text-white/45 font-mono">
            Tip: try <span className="text-white/70">/#/</span> for the homepage (HashRouter).
          </div>
        </div>
      </div>

      {/* Component-scoped CSS */}
      <style>{`
        .scanlines {
          background: linear-gradient(
            to bottom,
            rgba(255,255,255,0.04) 1px,
            transparent 1px
          );
          background-size: 100% 4px;
          mix-blend-mode: overlay;
          opacity: 0.18;
          animation: scan 6s linear infinite;
        }

        @keyframes scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(12px); }
        }

        .noise {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E");
          background-size: 220px 220px;
          animation: noiseShift 0.7s steps(2) infinite;
        }

        @keyframes noiseShift {
          0% { transform: translate3d(0,0,0); }
          25% { transform: translate3d(-2px,1px,0); }
          50% { transform: translate3d(1px,-2px,0); }
          75% { transform: translate3d(-1px,-1px,0); }
          100% { transform: translate3d(0,0,0); }
        }

        .glitch {
          position: relative;
          display: inline-block;
          text-shadow: 0 0 24px rgba(255,255,255,0.15);
          animation: glitch-skew 3.2s infinite linear;
        }

        .glitch::before,
        .glitch::after {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          overflow: hidden;
          clip-path: inset(0 0 0 0);
        }

        .glitch::before {
          transform: translate(-2px, 0);
          color: rgba(34, 211, 238, 0.85);
          mix-blend-mode: screen;
          animation: glitch-clip 2.1s infinite linear alternate-reverse,
                     glitch-move 1.1s infinite steps(2);
        }

        .glitch::after {
          transform: translate(2px, 0);
          color: rgba(236, 72, 153, 0.85);
          mix-blend-mode: screen;
          animation: glitch-clip 1.7s infinite linear alternate,
                     glitch-move 1.3s infinite steps(2) reverse;
        }

        @keyframes glitch-skew {
          0%, 100% { transform: skewX(0deg); }
          10% { transform: skewX(-6deg); }
          12% { transform: skewX(6deg); }
          13% { transform: skewX(0deg); }
          55% { transform: skewX(0deg); }
          60% { transform: skewX(3deg); }
          62% { transform: skewX(-3deg); }
          63% { transform: skewX(0deg); }
        }

        @keyframes glitch-move {
          0% { transform: translate(-2px, 0); }
          20% { transform: translate(-3px, -1px); }
          40% { transform: translate(-1px, 1px); }
          60% { transform: translate(-4px, 0); }
          80% { transform: translate(-2px, 2px); }
          100% { transform: translate(-2px, 0); }
        }

        @keyframes glitch-clip {
          0% { clip-path: inset(0 0 95% 0); }
          10% { clip-path: inset(12% 0 75% 0); }
          20% { clip-path: inset(35% 0 50% 0); }
          30% { clip-path: inset(55% 0 30% 0); }
          40% { clip-path: inset(75% 0 15% 0); }
          50% { clip-path: inset(10% 0 80% 0); }
          60% { clip-path: inset(40% 0 45% 0); }
          70% { clip-path: inset(68% 0 20% 0); }
          80% { clip-path: inset(22% 0 65% 0); }
          90% { clip-path: inset(5% 0 88% 0); }
          100% { clip-path: inset(0 0 95% 0); }
        }
      `}</style>
    </div>
  );
};

export default NotFound;
