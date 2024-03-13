/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from "react";
import { isKeyboardCodeAllowed } from "../utils/helpers";
import { useWordsStore } from "../store/useWords";
import { useSoundsStore } from "../store/sounds";
import useSound from "use-sound";
import { GAME_MODE } from "../utils/constants";

const useTyping = (inputRef) => {
  const {
    actualState,
    setTyped,
    deleteTyped,
    incrementCursor,
    decrementCursor,
    gameMode,
    appendWords,
    deleteWords,
    restart,
  } = useWordsStore();

  const { muted } = useSoundsStore();

  /* ---- Sonido ---- */
  const { currentSound, volume } = useSoundsStore();
  const [play] = useSound(currentSound, { volume: volume });
  /* ----------------- */

  const keyDownHandler = useCallback(
    (event) => {
      const { key, code } = event;
      if (!isKeyboardCodeAllowed(code)) return;

      if (key === "Tab") {
        event.preventDefault(); // Esto asegura que el comportamiento predeterminado de la tecla Tab siempre se prevenga.
        restart();
        return; // Previene cualquier otra acción después de reiniciar.
      }

      if (gameMode !== GAME_MODE.ZEN) {
        switch (key) {
          case "Backspace":
            //deleteTyped();
            //decrementCursor();
            break;
          default:
            //setTyped(key);
            //incrementCursor();
            break;
        }
      } else if (gameMode === GAME_MODE.ZEN) {
        switch (key) {
          case "Backspace":
            //deleteTyped();
            deleteWords();
            //decrementCursor();
            break;
          default:
            //setTyped(key);
            appendWords(key);
            //incrementCursor();
            break;
        }
      }

      if (!muted) {
        play();
      }
    },
    [currentSound, deleteTyped, setTyped, play, muted, gameMode]
  );

  useEffect(() => {
    if (gameMode === GAME_MODE.ZEN) {
      incrementCursor();
    }
  }, [gameMode]);

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
