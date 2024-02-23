import { useState } from "react";
import BG from "../assets/heroes/BG.png";
import BG1 from "../assets/heroes/BG1.jpg";
import spider from "../assets/heroes/spider-man.png";
import marvel from "../assets/heroes/MARVEL Vector.svg";
import dc_1977 from "../assets/heroes/DC-2005-2012.png";
import logoS from "../assets/heroes/logoSpiN.svg";
import logoH from "../assets/heroes/logoSpiH.svg";
import logoC from "../assets/heroes/logoSpiC.svg";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

export default function Homepage() {
  const [hoveredImage, setHoveredImage] = useState(logoS);

  return (
    <>
      <div className="">
        <img src={BG} alt="background" className="z-0 hidden lg:block" />
        <img src={BG1} alt="background" className="z-0 lg:hidden h-screen" />
        <figure className="absolute inset-0 bg-cover bg-no-repeat lg:bg-gray-700 mix-blend-overlay"></figure>
        <main className="absolute inset-0 bg-cover bg-no-repeat">
          <nav className="px-20 py-5 flex items-center gap-10">
            <img
              src={hoveredImage}
              width={60}
              alt="logo spidy"
              onMouseEnter={() => setHoveredImage(logoH)}
              onMouseLeave={() => setHoveredImage(logoS)}
              onClick={() => setHoveredImage(logoC)}
              className="transition-all duration-300 cursor-pointer"
            />
            <img src={marvel} alt="logo marvel" />
            <img src={dc_1977} width={60} alt="logo dc 1977" />
          </nav>
          <section className="flex flex-col lg:flex-row justify-center items-center">
            <div className="text-white gap-4 lg:gap-0 lg:w-3/4 flex flex-col justify-center items-center px-10 lg:px-28">
              <TypeAnimation
                sequence={[
                  "The God",
                  1000,
                  "strong",
                  2000,
                  "powerful",
                  2000,
                  " ",
                ]}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
                style={{
                  fontSize: "2em",
                  display: "inline-block",
                  fontFamily: "sans-serif",
                }}
              />
              <h1 className="text-7xl lg:text-[180px] leading-none font-spider-man">
                SUPERHEROES
              </h1>
              <h1 className="text-5xl lg:text-9xl font-spider-man">academy</h1>
              <p className="font-Montserrat-Alternates font-semibold lg:text-lg">
                This isn’t the Spider-Man you’ve met or ever seen before. In
                Marvel’s Spider-Man Remastered, we meet an experienced Peter
                Parker who’s more masterful at fighting big crime in New York
                City. At the same time, he’s struggling to balance his chaotic
                personal life and career while the fate of Marvel’s New York
                rests upon his shoulders.
              </p>
              <Link
                to={"/heroes"}
                className="bg-[#C3161A] border border-[#C3161A] py-2 px-7 transform -skew-x-12 hover:bg-red-600 hover:border hover:border-white mt-10 transition-colors duration-300"
              >
                SUPERHERO LIST
              </Link>
            </div>
            <img src={spider} alt="spider man" className="hidden lg:block" />
          </section>
        </main>
      </div>
    </>
  );
}
