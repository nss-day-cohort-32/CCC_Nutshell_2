import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


export default class MessageForm extends Component {

    // Set initial state
    state = {
        // "userId": 1,
        content: "",
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
            content: this.state.content,
            timestamp: this.state.timestamp
        };

        // Create the message and redirect user to message list
        this.props
            .addMessage(message)
            .then(() => this.props.history.push("/messages"));
    }

    render() {

        return (
            <React.Fragment >
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
                        onClick={this.constructNewArticle}
                        className="btn btn-primary"
                    >
                        Send Message
          </Button>
                </form>
            </React.Fragment>
        );
    }
}