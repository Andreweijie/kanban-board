import React, { Component } from "react";
import Task from "./Task";
import { Droppable, Draggable } from "react-beautiful-dnd";

export default class Column extends Component {
  state = {
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
      return task !== taskToRemove;
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
              {this.props.tasks
                ? this.props.data.taskIds.map((taskId, index) => {
                    const task = this.props.tasks.filter(task => {
                      return task._id === taskId;
                    })[0];
                    console.log(task);
                    return (
                      <Draggable key={index} draggableId={taskId} index={index}>
                        {provided => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Task
                              key={taskId}
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
