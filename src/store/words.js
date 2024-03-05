import { create } from "zustand";
import { generate } from "random-words";
import { calculateErrors } from "../utils/helpers";

export const APP_STATE = {
  STOPPED: "STOPPED",
  RUNNING: "RUNNING",
  FINISHED: "FINISHED",
};

export const PUNCTUATION_MODE = {
  PUNCTUATION: "PUNCTUATION",
  NUMBERS: "NUMBERS",
  DISABLED: "DISABLED",
};

export const GAME_MODE = {
  WORDS: "WORDS",
  TIME: "TIME",
  QUOTE: "QUOTE",
  ZEN: "ZEN",
  CUSTOM: "CUSTOM",
};

export const useWordsStore = create((set, get) => ({
  numberOfWords: 30,
  words: null,
  actualState: APP_STATE.STOPPED,
  time: 15,
  errors: 0,
  typed: "",
  isFocused: true,
  punctuation: PUNCTUATION_MODE.PUNCTUATION,
  game_mode: GAME_MODE.WORDS,

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

  setTime: (time) => {
    set({ time: time });
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
    get().restartTyped();
    get().setWords();
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
}));
