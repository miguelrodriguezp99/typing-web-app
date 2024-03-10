import { useWordsStore } from "../../store/useWords";
import GameMode from "./GameMode";
import WordsOptions from "./WordsOptions";
import { GAME_MODE } from "../../utils/constants";
import TimeOptions from "./TimeOptions";

import PunctuationOptions from "./PunctuationOptions";

const Options = () => {
  const { gameMode } = useWordsStore();

  return (
    <>
      <div
        className="max-w-[1152px] flex flex-col align-center justify-center mx-auto py-2 gap-2
        animate-fade animate-once animate-duration-300 animate-ease-in animate-normal animate-fill-both"
      >
        <section
          className="flex mt-8 bg-tertiary p-2 
      flex-col items-center gap-3 rounded-md w-[422px] mx-auto
      md:flex-row md:gap-0 md:rounded-md md:max-w-full md:w-auto md:mx-auto
      lg:flex-row lg:gap-0"
        >
          {/* -------- Header Top Left || SELECTION OF PUNCTUATION -----------  */}
          {(gameMode === GAME_MODE.WORDS || gameMode === GAME_MODE.TIME) && (
            <PunctuationOptions />
          )}

          {/* -------- Header Middle  -----------  */}
          <GameMode />

          {/* -------- Header Bottom Right || SELECTION OF WORDS -----------  */}
          {gameMode === GAME_MODE.WORDS && <WordsOptions />}
          {gameMode === GAME_MODE.TIME && <TimeOptions />}
        </section>
      </div>
    </>
  );
};

export default Options;
