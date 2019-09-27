import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import Hotkeys from "react-hot-keys";
import { Line } from "rc-progress";

const Slide = () => {
  const [input, setInput] = useState({
    slideNum: 0,
    markDownStrings: [
      "# Pros of framework \n\n - Easy to learn \n\n - Reuseable Components \n\n - Virtual DOM \n\n - React Tools \n\n - Code is more stable because of one way data flow \n\n - Strong Community",
      "# Cons of framework \n\n - Outdated Documentation for some libraries and packages \n\n - Overkill for smaller projects \n\n - HTML in Javascript code \n\n - Can be a steep learning curve \n\n - Frequent updates makes maintaining code frustrating",
      "# Architecture of the application",
      "# Design Consideration \n\n - Look and Feel for the App \n\n - Design for the slides  \n\n - Color Choices \n\n - Font Choice",
      "# Challenges \n\n - Figuring out how to parse markdown \n\n - Layout for the slides \n\n - Backend Setup \n\n - Saving and Editing ",
      "# Takeaways \n\n - Breaking things down into pieces makes implementation easier \n\n - Understanding different markdown elements",
      "# The End"
    ]
  });

  const { slideNum, markDownStrings } = input;

  const parseArr = val => {
    if (
      (slideNum === 0 && (val === -1 || val === "a")) ||
      (slideNum === markDownStrings.length - 1 && (val === 1 || val === "s"))
    ) {
      setInput({ ...input, slideNum });
    } else if (val === 1 || val === "s") {
      setInput({ ...input, slideNum: slideNum + 1 });
    } else if (val === -1 || val === "a") {
      setInput({ ...input, slideNum: slideNum - 1 });
    }
  };

  return (
    <>
      <div className="navigation-container">
        <section className="button-container">
          <button className="btn">Edit</button>
          <button className="btn">Save</button>
        </section>
        <section className="arrow-container">
          <i className="fas fa-arrow-left" onClick={() => parseArr(-1)}></i>
          <i className="fas fa-arrow-right" onClick={() => parseArr(1)}></i>
        </section>
      </div>
      <Hotkeys
        keyName="a,s"
        onKeyDown={keyName => parseArr(keyName)}
        onKeyUp={parseArr}>
        <section className="slides-container">
          <Line
            percent={(slideNum / (markDownStrings.length - 1)) * 100}
            strokeWidth="1"
            strokeColor="#F36C1C"
            trailColor="#ffffff"
          />
          <ReactMarkdown
            className="slides"
            source={markDownStrings[slideNum]}
          />
          <footer>
            <p className="">React Framework</p>
            <p className="white page-number">{slideNum + 1}</p>
          </footer>
        </section>
      </Hotkeys>
    </>
  );
};

export default Slide;
