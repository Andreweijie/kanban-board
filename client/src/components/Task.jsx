import React, { Component } from "react";

export default class Task extends Component {
  render() {
    return (
      <div className="task">
        <h1>{this.props.data.name}</h1>
        <ul>
          <li>Running</li>
          <li>Workout</li>
          <li>Lifting</li>
        </ul>
        <div>
          <span>tag</span>
          <span>In 3 Days</span>
        </div>
      </div>
    );
  }
}
