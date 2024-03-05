import { useWordsStore } from "../store/words";
import "../styles/Caret.css";

const Caret = () => {
  const { isFocused } = useWordsStore();
  return (
    <div
      className={`${
        isFocused ? "caret" : "hidden"
      } w-0.5 h-6 bg-secondary relative  inline-block `}
    >
      <div className="bg-secondary w-full h-full absolute mt-2"></div>
    </div>
  );
};

export default Caret;
