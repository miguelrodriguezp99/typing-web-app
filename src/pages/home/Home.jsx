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
  const { setWords } = useWordsStore();

  //Handle mouse out of the window
  useMouseOut();

  //Start typing action
  useTyping();

  //useGameEnd
  useGameEnd();

  //Hook to change UI if mobile or not
  const { isMobile } = useMobileOptions();

  useEffect(() => {
    setWords();
  }, [setWords]);

  return (
    <>
      <BlurWrapper>
        {isMobile ? <MobileOptions /> : <Options />}
        <Results />
        <TypeArea />
      </BlurWrapper>
    </>
  );
}

export const BlurWrapper = ({ children }) => {
  const { setFocusedTrue, setTypedInput, typed } = useWordsStore();
  const inputRef = useRef(null);

  const handleSetFocusedTrue = (e) => {
    e.stopPropagation();
    setFocusedTrue();
    if (inputRef?.current !== null) inputRef.current?.focus();
  };

  const handleWrite = (e) => {
    e.preventDefault();
    setTypedInput(e.target.value);
  };

  return (
    <section
      className="bg-primary tracking-wider font-mono md:px-10 
      sm:px-5 px-2 mx-auto 
      lg:max-w-[1310px] 
      h-auto"
      /* h-[calc(100vh-236px)] sm:h-[calc(100vh-192px)] sm:min-h-[520px] " */
      onClick={(e) => handleSetFocusedTrue(e)}
    >
      <input
        type="text"
        className="absolute opacity-5 h-[1px] w-[1px] left-[-10000px]"
        ref={inputRef}
        aria-hidden="false"
        value={typed}
        onChange={(e) => handleWrite(e)}
      />
      {children}
    </section>
  );
};

export default App;
