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

/**
 * Test 2: 5-Second Neural Network Neuron (With Narration)
 *
 * Script: "A neuron receives inputs, weighs them, and fires an output."
 *
 * Storyboard:
 * 0.0s - 1.0s: Circle (neuron) appears with spring bounce
 * 1.0s - 2.5s: Input arrows animate in from left
 * 2.5s - 4.0s: Glow pulse on neuron, output arrow shoots right
 * 4.0s - 5.0s: Fade to next concept hint
 */
export const NeuronConcept: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const centerX = width / 2;
  const centerY = height / 2;

  // Neuron entrance (0-1s)
  const neuronScale = spring({
    frame,
    fps,
    config: { damping: 8, stiffness: 100 },
  });

  // Input arrows (1-2.5s)
  const inputProgress = interpolate(frame, [1 * fps, 2.5 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Neuron glow pulse (2.5-4s)
  const glowPhase = interpolate(frame, [2.5 * fps, 4 * fps], [0, 3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const glowIntensity = Math.sin(glowPhase * Math.PI) * 40 + 20;

  // Output arrow (2.8-4s)
  const outputProgress = interpolate(frame, [2.8 * fps, 3.5 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Exit fade (4-5s)
  const exitOpacity = interpolate(frame, [4 * fps, 5 * fps], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const inputs = [
    { x: centerX - 350, y: centerY - 100 },
    { x: centerX - 350, y: centerY },
    { x: centerX - 350, y: centerY + 100 },
  ];

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #1a0a2e 0%, #16213e 100%)",
        opacity: exitOpacity,
      }}
    >
      <ParticleField count={30} color="#9d4edd" />

      {/* Title */}
      <div style={{ position: "absolute", top: 80, width: "100%", textAlign: "center" }}>
        <TextReveal
          text="NEURON"
          startFrame={0}
          charsPerSecond={12}
          style={{
            fontSize: 56,
            letterSpacing: 6,
            textShadow: "0 0 20px #9d4edd",
          }}
        />
      </div>

      <svg width={width} height={height} style={{ position: "absolute" }}>
        <defs>
          <radialGradient id="neuronGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#c77dff" />
            <stop offset="100%" stopColor="#7b2cbf" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation={glowIntensity / 4} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Input arrows */}
        {inputs.map((input, i) => {
          const delay = i * 0.15;
          const progress = interpolate(
            inputProgress,
            [delay, delay + 0.5],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          const endX = interpolate(progress, [0, 1], [input.x, centerX - 80]);

          return (
            <g key={i}>
              {/* Connection line */}
              <line
                x1={input.x}
                y1={input.y}
                x2={endX}
                y2={centerY}
                stroke="#e0aaff"
                strokeWidth={3}
                opacity={0.8}
              />
              {/* Input node */}
              <circle
                cx={input.x}
                cy={input.y}
                r={15 * progress}
                fill="#e0aaff"
                opacity={progress}
              />
              {/* Weight label */}
              {progress > 0.5 && (
                <text
                  x={(input.x + endX) / 2}
                  y={input.y - 15}
                  fill="#a9a9b3"
                  fontSize={14}
                  textAnchor="middle"
                  opacity={interpolate(progress, [0.5, 1], [0, 1])}
                >
                  w{i + 1}
                </text>
              )}
            </g>
          );
        })}

        {/* Main neuron */}
        <circle
          cx={centerX}
          cy={centerY}
          r={60 * neuronScale}
          fill="url(#neuronGrad)"
          filter="url(#glow)"
          style={{
            boxShadow: `0 0 ${glowIntensity}px #9d4edd`,
          }}
        />

        {/* Sigma symbol inside neuron */}
        <text
          x={centerX}
          y={centerY + 15}
          fill="white"
          fontSize={48}
          textAnchor="middle"
          fontFamily="serif"
          opacity={neuronScale}
        >
          Σ
        </text>

        {/* Output arrow */}
        <line
          x1={centerX + 80}
          y1={centerY}
          x2={centerX + 80 + 200 * outputProgress}
          y2={centerY}
          stroke="#f72585"
          strokeWidth={4}
          strokeLinecap="round"
        />
        {outputProgress > 0.8 && (
          <polygon
            points={`${centerX + 270},${centerY - 12} ${centerX + 300},${centerY} ${centerX + 270},${centerY + 12}`}
            fill="#f72585"
            opacity={interpolate(outputProgress, [0.8, 1], [0, 1])}
          />
        )}

        {/* Output label */}
        {outputProgress > 0.5 && (
          <text
            x={centerX + 330}
            y={centerY + 8}
            fill="#f72585"
            fontSize={36}
            fontFamily="monospace"
            fontWeight="bold"
            opacity={interpolate(outputProgress, [0.5, 1], [0, 1])}
          >
            y
          </text>
        )}
      </svg>

      {/* Narration subtitle (placeholder for TTS) */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          width: "100%",
          textAlign: "center",
        }}
      >
        <TextReveal
          text="A neuron receives inputs, weighs them, and fires an output."
          startFrame={0.5 * fps}
          charsPerSecond={25}
          style={{
            fontSize: 28,
            color: "#a9a9b3",
            maxWidth: 800,
            margin: "0 auto",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
