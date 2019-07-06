import React, { Component } from 'react'
import Task from "./Task"

export default class Column extends Component {
    render() {
        return (
            <div className="column">
                <h1>Todo</h1>
                <Task />
                <div className="addTask">
                    <input type="text" placeholder="Add new Task"></input>
                    <button>+</button>
                </div>
            </div>
        )
    }
}
