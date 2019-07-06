import React, { Component } from "react";
import Board from "./components/Board";
import Sidebar from "./components/Sidebar";
import "./css/App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Sidebar />
        <Board />
      </div>
    );
  }
}

export default App;
