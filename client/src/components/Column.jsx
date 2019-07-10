import React, { Component } from "react";
import Task from "./Task";

export default class Column extends Component {
  state = {
    tasks: [],
    newtask: "",
    column: "",
    board: "",
    showSub: false
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
      column: this.props.data.name,
      board: this.props.data.board
    };

    fetch("/new-task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTask)
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          tasks: this.state.tasks.concat(data)
        });
      });
  };
  showSubTask = () => {
    this.setState({
      showSub: !this.state.showSub
    });
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
            onClick={this.showSubTask}
          />
          <button onClick={this.addNewTask}>+</button>
          {this.state.showSub ? (
            <input id="subtask" placeholder="Add new sub task" type="text" />
          ) : null}
        </div>
      </div>
    );
  }
}
