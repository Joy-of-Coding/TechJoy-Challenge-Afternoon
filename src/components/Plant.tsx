import { useState } from "react";

const plantStages = [
  "🪴",        // Stage 0: Empty pot
  "🌱",        // Stage 1: Sprout
  "🌿",        // Stage 2: Small plant
  "🌼",        // Stage 3: Budding flower
  "🌸🎉",      // Stage 4: Full bloom party
];

export default function Plant() {
  const [stage, setStage] = useState(0);

  const growPlant = () => {
    if (stage < plantStages.length - 1) {
      setStage(stage + 1);
    }
  };

  const resetPlant = () => {
    setStage(0);
  };

  return (
    <section style={{ textAlign: "center", padding: "2rem" }}>
      <h2>Plant Progress Test</h2>

      {/* Display the current stage */}
      <div style={{ fontSize: "4rem", margin: "1rem 0" }}>
        {plantStages[stage]}
      </div>

      {/* Grow button */}
      <button
        onClick={growPlant}
        style={{
          marginRight: "0.5rem",
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          background: "#bbf7d0",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        disabled={stage === plantStages.length - 1}
      >
        Grow Plant
      </button>

      {/* Reset button */}
      <button
        onClick={resetPlant}
        style={{
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          background: "#fca5a5",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Reset Plant
      </button>
    </section>
  );
}
