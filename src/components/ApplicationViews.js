import { Route, Redirect } from 'react-router-dom'
import React, { Component } from "react"
import { withRouter } from 'react-router'

class ApplicationViews extends Component {

    state = {
        articles: [],
        events: [],
        tasks: [],
        messages: [],
        friends: [],
        users: []
    }


    componentDidMount() {
        const newState = {}

        fetch("http://localhost:5002/articles")
            .then(r => r.json())
            .then(articles => newState.articles = articles)
            .then(() => fetch("http://localhost:5002/events")
                .then(r => r.json()))
            .then(events => newState.events = events)
            .then(() => fetch("http://localhost:5002/tasks")
                .then(r => r.json()))
            .then(tasks => newState.tasks = tasks)

            .then(() => fetch("http://localhost:5002/messages")
                .then(r => r.json()))
            .then(messages => newState.messages = messages)

            .then(() => fetch("http://localhost:5002/friends")
                .then(r => r.json()))
            .then(friends => newState.friends = friends)

            .then(() => fetch("http://localhost:5002/users")
                .then(r => r.json()))
            .then(users => newState.users = users)
            .then(() => this.setState(newState))
    }








    render() {
        return (
            <>
            </>
        );
    }
}

export default ApplicationViews;
