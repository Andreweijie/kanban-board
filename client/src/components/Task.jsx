import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";

export default class Task extends Component {
  state = {
    subAdd: "",
    subTasks: []
  };
  componentDidMount() {
    this.setState({ subTasks: this.props.sub });
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.addSubTask();
      this.setState({ [event.target.id]: "" });
    }
  };

  addSubTask = () => {
    this.setState(
      { subTasks: this.state.subTasks.concat(this.state.subAdd) },
      () => {
        this.sendSubs();
      }
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
      <Draggable draggableId={this.props.data._id} index={this.props.index}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="task"
            style={{ animation: "fadeIn 1s" }}
          >
            <div className="head">
              <h1>{this.props.data.name}</h1>
              <img
                className="delete"
                onClick={() => this.props.delete(this.props.data)}
                src="https://cdn0.iconfinder.com/data/icons/very-basic-android-l-lollipop-icon-pack/24/close-512.png"
              />
            </div>
            <ul>
              {this.state.subTasks.map(tasks => {
                return (
                  <li style={{ animation: "fadeIn 1s" }}>
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
                value={this.state.subAdd}
              />
            </ul>
          </div>
        )}
      </Draggable>
    );
  }
}
