import React from "react";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";

import { createNewSlide } from "./../routes/slideRoutes";

const NewSlide = props => {
  const [value, setValue] = React.useState("");
  const [selectedTab, setSelectedTab] = React.useState("write");

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
  });

  const save = str => {
    createNewSlide(str);
  };

  return (
    <>
      <h1>New Slide</h1>
      <ReactMde
        value={value}
        onChange={setValue}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={markdown =>
          Promise.resolve(converter.makeHtml(markdown))
        }
      />
      <button className="btn" onClick={() => save(value)}>
        Save
      </button>
    </>
  );
};

export default NewSlide;
