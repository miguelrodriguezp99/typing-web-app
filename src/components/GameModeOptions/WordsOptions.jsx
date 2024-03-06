import { useWordsStore } from "../../store/useWords";

const WordsOptions = () => {
  const { numberOfWords, setNumberOfWords, restart, restartTyped } =
    useWordsStore();

  const handleWordsChange = (count, event) => {
    setNumberOfWords(count);
    restart();
    restartTyped();
    event.currentTarget.blur();
  };

  return (
    <section className="flex mx-3 gap-8 sm:gap-8 lg:gap-3 md:gap-2.5">
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
    </section>
  );
};

export default WordsOptions;