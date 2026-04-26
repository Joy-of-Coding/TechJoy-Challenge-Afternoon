import { useMemo } from 'react';
import { usePlantPoints } from '../hooks/usePlantPoints';

// Plant stages based on points
// const plantStages = ["🪴", "🌱", "🌸", "🌸🎉"];
const plantStages = ["🌱", "🌿", "🪴", "🌾", "🌻", "🌷", "🌸", "🌺", "🌳", "🌴"];

export default function Plant() {
  const { plantPoints } = usePlantPoints();

  // Calculate plant stage based on points using useMemo
  // const currentStage = useMemo(() => {
  //   if (plantPoints >= 31) return 3; // 🌸🎉 (party bloom!)
  //   if (plantPoints >= 21) return 2; // 🌸 (bloom)
  //   if (plantPoints >= 11) return 1; // 🌱 (sprout)
  //   return 0; // 🪴 (pot)
  // }, [plantPoints]);
  // Calculate plant stage based on points using useMemo
  const currentStage = useMemo(() => {
  if (plantPoints >= 9) return 9;
  if (plantPoints >= 8) return 8;
  if (plantPoints >= 7) return 7;
  if (plantPoints >= 6) return 6;
  if (plantPoints >= 5) return 5;
  if (plantPoints >= 4) return 4;
  if (plantPoints >= 3) return 3;
  if (plantPoints >= 2) return 2;
  if (plantPoints >= 1) return 1;
  return 0;
}, [plantPoints]);




  return (
    <section>
      <h2>🌿 Plant Progress Tracker 🌿</h2>

      {/* Display the current stage based on points */}
      <div
        style={{ fontSize: "5rem", margin: "1.5rem 0", textAlign: "center" }}
      >
        {plantStages[currentStage]}
      </div>

      {/* Show current points */}
      {/* <div style={{ 
        fontSize: "1.2rem", 
        margin: "1rem 0",
        color: "#666",
        fontWeight: "bold",
        textAlign: "center"
      }}>
        Current points: {plantPoints}
      </div> */}

      {/* Progress info */}
      <div style={{ 
        fontSize: "0.9rem", 
        color: "#888",
        marginTop: "1rem",
        textAlign: "center"
      }}>
        {currentStage === 0 && "Complete tasks to grow your plant!"}
        {currentStage === 1 && "Keep going! Your plant is sprouting!"}
        {currentStage === 2 && "Growing nicely!"}
        {currentStage === 3 && "Looking leafy!"}
        {currentStage === 4 && "Budding along!"}
        {currentStage === 5 && "Beautiful! Your plant is blooming!"}
        {currentStage === 6 && "Flowers appearing!"}
        {currentStage === 7 && "Almost there!"}
        {currentStage === 8 && "So close!"}
        {currentStage === 9 && "Amazing! Your plant is fully grown! 🎉"}
      </div>
    </section>
  );
}
