import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import ReactMarkdown from "react-markdown";
import Hotkeys from "react-hot-keys";
import { Line } from "rc-progress";

import { getAllSlides } from "./../routes/slideRoutes";

const Slide = props => {
  const [slides, setSlides] = useState([]);
  const [input, setInput] = useState({
    slideNum: 0,
    markDownString: ""
  });

  const { slideNum, markDownString } = input;

  useEffect(() => {
    const allSlides = async () => {
      const slidesList = await getAllSlides();
      console.log(slidesList);
      await setSlides(slidesList);
      await setInput({ ...input, slideNum, markDownString: slides[slideNum] });
    };

    allSlides();
  }, []);

  const edit = val => {
    props.history.push({
      pathname: "/edit",
      state: { val }
    });
  };

  const parseArr = val => {
    if (
      (slideNum === 0 && (val === -1 || val === "a")) ||
      (slideNum === slides.length - 1 && (val === 1 || val === "s"))
    ) {
      setInput({
        ...input,
        slideNum,
        markDownString: slides[slideNum].text
      });
    } else if (val === 1 || val === "s") {
      setInput({
        ...input,
        slideNum: slideNum + 1,
        markDownString: slides[slideNum + 1].text
      });
    } else if (val === -1 || val === "a") {
      setInput({
        ...input,
        slideNum: slideNum - 1,
        markDownString: slides[slideNum - 1].text
      });
    }
  };

  return (
    <>
      <div className="navigation-container">
        <section className="button-container">
          <button className="btn" onClick={() => edit(slides[slideNum])}>
            Edit
          </button>
          <button className="btn">New Slide</button>
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
            percent={(slideNum / (slides.length - 1)) * 100}
            strokeWidth="1"
            strokeColor="#F36C1C"
            trailColor="#ffffff"
          />
          <ReactMarkdown className="slides" source={markDownString} />
          <footer>
            <p className="">React Framework</p>
            <p className="white page-number">{slideNum + 1}</p>
          </footer>
        </section>
      </Hotkeys>
    </>
  );
};

export default withRouter(Slide);
