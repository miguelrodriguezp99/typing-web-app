import { useEffect } from "react";
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
  const { setWords, actualState } = useWordsStore();

  console.log("actualState", actualState);

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
  const { setFocusedTrue } = useWordsStore();

  const handleSetFocusedTrue = (e) => {
    e.stopPropagation();
    setFocusedTrue();
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
      {children}
    </section>
  );
};

export default App;
