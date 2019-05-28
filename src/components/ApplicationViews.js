import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import dbCalls from './modules/dbCalls';
import ArticleForm from './articles/ArticleForm';
import ArticleList from './articles/ArticleList';

const remoteURL = "http://localhost:5002"
const articlesURL = `${remoteURL}/articles`


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

addArticle = newArticleObj => 
    dbCalls.post(newArticleObj, articlesURL)
    .then( () => dbCalls.all(articlesURL))
    .then(articles =>
        this.setState({
            articles: articles
        }))


    /* delete article function goes here.... */






    render() {
        return (
            <>
            {/* location form route */}
            <Route path="/articles/new" render={(props) => {
                    return <ArticleForm {...props}
                                        addArticle={this.addArticle}
                                        articles={this.state.articles} />
                                    }} />
                <Route exact path="/articles" render={(props) => {
                    return <ArticleList
                        articles={this.state.articles} {...props} />
                }} />
            </>
        )}}

export default ApplicationViews;
