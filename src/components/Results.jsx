import { useWordsStore } from "../store/words";
import cn from "classnames";
import {
  Ad,
  Danger,
  History,
  Next,
  Replay,
  Restart,
  Screenshot,
} from "../assets/icons/ResultsIcon";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import ChartComp from "./Chart/Chart";

//import "../styles/Results.css";

const Results = () => {
  const { errors, actualState, restart, typed } = useWordsStore();

  const handleClick = () => {
    restart();
  };

  const takeScreenshot = () => {
    // const animationClasses = "animate-fade animate-once animate-duration-[800ms] animate-normal animate-fill-both";
    const element = document.getElementById("main-info-info");
    if (!element) return;
    element.classList.remove("animate-duration-[800ms]");
    element.classList.add("animate-duration-[0ms]");

    setTimeout(() => {
      html2canvas(element, {
        logging: true, // Para depuración, muestra mensajes en la consola
        useCORS: true, // Permite cargar recursos externos dentro del canvas
        width: window.innerWidth, // Captura el ancho completo del viewport
        height: window.innerHeight, // Captura el alto completo del viewport

        scrollX: 0, // Ajustes de desplazamiento, si es necesario
        scrollY: 0, // Ajustes de desplazamiento, si es necesario
        // Puedes ajustar scale según sea necesario para mejorar la calidad o el rendimiento
      })
        .then((canvas) => {
          // element.classList.add(...animationClasses.split(" "));
          canvas.toBlob((blob) => {
            try {
              navigator.clipboard
                .write([
                  new ClipboardItem({
                    "image/png": blob,
                  }),
                ])
                .then(() => {
                  toast.success("Screenshot copied to clipboard");
                })
                .catch((err) => {
                  toast.error("Error copying screenshot to clipboard");
                });
            } catch (error) {
              toast.error("Error copying screenshot to clipboard");
            }
          });
        })
        .catch((error) => toast.error("Error copying screenshot to clipboard"));

      //element.classList.add(...animationClasses.split(" "));
      element.classList.remove("animate-duration-[0ms]");
      element.classList.add("animate-duration-[800ms]");
    }, 500);
  };

  return (
    <>
      <section
        id="main-info-info"
        className={cn({
          "sm:max-w-[1152px] align-center justify-center mx-auto mt-10 bg-primary h-[1000px] sm:h-[300px]": true,
          "animate-fade animate-once animate-duration-[800ms] animate-normal animate-fill-both h-full":
            actualState === "FINISHED",
          hidden: actualState !== "FINISHED",
        })}
      >
        <div id="main-info" className="flex w-full">
          <div className="bg-primary flex flex-col p-1">
            <div className="">
              <div className="text-3xl text-iconstext">wpm</div>
              <div className="text-6xl text-secondary">129</div>
            </div>
            <div className="">
              <div className="text-3xl text-iconstext">acc</div>
              <div className="text-6xl text-secondary">100%</div>
            </div>
          </div>
          <ChartComp />
        </div>

        <div className="flex flex-col bg-primary sm:flex-row justify-between p-1 text-xl mt-3">
          <div className="">
            <div className="text-iconstext">test type</div>
            <div className="text-secondary">words 10 english</div>
          </div>
          <div>
            <div className="text-iconstext">other</div>
            <div className="text-secondary">repeated</div>
          </div>
          <div>
            <div className="text-iconstext">raw</div>
            <div className="text-secondary text-3xl">129</div>
          </div>
          <div>
            <div className="text-iconstext">characters</div>
            <div className="text-secondary text-3xl">
              {typed.length - errors}/{errors}/0/0
            </div>
          </div>
          <div>
            <div className="text-iconstext">consistency</div>
            <div className="text-secondary text-3xl">84%</div>
          </div>
          <div>
            <div className="text-iconstext">time</div>
            <div className="text-secondary text-3xl">5s</div>
          </div>
        </div>

        <div className="bg-primary flex mt-6">
          <div className="flex mx-auto gap-20 p-1">
            <button>
              <Next props="w-[24px] h-[24px] fill-iconstext" />
            </button>
            <button onClick={handleClick}>
              <Restart props="w-[20px] h-[20px] fill-iconstext stroke-iconstext stroke-10 hover:stroke-iconstext-hover hover:fill-iconstext-hover" />
            </button>
            <button>
              <Danger props="w-[24px] h-[24px] fill-iconstext bg-primary " />
            </button>
            <button>
              <History props="w-[24px] h-[24px] fill-iconstext" />
            </button>
            <button>
              <Replay props="w-[20px] h-[20px] fill-iconstext" />
            </button>
            <button onClick={takeScreenshot}>
              <Screenshot props="w-[20px] h-[20px] fill-iconstext hover:fill-iconstext-hover transition-all duration-300" />
            </button>
          </div>
        </div>
        <div className="mx-auto text-center bg-primary text-iconstext mt-5">
          Login in to save your information
        </div>
        <div className="flex items-center mx-auto bg-tertiary w-[700px] h-[90px] align-center justify-center mt-5">
          <Ad props="w-[56px] h-[56px] fill-iconstext" />
        </div>
      </section>
    </>
  );
};

export default Results;
