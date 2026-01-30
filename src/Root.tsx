import { Composition } from "remotion";
import { FunctionConcept } from "./scenes/FunctionConcept";
import { NeuronConcept } from "./scenes/NeuronConcept";
import { DNAReplication } from "./scenes/DNAReplication";
import { APIRequestFlow } from "./scenes/APIRequestFlow";
import { WaveInterference } from "./scenes/WaveInterference";
import { GradientDescent } from "./scenes/GradientDescent";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Test 1: 5s Function Concept (No Narration) */}
      <Composition
        id="FunctionConcept"
        component={FunctionConcept}
        durationInFrames={5 * 30}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Test 2: 5s Neural Network Neuron (With Narration) */}
      <Composition
        id="NeuronConcept"
        component={NeuronConcept}
        durationInFrames={5 * 30}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Test 3: 10s DNA Replication (No Narration) */}
      <Composition
        id="DNAReplication"
        component={DNAReplication}
        durationInFrames={10 * 30}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Test 4: 10s API Request Flow (With Narration) */}
      <Composition
        id="APIRequestFlow"
        component={APIRequestFlow}
        durationInFrames={10 * 30}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Test 5: 15s Wave Interference (No Narration) */}
      <Composition
        id="WaveInterference"
        component={WaveInterference}
        durationInFrames={15 * 30}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Test 6: 15s Gradient Descent (With Narration) */}
      <Composition
        id="GradientDescent"
        component={GradientDescent}
        durationInFrames={15 * 30}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
