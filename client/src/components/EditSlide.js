import React from "react";
import { Redirect } from "react-router-dom";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";

import { updateSlide } from "./../routes/slideRoutes";

const EditSlide = props => {
  const [currentSlide, setCurrentSlide] = React.useState(
    props.history.location.state.val
  );
  const [selectedTab, setSelectedTab] = React.useState("write");

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
  });

  const edit = async val => {
    const id = props.history.location.state.val._id;
    await updateSlide(id, val);
    return <Redirect to="/" />;
  };

  return (
    <>
      <h1>Edit Screen</h1>
      <ReactMde
        value={currentSlide.text}
        onChange={setCurrentSlide}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={markdown =>
          Promise.resolve(converter.makeHtml(markdown))
        }
      />
      <button className="btn" onClick={() => edit(currentSlide)}>
        Edit
      </button>
    </>
  );
};

export default EditSlide;
