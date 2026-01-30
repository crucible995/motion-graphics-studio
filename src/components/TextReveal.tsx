import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

interface TextRevealProps {
  text: string;
  startFrame?: number;
  style?: React.CSSProperties;
  typewriter?: boolean;
  charsPerSecond?: number;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  startFrame = 0,
  style = {},
  typewriter = true,
  charsPerSecond = 20,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const relativeFrame = frame - startFrame;

  if (relativeFrame < 0) {
    return null;
  }

  if (typewriter) {
    const charsToShow = Math.floor((relativeFrame / fps) * charsPerSecond);
    const displayText = text.slice(0, charsToShow);
    const showCursor = Math.floor(relativeFrame / 15) % 2 === 0;

    const opacity = interpolate(relativeFrame, [0, 10], [0, 1], {
      extrapolateRight: "clamp",
    });

    return (
      <div
        style={{
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontSize: 64,
          fontWeight: 700,
          color: "white",
          opacity,
          ...style,
        }}
      >
        {displayText}
        {charsToShow < text.length && showCursor && (
          <span style={{ opacity: 0.7 }}>|</span>
        )}
      </div>
    );
  }

  // Fade in mode
  const fadeProgress = spring({
    frame: relativeFrame,
    fps,
    config: { damping: 200 },
  });

  return (
    <div
      style={{
        fontFamily: "system-ui, -apple-system, sans-serif",
        fontSize: 64,
        fontWeight: 700,
        color: "white",
        opacity: fadeProgress,
        transform: `translateY(${(1 - fadeProgress) * 20}px)`,
        ...style,
      }}
    >
      {text}
    </div>
  );
};
