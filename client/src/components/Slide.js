import React from "react";
import { Line } from "rc-progress";
import ReactMarkdown from "react-markdown";

const Slide = ({ markDownString, slidesLength, slideNum }) => {
  return (
    <>
      <section className="slides-container">
        <Line
          percent={(slideNum / (slidesLength - 1)) * 100}
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
    </>
  );
};

export default Slide;
