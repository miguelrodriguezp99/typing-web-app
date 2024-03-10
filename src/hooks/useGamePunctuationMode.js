import { useWordsStore } from "../store/useWords";
import { PUNCTUATION_MODE } from "../utils/constants";

const useGamePunctuationMode = () => {
  const {
    punctuation,
    setPunctuationModePunctuation,
    setPunctuationModeDisabled,
    setPunctuationModeNumbers,
  } = useWordsStore();

  const handleChangePunctuationMode = () => {
    punctuation === PUNCTUATION_MODE.PUNCTUATION
      ? setPunctuationModeDisabled()
      : setPunctuationModePunctuation();
  };

  const handleChangeNumbersMode = () => {
    punctuation === PUNCTUATION_MODE.NUMBERS
      ? setPunctuationModeDisabled()
      : setPunctuationModeNumbers();
  };

  return { handleChangePunctuationMode, handleChangeNumbersMode };
};

export default useGamePunctuationMode;
