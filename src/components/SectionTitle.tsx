import React from "react";

type SectionTitleProps = {
  pill?: string;                 // optional small pill label (like CONTACT)
  title: string;                 // main title text
  gradientWord?: string;         // optional word to apply gradient (ex: "Together")
  subtitle?: string;             // optional subtitle line
  className?: string;
};

const SectionTitle: React.FC<SectionTitleProps> = ({
  pill,
  title,
  gradientWord,
  subtitle,
  className = "",
}) => {
  const parts = React.useMemo(() => {
    if (!gradientWord) return [title];
    // Split only first occurrence
    const idx = title.indexOf(gradientWord);
    if (idx === -1) return [title];
    const before = title.slice(0, idx);
    const word = title.slice(idx, idx + gradientWord.length);
    const after = title.slice(idx + gradientWord.length);
    return [before, word, after];
  }, [title, gradientWord]);

  return (
    <div className={`text-center ${className}`}>
      {pill && (
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs tracking-[0.25em] uppercase text-white/70">
          {pill}
        </div>
      )}

      <h2
        className={[
          // The look you liked:
          "mt-5 font-extrabold",
          "text-white",
          "tracking-tight",
          "leading-[0.95]",
          "text-5xl md:text-6xl lg:text-7xl",
          // Smooth edges / premium
          "drop-shadow-[0_10px_30px_rgba(0,0,0,0.45)]",
        ].join(" ")}
      >
        {gradientWord ? (
          <>
            <span>{parts[0]}</span>
            <span className="bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent">
              {parts[1]}
            </span>
            <span>{parts[2]}</span>
          </>
        ) : (
          <span className="bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent">
            {title}
          </span>
        )}
      </h2>

      {subtitle && (
        <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
