import React, { Component } from "react";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";

export default class Board extends Component {
  state = {
    columns: [],
    newColumn: "",
    columnOrder: []
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
    await fetch("/tasks?board=" + this.props.match.params.boardname)
      .then(res => res.json())
      .then(data1 => {
        this.setState({
          tasks: data1
        });
      });

    await fetch("/columns?board=" + this.props.match.params.boardname)
      .then(res => res.json())
      .then(data => {
        this.setState({
          columns: data
        });
      });

    this.setState(
      {
        columns: this.formatData(this.state.columns, this.state.tasks)
      },
      this.setState(
        {
          columnOrder: this.getColumnOrder(this.state.columns)
        },
        console.log(this.state.columnOrder)
      )
    );
  };

  formatData = (columns, tasks) => {
    let newColumn = columns.map(column => {
      let taskIds = [];
      tasks.map(task => {
        if (column.name === task.column) {
          taskIds.push(task._id);
        }
      });
      column.taskIds = taskIds;
      return column;
    });
    return newColumn;
  };

  getColumnOrder = columns => {
    let order = columns.map(column => {
      return column._id;
    });

    return order;
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
    const { destination, source, draggableId } = result;

    if (destination === null) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const column = this.state.columns.filter(column => {
      return column._id === source.droppableId;
    })[0];
    const newTaskIds = Array.from(column.taskIds);

    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    column.taskIds = newTaskIds;

    const newColumns = this.state.columns.map(col => {
      if (col._id === source.droppableId) {
        return column;
      } else {
        return col;
      }
    });

    this.setState({
      columns: newColumns
    });
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="board" style={{ animation: "fadeIn 0.5s" }}>
          <div className="columns">
            {this.state.columnOrder.map(columnId => {
              const column = this.state.columns.filter(column => {
                return column._id === columnId;
              })[0];
              const tasks = this.state.tasks.filter(task => {
                return column.name === task.column;
              });
              return (
                <Column
                  addNewTask={this.addNewTask}
                  key={column._id}
                  data={column}
                  tasks={tasks}
                />
              );
            })}
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
