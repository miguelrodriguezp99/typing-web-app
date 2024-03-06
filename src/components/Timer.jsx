import useCountdownTimer from "../hooks/useCountdownTimer";
import { useWordsStore } from "../store/useWords";
import { GAME_MODE } from "../utils/constants";

const Timer = () => {
  const { gameMode } = useWordsStore();
  const { timeRemaining } = useCountdownTimer();
  return (
    <div className="text-secondary max-w-6xl mx-auto text-3xl mb-5">
      {gameMode === GAME_MODE.TIME && timeRemaining}
      {gameMode === GAME_MODE.WORDS && "∞"}
    </div>
  );
};

export default Timer;
