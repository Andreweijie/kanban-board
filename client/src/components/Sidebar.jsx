import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Sidebar extends Component {
  state = {
    boards: [],
    newBoard: ""
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

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.addBoard();
    }
  };

  addBoard = () => {
    fetch(`/new-board?board=${this.state.newBoard}`)
      .then(res => res.json())
      .then(data =>
        this.setState({
          boards: this.state.boards.concat(data),
          newBoard: ""
        })
      );
  };
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  render() {
    return (
      <div className="sidebar">
        <img src={require("../MIKAN.png")} />
        <h1>Boards</h1>
        {this.state.boards.map((board, index) => {
          let query = "/board/" + board.name;
          return (
            <Link key={index} style={{ animation: "fadeIn 1s" }} to={query}>
              {board.name}
            </Link>
          );
        })}
        <input
          id="newBoard"
          onChange={this.onChange}
          type="text"
          placeholder="Add Board"
          onKeyPress={this.handleKeyPress}
          value={this.state.newBoard}
        />
      </div>
    );
  }
}
