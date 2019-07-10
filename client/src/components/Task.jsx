import React, { Component } from "react";

export default class Task extends Component {
  state = {
    tags: [{ name: "admin", color: "#000" }]
  };
  render() {
    return (
      <div className="task">
        <h1>{this.props.data.name}</h1>
        <div>
          {this.state.tags.length != 0 ? (
            <span
              className="tags"
              style={{ backgroundColor: this.state.tags[0].color }}
            >
              {this.state.tags[0].name}
            </span>
          ) : null}
          <span>In 3 Days</span>
        </div>
      </div>
    );
  }
}
