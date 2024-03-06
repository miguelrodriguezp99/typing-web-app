import { useRef } from "react";
import { useWordsStore } from "../store/useWords";
import Caret from "./Caret";
import cn from "classnames";
import useTranslate from "../hooks/useTranslate";
import "./../styles/blur.css";

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
  const isCorrect = typed === expected;
  const isWhiteSpace = expected === " ";

  return (
    <span
      className={cn({
        "text-error": !isCorrect && !isWhiteSpace,
        "text-text": isCorrect && !isWhiteSpace,
        "text-error/50": !isCorrect && isWhiteSpace,
      })}
    >
      {expected}
    </span>
  );
};

export default UserWords;
