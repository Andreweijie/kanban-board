import React, { Component } from "react";

export default class Card extends Component {
  render() {
    return (
      <div className="card">
        <h3>{this.props.taskTitle}</h3>
        <ul>
          {this.props.steps.map(e => {
            return <li>{e}</li>;
          })}
        </ul>
      </div>
    );
  }
}
