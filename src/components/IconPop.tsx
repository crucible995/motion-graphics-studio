import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

interface IconPopProps {
  children: React.ReactNode;
  startFrame?: number;
  style?: React.CSSProperties;
  bounce?: boolean;
}

export const IconPop: React.FC<IconPopProps> = ({
  children,
  startFrame = 0,
  style = {},
  bounce = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const relativeFrame = frame - startFrame;

  if (relativeFrame < 0) {
    return null;
  }

  const scale = spring({
    frame: relativeFrame,
    fps,
    config: bounce ? { damping: 8 } : { damping: 200 },
  });

  const opacity = interpolate(relativeFrame, [0, 5], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        opacity,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
