import { create } from "zustand";
import { generate } from "random-words";
import {
  calculateErrors,
  calculatekpsandWPM,
  calculateAccuracy,
  getRandomPunctuationWord,
  getRandomNumberWord,
} from "../utils/helpers";
import { APP_STATE, PUNCTUATION_MODE, GAME_MODE } from "../utils/constants";
import { quotes } from "../utils/quotes";

export const useWordsStore = create((set, get) => ({
  numberOfWords: 30,
  words: null,
  typed: "",
  actualState: APP_STATE.STOPPED,
  timeSelected: 15,
  timeRemaining: 15,
  timeUsed: 0,
  timeResult: 0,
  errors: 0,
  isFocused: true,
  punctuation: PUNCTUATION_MODE.DISABLED,
  gameMode: GAME_MODE.TIME,
  cursor: 0,
  previousWords: 15,
  kps: 0,
  wpm: 0,
  accuaracy: 0,

  setPreviousWords: (words) => {
    set({ previousWords: words });
  },

  setNumberOfWords: (count) => {
    set({ numberOfWords: count });
    get().setWords();
  },

  setWords: () => {
    if (get().gameMode === GAME_MODE.QUOTE) {
      //Set words a random quote
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      set({ words: randomQuote });
      return;
    }

    if (get().gameMode === GAME_MODE.ZEN) {
      //Set words a random quote
      set({ words: " " });
      return;
    }

    if (get().gameMode === GAME_MODE.QUOTE) {
      set({ words: generate(get().numberOfWords).join(" ") });
      return;
    }

    if (get().punctuation === PUNCTUATION_MODE.DISABLED) {
      set({ words: generate(get().numberOfWords).join(" ") });
    }

    if (get().punctuation === PUNCTUATION_MODE.PUNCTUATION) {
      set({
        words: generate({
          exactly: 1,
          wordsPerString: get().numberOfWords,
          formatter: (word, index) => {
            // Function to get a random punctuation word or a character
            return getRandomPunctuationWord(word, index);
          },
        }).join(" "),
      });
    }

    if (get().punctuation === PUNCTUATION_MODE.NUMBERS) {
      set({
        words: generate({
          exactly: 1,
          wordsPerString: get().numberOfWords,
          formatter: (word, index) => {
            // Function to get a random punctuation word or a character
            return getRandomNumberWord(word);
          },
        }).join(" "),
      });
    }
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
    if (
      get().gameMode === GAME_MODE.WORDS ||
      get().gameMode === GAME_MODE.QUOTE
    ) {
      const { typed, timeUsed, words } = get();

      get().setErrors(calculateErrors(typed, words));
      const { kps, wpm } = calculatekpsandWPM(typed.length, timeUsed, words);
      const timeResult = get().timeUsed;
      get().setErrors(calculateErrors(get().typed, get().words));
      const acc = calculateAccuracy(typed, get().errors);
      set({ kps, wpm, timeResult, acc });
    }

    if (get().gameMode === GAME_MODE.TIME) {
      const { typed, timeSelected, words } = get();

      const { kps, wpm } = calculatekpsandWPM(
        typed.length,
        timeSelected,
        words
      );

      const timeResult = get().timeSelected;
      get().setErrors(calculateErrors(get().typed, get().words));
      const acc = calculateAccuracy(typed, get().errors);
      set({ kps, wpm, timeResult, acc });
    }
  },

  setPunctuationModePunctuation: () => {
    set({ punctuation: PUNCTUATION_MODE.PUNCTUATION });
    get().restart();
  },

  setPunctuationModeDisabled: () => {
    set({ punctuation: PUNCTUATION_MODE.DISABLED });
    get().restart();
  },

  setPunctuationModeNumbers: () => {
    set({ punctuation: PUNCTUATION_MODE.NUMBERS });
    get().restart();
  },

  appendWords: (word) => {
    set((state) => ({ words: state.words + word }));
  },

  deleteWords: () => {
    set((state) => ({ words: state.words.slice(0, -1) }));
  },
}));
