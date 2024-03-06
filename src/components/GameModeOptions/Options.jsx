import { AtSign, Hashtag } from "../../assets/icons/HeaderIcons";
import { useWordsStore } from "../../store/useWords";

import GameMode from "./GameMode";
import WordsOptions from "./WordsOptions";
import { GAME_MODE } from "../../utils/constants";
import TimeOptions from "./TimeOptions";

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
          <section className="flex lg:gap-4 md:gap-2 sm:gap-10 gap-10 tracking-tight ">
            <div className="flex align-center items-center text-center gap-1 lg:gap-2 md:gap-1 lg:ml-3 md:ml-1">
              <AtSign props="fill-iconstext w-4 h-4" />
              <p className="text-sm text-iconstext">punctuation</p>
            </div>
            <div className="flex align-center items-center text-center gap-1 lg:gap-2 md:gap-1">
              <Hashtag props="fill-iconstext w-4 h-4" />
              <p className="text-sm text-iconstext ">numbers</p>
            </div>
            <div className="w-1 h-[22px] bg-primary rounded-md hidden sm:hidden lg:flex md:flex"></div>
          </section>

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
