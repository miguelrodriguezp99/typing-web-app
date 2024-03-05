/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { isKeyboardCodeAllowed } from "../utils/helpers";
import { useWordsStore } from "../store/words";
import { useSoundsStore } from "../store/sounds";
import useSound from "use-sound";

const useTyping = () => {
  const [cursor, setCursor] = useState(0);
  const { actualState, runState, words, finishedState, setTyped, deleteTyped } =
    useWordsStore();

  const { muted } = useSoundsStore();
  const hasFinished = cursor >= words?.length;

  /* ---- Sonido ---- */
  const { currentSound, volume } = useSoundsStore();

  const [play] = useSound(currentSound, { volume: volume });
  /* ----------------- */

  /* Cada linea son 82 caracteres */
  /* Cuando lleve 164 hago un trasnlateY */

  const keyDownHandler = useCallback(
    ({ key, code }) => {
      if (!isKeyboardCodeAllowed(code)) return;

      switch (key) {
        case "Backspace":
          deleteTyped();
          setCursor((prev) => prev - 1);
          break;
        default:
          setTyped(key);
          setCursor((cursor) => cursor + 1);
          break;
      }

      if (!muted) {
        play();
      }
    },
    [currentSound, deleteTyped, setTyped, play, muted]
  );

  /* Si terminamos de escribir entonces paramos */
  useEffect(() => {
    if (hasFinished) {
      finishedState();
    }
  }, [hasFinished, runState]);

  /* cambiamos el cursor para que al darle a reiniciar no empiece el contador de nuevo sin escribir */
  useEffect(() => {
    if (actualState === "FINISHED") {
      setCursor(0);
    }

    if (actualState === "STOPPED") {
      setTyped("");
      setCursor(0);
    }
  }, [actualState]);

  /* Si escribimos ponemos en marcha el estado */
  useEffect(() => {
    if (cursor >= 1 && actualState === "STOPPED") {
      runState();
    }
  }, [cursor, actualState, runState]);

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
};

export default useTyping;
