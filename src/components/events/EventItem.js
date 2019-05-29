import React, { Component } from "react";
import { Link } from "react-router-dom";

class EventItem extends Component {
    render() {
        return (
            <div key={this.props.event.id} className="card">
                <div className="card-body">
                    <h3>{this.props.event.title}</h3>
                    <p>{this.props.event.date}</p>
                    <p>{this.props.event.location}</p>
                    <button
                        type="button"
                        className="btn btn-success btn--edit"
                        onClick={() => {
                            this.props.history.push(`/events/${this.props.event.id}/edit`);
                        }}>
                        Edit
                    </button>
                    <button onClick={() => this.props.deleteEvent(this.props.event.id)}>Delete</button>
                </div>
            </div>
        )
    }
}

export default EventItem