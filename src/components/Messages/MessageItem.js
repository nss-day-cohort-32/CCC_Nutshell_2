import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';

export default class MessageItem extends Component {

    render() {
        return (
            <div key={this.props.message.id} className="card">
                <CardActions>
                    <Card className="card-body">
                        {/* <CardContent> <h1>{this.props.message.name} </h1></CardContent> */}
                        <Typography variant="body2" color="textPrimary" component="p">{this.props.message.content}</Typography>
                        <Button size="small" color="primary"
                            type="button"
                            className="btn btn-success btn--edit"
                            onClick={() => {
                                this.props.history.push(`/message/${this.props.message.id}/edit`);
                            }}>
                            Edit
                    </Button>
                        <Button size="small" color="primary"
                            onClick={() => this.props.deleteMessage(this.props.message.id)}
                            className="card-link">Delete</Button>
                    </Card>
                </CardActions>
            </div>
        )
    }
}