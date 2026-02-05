import { useEffect, useState } from "react";

export function useTutorial() {
  const [showTutorial, setShowTutorial] = useState(false);
  const TUTORIAL_COMPLETED_KEY = "prerevi_tutorial_completed";

  useEffect(() => {
    const completed = localStorage.getItem(TUTORIAL_COMPLETED_KEY);
    if (!completed) {
      setShowTutorial(true);
    }
  }, []);

  const completeTutorial = () => {
    localStorage.setItem(TUTORIAL_COMPLETED_KEY, "true");
    setShowTutorial(false);
  };

  const resetTutorial = () => {
    localStorage.removeItem(TUTORIAL_COMPLETED_KEY);
    setShowTutorial(true);
  };

  return { showTutorial, completeTutorial, resetTutorial };
}