import useCountdownTimer from "../hooks/useCountdownTimer";
import useCountupTimer from "../hooks/useCountupTimer";
import { useWordsStore } from "../store/useWords";
import { GAME_MODE } from "../utils/constants";

const Timer = () => {
  const { gameMode } = useWordsStore();
  const { timeRemaining } = useCountdownTimer();
  const { timeUsed } = useCountupTimer();
  return (
    <div className="text-secondary max-w-6xl mx-auto text-3xl mb-5">
      {gameMode === GAME_MODE.TIME && timeRemaining}
      {gameMode === GAME_MODE.WORDS && timeUsed}
    </div>
  );
};

export default Timer;
