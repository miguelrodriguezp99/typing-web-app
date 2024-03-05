import { useCallback, useState } from "react";
import "./Modal.css";
import { Bell } from "../../assets/icons/HeaderIcons";
import {
  Announcement,
  Notification,
} from "../../assets/icons/NotificationModal";

export default function NotificationModal() {
  const [modal, setModal] = useState(false);
  const [animationClass, setAnimationClass] = useState("");
  const [backgroundClass, setBackgroundClass] = useState("");

  // Necesitamos hacer un timeout para poder hacer la animacion de salida sin que desaparezca el modal de golpe
  const closeModal = useCallback(() => {
    setAnimationClass("modalOut");
    setBackgroundClass("");
    // Aplica la clase para animar hacia fuera
    setTimeout(() => {
      setBackgroundClass(
        "animate-fade animate-once animate-duration-300 animate-ease-linear animate-reverse animate-fill-both"
      );
    }, 10);

    // Aplica la clase para animar el fondo
    setTimeout(() => {
      setModal(false);
      setAnimationClass("");
      setBackgroundClass("");
    }, 300);
  }, []);

  const toggleModal = useCallback(() => {
    if (modal) {
      closeModal();
    } else {
      setModal(true);
      setAnimationClass("translated"); // Clase para animar hacia dentro
      setBackgroundClass(
        "animate-fade animate-once animate-duration-300 animate-ease-linear animate-fill-both"
      );
    }
  }, [modal, closeModal]);

  return (
    <>
      <div className="flex flex-row gap-1 justify-center text-center items-center">
        <button onClick={toggleModal} className="p-3 group">
          <p className="text-iconstext group-hover:text-secondary-hover">
            <Bell props="fill-iconstext w-6 h-6 hover:fill-iconstext-hover animation-all duration-300" />
          </p>
        </button>
      </div>

      {modal && (
        <>
          <div
            onClick={toggleModal}
            className={`bg-[#0d0d0e] zindex bg-opacity-80 w-full h-full top-0 left-0 right-0 bottom-0 fixed ${backgroundClass}`}
          ></div>
          <div
            className={`fixed bg-primary w-[382px] right-0 h-screen top-0 rounded-l-xl ${animationClass} zindex`}
          >
            <section className="bg-primary cursor-pointer rounded-xl px-10 py-6">
              <h2 className="text-2xl mb-5 text-iconstext flex gap-3 items-center justify-start">
                <Announcement props="fill-iconstext w-6 h-6 " />
                Announcements
              </h2>
              <div className="flex items-center mx-auto p-3 justify-center align-center">
                <p className="text-iconstext-hover">Nothing to show</p>
              </div>
            </section>
            <div className="w-[80%] h-[4px] bg-tertiary flex mx-auto rounded-full mt-10"></div>

            <section className="bg-primary cursor-pointer rounded-xl px-10 py-6">
              <h2 className="text-2xl mb-5 text-iconstext flex gap-3 items-center justify-start">
                <Notification props="fill-iconstext w-6 h-6" />
                Notifications
              </h2>
              <div className="flex items-center mx-auto p-3 justify-center align-center">
                <p className="text-iconstext-hover">Nothing to show</p>
              </div>
            </section>
          </div>
        </>
      )}
    </>
  );
}
