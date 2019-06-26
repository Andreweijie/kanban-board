import React, { Component } from "react";
import Card from "./Card";

export default class Column extends Component {
  render() {
    return (
      <div className="column">
        <h2 className="title">{this.props.title}</h2>
        {this.props.tasks.map(e => {
          return <Card taskTitle={e.title} steps={e.subSteps} />;
        })}
        <button onClick={this.props.addCard}>add</button>
      </div>
    );
  }
}
