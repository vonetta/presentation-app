import React from "react";
import { withRouter } from "react-router";

const Arrows = ({ slideNum, slides, input, setInput, history }) => {
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

  const edit = val => {
    history.push({
      pathname: "/edit",
      state: { val }
    });
  };
  return (
    <div className="navigation-container">
      <section className="button-container">
        <button className="btn" onClick={() => edit(slides[slideNum])}>
          Edit
        </button>
      </section>
      <section className="arrow-container">
        <i className="fas fa-arrow-left" onClick={() => parseArr(-1)}></i>
        <i className="fas fa-arrow-right" onClick={() => parseArr(1)}></i>
      </section>
    </div>
  );
};

export default withRouter(Arrows);
