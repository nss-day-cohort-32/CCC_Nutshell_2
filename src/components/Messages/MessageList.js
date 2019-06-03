import React, { Component } from 'react'
import { withRouter } from "react-router"
import MessageItem from "./MessageItem"
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';


class MessageList extends Component {

    state = {
        // "userId": 1,
        content: "",
        timestamp: this.getTimeStamp()
    };

    // Update state whenever an input field is edited
    handleFieldChange = (event) => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value;
        this.setState(stateToChange);
    };


    resetInput() {
        console.log("working")
        this.setState({
            content: " "
        })
        return
    }
    /*
          Local method for validation, creating article object, and
          invoking the function reference passed from parent component
          */
    constructNewMessage = e => {
        e.preventDefault();

        const message = {
            content: this.state.content,
            timestamp: this.state.timestamp
        };

        // Create the message and redirect user to message list
        this.props
            .addMessage(message)
            .then(this.resetInput())
    };

    getTimeStamp() {
        let now = new Date();
        return ((now.getMonth() + 1) + "/" +
            (now.getDate()) + "/" +
            now.getFullYear() + " " +
            now.getHours() + ":" +
            ((now.getMinutes() < 10)
                ? ("0" + now.getMinutes())
                : (now.getMinutes())) + ":" +
            ((now.getSeconds() < 10)
                ? ("0" + now.getSeconds())
                : (now.getSeconds())))
    }

    render() {
        return (
            <React.Fragment>
                <Card className="messages">
                    {
                        this.props.messages.map(message => {
                            return <MessageItem key={message.id} message={message}
                                deleteMessage={this.props.deleteMessage} {...this.props}
                                patchMessage={this.props.patchMessage} {...this.props}
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
                            id="content"
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
            </React.Fragment >
        )
    }
}

export default withRouter(MessageList)