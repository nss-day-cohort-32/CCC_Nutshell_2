import React, { Component } from 'react'
import MessageList from "./MessageList"
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import dbCalls from "../../modules/dbCalls";

const remoteURL = "http://localhost:5002";
const messagesURL = `${remoteURL}/messages`;

export default class MessageEditForm extends Component {

    state = {
        // "userId": 1,
        content: "",
        timestamp: this.getTimeStamp()
    };

    handleFieldChange = (event) => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value;
        this.setState(stateToChange);
    };

    updateMessage = evt => {
        evt.preventDefault();
        const editedMessage = {
            id: this.props.match.params.messageId,
            content: this.state.content,
            timestamp: this.state.timestamp
        };
        console.log("edit message", editedMessage);
        this.props.patchMessage(editedMessage);
    };

    componentDidMount() {
        dbCalls.get(messagesURL, this.props.match.params.messageId).then(message => {
            this.setState({
                content: message.content,
                timestamp: message.timestamp
            });
        });
    }

    render() {
        return (
            <React.Fragment>
                <form className="messageForm">
                    <div className="form-group">

                        <TextField
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="content"
                            value={this.state.content}
                        />
                    </div>
                    <Button variant="outlined" color="primary" size="large"
                        type="submit"
                        onClick={this.updateMessage}
                        className="btn btn-primary"
                    >
                        Update Message
                        </Button>
                </form>
            </React.Fragment>
        )
    }
}



