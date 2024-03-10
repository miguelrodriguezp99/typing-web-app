import React, { useEffect, useRef } from "react";
import Timer from "./Timer";
import RandomWords from "./RandomWords";
import UserWords from "./UserWords";
import BlurEffect from "./BlurEffect";
import { useWordsStore } from "../store/useWords";
import "./../styles/blur.css";
import useTyping from "../hooks/useTyping";

const TypeArea = () => {
  const { actualState } = useWordsStore();
  const inputRef = useRef(null);
  const handleDivClick = () => {
    if (inputRef?.current !== null) inputRef.current?.focus(); // Enfoca el campo de entrada para abrir el teclado
  };

  // Test for android keyboard
  const { keyDownHandler } = useTyping();

  useEffect(() => {
    // Asegúrate de que el input existe
    const element = inputRef.current;
    if (!element) return;

    if (actualState === "FINISHED") {
      element.removeEventListener("keydown", keyDownHandler);
    } else {
      element.addEventListener("keydown", keyDownHandler);
    }

    return () => {
      element.removeEventListener("keydown", keyDownHandler);
    };
  }, [keyDownHandler, actualState, inputRef]);
  // -----------------------------

  return (
    <>
      <div
        className={`
          h-[calc(100vh-380px)] sm:h-[calc(100vh-378px)] sm:min-h-[300px]
          mt-[50px] sm:mt-[75px] md:mt-[100px] 
          animate-fade animate-once 
          animate-duration-[800ms] animate-normal 
          animate-fill-both ${actualState === "FINISHED" ? "hidden" : ""}`}
        onClick={handleDivClick}
      >
        <input
          type="text"
          className="absolute opacity-0"
          ref={inputRef}
          aria-hidden="true"
        />
        <Timer />
        <WordsContainer>
          <RandomWords />
          <UserWords />
          <BlurEffect />
        </WordsContainer>
      </div>
    </>
  );
};

const WordsContainer = ({ children }) => {
  return (
    <div
      className="flex relative text-2xl max-w-6xl leading-relaxed 
    mx-auto break-keep max-h-[160px] overflow-y-hidden"
    >
      {children}
    </div>
  );
};

export default TypeArea;
