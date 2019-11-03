import React, { Component } from "react";
import Board from "./components/Board";
import Sidebar from "./components/Sidebar";
import { Route, Switch } from "react-router-dom";
import "./scss/App.css";
import { DragDropContext } from "react-beautiful-dnd";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Sidebar />
        <Switch>
          <Route exact path="/board/:boardname" component={Board} />
        </Switch>
      </div>
    );
  }
}

export default App;
