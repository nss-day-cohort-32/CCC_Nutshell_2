import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class TaskItem extends Component {
    render() {
        return (
            <div key={this.props.task.id} className="card">
                <div className="card-body">
                    <h3>{this.props.task.name}</h3>
                    <Link className="nav-link" to={`/articles/${this.props.task.id}`}>Details</Link>
                    <button
                        type="button"
                        className="btn btn-success btn--edit"
                        onClick={() => {
                            this.props.history.push(`/articles/${this.props.task.id}/edit`);
                        }}>
                        Edit Task
                    </button>
                    <button onClick={this.handleClick}>Delete</button>
                </div>
            </div>
        )
    }
}