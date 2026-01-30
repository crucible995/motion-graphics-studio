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
import { GlowBox } from "../components/GlowBox";

/**
 * Test 4: 10-Second API Request Flow (With Narration)
 *
 * Script: "When you click a button, your browser sends a request to a server,
 *         which processes it and returns the data you need."
 *
 * Storyboard:
 * 0.0s - 1.5s: Client box appears with "Browser" label
 * 1.5s - 3.5s: Request arrow animates toward server
 * 3.5s - 5.5s: Server box appears, "processing" animation
 * 5.5s - 7.5s: Response arrow animates back
 * 7.5s - 9.0s: Data appears in client
 * 9.0s - 10.0s: Fade out with "API" title
 */
export const APIRequestFlow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const centerY = height / 2;
  const clientX = width * 0.2;
  const serverX = width * 0.8;

  // Client entrance (0-1.5s)
  const clientScale = spring({
    frame,
    fps,
    config: { damping: 12 },
  });

  // Request animation (1.5-3.5s)
  const requestProgress = interpolate(frame, [1.5 * fps, 3.5 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Server entrance (3-4s)
  const serverScale = spring({
    frame: frame - 3 * fps,
    fps,
    config: { damping: 12 },
  });

  // Server processing (4-5.5s)
  const processingPhase = interpolate(frame, [4 * fps, 5.5 * fps], [0, 4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Response animation (5.5-7.5s)
  const responseProgress = interpolate(frame, [5.5 * fps, 7.5 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Data received (7.5-9s)
  const dataScale = spring({
    frame: frame - 7.5 * fps,
    fps,
    config: { damping: 15 },
  });

  // Exit (9-10s)
  const exitOpacity = interpolate(frame, [9 * fps, 10 * fps], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const requestX = interpolate(requestProgress, [0, 1], [clientX + 100, serverX - 100]);
  const responseX = interpolate(responseProgress, [0, 1], [serverX - 100, clientX + 100]);

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0a192f 0%, #172a45 100%)",
        opacity: exitOpacity,
      }}
    >
      <ParticleField count={20} color="#64ffda" />

      {/* Title */}
      <div style={{ position: "absolute", top: 60, width: "100%", textAlign: "center" }}>
        <TextReveal
          text="API REQUEST"
          startFrame={0}
          charsPerSecond={15}
          style={{
            fontSize: 48,
            letterSpacing: 4,
            textShadow: "0 0 20px #64ffda",
          }}
        />
      </div>

      {/* Client Box */}
      <div
        style={{
          position: "absolute",
          left: clientX - 90,
          top: centerY - 75,
          transform: `scale(${clientScale})`,
        }}
      >
        <GlowBox width={180} height={150} glowColor="#64ffda" pulseSpeed={0}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>🖥️</div>
            <div style={{ color: "white", fontSize: 18, fontWeight: 600 }}>
              Browser
            </div>
          </div>
        </GlowBox>

        {/* Data received indicator */}
        {dataScale > 0 && (
          <div
            style={{
              position: "absolute",
              top: -40,
              left: "50%",
              transform: `translateX(-50%) scale(${dataScale})`,
              background: "#64ffda",
              color: "#0a192f",
              padding: "8px 16px",
              borderRadius: 8,
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            Data Received!
          </div>
        )}
      </div>

      {/* Server Box */}
      {serverScale > 0 && (
        <div
          style={{
            position: "absolute",
            left: serverX - 90,
            top: centerY - 75,
            transform: `scale(${serverScale})`,
          }}
        >
          <GlowBox
            width={180}
            height={150}
            glowColor="#f72585"
            pulseSpeed={processingPhase > 0 && processingPhase < 4 ? 4 : 0}
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>🖧</div>
              <div style={{ color: "white", fontSize: 18, fontWeight: 600 }}>
                Server
              </div>
              {processingPhase > 0 && processingPhase < 4 && (
                <div
                  style={{
                    fontSize: 12,
                    color: "#f72585",
                    marginTop: 4,
                  }}
                >
                  Processing...
                </div>
              )}
            </div>
          </GlowBox>
        </div>
      )}

      {/* Request Arrow */}
      <svg
        width={width}
        height={height}
        style={{ position: "absolute", pointerEvents: "none" }}
      >
        <defs>
          <linearGradient id="requestGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#64ffda" />
            <stop offset="100%" stopColor="#00b4d8" />
          </linearGradient>
          <linearGradient id="responseGrad" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#f72585" />
            <stop offset="100%" stopColor="#7209b7" />
          </linearGradient>
          <filter id="arrowGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Request line */}
        {requestProgress > 0 && requestProgress < 1 && (
          <g filter="url(#arrowGlow)">
            <line
              x1={clientX + 100}
              y1={centerY - 20}
              x2={requestX}
              y2={centerY - 20}
              stroke="url(#requestGrad)"
              strokeWidth={4}
              strokeLinecap="round"
            />
            <circle
              cx={requestX}
              cy={centerY - 20}
              r={10}
              fill="#64ffda"
            />
            <text
              x={requestX}
              y={centerY - 45}
              fill="#64ffda"
              fontSize={14}
              textAnchor="middle"
              fontFamily="monospace"
            >
              GET /data
            </text>
          </g>
        )}

        {/* Response line */}
        {responseProgress > 0 && responseProgress < 1 && (
          <g filter="url(#arrowGlow)">
            <line
              x1={serverX - 100}
              y1={centerY + 20}
              x2={responseX}
              y2={centerY + 20}
              stroke="url(#responseGrad)"
              strokeWidth={4}
              strokeLinecap="round"
            />
            <circle
              cx={responseX}
              cy={centerY + 20}
              r={10}
              fill="#f72585"
            />
            <text
              x={responseX}
              y={centerY + 50}
              fill="#f72585"
              fontSize={14}
              textAnchor="middle"
              fontFamily="monospace"
            >
              {"{ data }"}
            </text>
          </g>
        )}

        {/* Connection lines after completion */}
        {requestProgress >= 1 && (
          <line
            x1={clientX + 100}
            y1={centerY - 20}
            x2={serverX - 100}
            y2={centerY - 20}
            stroke="#64ffda"
            strokeWidth={2}
            strokeDasharray="8,4"
            opacity={0.3}
          />
        )}
        {responseProgress >= 1 && (
          <line
            x1={serverX - 100}
            y1={centerY + 20}
            x2={clientX + 100}
            y2={centerY + 20}
            stroke="#f72585"
            strokeWidth={2}
            strokeDasharray="8,4"
            opacity={0.3}
          />
        )}
      </svg>

      {/* Narration subtitle */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          width: "100%",
          textAlign: "center",
          padding: "0 100px",
        }}
      >
        <TextReveal
          text="Your browser sends a request to a server, which processes it and returns data."
          startFrame={0.5 * fps}
          charsPerSecond={20}
          style={{
            fontSize: 24,
            color: "#a9a9b3",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
