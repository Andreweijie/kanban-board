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

  componentDidUpdate(prevProps) {
    if (this.props.data.board !== prevProps.data.board) {
      // call the fetch function again
      fetch(
        `/tasks?column=${this.props.data.name}&board=${this.props.data.board}`
      )
        .then(res => res.json())
        .then(data => {
          this.setState({
            tasks: data
          });
        });
    }
  }

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.addNewTask();
      this.setState({ [event.target.id]: "" });
    }
  };

  addNewTask = () => {
    if (this.state.newtask != "") {
      const newTask = {
        name: this.state.newtask,
        column: this.props.data.name,
        board: this.props.data.board,
        subTasks: []
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
    }
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  render() {
    return (
      <div className="column">
        <h1>{this.props.data.name}</h1>
        {this.state.tasks.map(task => {
          return (
            <Task
              column={this.props.data.name}
              board={this.props.data.board}
              data={task}
              sub={task.subTasks}
            />
          );
        })}

        <input
          id="newtask"
          onChange={this.onChange}
          type="text"
          placeholder="Add Task"
          onClick={this.showSubTask}
          onKeyPress={this.handleKeyPress}
          value={this.state.newtask}
        />
      </div>
    );
  }
}
