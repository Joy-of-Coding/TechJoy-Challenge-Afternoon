import { useLocalStorage } from './useLocalStorage';

export function usePlantPoints() {
  const [plantPoints, setPlantPoints] = useLocalStorage('plantGrowthPoints', 0);
  
  const addMultiplePoints = (amount: number) => {
    setPlantPoints(prev => prev + amount);
  };
  
  const addTimerPoints = () => {
    setPlantPoints(prev => prev + 1); // Timer awards 1 point
  };
  
  const addGoalPoints = () => {
    setPlantPoints(prev => {
      const newPoints = prev + 5;
      return newPoints;
    }); // Goal awards 5 points
  };

  // I added here a special function for adding Points for completing a Task
  // the  greatest value we can have is 30 to have top growth so I wanted to 
  // have different steps than the one used for the Goal which is 5.
  // if I keep 5 for each Task I will reach 30 after 6th Task but if I use a step of 3.2 points
  // it will appear more conveniant

  const addTaskPoints = () => {
    setPlantPoints(prev => {
      const newPoints = prev + 3.2;
      return newPoints;
    }); // Task awards 3.2 points
  };
  const resetPoints = () => {
    setPlantPoints(0);
  };
  
  const getPlantPoints = () => plantPoints;
  
  return { 
    plantPoints, 
    addMultiplePoints, 
    addTimerPoints, 
    addGoalPoints, 
    resetPoints,
    getPlantPoints,
    addTaskPoints 
  };
} 