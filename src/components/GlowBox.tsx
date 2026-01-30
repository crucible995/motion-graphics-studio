import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";

interface GlowBoxProps {
  children?: React.ReactNode;
  width?: number;
  height?: number;
  color?: string;
  glowColor?: string;
  startFrame?: number;
  pulseSpeed?: number;
}

export const GlowBox: React.FC<GlowBoxProps> = ({
  children,
  width = 200,
  height = 150,
  color = "#2d3748",
  glowColor = "#4facfe",
  startFrame = 0,
  pulseSpeed = 2,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const relativeFrame = frame - startFrame;
  const time = relativeFrame / fps;

  const pulse = Math.sin(time * pulseSpeed * Math.PI) * 0.5 + 0.5;
  const glowIntensity = interpolate(pulse, [0, 1], [10, 30]);

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: color,
        borderRadius: 16,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: `0 0 ${glowIntensity}px ${glowColor}, 0 0 ${glowIntensity * 2}px ${glowColor}40`,
        border: `2px solid ${glowColor}60`,
      }}
    >
      {children}
    </div>
  );
};
