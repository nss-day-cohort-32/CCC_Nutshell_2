import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import dbCalls from "../../modules/dbCalls";
import GetToday from "../../modules/GetToday"

const remoteURL = "http://localhost:5002";
const eventsURL = `${remoteURL}/events`;
let today = GetToday.getToday()
console.log("today", today)



class EventEditForm extends Component {
  state = {
    title: "",
    location: "",
    date: ""
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
    // console.log(stateToChange);
  };
  updateExisitingEvent = evt => {
    evt.preventDefault();
    const editEvent = {
      id: this.props.match.params.eventId,
      title: this.state.title,
      location: this.state.location,
      date: this.state.date
    };
    console.log("edit events", editEvent);
    this.props.updateEvent(editEvent);
  };
  componentDidMount() {
    dbCalls.get(eventsURL, this.props.match.params.eventId).then(event => {
      this.setState({
        title: event.title,
        location: event.location,
        date: event.date
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <form className="EventForm">
          <div className="form-group">
            <TextField
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="title"
              value={this.state.title}
            />
          </div>
          <div className="form-group">
            <TextField
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="location"
              value={this.state.location}
            />
          </div>
          <div className="form-group">
            <TextField
              type="date"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="date"
              value={this.state.date}
            />
          </div>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            type="submit"
            onClick={this.updateExisitingEvent}
            className="btn btn-primary"
          >
            Update
          </Button>
        </form>
      </React.Fragment>
    );
  }
}

export default EventEditForm;
