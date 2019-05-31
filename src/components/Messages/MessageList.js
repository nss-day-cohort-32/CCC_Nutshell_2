import React, { Component } from 'react'
import { withRouter } from "react-router"
import MessageItem from "./MessageItem"
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';


class MessageList extends Component {

    state = {
        // "userId": 1,
        contentName: "",
        timestamp: ""
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
    constructNewMessage = e => {
        e.preventDefault();

        const message = {
            content: this.state.contentName,
            // timestamp: this.state.timestamp
        };

        // Create the message and redirect user to message list
        this.props
            .addMessage(message)
            .then(() => this.props.history.push("/messages"));
    }

    render() {
        console.log("props", this.props)
        return (
            <React.Fragment>
                <Card className="messages">
                    {
                        this.props.messages.map(message => {
                            return <MessageItem key={message.id} message={message}
                                deleteMessage={this.props.deleteMessage} {...this.props}
                                updateMessage={this.props.updateMessage} {...this.props}
                                addMessage={this.props.addMessage}  {...this.props}
                            />
                        })
                    }
                </Card>
                <form className="messageForm">
                    <div className="form-group">

                        <TextField
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="contentName"
                            placeholder="Type a message...."
                        />
                    </div>
                    <Button variant="outlined" color="primary" size="large"
                        type="submit"
                        onClick={this.constructNewMessage}
                        className="btn btn-primary"
                    >
                        Send Message
                    </Button>
                </form>
            </React.Fragment>
        )
    }
}

export default withRouter(MessageList)