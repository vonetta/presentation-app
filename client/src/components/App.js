import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import SlideShow from "./SlideShow";
import EditSlide from "./EditSlide";
import NewSlide from "./NewSlide";
import "../App.css";

function App() {
  return (
    <>
      <header>
        <Link className="title" to={"/"}>
          Presentation App
        </Link>
      </header>
      <Switch>
        <Route path="/edit" component={EditSlide} />
        <Route path="/new" component={NewSlide} />
        <Route path="/" exact component={SlideShow} />
      </Switch>
    </>
  );
}

export default App;
