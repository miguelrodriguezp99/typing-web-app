import useGameModeOpts from "../../hooks/useGameModeOpts";
import { useWordsStore } from "../../store/useWords";

const MobileTimeOptions = () => {
  const { timeSelected } = useWordsStore();
  const { handleTimeChange } = useGameModeOpts();

  return (
    <div id="#second-options" className="flex flex-col gap-2">
      <button
        onClick={(event) => handleTimeChange(15, event)}
        className={`mobile-modal-button ${
          timeSelected === 15
            ? "bg-secondary text-tertiary"
            : "bg-tertiary text-iconstext"
        } `}
      >
        15
      </button>
      <button
        onClick={(event) => handleTimeChange(30, event)}
        className={`mobile-modal-button ${
          timeSelected === 30
            ? "bg-secondary text-tertiary"
            : "bg-tertiary text-iconstext"
        }`}
      >
        30
      </button>
      <button
        onClick={(event) => handleTimeChange(60, event)}
        className={`mobile-modal-button ${
          timeSelected === 60
            ? "bg-secondary text-tertiary"
            : "bg-tertiary text-iconstext"
        }`}
      >
        60
      </button>
      <button
        onClick={(event) => handleTimeChange(75, event)}
        className={`mobile-modal-button ${
          timeSelected === 75
            ? "bg-secondary text-tertiary"
            : "bg-tertiary text-iconstext"
        }`}
      >
        75
      </button>
      <button
        className={`mobile-modal-button ${
          timeSelected === "CUSTOM"
            ? "bg-secondary text-tertiary"
            : "bg-tertiary text-iconstext"
        }`}
      >
        custom
      </button>
    </div>
  );
};

export default MobileTimeOptions;
