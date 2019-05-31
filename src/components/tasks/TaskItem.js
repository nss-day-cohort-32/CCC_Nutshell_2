import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';

const Checkbox = props => (
    <input type="checkbox" {...props} />
)

export default class TaskItem extends Component {

    state = { checked: false }

    handleCheckboxChange = () => {
        this.setState({
            checked: !this.state.checked
        }, this.callUpdate)

    }

    callUpdate = () => {
        const updatedTask = {
            id: this.props.task.id,
            date: this.props.task.date,
            completed: this.state.checked
        }
        this.props.patchTask(updatedTask)
    }

    getStyle = () => {
        return {
            color: this.props.task.completed ? "red" : "black",
            textDecoration: this.props.task.completed ?
                "line-through" : "none",
        }
    }

    render() {
        return (
            <div key={this.props.task.id} className="card">
                <CardActions>
                    <Card className="card-body">
                        <Checkbox className="taskCheckBox"
                            checked={this.state.checked}
                            onChange={this.handleCheckboxChange}
                            id={this.props.tasks.id}></Checkbox>
                        <CardContent><h3 style={this.getStyle()}>{this.props.task.task}</h3>
                            <p>{this.props.task.date}</p></CardContent>
                        <Button size="small" color="primary"
                            type="button"
                            className="btn btn-success btn--edit"
                            onClick={() => {
                                this.props.history.push(`/tasks/${this.props.task.id}/edit`);
                            }}>
                            Edit Task
                        </Button>
                        <Button size="small" color="primary"
                            onClick={() => this.props.deleteTask(this.props.task.id)}
                            className="card-link">Delete</Button>
                    </Card>
                </CardActions>
            </div >
        )
    }
}

