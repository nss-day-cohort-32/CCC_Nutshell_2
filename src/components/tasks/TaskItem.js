import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
// import "./Task.css"

const Checkbox = props => (
    <input type="checkbox" {...props} />
)

export default class TaskItem extends Component {

    state = { checked: false }

    // handleCheckboxChange = () => {
    //     if()
    // }


    render() {
        return (
            <div key={this.props.task.id} className="card">
                <CardActions>
                    <Card className="card-body">
                        <Checkbox className="taskCheckBox"
                            checked={this.state.checked}
                            onChange={this.handleCheckboxChange}></Checkbox>
                        <CardContent><h3>{this.props.task.task}</h3></CardContent>
                        <Link className="nav-link" to={`/articles/${this.props.task.id}`}>Details</Link>
                        <Button size="small" color="primary"
                            type="button"
                            className="btn btn-success btn--edit"
                            onClick={() => {
                                this.props.history.push(`/articles/${this.props.task.id}/edit`);
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