import React, { Component } from "react";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";

export default class Board extends Component {
  state = {
    columns: [],
    newColumn: "",
    tasks: []
  };

  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.match.params.boardname !== prevProps.match.params.boardname
    ) {
      // call the fetch function again
      this.fetchData();
    }
  }

  fetchData = async () => {
    await fetch("/columns?board=" + this.props.match.params.boardname)
      .then(res => res.json())
      .then(data => {
        this.setState({
          columns: data
        });
      });

    await fetch("/tasks?board=" + this.props.match.params.boardname)
      .then(res => res.json())
      .then(data1 => {
        this.setState({
          tasks: this.formatTaskData(data1)
        });
      });
  };

  formatTaskData = data => {
    let formatted = [];
    let columnNames = this.state.columns.map(column => {
      return column.name;
    });
    columnNames.map(ele => {
      let tasks = data.filter(f => {
        return f.column == ele;
      });

      formatted.push(tasks);
    });

    return formatted;
  };

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.addColumn();
      this.setState({ [event.target.id]: "" });
    }
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  addColumn = () => {
    fetch(
      `/new-column?column=${this.state.newColumn}&board=${this.props.match.params.boardname}`
    )
      .then(res => res.json())
      .then(data =>
        this.setState({
          columns: this.state.columns.concat(data)
        })
      );
  };

  addNewTask = newTask => {
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

  onDragEnd = result => {
    console.log(result);
    const { destination, source, draggableId } = result;
    let toInsert = this.state.tasks.filter(task => {
      return task._id == draggableId;
    });
    if (destination == null) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index == source.index
    ) {
      return;
    }
    let column = this.state.columns.filter(column => {
      return column._id == destination.droppableId;
    });
    let taskArray = this.state.tasks.filter(task => {
      if (task.length !== 0) {
        return task[0].column == column[0].name;
      }
    })[0];
    taskArray.splice(source.index, 1);
    taskArray.splice(destination.index, 0, toInsert[0]);
    let newTasksArray = this.state.tasks.map(e => {
      if (e.length !== 0) {
        if (e[0].column == taskArray[0].column) {
          return taskArray;
        }
      } else {
        return e;
      }
    });
    console.log(newTasksArray);
  };

  render() {
    console.log(this.state.tasks);
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="board" style={{ animation: "fadeIn 0.5s" }}>
          <div className="columns">
            {this.state.tasks.length !== 0
              ? this.state.columns.map((column, index) => {
                  return (
                    <Column
                      addNewTask={this.addNewTask}
                      key={column._id}
                      data={column}
                      tasks={this.state.tasks[index]}
                    />
                  );
                })
              : null}
          </div>
          <div className="addCol">
            <input
              onKeyPress={this.handleKeyPress}
              id="newColumn"
              onChange={this.onChange}
              type="text"
              placeholder="Add new Column"
              value={this.state.newColumn}
            />
          </div>
        </div>
      </DragDropContext>
    );
  }
}
