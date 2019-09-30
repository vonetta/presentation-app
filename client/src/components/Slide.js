import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import ReactMarkdown from "react-markdown";
import Hotkeys from "react-hot-keys";
import { Line } from "rc-progress";
import { css } from "@emotion/core";
import GridLoader from "react-spinners/GridLoader";

import { getAllSlides } from "./../routes/slideRoutes";

const Slide = props => {
  const [loading, setLoading] = useState(true);
  const [slides, setSlides] = useState([]);
  const [input, setInput] = useState({
    slideNum: 0,
    markDownString: ""
  });

  const { slideNum, markDownString } = input;

  const allSlides = async event => {
    const slidesList = await getAllSlides();
    await setSlides(slidesList);
    setInput({ ...input, slideNum, markDownString: slidesList[slideNum].text });
    await setLoading(false);
  };

  useEffect(() => {
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
      (slideNum === 0 && (val === -1 || val === "a" || val === "1")) ||
      (slideNum === slides.length - 1 &&
        (val === 1 || val === "s" || val === "2"))
    ) {
      setInput({
        ...input,
        slideNum,
        markDownString: slides[slideNum].text
      });
    } else if (val === 1 || val === "s" || val === "2") {
      setInput({
        ...input,
        slideNum: slideNum + 1,
        markDownString: slides[slideNum + 1].text
      });
    } else if (val === -1 || val === "a" || val === "1") {
      setInput({
        ...input,
        slideNum: slideNum - 1,
        markDownString: slides[slideNum - 1].text
      });
    }
  };

  const override = css`
    display: block;
    margin: 20% auto;
  `;

  return (
    <>
      {loading && (
        <GridLoader
          css={override}
          sizeUnit={"px"}
          size={15}
          color={"#f36b1c"}
          loading={loading}
        />
      )}
      {!loading && (
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
            keyName="a,s,1,2"
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
      )}
    </>
  );
};

export default withRouter(Slide);
