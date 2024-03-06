import { useCallback, useEffect, useState } from "react";
import "./Modal.css";
import { useSoundsStore } from "../../store/sounds";
import { SOUND_MAP, getSoundName } from "../../sound/sound";
import { Volume, VolumeSilence } from "../../assets/icons/FooterIcons";

export default function SoundModal() {
  const [modal, setModal] = useState(false);
  const [actualNameSong, setActualNameSong] = useState("cherry");
  const { setCurrentSound, muted, setMuteOn, setMuteOff } = useSoundsStore();
  const [animationClass, setAnimationClass] = useState("");

  //Sound local Storage
  useEffect(() => {
    const mutedLocal = localStorage.getItem("muted");
    if (mutedLocal === "true") {
      setMuteOn();
    }
  }, [setMuteOff, setMuteOn]);

  const handleToggleMute = () => {
    if (muted) {
      setMuteOff();
      localStorage.setItem("muted", "false");
    } else {
      setMuteOn();
      localStorage.setItem("muted", "true");
    }
  };

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

  const switchSound = useCallback(
    (sound) => {
      return () => {
        setCurrentSound(sound);
        setActualNameSong(getSoundName(sound));
        toggleModal();
        localStorage.setItem("sound", sound);
      };
    },
    [setCurrentSound, toggleModal, setActualNameSong]
  );

  return (
    <>
      <div className="flex flex-row gap-1 justify-center text-center items-center">
        {muted ? (
          <button onClick={handleToggleMute} className="select-none">
            <VolumeSilence props="fill-iconstext w-4 h-4 hover:fill-iconstext-hover transition-all duration-300" />
          </button>
        ) : (
          <button onClick={handleToggleMute} className="select-none ">
            <Volume props="fill-iconstext w-4 h-4 hover:fill-iconstext-hover transition-all duration-300" />
          </button>
        )}

        <button onClick={toggleModal} className="p-3 group">
          <p className="text-iconstext hover:text-iconstext-hover transition-all duration-300">
            {actualNameSong}
          </p>
        </button>
      </div>
      {modal && (
        <div
          className={`w-full h-full top-0 left-0 right-0 bottom-0 fixed
          ${animationClass}`}
        >
          <div
            onClick={toggleModal}
            className="bg-[#313131b3] opacity-75 w-full h-full top-0 left-0 right-0 bottom-0 fixed animate-none transition-none"
          ></div>
          <div className="modal-content bg-[#1a1919] rounded-xl text-secondary">
            <h2 className="mb-5">Select your sound!</h2>
            <div className="flex flex-col cursor-pointer">
              <button
                onClick={switchSound(SOUND_MAP["cherry"])}
                className="py-1 hover:bg-tertiary rounded-md text-iconstext 
                hover:text-secondary-hover transition-all duration-300"
              >
                cherry
              </button>
              <button
                onClick={switchSound(SOUND_MAP["typewriter"])}
                className="py-1 hover:bg-tertiary rounded-md text-iconstext 
                hover:text-secondary-hover transition-all duration-300"
              >
                typewriter
              </button>
              <button
                onClick={switchSound(SOUND_MAP["keyboard"])}
                className="py-1 hover:bg-tertiary rounded-md text-iconstext 
                hover:text-secondary-hover transition-all duration-300"
              >
                keyboard
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
