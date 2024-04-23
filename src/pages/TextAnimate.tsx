import { useEffect, useState } from "react";
import { RandomReveal } from "react-random-reveal";
import { TypeAnimation } from "react-type-animation";
import CountUp from "react-countup";
import { TextLoop } from "react-text-loop-next";
import Marquee from "react-fast-marquee";

export default function TextAnimate() {
  const [isPlaying, setIsPlaying] = useState(true);
  useEffect(() => {
    document.body.onkeyup = function (e) {
      if (e.keyCode === 32) {
        setIsPlaying((playing) => !playing);
      }
    };
  }, []);

  return (
    <div className="flex justify-center items-center w-screen h-screen text-2xl">
      <section className="text-center">
        {/* ------------------------------------------- */}
        <TypeAnimation
          sequence={[
            "Text Animate",
            1000,
            "Text stimulate",
            2000,
            "React Type Animation",
            3000,
            "",
          ]}
          repeat={Infinity}
          style={{
            fontSize: "2em",
            fontFamily: "sans-serif",
            color: "red",
          }}
        />
        <br />
        <br />
        {/* ------------------------------------------ */}
        <div className="text-3xl text-blue-600">
          <RandomReveal
            isPlaying
            duration={4}
            characters={"React Random Reveal"}
            revealDuration={1.6}
            onComplete={() => ({ shouldRepeat: true, delay: 1 })}
          />
        </div>
        <div className="text-8xl">
          <RandomReveal
            isPlaying
            duration={5}
            updateInterval={0.1}
            revealDuration={0.5}
            characterSet={[
              "🍇",
              "🍑",
              "🍒",
              "🍎",
              "🍓",
              "🥦",
              "🍅",
              "🥑",
              "🥕",
              "🍐",
              "🍆",
              "🍌",
            ]}
            characters={["🍒", "🍒", "🍒"]}
            onComplete={() => ({ shouldRepeat: true, delay: 3 })} //<--- loop
          />
        </div>
        <div className="text-4xl text-red-500">
          You are so&nbsp;
          <span className="text-blue-500">
            <RandomReveal
              isPlaying={isPlaying}
              duration={Infinity}
              revealDuration={0}
              updateInterval={0.22}
              characterSet={[
                "adaptable",
                "adventurous",
                "affectionate",
                "ambitious",
                "amiable",
                "compassionate",
                "courageous",
                "courteous",
                "diligent",
                "frank",
                "generous",
                "intuitive",
                "passionate",
                "philosophical",
                "reliable",
                "sympathetic",
                "sensible",
              ]}
              characters=" "
            />
          </span>
        </div>
        <br />
        <br />
        {/* ------------------------------------------ */}
        <CountUp
          duration={5}
          start={20}
          end={1000}
          style={{ fontSize: "3em", color: "green" }}
        />
        <br />
        <br />
        {/* ------------------------------------------ */}
        <h1 className="text-3xl">
          <TextLoop>
            <span className="text-blue-600">First item</span>
            <a href="/" className="text-green-500">
              Second item
            </a>
            <p style={{ color: "red" }}>Third item</p>
          </TextLoop>{" "}
          and something else.
        </h1>
        <TextLoop
          children={[
            "Trade faster",
            "Increase sales",
            "Stock winners",
            "Price perfectly",
          ]}
        />
        <TextLoop interval={100}>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
        </TextLoop>
        <br />
        <TextLoop springConfig={{ stiffness: 180, damping: 8 }}>
          <p>qqqqqq</p>
          <p>aaaaaa</p>
          <p>zzzzzz</p>
        </TextLoop>

        <br />
        <br />
        {/* ------------------------------------------ */}
        <Marquee style={{ color: "orange" }} speed={200}>
          I can be a React component, multiple React components, or just some
          text.
        </Marquee>
      </section>
    </div>
  );
}
