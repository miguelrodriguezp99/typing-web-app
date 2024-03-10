import { useWordsStore } from "../../store/useWords";

const TimeOptions = () => {
  const { timeRemaining, restart, restartTyped, setTimeRemaining } =
    useWordsStore();

  const handleTimeChange = (time, event) => {
    setTimeRemaining(time);
    restart();
    restartTyped();
    event.currentTarget.blur();
  };
  return (
    <section
      className="flex mx-3 gap-8 sm:gap-8 lg:gap-3 md:gap-2.5
    animate-fade animate-duration-800 animate-ease-in-out animate-normal animate-fill-both"
    >
      <button
        onClick={(event) => handleTimeChange(15, event)}
        selected={timeRemaining === "15"}
      >
        <p
          className={`text-sm font-semibold transition-all duration-300 ${
            timeRemaining === 15
              ? "text-selected"
              : "text-iconstext hover:text-iconstext-hover"
          }`}
        >
          15
        </p>
      </button>

      <button onClick={(event) => handleTimeChange(30, event)}>
        <p
          className={`text-sm font-semibold transition-all duration-300 ${
            timeRemaining === 30
              ? "text-selected"
              : "text-iconstext hover:text-iconstext-hover"
          }`}
        >
          30
        </p>
      </button>
      <button onClick={(event) => handleTimeChange(60, event)}>
        <p
          className={`text-sm font-semibold transition-all duration-300 ${
            timeRemaining === 60
              ? "text-selected"
              : "text-iconstext hover:text-iconstext-hover"
          }`}
        >
          60
        </p>
      </button>
      <button onClick={(event) => handleTimeChange(75, event)}>
        <p
          className={`text-sm font-semibold transition-all duration-300 ${
            timeRemaining === 75
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

export default TimeOptions;
