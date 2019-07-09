import React, { Component } from "react";
import Column from "./Column";

export default class Board extends Component {
  state = {
    columns: []
  };
  componentDidMount() {
    fetch("/columns?board=" + this.props.match.params.boardname)
      .then(res => res.json())
      .then(data => {
        this.setState({
          columns: data
        });
      });
  }

  render() {
    return (
      <div className="board">
        <div>
          {this.state.columns.map(column => {
            return <Column data={column} />;
          })}
        </div>
        <div className="addCol">
          <input type="text" placeholder="Add new Column" />
          <button>+</button>
        </div>
      </div>
    );
  }
}
