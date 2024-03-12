import { useWordsStore } from "../../store/useWords";
import { GAME_MODE } from "../../utils/constants";
import WordsOptions from "./WordsOptions";
import TimeOptions from "./TimeOptions";

const NumberOptions = () => {
  const { gameMode } = useWordsStore();
  return (
    <section
      className="flex gap-8 sm:gap-8 lg:gap-3 md:gap-2.5 bg-tertiary p-2 rounded-r-md
      animate-fade-right animate-once animate-normal animate-fill-both"
    >
      {gameMode === GAME_MODE.WORDS && <WordsOptions />}
      {gameMode === GAME_MODE.TIME && <TimeOptions />}
    </section>
  );
};

export default NumberOptions;
