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
  errors: 0,
  typed: "",
  isFocused: true,
  punctuation: PUNCTUATION_MODE.PUNCTUATION,
  gameMode: GAME_MODE.TIME,
  cursor: 0,
  previousWords: 15,

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

  restart: () => {
    set({ inputs: 0 });
    set({ corrects: 0 });
    set({ errors: 0 });
    set({ cursor: 0 });
    get().setWords();
    get().restartTyped();
    get().stopState();
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
    get().setErrors(calculateErrors(get().typed, get().words));
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
}));
