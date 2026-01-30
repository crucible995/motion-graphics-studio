import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { ParticleField } from "../components/ParticleField";
import { TextReveal } from "../components/TextReveal";

/**
 * Test 3: 10-Second DNA Replication (No Narration)
 *
 * Storyboard:
 * 0.0s - 2.0s: DNA helix appears, rotating slowly
 * 2.0s - 4.0s: Helix unzips animation
 * 4.0s - 7.0s: New nucleotides float in and attach
 * 7.0s - 9.0s: Two complete helices form
 * 9.0s - 10.0s: Zoom out, title "REPLICATION" appears
 */
export const DNAReplication: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const time = frame / fps;
  const centerX = width / 2;
  const centerY = height / 2;

  // Helix entrance (0-2s)
  const helixOpacity = interpolate(frame, [0, 1 * fps], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Unzip progress (2-4s)
  const unzipProgress = interpolate(frame, [2 * fps, 4 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // New nucleotides (4-7s)
  const nucleotideProgress = interpolate(frame, [4 * fps, 7 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Final separation (7-9s)
  const separationProgress = interpolate(frame, [7 * fps, 9 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Title entrance (9-10s)
  const titleProgress = spring({
    frame: frame - 9 * fps,
    fps,
    config: { damping: 200 },
  });

  const basePairs = 12;
  const helixWidth = 120;
  const verticalSpacing = 40;

  // Colors for base pairs
  const colors = {
    A: "#ff6b6b",
    T: "#4ecdc4",
    G: "#ffe66d",
    C: "#95e1d3",
  };

  const sequence = ["A", "T", "G", "C", "A", "G", "T", "C", "G", "A", "T", "C"];
  const complement: Record<string, string> = { A: "T", T: "A", G: "C", C: "G" };

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #0d1b2a 0%, #1b263b 100%)",
      }}
    >
      <ParticleField count={25} color="#415a77" />

      <svg
        width={width}
        height={height}
        style={{ position: "absolute", opacity: helixOpacity }}
      >
        <defs>
          <filter id="dnaGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* DNA Helix */}
        {sequence.map((base, i) => {
          const y = centerY - ((basePairs - 1) / 2) * verticalSpacing + i * verticalSpacing;
          const rotation = time * 0.5 + i * 0.3;
          const xOffset = Math.sin(rotation) * 30;
          const zOffset = Math.cos(rotation);

          // Unzip offset
          const unzipOffset = interpolate(
            unzipProgress,
            [i / basePairs, (i + 1) / basePairs],
            [0, 80],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          // Separation for final phase
          const separation = separationProgress * 150;

          const leftX = centerX - helixWidth / 2 + xOffset - unzipOffset - separation;
          const rightX = centerX + helixWidth / 2 + xOffset + unzipOffset + separation;

          const compBase = complement[base];
          const leftColor = colors[base as keyof typeof colors];
          const rightColor = colors[compBase as keyof typeof colors];

          // New nucleotides appearing
          const newNucleotideOpacity = interpolate(
            nucleotideProgress,
            [i / basePairs, (i + 2) / basePairs],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <g key={i} style={{ opacity: zOffset > 0 ? 1 : 0.5 }}>
              {/* Left strand backbone */}
              <circle
                cx={leftX}
                cy={y}
                r={12}
                fill={leftColor}
                filter="url(#dnaGlow)"
              />
              <text
                x={leftX}
                y={y + 5}
                fill="white"
                fontSize={12}
                textAnchor="middle"
                fontWeight="bold"
              >
                {base}
              </text>

              {/* Connection (before unzip) */}
              {unzipProgress < (i + 1) / basePairs && (
                <line
                  x1={leftX + 12}
                  y1={y}
                  x2={rightX - 12}
                  y2={y}
                  stroke="#778da9"
                  strokeWidth={2}
                  strokeDasharray="4,4"
                />
              )}

              {/* Right strand backbone */}
              <circle
                cx={rightX}
                cy={y}
                r={12}
                fill={rightColor}
                filter="url(#dnaGlow)"
              />
              <text
                x={rightX}
                y={y + 5}
                fill="white"
                fontSize={12}
                textAnchor="middle"
                fontWeight="bold"
              >
                {compBase}
              </text>

              {/* New nucleotides attaching */}
              {nucleotideProgress > 0 && (
                <>
                  {/* New complement for left strand */}
                  <circle
                    cx={leftX + 60 * nucleotideProgress}
                    cy={y}
                    r={12 * newNucleotideOpacity}
                    fill={rightColor}
                    opacity={newNucleotideOpacity * 0.8}
                  />
                  {newNucleotideOpacity > 0.5 && (
                    <text
                      x={leftX + 60 * nucleotideProgress}
                      y={y + 5}
                      fill="white"
                      fontSize={12}
                      textAnchor="middle"
                      fontWeight="bold"
                      opacity={newNucleotideOpacity}
                    >
                      {compBase}
                    </text>
                  )}

                  {/* New complement for right strand */}
                  <circle
                    cx={rightX - 60 * nucleotideProgress}
                    cy={y}
                    r={12 * newNucleotideOpacity}
                    fill={leftColor}
                    opacity={newNucleotideOpacity * 0.8}
                  />
                  {newNucleotideOpacity > 0.5 && (
                    <text
                      x={rightX - 60 * nucleotideProgress}
                      y={y + 5}
                      fill="white"
                      fontSize={12}
                      textAnchor="middle"
                      fontWeight="bold"
                      opacity={newNucleotideOpacity}
                    >
                      {base}
                    </text>
                  )}
                </>
              )}
            </g>
          );
        })}
      </svg>

      {/* Title */}
      {frame >= 9 * fps && (
        <div
          style={{
            position: "absolute",
            bottom: 100,
            width: "100%",
            textAlign: "center",
            opacity: titleProgress,
            transform: `translateY(${(1 - titleProgress) * 30}px)`,
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "white",
              letterSpacing: 8,
              textShadow: "0 0 30px #4ecdc4",
            }}
          >
            REPLICATION
          </div>
        </div>
      )}

      {/* Legend */}
      <div
        style={{
          position: "absolute",
          top: 40,
          right: 40,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          opacity: helixOpacity,
        }}
      >
        {Object.entries(colors).map(([base, color]) => (
          <div key={base} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                backgroundColor: color,
              }}
            />
            <span style={{ color: "#a9a9b3", fontSize: 16 }}>
              {base === "A"
                ? "Adenine"
                : base === "T"
                  ? "Thymine"
                  : base === "G"
                    ? "Guanine"
                    : "Cytosine"}
            </span>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
