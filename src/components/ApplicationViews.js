import React, { Component } from 'react';
import { Route } from "react-router-dom"
import ArticleList from './articles/ArticleList';

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

    /* delete article function goes here.... */






    render() {
        return (
            <>
                <Route exact path="/articles" render={(props) => {
                    return <ArticleList
                        articles={this.state.articles} {...props} />
                }} />
            </>
        );
    }
}

export default ApplicationViews;
