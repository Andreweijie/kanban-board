import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        {this.props.boards.map(board => {
          let query = "/board/" + board.name;
          return <Link to={query}>{board.name}</Link>;
        })}
        <button>+</button>
      </div>
    );
  }
}
