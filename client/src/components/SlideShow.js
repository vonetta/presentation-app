import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import GridLoader from "react-spinners/GridLoader";
import { css } from "@emotion/core";
import { getAllSlides } from "../routes/slideRoutes";
import Slide from "./Slide";
import Arrows from "./Arrows";

const SlideShow = () => {
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
          <p className="center">
            To move forward in slides press the 's' or '2' key.
          </p>
          <p className="center">
            To move backward in slides press 'a' or '1' key.
          </p>
          <Arrows
            slideNum={slideNum}
            slides={slides}
            input={input}
            setInput={setInput}
          />

          <Slide
            markDownString={markDownString}
            slidesLength={slides.length}
            slideNum={slideNum}
          />
        </>
      )}
    </>
  );
};

export default withRouter(SlideShow);
