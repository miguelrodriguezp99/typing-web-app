import { useRef } from "react";
import { useWordsStore } from "../store/useWords";
import Caret from "./Caret";
import cn from "classnames";
import useTranslate from "../hooks/useTranslate";
import "./../styles/blur.css";
import { GAME_MODE } from "../utils/constants";

const UserWords = () => {
  const { typed, words, isFocused } = useWordsStore();
  const typedCharacters = typed.split("");

  const ref = useRef(null);
  const { translateY } = useTranslate(ref);
  return (
    <>
      <div className="max-h-[160px] overflow-y-hidden">
        <div
          ref={ref}
          className={`absolute inset-0 text-primary ${
            !isFocused ? "blured" : ""
          } `}
          style={{
            transform: `translateY(${translateY}px)`,
            transition: "transform 0.3s linear",
          }}
        >
          {typedCharacters.map((char, index) => (
            <Character
              key={`${char}_${index}`}
              typed={char}
              expected={words[index] ? words[index] : " "}
            />
          ))}
          <Caret />
        </div>
      </div>
    </>
  );
};

const Character = ({ typed, expected }) => {
  const { gameMode } = useWordsStore();

  const isCorrectFunc = (typed, expected) => {
    if (gameMode === GAME_MODE.ZEN) {
      return true;
    }
    return typed === expected;
  };

  const isCorrect = isCorrectFunc(typed, expected);
  const isWhiteSpace = expected === " ";

  return gameMode !== GAME_MODE.ZEN ? (
    <span
      className={cn({
        "text-error": !isCorrect && !isWhiteSpace,
        "text-text": isCorrect && !isWhiteSpace,
        "text-error/50": !isCorrect && isWhiteSpace,
      })}
    >
      {expected}
    </span>
  ) : (
    <span className="text-text">{typed}</span>
  );
};

export default UserWords;
