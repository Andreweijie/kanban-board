import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";
import Task from "./Task";
import { Droppable, Draggable } from "react-beautiful-dnd";

export default class Column extends Component {
  state = {
    tasks: [],
    newtask: "",
    column: "",
    board: ""
  };

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.props.addNewTask({
        name: this.state.newtask,
        column: this.props.data.name,
        board: this.props.data.board,
        subTasks: []
      });
      this.setState({ [event.target.id]: "" });
    }
  };

  deleteTask = taskToRemove => {
    const newArray = this.state.tasks.filter(task => {
      return task != taskToRemove;
    });
    this.setState(
      {
        tasks: newArray
      },
      () => {
        fetch(`/delete-task?id=${taskToRemove._id}`)
          .then(res => res.json())
          .then(data => console.log(data));
      }
    );
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  render() {
    console.log(this.props.task);
    return (
      <div className="column" style={{ animation: "fadeIn 0.5s" }}>
        <h1>{this.props.data.name}</h1>
        <Droppable
          droppableId={this.props.data._id}
          direction="vertical"
          mode="standard"
        >
          {provided => (
            <div
              className="task-list"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {this.props.tasks.length !== 0
                ? this.props.tasks.map((task, index) => {
                    return (
                      <Draggable
                        key={index}
                        draggableId={task._id}
                        index={index}
                      >
                        {provided => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Task
                              key={task._id}
                              delete={this.deleteTask}
                              column={this.props.data.name}
                              board={this.props.data.board}
                              data={task}
                              sub={task.subTasks}
                              index={index}
                            />
                          </div>
                        )}
                      </Draggable>
                    );
                  })
                : null}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

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
