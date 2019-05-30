import React, { Component } from 'react';
import { withRouter } from 'react-router';
import TaskItem from "./TaskItem";

class TaskList extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="taskButton">
                    <button type="button"
                        className="btn btn-success"
                        onClick={() => {
                            this.props.history.push("/tasks/new")
                        }}>
                        Add New Task
                    </button>
                </div>
                {
                    this.props.tasks.map(task => {
                        return <TaskItem key={task.id} task={task}
                            deleteTask={this.props.deleteTask} patchTask={this.props.patchTask} {...this.props} />
                    })
                }
            </React.Fragment>
        )
    }
}

export default withRouter(TaskList)