import { useEffect, useState } from "react";
import { useWordsStore } from "../store/words";

const useCountdownTimer = () => {
  const { time, actualState, finishedState } = useWordsStore();
  const [timeLeft, setTimeLeft] = useState(time);

  //Time countdown every second
  useEffect(() => {
    if (actualState === "RUNNING") {
      const timer =
        timeLeft > 0 &&
        actualState === "RUNNING" &&
        setInterval(() => setTimeLeft(timeLeft - 1), 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [timeLeft, actualState, finishedState]);

  /* When timer reachs 0, change state to finished */
  useEffect(() => {
    if (timeLeft <= 0) {
      finishedState();
    }
  }, [timeLeft, finishedState]);

  // When state changes to finished, reset timeLeft
  useEffect(() => {
    if (actualState === "STOPPED") {
      setTimeLeft(time);
    }
  }, [actualState, time]);

  return { timeLeft };
};

export default useCountdownTimer;
