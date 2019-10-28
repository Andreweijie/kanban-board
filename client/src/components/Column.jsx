import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";
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
          this.setState({ tasks: data });
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

  updateTasks = tasks => {
    fetch("/update-tasks", {
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

  deleteTask = taskToRemove => {
    const newArray = this.state.tasks.filter(task => {
      return task != taskToRemove;
    });
    this.setState({
      tasks: newArray
    });
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  render() {
    return (
      <CSSTransition classNames="ani1" in={true} timeout={2000}>
        <div className="column" style={{ animation: "fadeIn 0.5s" }}>
          <h1>{this.props.data.name}</h1>
          {this.state.tasks.map(task => {
            return (
              <Task
                delete={this.deleteTask}
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
      </CSSTransition>
    );
  }
}
