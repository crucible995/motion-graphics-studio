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
import { IconPop } from "../components/IconPop";
import { GlowBox } from "../components/GlowBox";

/**
 * Test 1: 5-Second Function Concept (No Narration)
 *
 * Storyboard:
 * 0.0s - 0.5s: Dark background, particles fade in
 * 0.5s - 1.5s: "FUNCTION" text types in with glow
 * 1.5s - 3.0s: Box icon pops in, arrows animate showing input→output
 * 3.0s - 4.0s: f(x) → y equation fades in
 * 4.0s - 5.0s: All elements scale down and fade
 */
export const FunctionConcept: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const time = frame / fps;

  // Background fade in
  const bgOpacity = interpolate(frame, [0, 0.5 * fps], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Exit animation (4-5s)
  const exitProgress = interpolate(frame, [4 * fps, 5 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exitScale = interpolate(exitProgress, [0, 1], [1, 0.8]);
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0]);

  // Arrow animation (1.5s - 3.0s)
  const arrowProgress = interpolate(frame, [1.8 * fps, 2.5 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0f0f23 0%, #1a1a3e 100%)",
        opacity: bgOpacity,
      }}
    >
      <div
        style={{
          transform: `scale(${exitScale})`,
          opacity: exitOpacity,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ParticleField count={40} color="#4facfe" />

        {/* Title */}
        <div style={{ position: "absolute", top: 120 }}>
          <TextReveal
            text="FUNCTION"
            startFrame={0.5 * fps}
            charsPerSecond={15}
            style={{
              fontSize: 72,
              letterSpacing: 8,
              textShadow: "0 0 30px #4facfe, 0 0 60px #4facfe40",
            }}
          />
        </div>

        {/* Function box visualization */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 40,
            marginTop: 60,
          }}
        >
          {/* Input */}
          <IconPop startFrame={1.5 * fps} bounce={true}>
            <div
              style={{
                fontSize: 48,
                color: "#00f5d4",
                fontWeight: 700,
                fontFamily: "monospace",
              }}
            >
              x
            </div>
          </IconPop>

          {/* Input arrow */}
          <svg width={100} height={40} style={{ overflow: "visible" }}>
            <defs>
              <linearGradient id="arrowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00f5d4" />
                <stop offset="100%" stopColor="#4facfe" />
              </linearGradient>
            </defs>
            <line
              x1={0}
              y1={20}
              x2={interpolate(arrowProgress, [0, 1], [0, 80])}
              y2={20}
              stroke="url(#arrowGrad)"
              strokeWidth={4}
              strokeLinecap="round"
            />
            {arrowProgress > 0.8 && (
              <polygon
                points="75,10 95,20 75,30"
                fill="#4facfe"
                opacity={interpolate(arrowProgress, [0.8, 1], [0, 1])}
              />
            )}
          </svg>

          {/* Function box */}
          <IconPop startFrame={1.5 * fps} bounce={true}>
            <GlowBox width={180} height={120} glowColor="#4facfe">
              <span
                style={{
                  fontSize: 36,
                  color: "white",
                  fontFamily: "monospace",
                  fontWeight: 600,
                }}
              >
                f( )
              </span>
            </GlowBox>
          </IconPop>

          {/* Output arrow */}
          <svg width={100} height={40} style={{ overflow: "visible" }}>
            <line
              x1={0}
              y1={20}
              x2={interpolate(arrowProgress, [0, 1], [0, 80])}
              y2={20}
              stroke="url(#arrowGrad)"
              strokeWidth={4}
              strokeLinecap="round"
            />
            {arrowProgress > 0.8 && (
              <polygon
                points="75,10 95,20 75,30"
                fill="#4facfe"
                opacity={interpolate(arrowProgress, [0.8, 1], [0, 1])}
              />
            )}
          </svg>

          {/* Output */}
          <IconPop startFrame={2.5 * fps} bounce={true}>
            <div
              style={{
                fontSize: 48,
                color: "#fee440",
                fontWeight: 700,
                fontFamily: "monospace",
              }}
            >
              y
            </div>
          </IconPop>
        </div>

        {/* Equation */}
        <div style={{ position: "absolute", bottom: 200 }}>
          <TextReveal
            text="f(x) → y"
            startFrame={3 * fps}
            typewriter={false}
            style={{
              fontSize: 56,
              fontFamily: "monospace",
              color: "#a9a9b3",
              letterSpacing: 4,
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
