import React, { Component } from "react";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";

export default class Board extends Component {
  state = {
    columns: [],
    newColumn: ""
  };

  componentDidMount() {
    fetch("/columns?board=" + this.props.match.params.boardname)
      .then(res => res.json())
      .then(data => {
        this.setState({
          columns: data
        });
      });
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.match.params.boardname !== prevProps.match.params.boardname
    ) {
      // call the fetch function again
      fetch("/columns?board=" + this.props.match.params.boardname)
        .then(res => res.json())
        .then(data => {
          this.setState({
            columns: data
          });
        });
    }
  }

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
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="board" style={{ animation: "fadeIn 0.5s" }}>
          <div className="columns">
            {this.state.columns.map(column => {
              return <Column key={column._id} data={column} />;
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
