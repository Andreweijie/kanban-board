import React, { Component } from "react";
import Column from "./Column";

export default class Board extends Component {
  state = {
    columns: [],
    newColumn: ""
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
  componentDidUpdate(prevProps) {
    if (
      this.props.match.params.boardname !== prevProps.match.params.boardname
    ) {
      // call the fetch function again
      fetch("/columns?board=" + this.props.match.params.boardname)
        .then(res => res.json())
        .then(data => {
          this.setState({
            columns: data
          });
        });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  addColumn = () => {
    fetch(
      `/new-column?column=${this.state.newColumn}&board=${
        this.props.match.params.boardname
      }`
    )
      .then(res => res.json())
      .then(data =>
        this.setState({
          columns: this.state.columns.concat(data)
        })
      );
  };
  render() {
    return (
      <div className="board">
        <div className="columns">
          {this.state.columns.map(column => {
            return <Column data={column} />;
          })}
        </div>
        <div className="addCol">
          <input
            id="newColumn"
            onChange={this.onChange}
            type="text"
            placeholder="Add new Column"
          />
          <button onClick={this.addColumn}>+</button>
        </div>
      </div>
    );
  }
}
