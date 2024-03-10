/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from "react";
import { isKeyboardCodeAllowed } from "../utils/helpers";
import { useWordsStore } from "../store/useWords";
import { useSoundsStore } from "../store/sounds";
import useSound from "use-sound";

const useTyping = (inputRef) => {
  const {
    actualState,
    setTyped,
    deleteTyped,
    incrementCursor,
    decrementCursor,
  } = useWordsStore();

  const { muted } = useSoundsStore();

  /* ---- Sonido ---- */
  const { currentSound, volume } = useSoundsStore();
  const [play] = useSound(currentSound, { volume: volume });
  /* ----------------- */

  const keyDownHandler = useCallback(
    ({ key, code }) => {
      if (!isKeyboardCodeAllowed(code)) return;

      switch (key) {
        case "Backspace":
          deleteTyped();
          decrementCursor();
          break;
        default:
          setTyped(key);
          incrementCursor();
          break;
      }

      if (!muted) {
        play();
      }
    },
    [currentSound, deleteTyped, setTyped, play, muted]
  );

  useEffect(() => {
    const element = inputRef?.current;
    if (!element) return;

    if (actualState === "FINISHED") {
      element.removeEventListener("keydown", keyDownHandler);
    } else {
      element.addEventListener("keydown", keyDownHandler);
    }

    return () => {
      element.removeEventListener("keydown", keyDownHandler);
    };
  }, [keyDownHandler, actualState, inputRef]);

  /* Quitamos y ponemos el event listener */
  useEffect(() => {
    if (actualState === "FINISHED") {
      window.removeEventListener("keydown", keyDownHandler);
    } else {
      window.addEventListener("keydown", keyDownHandler);
    }
    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  }, [keyDownHandler, actualState]);

  return keyDownHandler;
};

export default useTyping;
