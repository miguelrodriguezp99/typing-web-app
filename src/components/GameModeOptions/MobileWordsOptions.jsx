import useGameModeOpts from "../../hooks/useGameModeOpts";
import { useWordsStore } from "../../store/useWords";

const MobilenumberOfWordsOptions = () => {
  const { numberOfWords } = useWordsStore();
  const { handleWordsChange } = useGameModeOpts();
  return (
    <div id="#second-options" className="flex flex-col gap-2">
      <button
        onClick={(event) => handleWordsChange(15, event)}
        className={`mobile-modal-button ${
          numberOfWords === 15
            ? "bg-secondary text-tertiary"
            : "bg-tertiary text-iconstext"
        } `}
      >
        15
      </button>
      <button
        onClick={(event) => handleWordsChange(30, event)}
        className={`mobile-modal-button ${
          numberOfWords === 30
            ? "bg-secondary text-tertiary"
            : "bg-tertiary text-iconstext"
        }`}
      >
        30
      </button>
      <button
        onClick={(event) => handleWordsChange(60, event)}
        className={`mobile-modal-button ${
          numberOfWords === 60
            ? "bg-secondary text-tertiary"
            : "bg-tertiary text-iconstext"
        }`}
      >
        60
      </button>
      <button
        onClick={(event) => handleWordsChange(75, event)}
        className={`mobile-modal-button ${
          numberOfWords === 75
            ? "bg-secondary text-tertiary"
            : "bg-tertiary text-iconstext"
        }`}
      >
        75
      </button>
      <button
        className={`mobile-modal-button ${
          numberOfWords === "CUSTOM"
            ? "bg-secondary text-tertiary"
            : "bg-tertiary text-iconstext"
        }`}
      >
        custom
      </button>
    </div>
  );
};

export default MobilenumberOfWordsOptions;
