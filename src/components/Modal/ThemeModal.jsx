import { useCallback, useEffect, useState } from "react";
import "./Modal.css";
import { Palette } from "../../assets/icons/FooterIcons";
import Theme from "../Theme";
export default function ThemeModal() {
  const [modal, setModal] = useState(false);
  const [oldTheme, setOldTheme] = useState("dark");
  const [currentTheme, setCurrentTheme] = useState("dark");
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      setCurrentTheme(theme);
      document.documentElement.classList.add(theme);
    }
  }, []);

  const closeModal = useCallback(() => {
    setAnimationClass("");
    setTimeout(() => {
      setAnimationClass(
        "animate-fade-up animate-once animate-duration-300 animate-ease-out animate-reverse "
      );
    }, 10);

    setTimeout(() => {
      setModal(false);
      setAnimationClass("");
    }, 300);
  }, []);

  const toggleModal = useCallback(() => {
    if (modal) {
      closeModal();
    } else {
      setModal(true);
      setAnimationClass(
        "animate-fade-up animate-once animate-duration-300 animate-ease-out animate-normal"
      );
    }
  }, [modal, closeModal]);

  // Initial theme
  useEffect(() => {
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.add("light");
  }, []);

  const switchTheme = useCallback(
    (theme) => {
      return () => {
        const root = document.documentElement;
        root.classList.remove(oldTheme);
        root.classList.add(theme);
        localStorage.setItem("theme", theme);
        setOldTheme(theme);
        setCurrentTheme(theme);
        toggleModal();
      };
    },
    [oldTheme, toggleModal]
  );

  const mouseEnter = (theme) => {
    const root = document.documentElement;
    root.classList.remove(oldTheme);
    root.classList.add(theme);
  };

  const mouseLeave = (theme) => {
    const root = document.documentElement;
    root.classList.remove(theme);
    root.classList.add(oldTheme);
  };

  return (
    <>
      <button onClick={toggleModal} className="p-3">
        <div className="flex flex-row gap-1 justify-center text-center items-center group">
          <Palette props="w-5 h-5 fill-iconstext group-hover:fill-iconstext-hover transition-all duration-300 mt-1" />
          <p className="text-iconstext group-hover:text-iconstext-hover transition-all duration-300">
            {currentTheme}
          </p>
        </div>
      </button>

      {modal && (
        <div
          className={`w-full h-full top-0 left-0 right-0 bottom-0 fixed zindex
        ${animationClass}`}
        >
          <div
            onClick={toggleModal}
            className="bg-[#313131b3] opacity-75 w-full h-full top-0 left-0 right-0 bottom-0 fixed"
          ></div>
          <div className="modal-content bg-[#1a1919]  rounded-xl text-secondary zmodal">
            <h2 className="mb-5">Select your theme!</h2>
            <div className="flex flex-col gap-2 cursor-pointer">
              <Theme
                themeName="dark"
                switchTheme={switchTheme}
                mouseEnter={mouseEnter}
                mouseLeave={mouseLeave}
              />
              <Theme
                themeName="light"
                switchTheme={switchTheme}
                mouseEnter={mouseEnter}
                mouseLeave={mouseLeave}
              />
              <Theme
                themeName="vscode"
                switchTheme={switchTheme}
                mouseEnter={mouseEnter}
                mouseLeave={mouseLeave}
              />
              <Theme
                themeName="trance"
                switchTheme={switchTheme}
                mouseEnter={mouseEnter}
                mouseLeave={mouseLeave}
              />
              <Theme
                themeName="eva-04"
                switchTheme={switchTheme}
                mouseEnter={mouseEnter}
                mouseLeave={mouseLeave}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
