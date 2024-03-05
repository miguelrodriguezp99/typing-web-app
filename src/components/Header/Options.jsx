import React from "react";
import { useWordsStore } from "../../store/words";
import {
  AtSign,
  Clock,
  Hashtag,
  LetterA,
  Mountain,
  Quote,
  Tool,
} from "../../assets/icons/HeaderIcons";

const Options = () => {
  const { numberOfWords, setNumberOfWords, restart, restartTyped } =
    useWordsStore();

  const handleWordsChange = (count, event) => {
    setNumberOfWords(count);
    restart();
    restartTyped();
    event.currentTarget.blur();
  };
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

          <div
            className="flex tracking-tight 
        lg:ml-3 lg:gap-4 
        md:ml-3 md:gap-1
        sm:gap-6 sm:ml-0
        gap-6 ml-0
        "
          >
            <div className="flex align-center items-center text-center gap-1 lg:gap-2 md:gap-1 ">
              <Clock props="fill-iconstext w-4 h-4" />
              <p className="text-sm text-iconstext">time</p>
            </div>

            <div className="flex align-center items-center text-center gap-1 lg:gap-2 md:gap-1 lg:ml-3 md:ml-2">
              <LetterA props="fill-iconstext w-4 h-4" />
              <p className="text-sm text-iconstext">words</p>
            </div>

            <div className="flex align-center items-center text-center gap-1 lg:gap-2 md:gap-1 lg:ml-3 md:ml-2">
              <Quote props="fill-iconstext w-4 h-4" />
              <p className="text-sm text-iconstext">quote</p>
            </div>

            <div className="flex align-center items-center text-center gap-1 lg:gap-2 md:gap-1 lg:ml-3 md:ml-2">
              <Mountain props="fill-iconstext w-4 h-4" />
              <p className="text-sm text-iconstext">zen</p>
            </div>

            <div className="flex align-center items-center text-center gap-1 lg:gap-2 md:gap-1 lg:ml-3 md:ml-2">
              <Tool props="fill-iconstext w-4 h-4" />
              <p className="text-sm text-iconstext">custom</p>
            </div>
          </div>

          {/* -------- Header Bottom Right || SELECTION OF WORDS -----------  */}
          <div className="flex mx-3 gap-8 sm:gap-8 lg:gap-3 md:gap-2.5">
            <div
              className={`w-1 h-[22px] bg-primary rounded-md hidden sm:hidden lg:flex md:flex`}
            ></div>
            <button
              onClick={(event) => handleWordsChange(15, event)}
              selected={numberOfWords === "15"}
            >
              <p
                className={`text-sm font-semibold transition-all duration-300 ${
                  numberOfWords === 15
                    ? "text-selected"
                    : "text-iconstext hover:text-iconstext-hover"
                }`}
              >
                15
              </p>
            </button>

            <button onClick={(event) => handleWordsChange(30, event)}>
              <p
                className={`text-sm font-semibold transition-all duration-300 ${
                  numberOfWords === 30
                    ? "text-selected"
                    : "text-iconstext hover:text-iconstext-hover"
                }`}
              >
                30
              </p>
            </button>
            <button onClick={(event) => handleWordsChange(60, event)}>
              <p
                className={`text-sm font-semibold transition-all duration-300 ${
                  numberOfWords === 60
                    ? "text-selected"
                    : "text-iconstext hover:text-iconstext-hover"
                }`}
              >
                60
              </p>
            </button>
            <button onClick={(event) => handleWordsChange(75, event)}>
              <p
                className={`text-sm font-semibold transition-all duration-300 ${
                  numberOfWords === 75
                    ? "text-selected"
                    : "text-iconstext hover:text-iconstext-hover"
                }`}
              >
                75
              </p>
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default Options;
