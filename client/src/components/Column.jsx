import React, { Component } from "react";
import Task from "./Task";

export default class Column extends Component {
  state = {
    tasks: [],
    newtask: "",
    column: "",
    board: ""
  };
  componentDidMount() {
    fetch(
      `/tasks?column=${this.props.data.name}&board=${this.props.data.board}`
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ tasks: data });
      });
  }

  addNewTask = () => {
    const newTask = {
      name: this.state.newtask,
      column: this.state.column,
      board: this.state.board
    };

    fetch("/new-task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTask)
    })
      .then(res => res.json())
      .then(data => console.log(data));
  };
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  render() {
    return (
      <div className="column">
        <h1>{this.props.data.name}</h1>
        {this.state.tasks.map(task => {
          return <Task data={task} />;
        })}
        <div className="addTask">
          <input
            id="newtask"
            onChange={this.onChange}
            type="text"
            placeholder="Add new Task"
          />
          <button onClick={this.addNewTask}>+</button>
        </div>
      </div>
    );
  }
}
