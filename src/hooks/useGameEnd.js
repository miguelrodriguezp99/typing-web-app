import { useEffect, useMemo } from "react";
import { useWordsStore } from "../store/useWords";
import { GAME_MODE } from "../utils/constants";

const useGameEnd = () => {
  const {
    cursor,
    actualState,
    runState,
    words,
    finishedState,
    setTyped,
    gameMode,
    restartCursor,
    timeRemaining,
    setTimeRemaining,
    timeSelected,
    incrementWords,
    setNumberOfWords,
    calculateResults,
    typed,
  } = useWordsStore();

  /* ------------------ LOGICA DEL TIMER Y DEL ESTADO ----------------------------- */

  /* ---- HAS FINISHED ---- */
  const hasFinished = useMemo(() => {
    if (gameMode === GAME_MODE.WORDS || gameMode === GAME_MODE.QUOTE) {
      return typed.length >= words?.length;
    }
    if (gameMode === GAME_MODE.TIME) {
      return cursor >= words?.length || timeRemaining <= 0;
    }
    // Por defecto, consideramos que no ha terminado
    return false;
  }, [cursor, words, gameMode, timeRemaining, typed]);

  /* ---- GAME ENDS!! ------------------*/
  useEffect(() => {
    if (hasFinished) {
      calculateResults();
      finishedState();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasFinished, calculateResults]);

  /* cambiamos el cursor para que al darle a reiniciar no empiece el contador de nuevo sin escribir */
  useEffect(() => {
    if (actualState === "FINISHED") {
      restartCursor();
    }

    if (actualState === "STOPPED") {
      setTyped("");
      restartCursor();
      setTimeRemaining(timeSelected);
    }
  }, [actualState, restartCursor, setTyped, setTimeRemaining, timeSelected]);

  // * ------------- GAME START HERE  ------------------ * //
  /* START THE GAME IF USER START TYPING */
  useEffect(() => {
    if (cursor >= 1 && actualState === "STOPPED") {
      runState();
    }
  }, [cursor, actualState, runState]);

  //Añadimos palabras al array si el gamemode es tiempo y el cursor está cerca de llegar al final de la longitud del array
  useEffect(() => {
    if (gameMode === GAME_MODE.TIME && cursor >= words?.length - 180) {
      incrementWords();
    }
  }, [cursor, words, gameMode, setTyped, incrementWords]);

  // GAMEMODE = TIME THEN SET NUMBER OF WORDS TO 75
  useEffect(() => {
    if (gameMode === GAME_MODE.TIME) {
      setNumberOfWords(75);
    }
  }, [gameMode, setNumberOfWords]);

  return { hasFinished };
};

export default useGameEnd;
