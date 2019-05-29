import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';



export default class EventForm extends Component {

  // Set initial state
  state = {
    eventName: "",
    eventDate: "",
    eventLocation: "",
  };

  // Update state whenever an input field is edited
  handleFieldChange = (event) => {
    const stateToChange = {};
    stateToChange[event.target.id] = event.target.value;
    console.log(stateToChange)
    this.setState(stateToChange);
  };

  /*
        Local method for validation, creating article object, and
        invoking the function reference passed from parent component
     */
  constructNewEvent = e => {
    e.preventDefault();
      const eventObj = {
        title: this.state.eventName,
        date: this.state.eventDate,
        location: this.state.eventLocation,
      };

      // Create the article and redirect user to article list
      this.props
        .addEvent(eventObj)
        .then(() => this.props.history.push("/events"));
  }

  render() {

    return (
      <React.Fragment >
        <form className="EventForm">
          <div className="form-group">
            <label htmlFor="eventName">Event Name:</label>
            <TextField
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="eventName"
              placeholder="event Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">location</label>
            <TextField
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="eventLocation"
              placeholder="location"
            />
          </div>
          <div className="form-group">
            <label htmlFor="URL">Date</label>
            <TextField
              type="date"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="eventDate"
              placeholder="date"
            />
          </div>
          <Button variant="outlined" color="primary" size="large"
            type="submit"
            onClick={this.constructNewEvent}
            className="btn btn-primary"
          >
            Submit New Event
          </Button>
        </form>
      </React.Fragment>
    );
  }
}