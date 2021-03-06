import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import dbCalls from "../../modules/dbCalls";

const remoteURL = "http://localhost:5002";
const tasksURL = `${remoteURL}/tasks`;

class TaskEditForm extends Component {
  state = {
    task: "",
    date: ""
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
    // console.log(stateToChange);
  };

  updateExisitingTask = evt => {
    evt.preventDefault();
    const editTask = {
      id: this.props.match.params.tasksId,
      task: this.state.task,
      date: this.state.date,
    };
    console.log("edit events", editTask);
    this.props.updateTask(editTask);
  };
  componentDidMount() {
    dbCalls.get(tasksURL, this.props.match.params.tasksId).then(task => {
      console.log(task)
      this.setState({
        task: task.task,
        date: task.date,
        completed: task.completed
      });
    });
  }

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
              id="task"
              value={this.state.task}
            />
          </div>
          <div className="form-group">
            <label htmlFor="taskDate">Date</label>
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
            onClick={this.updateExisitingTask}
            className="btn btn-primary"
          >
            Update
                </Button>
        </form>
      </React.Fragment>
    );
  }
}

export default TaskEditForm;
