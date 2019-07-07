import React, { Component } from "react";
import Board from "./components/Board";
import Sidebar from "./components/Sidebar";
import { Route } from "react-router-dom";
import "./css/App.css";

class App extends Component {
  state = {
    boards: []
  };
  componentDidMount() {
    fetch("/boards")
      .then(res => res.json())
      .then(data =>
        this.setState({
          boards: data
        })
      );
  }
  render() {
    return (
      <div className="App">
        <Sidebar boards={this.state.boards} />
        <Route exact path="/board/:boardname" component={Board} />
      </div>
    );
  }
}

export default App;
