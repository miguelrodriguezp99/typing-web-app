import { create } from "zustand";
import { generate } from "random-words";
import { calculateErrors } from "../utils/helpers";
import { APP_STATE, PUNCTUATION_MODE, GAME_MODE } from "../utils/constants";

export const useWordsStore = create((set, get) => ({
  numberOfWords: 30,
  words: null,
  actualState: APP_STATE.STOPPED,
  timeSelected: 15,
  timeRemaining: 15,
  timeUsed: 0,
  timeResult: 0,
  errors: 0,
  typed: "",
  isFocused: true,
  punctuation: PUNCTUATION_MODE.PUNCTUATION,
  gameMode: GAME_MODE.TIME,
  cursor: 0,
  previousWords: 15,
  kps: 0,
  wpm: 0,

  setPreviousWords: (words) => {
    set({ previousWords: words });
  },

  setNumberOfWords: (count) => {
    set({ numberOfWords: count });
    get().setWords();
  },

  setWords: () => {
    set({ words: generate(get().numberOfWords).join(" ") });
  },

  incrementWords: () => {
    const newWords = generate(30).join(" ");
    set({
      words: get().words + " " + newWords,
    });
  },

  setAppState: (state) => {
    set({ actualState: state });
  },

  setTimeSelected: (time) => {
    set({ timeSelected: time });
  },

  setErrors: (errors) => {
    set({ errors: errors });
  },

  //Concatenamos el typed content
  setTyped: (typed) => {
    set({ typed: get().typed + typed });
  },

  //Elimniamos ultimo elemento del typed content
  deleteTyped: () => {
    set({ typed: get().typed.slice(0, -1) });
  },

  //Restart typed content
  restartTyped: () => {
    set({ typed: "" });
  },

  incrementTypedValues: (typed, expected) => {
    const isCorrect = typed === expected;

    if (!isCorrect) {
      set({ errors: get().errors + 1 });
    } else if (isCorrect) {
      set({ corrects: get().corrects + 1 });
    }
    set({ inputs: get().inputs + 1 });
  },

  restartTime: () => {
    set({ timeTimeRemaining: get().timeSelected });
    set({ timeUsed: 0 });
  },

  restart: () => {
    const { restartTime, setWords, restartTyped, stopState } = get();
    set({ inputs: 0 });
    set({ corrects: 0 });
    set({ errors: 0 });
    set({ cursor: 0 });
    restartTime();
    setWords();
    restartTyped();
    stopState();
  },

  /* ---- Estados ---- */
  stopState: () => {
    set({ actualState: APP_STATE.STOPPED });
    set({ time: get().time });
  },

  runState: () => {
    set({ actualState: APP_STATE.RUNNING });
  },

  finishedState: () => {
    get().calculateResults();
    set({ actualState: APP_STATE.FINISHED });
  },

  setFocusedTrue: () => {
    set({ isFocused: true });
  },

  setFocusedFalse: () => {
    set({ isFocused: false });
  },

  setGameMode: (mode) => {
    set({ gameMode: mode });
    get().restart();
  },

  /* ---- CURSOR ---- */
  incrementCursor: () => {
    set({ cursor: get().cursor + 1 });
  },

  decrementCursor: () => {
    set({ cursor: get().cursor - 1 });
  },

  restartCursor: () => {
    set({ cursor: 0 });
  },

  /* ---- TIMER ---- */
  setTimeRemaining: (time) => {
    set({ timeRemaining: time });
  },

  setTimeUsed: (time) => {
    set({ timeUsed: time });
  },

  /* ---- PUNCTUATION ---- */
  calculateResults: () => {
    // Calcular kps y WPM
    const calculatekpsandWPM = (typedLength, timeUsed, words) => {
      const kps = Math.ceil((typedLength / timeUsed) * 60);
      let averageWordLength;
      if (words) {
        const totalLength = words
          .split(" ")
          .reduce((total, word) => total + word.length, 0);
        const wordCount = words.split(" ").length;
        averageWordLength = totalLength / wordCount; // Calcula la longitud promedio de las palabras dinámicamente
      } else {
        averageWordLength = 5; // O usa 5 si no hay datos suficientes
      }
      const wpm = Math.ceil(typedLength / averageWordLength / (timeUsed / 60));
      return { kps, wpm };
    };

    if (get().gameMode === GAME_MODE.WORDS) {
      const { typed, timeUsed, words } = get();
      get().setErrors(calculateErrors(typed, words));
      const { kps, wpm } = calculatekpsandWPM(typed.length, timeUsed, words);
      const timeResult = get().timeUsed;
      set({ kps, wpm, timeResult });
      get().setErrors(calculateErrors(get().typed, get().words));
    }

    if (get().gameMode === GAME_MODE.TIME) {
      const { typed, timeSelected, words } = get();

      const { kps, wpm } = calculatekpsandWPM(
        typed.length,
        timeSelected,
        words
      );
      const timeResult = get().timeSelected;
      set({ kps, wpm, timeResult });
      get().setErrors(calculateErrors(get().typed, get().words));
    }
  },
}));
