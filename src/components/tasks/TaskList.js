import React, { Component } from 'react';
import { withRouter } from 'react-router';
import TaskItem from "./TaskItem";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

class TaskList extends Component {
    render() {
        return (
            <React.Fragment>
                <Card className="taskButton">
                    <Button type="button"
                        className="btn btn-success"
                        onClick={() => {
                            this.props.history.push("/tasks/new")
                        }}>
                        Add New Task
                    </Button>
                </Card>
                <Card className="tasks">
                {
                    this.props.tasks.map(task => {
                        return <TaskItem key={task.id} task={task}
                            deleteTask={this.props.deleteTask} patchTask={this.props.patchTask} {...this.props} />
                    })
                    }
                    </Card>
            </React.Fragment>
        )
    }
}

export default withRouter(TaskList)