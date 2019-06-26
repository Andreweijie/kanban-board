import React, { Component } from "react";
import Column from "./Column";

export default class Board extends Component {
  state = {
    columns: [
      {
        title: "todo",
        tasks: [
          {
            title: "exercise",
            subSteps: ["diet", "wake up early", "eat clean"]
          },
          {
            title: "lose weight",
            subSteps: ["diet", "wake up early", "eat clean"]
          },
          {
            title: "running",
            subSteps: ["diet", "wake up early", "eat clean"]
          }
        ]
      },
      {
        title: "doing",
        tasks: [
          {
            title: "exercise",
            subSteps: ["diet", "wake up early", "eat clean"]
          },
          {
            title: "lose weight",
            subSteps: ["diet", "wake up early", "eat clean"]
          },
          {
            title: "running",
            subSteps: ["diet", "wake up early", "eat clean"]
          }
        ]
      },
      {
        title: "done",
        tasks: [
          {
            title: "exercise",
            subSteps: ["diet", "wake up early", "eat clean"]
          },
          {
            title: "lose weight",
            subSteps: ["diet", "wake up early", "eat clean"]
          },
          {
            title: "running",
            subSteps: ["diet", "wake up early", "eat clean"]
          }
        ]
      }
    ]
  };

  addCard = () => {
    let data = {
      title: "todo",
      tasks: [
        {
          title: "exercise",
          subSteps: ["diet", "wake up early", "eat clean"]
        },
        {
          title: "lose weight",
          subSteps: ["diet", "wake up early", "eat clean"]
        },
        {
          title: "running",
          subSteps: ["diet", "wake up early", "eat clean"]
        }
      ]
    };
    let newColumn = this.state.columns.concat(data);
    this.setState({
      columns: newColumn
    });
  };
  render() {
    return (
      <div className="board">
        {this.state.columns.map(e => {
          return (
            <Column addCard={this.addCard} title={e.title} tasks={e.tasks} />
          );
        })}
      </div>
    );
  }
}
