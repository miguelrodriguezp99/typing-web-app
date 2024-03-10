import { GAME_MODE } from "./constants";

export const isKeyboardCodeAllowed = (code: string) => {
    return (
        code.startsWith("Key") ||
        code.startsWith("Digit") ||
        code === "Backspace" ||
        code === "Space"
    );
};


export const calculateErrors = (userWords: string, words: string) => {
    let errors = 0;
    // Split the words into characters if we can
    if (userWords.length <= 0 || words.length <= 0) return;

    let userChars = userWords.split("");
    let wordsChars = words.split("");

    userChars.forEach((char, index) => {
        if (char !== wordsChars[index]) {
            errors++;
        }
    });
    return errors;
};


export const getTestType = (gameMode: string, numberOfWords: string, timeSelected: string) => {
    if (gameMode === GAME_MODE.TIME) {
        return `time ${timeSelected} english`;
    } else {
        return `words ${numberOfWords} english`;
    }
}