import { useCallback, useState } from "react";
import "./Modal.css";
import { useWordsStore } from "../../store/words";
import { Settings } from "../../assets/icons/HeaderIcons";

export default function SoundModal() {
  const [modal, setModal] = useState(false);
  const [animationClass, setAnimationClass] = useState("");
  const { punctuation, game_mode, time } = useWordsStore();

  const closeModal = useCallback(() => {
    setAnimationClass("");
    setTimeout(() => {
      setAnimationClass(
        "animate-fade-up animate-once animate-duration-300 animate-ease-out animate-reverse "
      );
    }, 10);

    setTimeout(() => {
      setModal(false);
      setAnimationClass("");
    }, 300);
  }, []);

  const toggleModal = useCallback(() => {
    if (modal) {
      closeModal();
    } else {
      setModal(true);
      setAnimationClass(
        "animate-fade-up animate-once animate-duration-300 animate-ease-out animate-normal"
      );
    }
  }, [modal, closeModal]);

  return (
    <>
      <div className="flex flex-row gap-1 justify-center text-center items-center py-2">
        <button
          onClick={toggleModal}
          className="px-5 py-2 group bg-tertiary text-iconstext rounded-md flex items-center gap-3"
        >
          <Settings props="fill-iconstext w-3 h-3" />
          Test Settings
        </button>
      </div>
      {modal && (
        <div
          className={`w-full h-full top-0 left-0 right-0 bottom-0 fixed zindex 
          ${animationClass}`}
        >
          <div
            onClick={toggleModal}
            className="bg-[#0a0a0af1] opacity-75 w-full h-full top-0 left-0 
            right-0 bottom-0 fixed animate-none transition-none"
          ></div>
          <div
            className="modal-content-mobile bg-primary cursor-pointer 
          rounded-xl text-secondary flex items-center text-center justify-center
          w-[95%] h-auto p-5"
          >
            <div className="flex flex-col gap-7 w-full px-4">
              <div
                id="#punctuation-type"
                className="flex flex-col w-full gap-2"
              >
                <button
                  className={`mobile-modal-button ${
                    punctuation === "PUNCTUATION"
                      ? "bg-secondary text-tertiary"
                      : "bg-tertiary text-iconstext"
                  }`}
                >
                  punctuation
                </button>
                <button
                  className={`mobile-modal-button ${
                    punctuation === "NUMBERS"
                      ? "bg-secondary text-tertiary"
                      : "bg-tertiary text-iconstext"
                  }`}
                >
                  numbers
                </button>
              </div>

              <div id="#options" className="flex flex-col gap-2">
                <button
                  className={`mobile-modal-button ${
                    game_mode === "WORDS"
                      ? "bg-secondary text-tertiary"
                      : "bg-tertiary text-iconstext"
                  }`}
                >
                  time
                </button>
                <button
                  className={`mobile-modal-button ${
                    game_mode === "NUMBERS"
                      ? "bg-secondary text-tertiary"
                      : "bg-tertiary text-iconstext"
                  }`}
                >
                  numbers
                </button>
                <button
                  className={`mobile-modal-button ${
                    game_mode === "QUOTE"
                      ? "bg-secondary text-tertiary"
                      : "bg-tertiary text-iconstext"
                  }`}
                >
                  quote
                </button>
                <button
                  className={`mobile-modal-button ${
                    game_mode === "ZEN"
                      ? "bg-secondary text-tertiary"
                      : "bg-tertiary text-iconstext"
                  }`}
                >
                  zen
                </button>
                <button
                  className={`mobile-modal-button ${
                    game_mode === "CUSTOM"
                      ? "bg-secondary text-tertiary"
                      : "bg-tertiary text-iconstext"
                  }`}
                >
                  custom
                </button>
              </div>

              <div id="#second-options" className="flex flex-col gap-2">
                <button
                  className={`mobile-modal-button ${
                    time === 15
                      ? "bg-secondary text-tertiary"
                      : "bg-tertiary text-iconstext"
                  } `}
                >
                  15
                </button>
                <button
                  className={`mobile-modal-button ${
                    time === 30
                      ? "bg-secondary text-tertiary"
                      : "bg-tertiary text-iconstext"
                  }`}
                >
                  25
                </button>
                <button
                  className={`mobile-modal-button ${
                    time === 60
                      ? "bg-secondary text-tertiary"
                      : "bg-tertiary text-iconstext"
                  }`}
                >
                  60
                </button>
                <button
                  className={`mobile-modal-button ${
                    time === 100
                      ? "bg-secondary text-tertiary"
                      : "bg-tertiary text-iconstext"
                  }`}
                >
                  100
                </button>
                <button
                  className={`mobile-modal-button ${
                    time === "CUSTOM"
                      ? "bg-secondary text-tertiary"
                      : "bg-tertiary text-iconstext"
                  }`}
                >
                  custom
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
