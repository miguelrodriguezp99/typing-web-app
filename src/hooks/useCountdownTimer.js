import { useEffect } from "react";
import { useWordsStore } from "../store/useWords";
import { GAME_MODE } from "../utils/constants";

const useCountdownTimer = () => {
  const {
    actualState,
    finishedState,
    gameMode,
    timeRemaining,
    setTimeRemaining,
  } = useWordsStore();

  //Time countdown every second
  useEffect(() => {
    if (actualState === "RUNNING" && gameMode === GAME_MODE.TIME) {
      const timer =
        timeRemaining > 0 &&
        actualState === "RUNNING" &&
        setInterval(() => setTimeRemaining(timeRemaining - 1), 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [actualState, finishedState, gameMode, timeRemaining, setTimeRemaining]);

  return { timeRemaining };
};

export default useCountdownTimer;
