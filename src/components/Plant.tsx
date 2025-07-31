import { usePlantPoints } from '../hooks/usePlantPoints';

// Plant stages based on points
const plantStages = ["🪴", "🌱", "🌸", "🌸🎉"];

export default function Plant() {
  const { plantPoints } = usePlantPoints();

  // Calculate plant stage based on points
  const getPlantStage = () => {
    if (plantPoints >= 31) return 3; // 🌸🎉 (party bloom!)
    if (plantPoints >= 21) return 2; // 🌸 (bloom)
    if (plantPoints >= 11) return 1; // 🌱 (sprout)
    return 0; // 🪴 (pot)
  };

  const currentStage = getPlantStage();

  return (
    <section style={{ textAlign: "center", padding: "2rem" }}>
      <h2>🌿 Plant Progress Tracker 🌿</h2>

      {/* Display the current stage based on points */}
      <div style={{ fontSize: "5rem", margin: "1.5rem 0" }}>
        {plantStages[currentStage]}
      </div>

      {/* Show current points */}
      <div style={{ 
        fontSize: "1.2rem", 
        margin: "1rem 0",
        color: "#666",
        fontWeight: "bold"
      }}>
        Points: {plantPoints}
      </div>

      {/* Progress info */}
      <div style={{ 
        fontSize: "0.9rem", 
        color: "#888",
        marginTop: "1rem"
      }}>
        {currentStage === 0 && "Complete tasks to grow your plant!"}
        {currentStage === 1 && "Keep going! Your plant is sprouting!"}
        {currentStage === 2 && "Beautiful! Your plant is blooming!"}
        {currentStage === 3 && "Amazing! Your plant is celebrating! 🎉"}
      </div>
    </section>
  );
}
