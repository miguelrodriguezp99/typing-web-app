import { useEffect, useRef } from "react";
import useTyping from "./../../hooks/useTyping";
import { useWordsStore } from "../../store/useWords";
import Results from "./../../components/Results";
import useMouseOut from "./../../hooks/useMouseOut";
import TypeArea from "./../../components/TypeArea";
import Options from "../../components/GameModeOptions/Options";
import useMobileOptions from "../../hooks/useMobileOptions";
import MobileOptions from "../../components/GameModeOptions/MobileOptions";
import useGameEnd from "../../hooks/useGameEnd";

function App() {
  const { setWords, incrementCursor } = useWordsStore();
  const { setFocusedTrue, setTypedInput, typed } = useWordsStore();
  const inputRef = useRef(null);

  //Handle mouse out of the window
  useMouseOut();

  //Start typing action
  const { handleWrite } = useTyping();

  //useGameEnd
  useGameEnd();

  //Hook to change UI if mobile or not
  const { isMobile } = useMobileOptions();

  useEffect(() => {
    setWords();
  }, [setWords]);

  //Initialize focus on input to be able to write without clicking
  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  const handleSetFocusedTrue = (e) => {
    e.stopPropagation();
    setFocusedTrue();
    if (inputRef?.current !== null) inputRef.current?.focus();
  };

  return (
    <>
      <section
        className="bg-primary tracking-wider font-mono md:px-10 
        sm:px-5 px-2 mx-auto lg:max-w-[1310px] h-auto"
        onClick={(e) => handleSetFocusedTrue(e)}
      >
        <input
          type="text"
          className="absolute opacity-5 h-[1px] w-[1px] left-[-10000px]"
          ref={inputRef}
          value={typed}
          onChange={(e) => handleWrite(e)}
        />
        {isMobile ? <MobileOptions /> : <Options />}
        <Results />
        <TypeArea inputRef={inputRef} />
      </section>
    </>
  );
}

export default App;
