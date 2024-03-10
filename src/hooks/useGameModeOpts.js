import { useWordsStore } from "../store/useWords";
import { GAME_MODE } from "../utils/constants";

const useGameModeOpts = () => {
  const {
    numberOfWords,
    setGameMode,
    setNumberOfWords,
    previousWords,
    setPreviousWords,
    restart,
    restartTyped,
    setTimeSelected,
  } = useWordsStore();

  const handleChangeGameMode = (mode) => {
    setGameMode(mode);

    if (mode === GAME_MODE.TIME) {
      setNumberOfWords(75);
      setPreviousWords(numberOfWords);
    }

    if (mode === GAME_MODE.WORDS) {
      setNumberOfWords(previousWords);
    }
  };

  const handleTimeChange = (time, event) => {
    setTimeSelected(time);
    restart();
    restartTyped();
    event.currentTarget.blur();
  };

  const handleWordsChange = (count, event) => {
    setNumberOfWords(count);
    restart();
    restartTyped();
    event.currentTarget.blur();
  };

  return { handleChangeGameMode, handleTimeChange, handleWordsChange };
};

export default useGameModeOpts;
