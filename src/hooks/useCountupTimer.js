import { useEffect } from "react";
import { useWordsStore } from "../store/useWords";
import { GAME_MODE } from "../utils/constants";

const useCountupTimer = () => {
  const { actualState, finishedState, gameMode, timeUsed, setTimeUsed } =
    useWordsStore();

  //Time countdown every second
  useEffect(() => {
    if (
      actualState === "RUNNING" &&
      (gameMode === GAME_MODE.WORDS ||
        gameMode === GAME_MODE.QUOTE ||
        gameMode === GAME_MODE.ZEN)
    ) {
      const timer =
        actualState === "RUNNING" &&
        setInterval(() => setTimeUsed(timeUsed + 1), 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [actualState, finishedState, gameMode, timeUsed, setTimeUsed]);

  return { timeUsed };
};

export default useCountupTimer;
