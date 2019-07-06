import React, { Component } from 'react'
import Column from "./Column"

export default class Board extends Component {
    render() {
        return (
            <div className="board">
                <div><Column /></div>
                <div className="addCol">
                    <input type="text" placeholder="Add new Column"></input>
                    <button>+</button>
                </div>
            </div>
        )
    }
}
