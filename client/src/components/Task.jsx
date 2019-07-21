import React, { Component } from "react";

export default class Task extends Component {
  state = {
    subAdd: "",
    subTasks: []
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.addSubTask();
    }
  };

  addSubTask = () => {
    this.setState(
      { subTasks: this.state.subTasks.concat(this.state.subAdd) },
      () => this.sendSubs()
    );
  };

  sendSubs = () => {
    fetch("/update-sub", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: this.props.data.name,
        board: this.props.board,
        column: this.props.column,
        subTasks: this.state.subTasks
      })
    });
  };

  removeSub = task => {
    this.setState(
      {
        subTasks: this.state.subTasks.filter(e => {
          return e != task;
        })
      },
      () => this.sendSubs()
    );
  };
  render() {
    return (
      <div className="task">
        <h1>{this.props.data.name}</h1>
        <ul>
          {this.props.sub.map(tasks => {
            return (
              <li>
                {tasks}
                <button onClick={() => this.removeSub(tasks)}>X</button>
              </li>
            );
          })}
          <input
            id="subAdd"
            type="text"
            onChange={this.onChange}
            onKeyPress={this.handleKeyPress}
          />
        </ul>
      </div>
    );
  }
}
