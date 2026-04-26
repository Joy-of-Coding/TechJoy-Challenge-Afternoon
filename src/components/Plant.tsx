  //  4/25/2026:
  //  dw comments: the code by default when add a task, select task and start the timer running
  //               allows you to select the task in task list and complete it. This increments the 
  //               count by 1. To make the code work I did the following:
  //
  //               1) added a few more appropriate emojis including the 0th one for the farmer 
  //               2) uncommented the current points text in the progress tracker pane
  //               3) adjusted the PlantPoints values in the const currentStage to adapt to 
  //                   1-10 values. 
  //               4) comment out the goals count since only completed tasks are counted per the 
  //                   problem description. These added a count of 3 to the PlantPoints. 
  //
  //                GoalTracker.tsx and PriorityGrid.tsx were modified along with this file. 
  //                 
//
//   Nonworking. Plan to go back and figure out why. 
//
//import React, { useState } from "react";
//import { toast } from "react-hot-toast";
//import { useLocalStorage } from "../hooks/useLocalStorage";
//const PriorityGrid: React.FC = () => {
//localStorage.setItem("tasks", JSON.stringify(newTasks));
//const storedTasks = localStorage.getItem("tasks");
//const tasks: Task[] = storedTasks ? JSON.parse(storedTasks) : [];
//  const tasks = useLocalStorage<Task[]>("tasks", []);
//}

//const curTaskCount2 = 0
//const curTaskCount = tasks.length
//<Task className="count"></Task>
//
//  all of the above did not work - see first comment in this comment block 
//
// above added by dw

import { useMemo } from 'react';
import { usePlantPoints } from '../hooks/usePlantPoints';

// Plant stages based on points
const plantStages = ["👨‍🌾","🌱", "🪴", "🌲","🌸", "🌸🎉"];

export default function Plant() {
  const { plantPoints } =  usePlantPoints();
  const plantPointsdw = curTaskCount

  // Calculate plant stage based on points using useMemo
  const currentStage = useMemo(() => {
    if (plantPoints >= 10) return 5; // 🌸🎉 (party bloom!)
    if (plantPoints >= 9) return 4; // 🌸 (bloom)
    if (plantPoints >= 6) return 3; // 🌲 (full grown bush)
    if (plantPoints >= 3) return 2; // 🪴 (pot)
    if (plantPoints >= 1) return 1; // 🌱 (sprout)
    return 0; // 👨‍🌾  (farmer-ready)
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

      {/* Show current points uncommented dw*/}
      { <div style={{ 
        fontSize: "1.2rem", 
        margin: "1rem 0",
        color: "#666",
        fontWeight: "bold",
        textAlign: "center"
      }}>
        Current points: {plantPoints}
      </div> }

      {/* Progress info */}
      <div style={{ 
        fontSize: "0.9rem", 
        color: "#888",
        marginTop: "1rem",
        textAlign: "center"
      }}>
        {currentStage === 0 && "Complete tasks to grow your plant!"}
        {currentStage === 1 && "Keep going! Your plant is sprouting!"}
        {currentStage === 2 && "Beautiful! Your plant is blooming!"}
        {currentStage === 3 && "Amazing! Your plant is celebrating! 🎉"}
      </div>
    </section>
  );
}
