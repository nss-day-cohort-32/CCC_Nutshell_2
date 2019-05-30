import React, { Component } from 'react'
import { withRouter } from "react-router"
import EventItem from './EventItem'
import './Events.css'



class EventList extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="events">
                    <div className="eventButton">
                        <button type="button"
                            className="btn btn-success"
                            onClick={() => {
                                this.props.history.push("/events/new")
                            }
                            }>
                            Add New Event
                        </button>
                    </div>
                    <div className="eventsList">
                        {
                            this.props.events.map(event => {
                                return <EventItem key={event.id} event={event} deleteEvent={this.props.deleteEvent} {...this.props} />
                            }
                            )
                        }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(EventList)