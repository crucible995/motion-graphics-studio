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
 * Test 6: 15-Second Gradient Descent (With Narration)
 *
 * Script: "Gradient descent finds the minimum of a function by taking steps
 *         in the direction of steepest descent. The learning rate controls
 *         how big each step is."
 *
 * Storyboard:
 * 0.0s - 3.0s: Loss landscape (bowl shape) appears
 * 3.0s - 6.0s: Ball appears at top, starts rolling
 * 6.0s - 11.0s: Ball bounces down toward minimum, showing gradient arrows
 * 11.0s - 13.0s: Ball settles at minimum
 * 13.0s - 15.0s: "GRADIENT DESCENT" title, fade out
 */
export const GradientDescent: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const time = frame / fps;
  const centerX = width / 2;
  const centerY = height / 2 + 50;

  // Landscape entrance (0-2s)
  const landscapeScale = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  // Ball entrance (3-4s)
  const ballScale = spring({
    frame: frame - 3 * fps,
    fps,
    config: { damping: 15 },
  });

  // Descent progress (3-11s)
  const descentProgress = interpolate(frame, [3 * fps, 11 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Title entrance (13-15s)
  const titleProgress = spring({
    frame: frame - 13 * fps,
    fps,
    config: { damping: 200 },
  });

  // Exit fade (14-15s)
  const exitOpacity = interpolate(frame, [14 * fps, 15 * fps], [1, 0.8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Parabola function: y = 0.001 * x^2
  const parabola = (x: number) => 0.0008 * Math.pow(x - centerX, 2);

  // Gradient (derivative): dy/dx = 0.002 * (x - centerX)
  const gradient = (x: number) => 0.0016 * (x - centerX);

  // Ball position along descent path
  // Using damped oscillation to simulate bouncing descent
  const startX = centerX + 350;
  const endX = centerX;

  // Simulate gradient descent with momentum
  const learningRate = 0.1;
  const momentum = 0.9;

  // Calculate ball position based on simulated descent
  const steps = 20;
  let ballX = startX;
  let velocity = 0;

  const currentStep = Math.floor(descentProgress * steps);
  for (let i = 0; i < currentStep; i++) {
    const grad = gradient(ballX);
    velocity = momentum * velocity - learningRate * grad * 50;
    ballX += velocity;
    // Add some damping to settle
    velocity *= 0.95;
  }

  // Smooth interpolation between steps
  const stepProgress = (descentProgress * steps) % 1;
  const nextGrad = gradient(ballX);
  const nextVelocity = momentum * velocity - learningRate * nextGrad * 50;
  const nextBallX = ballX + nextVelocity * stepProgress;

  const finalBallX = interpolate(descentProgress, [0, 1], [startX, endX], {
    extrapolateRight: "clamp",
  });

  const actualBallX = descentProgress < 1 ? nextBallX : finalBallX;
  const ballY = centerY + parabola(actualBallX);

  // Generate landscape points
  const landscapePoints: string[] = [];
  for (let x = centerX - 400; x <= centerX + 400; x += 10) {
    const y = centerY + parabola(x);
    landscapePoints.push(`${x},${y}`);
  }

  // Gradient arrows at current position
  const showGradientArrow = descentProgress > 0 && descentProgress < 0.95;
  const currentGradient = gradient(actualBallX);
  const arrowLength = Math.min(Math.abs(currentGradient) * 100, 100);
  const arrowDirection = currentGradient > 0 ? -1 : 1;

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)",
        opacity: exitOpacity,
      }}
    >
      <ParticleField count={20} color="#e94560" />

      {/* Title at top */}
      <div style={{ position: "absolute", top: 50, width: "100%", textAlign: "center" }}>
        <TextReveal
          text="GRADIENT DESCENT"
          startFrame={0}
          charsPerSecond={12}
          style={{
            fontSize: 42,
            letterSpacing: 4,
            textShadow: "0 0 20px #e94560",
          }}
        />
      </div>

      <svg
        width={width}
        height={height}
        style={{
          position: "absolute",
          opacity: landscapeScale,
          transform: `scale(${landscapeScale})`,
          transformOrigin: "center center",
        }}
      >
        <defs>
          <linearGradient id="lossGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0f3460" />
            <stop offset="100%" stopColor="#16213e" />
          </linearGradient>
          <filter id="ballGlow">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Loss landscape (filled parabola) */}
        <path
          d={`M ${centerX - 400},${height} L ${landscapePoints.join(" L ")} L ${centerX + 400},${height} Z`}
          fill="url(#lossGrad)"
          stroke="#e94560"
          strokeWidth={3}
        />

        {/* Grid lines on surface */}
        {[-300, -200, -100, 0, 100, 200, 300].map((offset) => {
          const x = centerX + offset;
          const y = centerY + parabola(x);
          return (
            <line
              key={offset}
              x1={x}
              y1={y}
              x2={x}
              y2={height}
              stroke="#e94560"
              strokeWidth={1}
              opacity={0.2}
            />
          );
        })}

        {/* Minimum indicator */}
        <g opacity={descentProgress > 0.9 ? 1 : 0.3}>
          <line
            x1={centerX}
            y1={centerY}
            x2={centerX}
            y2={centerY + 50}
            stroke="#00ff88"
            strokeWidth={2}
            strokeDasharray="4,4"
          />
          <text
            x={centerX}
            y={centerY + 70}
            fill="#00ff88"
            fontSize={16}
            textAnchor="middle"
          >
            Minimum
          </text>
        </g>

        {/* Gradient arrow */}
        {showGradientArrow && (
          <g>
            <line
              x1={actualBallX}
              y1={ballY - 30}
              x2={actualBallX + arrowDirection * arrowLength}
              y2={ballY - 30}
              stroke="#ffd700"
              strokeWidth={3}
              markerEnd="url(#arrowhead)"
            />
            <polygon
              points={`${actualBallX + arrowDirection * arrowLength - arrowDirection * 10},${ballY - 40} ${actualBallX + arrowDirection * arrowLength},${ballY - 30} ${actualBallX + arrowDirection * arrowLength - arrowDirection * 10},${ballY - 20}`}
              fill="#ffd700"
            />
            <text
              x={actualBallX + (arrowDirection * arrowLength) / 2}
              y={ballY - 50}
              fill="#ffd700"
              fontSize={14}
              textAnchor="middle"
            >
              -∇f
            </text>
          </g>
        )}

        {/* Ball */}
        {ballScale > 0 && (
          <circle
            cx={actualBallX}
            cy={ballY - 15}
            r={20 * ballScale}
            fill="#e94560"
            filter="url(#ballGlow)"
          />
        )}

        {/* Path trace */}
        {descentProgress > 0.1 && (
          <path
            d={`M ${startX},${centerY + parabola(startX) - 15} Q ${(startX + actualBallX) / 2},${centerY + parabola((startX + actualBallX) / 2) - 15} ${actualBallX},${ballY - 15}`}
            fill="none"
            stroke="#e94560"
            strokeWidth={2}
            strokeDasharray="5,5"
            opacity={0.5}
          />
        )}
      </svg>

      {/* Learning rate indicator */}
      <div
        style={{
          position: "absolute",
          top: 150,
          right: 60,
          color: "white",
          fontSize: 18,
          opacity: ballScale,
        }}
      >
        <div style={{ marginBottom: 10 }}>
          <span style={{ color: "#a9a9b3" }}>Learning Rate: </span>
          <span style={{ color: "#ffd700", fontFamily: "monospace" }}>
            α = 0.1
          </span>
        </div>
        <div>
          <span style={{ color: "#a9a9b3" }}>Step: </span>
          <span style={{ color: "#e94560", fontFamily: "monospace" }}>
            {Math.floor(descentProgress * steps)} / {steps}
          </span>
        </div>
      </div>

      {/* Narration subtitle */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          width: "100%",
          textAlign: "center",
          padding: "0 100px",
        }}
      >
        <TextReveal
          text="Taking steps in the direction of steepest descent to find the minimum."
          startFrame={1 * fps}
          charsPerSecond={18}
          style={{
            fontSize: 22,
            color: "#a9a9b3",
          }}
        />
      </div>

      {/* Final title overlay */}
      {frame >= 13 * fps && (
        <div
          style={{
            position: "absolute",
            top: "40%",
            width: "100%",
            textAlign: "center",
            opacity: titleProgress,
            transform: `scale(${0.8 + titleProgress * 0.2})`,
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: 700,
              color: "white",
              letterSpacing: 6,
              textShadow: "0 0 40px #e94560, 0 0 80px #e9456040",
            }}
          >
            OPTIMIZATION
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
