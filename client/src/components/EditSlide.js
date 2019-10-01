import React from "react";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
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

  const edit = val => {
    try {
      const id = props.history.location.state.val._id;
      updateSlide(id, val);
    } catch (e) {
      console.log(e);
    }
    window.location = "/";
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
