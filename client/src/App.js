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
        <h1>TEST</h1>
      </div>
    );
  }
}

export default App;
