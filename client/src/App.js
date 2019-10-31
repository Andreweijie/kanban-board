import React, { Component } from "react";
import Board from "./components/Board";
import Sidebar from "./components/Sidebar";
import { Route, Switch } from "react-router-dom";
import "./scss/App.css";
import { DragDropContext } from "react-beautiful-dnd";

class App extends Component {
  onDragEnd = () => {};
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="App">
          <Sidebar />
          <Switch>
            <Route exact path="/board/:boardname" component={Board} />
          </Switch>
        </div>
      </DragDropContext>
    );
  }
}

export default App;
