import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';


class EventItem extends Component {
    render() {
        return (
            <div key={this.props.event.id} className="card">
                <CardActions>
                <Card className="card-body">
                <CardContent><h1>{this.props.event.title}</h1></CardContent>
                <Typography variant="body2" color="textPrimary" component="p">{this.props.event.date}</Typography>
                <Typography variant="body2" color="textPrimary" component="p">{this.props.event.location}</Typography>
                    <Button
                        type="button"
                        className="btn btn-success btn--edit"
                        onClick={() => {
                            this.props.history.push(`/events/${this.props.event.id}/edit`);
                        }}>
                        Edit
                    </Button>
                    <Button onClick={() => this.props.deleteEvent(this.props.event.id)}>Delete</Button>
                    </Card>
                    </CardActions>
            </div>
        )
    }
}

export default EventItem