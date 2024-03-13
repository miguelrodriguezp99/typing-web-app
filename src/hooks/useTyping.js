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
    typed,
    deleteTyped,
    incrementCursor,
    gameMode,
    setTypedInput,
    restart,
    setCursor,
    setZenWords,
  } = useWordsStore();

  /* ---- Sonido ---- */
  const { currentSound, volume, muted } = useSoundsStore();
  const [play] = useSound(currentSound, { volume: volume });
  /* ----------------- */

  const handleWrite = (e) => {
    e.preventDefault();

    if (gameMode !== GAME_MODE.ZEN) {
      setTypedInput(e.target.value);
      setCursor(typed.length + 1);
    } else {
      setTypedInput(e.target.value);
      setCursor(typed.length + 1);
      setZenWords(typed);
    }
  };

  /* PC HANDLERS */
  const keyDownHandler = useCallback(
    (event) => {
      const { key, code } = event;
      if (!isKeyboardCodeAllowed(code)) return;

      if (key === "Tab") {
        event.preventDefault(); // Esto asegura que el comportamiento predeterminado de la tecla Tab siempre se prevenga.
        restart();
        return;
      }

      if (!muted) {
        play();
      }
    },
    [currentSound, deleteTyped, setTyped, play, muted, gameMode]
  );

  // Need to increment the cursor in 1 to be able to write in zen mode
  useEffect(() => {
    if (gameMode === GAME_MODE.ZEN) {
      incrementCursor();
    }
  }, [gameMode]);

  // Focus the input which is hidden by absolute value in the screen
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

  /* Event listeners for window */
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

  return { keyDownHandler, handleWrite };
};

export default useTyping;
