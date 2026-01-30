import React, { useMemo } from "react";
import { useCurrentFrame, useVideoConfig, interpolate, random } from "remotion";

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

interface ParticleFieldProps {
  count?: number;
  color?: string;
  maxSize?: number;
}

export const ParticleField: React.FC<ParticleFieldProps> = ({
  count = 50,
  color = "#4facfe",
  maxSize = 4,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      x: random(`x-${i}`) * width,
      y: random(`y-${i}`) * height,
      size: random(`size-${i}`) * maxSize + 1,
      speed: random(`speed-${i}`) * 0.5 + 0.2,
      opacity: random(`opacity-${i}`) * 0.5 + 0.2,
    }));
  }, [count, width, height, maxSize]);

  const time = frame / fps;

  return (
    <svg
      width={width}
      height={height}
      style={{ position: "absolute", top: 0, left: 0 }}
    >
      {particles.map((particle, i) => {
        const yOffset = (time * particle.speed * 50) % height;
        const y = (particle.y + yOffset) % height;
        const pulse = Math.sin(time * 2 + i) * 0.3 + 0.7;

        return (
          <circle
            key={i}
            cx={particle.x}
            cy={y}
            r={particle.size * pulse}
            fill={color}
            opacity={particle.opacity * pulse}
          />
        );
      })}
    </svg>
  );
};
