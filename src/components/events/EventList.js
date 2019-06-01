import React, { Component } from 'react'
import { withRouter } from "react-router"
import EventItem from './EventItem'
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import './Events.css'



class EventList extends Component {
    render() {
        return (
            <React.Fragment>
                    <Card className="eventButton">
                        <Button type="button"
                            className="btn btn-success"
                            onClick={() => {
                                this.props.history.push("/events/new")
                            }
                            }>
                            Add New Event
                        </Button>
                    </Card>
                    <Card className="eventsList">
                        {
                            this.props.events.map(event => {
                                return <EventItem key={event.id} event={event} deleteEvent={this.props.deleteEvent} {...this.props} />
                            }
                            )
                        }
                    </Card>
            </React.Fragment>
        )
    }
}

export default withRouter(EventList)