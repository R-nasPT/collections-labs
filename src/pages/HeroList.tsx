import { useEffect, useState } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
// picture
import marvel from "../assets/heroes/MARVEL Vector.svg"
import DC from "../assets/heroes/DC-2005-2012.png"
import true1 from "../assets/heroes/green-lantern.png"
import false1 from "../assets/heroes/captain-america.png"
import defaultImg from "../assets/heroes/all.webp"
import blackspi from "../assets/heroes/black-spi.png";
import IronMan from "../assets/heroes/ironman1.jpg";
import wonder from "../assets/heroes/wonder.jpg";
import BlackPan from "../assets/heroes/Panther-Black.webp";
import Cap from "../assets/heroes/captain-america.jpg";
import thor from "../assets/heroes/thor1.png";
import Strange from "../assets/heroes/doctor-strange.jpg";
import BlackWidow from "../assets/heroes/black-widow.jpg";
import Deadpool from "../assets/heroes/deadpool1.jpg";
import Superman from "../assets/heroes/superman1.jpg";
import Batman from "../assets/heroes/batman.png";
import Flash from "../assets/heroes/flash.jpg";
import Aquaman from "../assets/heroes/Aquaman1.webp";
import Wolverine from "../assets/heroes/logan.jpg";
import DrFate from "../assets/heroes/drfate.jpg";
import Hawkman from "../assets/heroes/hm.jpg";
import MrFantastic from "../assets/heroes/Mr.Fantastic.jpg";
import HumanTorch from "../assets/heroes/Human Torch.jpg";
import Ikaris from "../assets/heroes/Ikaris1.jpg";
import StarLord from "../assets/heroes/Star-Lord.jpg";
import GreenLantern from "../assets/heroes/green-lantern.jpg";

type heroType = {
  _id: {$oid : string};
  name: string;
  real_name: string;
  powers: string[];
  affiliation: string;
  age: number;
  status: boolean;
  appearance: {
    height: number;
    weight: number;
  };
  universe: string;
};

export default function HeroList() {
  const [heroes, setHeroes] = useState<heroType[]>([]);

  console.log(heroes);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/hero_collection.json`);
        setHeroes(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const heroImages: Record<string, string> = {
    "Spider-Man": blackspi,
    "Iron Man": IronMan,
    "Wonder Woman": wonder,
    "Black Panther": BlackPan,
    "Captain America": Cap,
    "Thor": thor,
    "Doctor Strange": Strange,
    "Black Widow": BlackWidow,
    "Deadpool": Deadpool,
    "Superman": Superman,
    "Batman": Batman,
    "The Flash": Flash,
    "Aquaman": Aquaman,
    "Wolverine": Wolverine,
    "Doctor Fate": DrFate,
    "Hawkman": Hawkman,
    "Mr.Fantastic": MrFantastic,
    "Human Torch": HumanTorch,
    "Ikaris": Ikaris,
    "Star-Lord": StarLord,
    "Green Lantern": GreenLantern,
  };

  return (
    <>
    <div className="px-2 bg-[#1B2159] grid gap-10 lg:px-60 pb-20">
        <nav className="pt-10 text-white flex justify-between px-5">
          {/* <Link to={'/homepage'} className="bg-red-500 px-5 py-2 rounded-lg hover:bg-red-600">BACK</Link> */}
        </nav>
        {heroes.map((item: heroType) => (
          <article
            key={item._id.$oid}
            className="grid bg-[#121742] p-8 lg:p-10 rounded-3xl"
          >
            {item.universe === "Marvel" ? (
              <img src={marvel} alt="marvel" />
            ) : (
              <img src={DC} alt="marvel" className="w-14 lg:w-[70px]" />
            )}
            <div className="flex flex-col-reverse lg:flex-row gap-10 lg:px-10">
              <div className="lg:w-1/2 flex flex-col gap-12 items-center pt-12">
                <p className="text-red-500 text-center text-stroke text-7xl lg:text-9xl font-spider-man">
                  {item.name}
                </p>
                <div className="flex flex-col items-center gap-5">
                  {renderDetail({ label: "REAL NAME", value: item.real_name })}
                  {renderDetail({ label: "POWERS", value: item.powers.join(", ") })}
                  {renderDetail({ label: "AFFILIATION", value: item.affiliation })}
                  {renderDetail({ label: "AGE", value: item.age })}
                  {renderDetail({
                    label: "STATUS",
                    value:
                      item.status === true ? (
                        <img
                          width={30}
                          src={true1}
                          alt="status"
                          className="pt-3"
                        />
                      ) : (
                        <img
                          width={30}
                          src={false1}
                          alt="status"
                          className="pt-3"
                        />
                      ),
                  })}
                  <div className="flex flex-col items-center">
                    <p className="text-stroke text-sm font-sans">APPEARANCE</p>
                    <div className="flex gap-3">
                      <span className="text-stroke text-sm font-sans">
                        height :
                      </span>
                      <span className="text-red-400 font-semibold text-sm font-serif italic">
                        {item.appearance.height}
                      </span>
                      <span className="text-stroke text-sm font-sans">
                        weight :
                      </span>
                      <span className="text-red-400 font-semibold text-sm font-serif italic">
                        {item.appearance.weight}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {item.name && heroImages[item.name] ? (
                <img
                  src={heroImages[item.name]}
                  alt="profile"
                  className="lg:w-1/2 lg:h-[700px] h-96 rounded-2xl object-cover pt-3"
                />
                ) : (
                  <img
                    src={defaultImg}
                    alt="profile"
                    className="lg:w-1/2 lg:h-[700px] rounded-2xl object-cover"
                  />
                )}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

type DetailProps = {
  label: string;
  // value: string | number | boolean;
  value: unknown;
};

function renderDetail({ label, value }: DetailProps) {
  return (
    <div className="flex flex-col items-center">
      <p className="text-stroke text-sm font-sans">{label}</p>
      <p className="text-red-400 font-semibold text-sm font-serif italic">
        {value as React.ReactNode}
      </p>
    </div>
  );
}