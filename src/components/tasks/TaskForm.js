import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export default class TaskForm extends Component {
  // Set initial state
  state = {
    taskName: "",
    taskDate: "",
  };

  // Update state whenever an input field is edited
  handleFieldChange = event => {
    const stateToChange = {};
    stateToChange[event.target.id] = event.target.value;
    // console.log(stateToChange);
    this.setState(stateToChange);
  };

  /*
        Local method for validation, creating article object, and
        invoking the function reference passed from parent component
        */
  constructNewTask = e => {
    e.preventDefault();
    let userId = sessionStorage.getItem('userId')
    const taskObj = {
      task: this.state.taskName,
      date: this.state.taskDate,
      completed: false,
      userId: parseInt(userId)
    };

    // Create the article and redirect user to article list
    this.props
      .addTask(taskObj)
      .then(() => this.props.history.push("/tasks"));
  };

  render() {
    return (
      <React.Fragment>
        <form className="TaskForm">
          <div className="form-group">
            <label htmlFor="taskName">Task Name:</label>
            <TextField
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="taskName"
              placeholder="Task Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="taskDate">Date</label>
            <TextField
              type="date"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="taskDate"
              placeholder="date"
            />
          </div>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            type="submit"
            onClick={this.constructNewTask}
            className="btn btn-primary"
          >
            Submit New Task
          </Button>
        </form>
      </React.Fragment>
    );
  }
}
