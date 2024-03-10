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
              lg:ml-3 lg:gap-4 
              md:ml-3 md:gap-1
              sm:gap-6 sm:ml-0
              gap-6 ml-0
"
    >
      <div
        className={`flex align-center items-center text-center gap-1 lg:gap-1 md:gap-1 cursor-pointer text-sm transition-all duration-300 ${
          gameMode === GAME_MODE.TIME
            ? "fill-secondary text-secondary"
            : "fill-iconstext text-iconstext"
        }`}
        onClick={() => handleChangeGameMode(GAME_MODE.TIME)}
      >
        <Clock props={`w-4 h-4`} />
        time
      </div>

      <div
        className={`flex align-center items-center text-center gap-1 lg:gap-1 md:gap-1 cursor-pointer text-sm transition-all duration-300 ${
          gameMode === GAME_MODE.WORDS
            ? "fill-secondary text-secondary"
            : "fill-iconstext text-iconstext"
        }`}
        onClick={() => handleChangeGameMode(GAME_MODE.WORDS)}
      >
        <LetterA props="w-4 h-4" />
        words
      </div>

      <div
        className={`flex align-center items-center text-center gap-1 lg:gap-1 md:gap-1 cursor-pointer text-sm transition-all duration-300 ${
          gameMode === GAME_MODE.QUOTE
            ? "fill-secondary text-secondary"
            : "fill-iconstext text-iconstext"
        }`}
        onClick={() => handleChangeGameMode(GAME_MODE.QUOTE)}
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
        onClick={() => handleChangeGameMode(GAME_MODE.ZEN)}
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
        onClick={() => handleChangeGameMode(GAME_MODE.CUSTOM)}
      >
        <Tool props="w-4 h-4" />
        custom
      </div>

      <div
        className={`w-1 h-[22px] bg-primary rounded-md hidden sm:hidden lg:flex md:flex`}
      ></div>
    </section>
  );
};

export default GameMode;
