import React from "react";
import { Route, Switch } from "react-router-dom";
import SlideShow from "./SlideShow";
import EditSlide from "./EditSlide";
import NewSlide from "./NewSlide";
import "../css/App.css";

function App() {
  return (
    <>
      <Switch>
        <Route path="/edit" component={EditSlide} />
        <Route path="/new" component={NewSlide} />
        <Route path="/" exact component={SlideShow} />
      </Switch>
    </>
  );
}

export default App;
