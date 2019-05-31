import React, { Component } from 'react'
import { withRouter } from "react-router"
import MessageItem from "./MessageItem"
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';


class MessageList extends Component {
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
                        onClick={this.constructNewArticle}
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