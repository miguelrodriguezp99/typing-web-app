import { useWordsStore } from "../../store/useWords";
import {
  Clock,
  LetterA,
  Mountain,
  Quote,
  Tool,
} from "../../assets/icons/HeaderIcons";

import { GAME_MODE } from "../../utils/constants";
import useGameModeOpts from "../../hooks/useGameModeOpts";

const GameMode = () => {
  const { gameMode } = useWordsStore();
  const { handleChangeGameMode } = useGameModeOpts();

  return (
    <section
      className="flex tracking-tight
              px-1
              lg:gap-4 
              md:gap-1
              sm:gap-6 sm:ml-0
              gap-6 ml-0
              
"
    >
      {(gameMode === GAME_MODE.WORDS || gameMode === GAME_MODE.TIME) && (
        <div className="w-1 h-[22px] bg-primary rounded-md hidden sm:hidden lg:flex md:flex"></div>
      )}

      <div
        className={`group flex align-center items-center text-center gap-1 lg:gap-1 md:gap-1 cursor-pointer text-sm transition-all duration-300 
        ${
          gameMode === GAME_MODE.TIME
            ? "fill-secondary text-secondary"
            : "fill-iconstext text-iconstext"
        }`}
        onClick={(e) => handleChangeGameMode(GAME_MODE.TIME, e)}
      >
        <Clock
          props={`w-4 h-4 group-hover:fill-iconstext-hover transtion-all duration-300`}
        />
        <p className="group-hover:text-iconstext-hover transtion-all duration-300">
          time
        </p>
      </div>

      <div
        className={`group flex align-center items-center text-center gap-1 lg:gap-1 md:gap-1 cursor-pointer text-sm transition-all duration-300 ${
          gameMode === GAME_MODE.WORDS
            ? "fill-secondary text-secondary"
            : "fill-iconstext text-iconstext"
        }`}
        onClick={(e) => handleChangeGameMode(GAME_MODE.WORDS, e)}
      >
        <LetterA props="w-4 h-4 group-hover:fill-iconstext-hover transtion-all duration-300" />
        <p className="group-hover:text-iconstext-hover transtion-all duration-300">
          words
        </p>
      </div>

      <div
        className={`flex align-center items-center text-center gap-1 lg:gap-1 md:gap-1 cursor-pointer text-sm transition-all duration-300 ${
          gameMode === GAME_MODE.QUOTE
            ? "fill-secondary text-secondary"
            : "fill-iconstext text-iconstext"
        }`}
        onClick={(e) => handleChangeGameMode(GAME_MODE.QUOTE, e)}
      >
        <Quote props="w-4 h-4" />
        quote
      </div>

      <div
        className={`flex align-center items-center text-center gap-1 lg:gap-1 md:gap-1 cursor-pointer text-sm transition-all duration-300 ${
          gameMode === GAME_MODE.ZEN
            ? "fill-secondary text-secondary"
            : "fill-iconstext text-iconstext"
        }`}
        onClick={(e) => handleChangeGameMode(GAME_MODE.ZEN, e)}
      >
        <Mountain props="w-4 h-4" />
        zen
      </div>

      <div
        className={`flex align-center items-center text-center gap-1 lg:gap-1 md:gap-1 cursor-pointer text-sm transition-all duration-300 ${
          gameMode === GAME_MODE.CUSTOM
            ? "fill-secondary text-secondary"
            : "fill-iconstext text-iconstext"
        }`}
        onClick={(e) => handleChangeGameMode(GAME_MODE.CUSTOM, e)}
      >
        <Tool props="w-4 h-4" />
        custom
      </div>

      {(gameMode === GAME_MODE.WORDS || gameMode === GAME_MODE.TIME) && (
        <div className="w-1 h-[22px] bg-primary rounded-md hidden sm:hidden lg:flex md:flex"></div>
      )}
    </section>
  );
};

export default GameMode;
