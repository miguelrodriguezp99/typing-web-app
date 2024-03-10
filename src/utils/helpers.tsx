import { GAME_MODE } from "./constants";

export const isKeyboardCodeAllowed = (code: string) => {
    return (
        code.startsWith("Key") || // Cubre las teclas alfabéticas
        code.startsWith("Digit") || // Cubre los números
        code.startsWith("Arrow") || // Incluye las teclas de flecha
        code === "Backspace" || // La tecla de borrar
        code === "Space" || // La barra espaciadora
        code === "Enter" || // La tecla Enter
        code.startsWith("Numpad") || // Teclas del teclado numérico
        code === "Tab" || // Tecla Tabulador
        code.startsWith("Shift") || // Teclas Shift
        code.startsWith("Control") || // Teclas Control
        code.startsWith("Alt") || // Teclas Alt
        code === "Escape" // Tecla Escape
    );
};

// Calcular kps y WPM
export const calculatekpsandWPM = (typedLength: number, timeUsed: number, words: string) => {
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

export const calculateAccuracy = (typed: string, errors: number) => {
    const accuracy = Math.ceil(
        ((typed.length - errors) / typed.length) * 100
    );
    return accuracy;
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