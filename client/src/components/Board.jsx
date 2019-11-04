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

  fetchData = () => {
    fetch("/columns?board=" + this.props.match.params.boardname)
      .then(res => res.json())
      .then(data => {
        this.setState({
          columns: data
        });
      });

    fetch("/tasks?board=" + this.props.match.params.boardname)
      .then(res => res.json())
      .then(data1 => {
        this.setState({
          tasks: data1
        });
      });
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

  onDragEnd = result => {
    console.log(result);
    const { destination, source, draggableId } = result;
    if (destination == null) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index == source.index
    ) {
      return;
    }
    if (destination.droppableId === source.droppableId) {
      let tasks = this.state.tasks;
      [tasks[source.index], tasks[destination.index]] = [
        tasks[destination.index],
        tasks[source.index]
      ];
      this.setState({
        tasks
      });
    }
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="board" style={{ animation: "fadeIn 0.5s" }}>
          <div className="columns">
            {this.state.columns.map(column => {
              return (
                <Column
                  key={column._id}
                  data={column}
                  tasks={this.state.tasks.filter(e => {
                    return e.column === column.name;
                  })}
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
