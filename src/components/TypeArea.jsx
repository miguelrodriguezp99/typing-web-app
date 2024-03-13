import Timer from "./Timer";
import RandomWords from "./RandomWords";
import UserWords from "./UserWords";
import BlurEffect from "./BlurEffect";
import { useWordsStore } from "../store/useWords";
import "./../styles/blur.css";

const TypeArea = ({ inputRef }) => {
  const { actualState } = useWordsStore();

  return (
    <>
      <section
        className={`
          h-[calc(100vh-380px)] sm:h-[calc(100vh-378px)] sm:min-h-[300px] mt-[50px] sm:mt-[75px] md:mt-[100px] 
          animate-fade animate-once animate-duration-[800ms] animate-normal animate-fill-both 
          ${actualState === "FINISHED" ? "hidden" : ""}`}
      >
        <Timer />
        <WordsContainer>
          <RandomWords />
          <UserWords />
          <BlurEffect inputRef={inputRef} />
        </WordsContainer>
      </section>
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
