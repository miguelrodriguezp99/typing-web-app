import { faker } from "@faker-js/faker";

export const isKeyboardCodeAllowed = (code: string) => {
    return (
        code.startsWith("Key") ||
        code.startsWith("Digit") ||
        code === "Backspace" ||
        code === "Space"
    );
};

export const GenerateWords = (numberOfWords: number) => {
    return faker.word.words(numberOfWords);
}

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

