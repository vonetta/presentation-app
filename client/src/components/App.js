import React from "react";
import { Route, Switch } from "react-router-dom";
import SlideShow from "./Slide";
import EditSlide from "./EditSlide";
import NewSlide from "./NewSlide";
import "../App.css";
function App() {
  return (
    <>
      <p className="title ">Presentation App</p>
      <Switch>
        <Route path="/edit" component={EditSlide} />
        <Route path="/new" component={NewSlide} />

        <Route path="/" exact component={SlideShow} />
      </Switch>
    </>
  );
}

export default App;
