import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <h1>Boards</h1>
        {this.props.boards.map(board => {
          let query = "/board/" + board.name;
          return <Link to={query}>{board.name}</Link>;
        })}
        <input
            id="newboard"
            onChange={this.onChange}
            type="text"
            placeholder="Add new Board"
          />
      </div>
    );
  }
}
