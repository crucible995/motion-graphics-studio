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
 * Test 5: 15-Second Wave Interference (No Narration)
 *
 * Storyboard:
 * 0.0s - 3.0s: Single wave source appears, ripples emanate
 * 3.0s - 6.0s: Second wave source appears
 * 6.0s - 12.0s: Both sources create interference pattern
 * 12.0s - 14.0s: Highlight constructive/destructive points
 * 14.0s - 15.0s: Title "INTERFERENCE" with fade out
 */
export const WaveInterference: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const time = frame / fps;
  const centerY = height / 2;

  // Source 1 position (left)
  const source1X = width * 0.35;
  const source1Y = centerY;

  // Source 2 position (right)
  const source2X = width * 0.65;
  const source2Y = centerY;

  // Source 1 entrance (0-1s)
  const source1Scale = spring({
    frame,
    fps,
    config: { damping: 15 },
  });

  // Source 2 entrance (3-4s)
  const source2Scale = spring({
    frame: frame - 3 * fps,
    fps,
    config: { damping: 15 },
  });

  // Interference highlight (12-14s)
  const highlightOpacity = interpolate(frame, [12 * fps, 13 * fps, 14 * fps], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Title entrance (14-15s)
  const titleProgress = spring({
    frame: frame - 14 * fps,
    fps,
    config: { damping: 200 },
  });

  // Wave parameters
  const wavelength = 80;
  const waveSpeed = 100;
  const maxRadius = 600;
  const waveCount = 8;

  // Calculate distance from a point to a source
  const distance = (x: number, y: number, sx: number, sy: number) => {
    return Math.sqrt((x - sx) ** 2 + (y - sy) ** 2);
  };

  // Calculate wave amplitude at a point
  const waveAmplitude = (x: number, y: number, sourceX: number, sourceY: number, startTime: number) => {
    if (time < startTime) return 0;
    const dist = distance(x, y, sourceX, sourceY);
    const phase = (time - startTime) * waveSpeed - dist;
    if (phase < 0 || dist > maxRadius) return 0;
    const decay = Math.max(0, 1 - dist / maxRadius);
    return Math.sin((phase / wavelength) * 2 * Math.PI) * decay;
  };

  // Generate grid points for interference visualization
  const gridSize = 30;
  const gridPoints: { x: number; y: number; amplitude: number }[] = [];

  for (let gx = 0; gx < width; gx += gridSize) {
    for (let gy = 0; gy < height; gy += gridSize) {
      const amp1 = waveAmplitude(gx, gy, source1X, source1Y, 0);
      const amp2 = waveAmplitude(gx, gy, source2X, source2Y, 3);
      const totalAmp = amp1 + amp2;
      gridPoints.push({ x: gx, y: gy, amplitude: totalAmp });
    }
  }

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #000428 0%, #004e92 100%)",
      }}
    >
      {/* Interference pattern visualization */}
      <svg width={width} height={height} style={{ position: "absolute" }}>
        <defs>
          <radialGradient id="sourceGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="1" />
            <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Grid interference pattern */}
        {gridPoints.map((point, i) => {
          const normalizedAmp = (point.amplitude + 2) / 4; // Normalize to 0-1
          const hue = interpolate(normalizedAmp, [0, 0.5, 1], [240, 180, 60]);
          const brightness = Math.abs(point.amplitude) * 0.5 + 0.2;

          return (
            <circle
              key={i}
              cx={point.x}
              cy={point.y}
              r={gridSize * 0.3 * (Math.abs(point.amplitude) + 0.5)}
              fill={`hsla(${hue}, 80%, 60%, ${brightness})`}
            />
          );
        })}

        {/* Source 1 rings */}
        {source1Scale > 0 &&
          Array.from({ length: waveCount }).map((_, i) => {
            const baseRadius = ((time * waveSpeed + i * wavelength) % maxRadius);
            if (baseRadius < 0) return null;
            const opacity = Math.max(0, 1 - baseRadius / maxRadius) * 0.6;

            return (
              <circle
                key={`s1-${i}`}
                cx={source1X}
                cy={source1Y}
                r={baseRadius}
                fill="none"
                stroke="#00d4ff"
                strokeWidth={2}
                opacity={opacity * source1Scale}
              />
            );
          })}

        {/* Source 2 rings */}
        {source2Scale > 0 &&
          Array.from({ length: waveCount }).map((_, i) => {
            const startOffset = 3; // Source 2 starts at 3s
            const baseRadius = (((time - startOffset) * waveSpeed + i * wavelength) % maxRadius);
            if (baseRadius < 0 || time < startOffset) return null;
            const opacity = Math.max(0, 1 - baseRadius / maxRadius) * 0.6;

            return (
              <circle
                key={`s2-${i}`}
                cx={source2X}
                cy={source2Y}
                r={baseRadius}
                fill="none"
                stroke="#ff6b9d"
                strokeWidth={2}
                opacity={opacity * source2Scale}
              />
            );
          })}

        {/* Source 1 point */}
        <circle
          cx={source1X}
          cy={source1Y}
          r={15 * source1Scale}
          fill="#00d4ff"
          filter="url(#sourceGlow)"
        />

        {/* Source 2 point */}
        {source2Scale > 0 && (
          <circle
            cx={source2X}
            cy={source2Y}
            r={15 * source2Scale}
            fill="#ff6b9d"
            filter="url(#sourceGlow)"
          />
        )}

        {/* Highlight annotations */}
        {highlightOpacity > 0 && (
          <>
            {/* Constructive interference point */}
            <g opacity={highlightOpacity}>
              <circle
                cx={width / 2}
                cy={centerY}
                r={25}
                fill="none"
                stroke="#00ff88"
                strokeWidth={3}
                strokeDasharray="5,5"
              />
              <text
                x={width / 2}
                y={centerY - 40}
                fill="#00ff88"
                fontSize={18}
                textAnchor="middle"
                fontWeight="600"
              >
                Constructive
              </text>
            </g>

            {/* Destructive interference point */}
            <g opacity={highlightOpacity}>
              <circle
                cx={width / 2}
                cy={centerY - 120}
                r={25}
                fill="none"
                stroke="#ff4757"
                strokeWidth={3}
                strokeDasharray="5,5"
              />
              <text
                x={width / 2}
                y={centerY - 170}
                fill="#ff4757"
                fontSize={18}
                textAnchor="middle"
                fontWeight="600"
              >
                Destructive
              </text>
            </g>
          </>
        )}
      </svg>

      {/* Labels */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 40,
          opacity: source1Scale,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 10,
          }}
        >
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              backgroundColor: "#00d4ff",
            }}
          />
          <span style={{ color: "white", fontSize: 18 }}>Source 1</span>
        </div>
        {source2Scale > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                backgroundColor: "#ff6b9d",
              }}
            />
            <span style={{ color: "white", fontSize: 18 }}>Source 2</span>
          </div>
        )}
      </div>

      {/* Title */}
      {frame >= 14 * fps && (
        <div
          style={{
            position: "absolute",
            bottom: 80,
            width: "100%",
            textAlign: "center",
            opacity: titleProgress,
            transform: `translateY(${(1 - titleProgress) * 30}px)`,
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "white",
              letterSpacing: 8,
              textShadow: "0 0 30px #00d4ff, 0 0 60px #ff6b9d",
            }}
          >
            INTERFERENCE
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
