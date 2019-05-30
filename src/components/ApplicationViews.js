import React, { Component } from "react";
import { Route } from "react-router-dom";
import { withRouter } from 'react-router'
import ArticleForm from "./articles/ArticleForm";
import ArticleList from "./articles/ArticleList";
import EventList from "./events/EventList";
import TaskList from "./tasks/TaskList";
import dbCalls from "../modules/dbCalls";
import EventForm from "./events/EventForm";
import TaskForm from "./tasks/TaskForm";
import ArticleEditForm from "./articles/ArticleEditForm"
import EventEditForm from "./events/EventEditForm"

const remoteURL = "http://localhost:5002";
const articlesURL = `${remoteURL}/articles`;
const tasksURL = `${remoteURL}/tasks`;
const eventsURL = `${remoteURL}/events`;
const getEventsURL = `${remoteURL}/events?_sort=date&_order=asc`;

class ApplicationViews extends Component {
    state = {
        articles: [],
        events: [],
        tasks: [],
        messages: [],
        friends: [],
        users: []
    };

    componentDidMount() {
        const newState = {};

        dbCalls
            .all(articlesURL)
            .then(articles => (newState.articles = articles))
            .then(() => fetch(getEventsURL).then(r => r.json()))
            .then(events => (newState.events = events))
            .then(() => fetch("http://localhost:5002/tasks").then(r => r.json()))
            .then(tasks => (newState.tasks = tasks))

            .then(() => fetch("http://localhost:5002/messages").then(r => r.json()))
            .then(messages => (newState.messages = messages))

            .then(() => fetch("http://localhost:5002/friends").then(r => r.json()))
            .then(friends => (newState.friends = friends))
            .then(() => fetch("http://localhost:5002/users").then(r => r.json()))
            .then(users => (newState.users = users))
            .then(() => this.setState(newState));
    }

    /* delete article function goes here.... */
    deleteArticle = id => {
        const newState = {};
        dbCalls
            .delete(id, articlesURL)
            .then(() => dbCalls.all(articlesURL))
            .then(articles => (newState.articles = articles))
            .then(() => this.setState(newState));
    };

    /* delete task function goes here.... */

    deleteTask = id => {
        const newState = {};
        dbCalls
            .delete(id, tasksURL)
            .then(() => dbCalls.all(tasksURL))
            .then(tasks => (newState.tasks = tasks))
            .then(() => this.setState(newState));
    };

    deleteEvent = id => {
        const newState = {};
        dbCalls
            .delete(id, eventsURL)
            .then(() => dbCalls.all(getEventsURL))
            .then(events => (newState.events = events))
            .then(() => this.setState(newState));
    };

    //   add event Form function goes heere.... //
    addEvent = newEventObj =>
        dbCalls
            .post(newEventObj, eventsURL)
            .then(() => dbCalls.all(getEventsURL))
            .then(events =>
                this.setState({
                    events: events
                })
            );

    addArticle = newArticleObj =>
        dbCalls
            .post(newArticleObj, articlesURL)
            .then(() => dbCalls.all(articlesURL))
            .then(articles =>
                this.setState({
                    articles: articles
                })
            );

    //edit article function goes to here..../
    updateArticle= (editedArticleObj) => {
        return dbCalls.put(articlesURL,editedArticleObj)
        .then(() => dbCalls.all(articlesURL))
            .then(articles => {
                console.log("this is history",this.props.history)
                this.props.history.push("/articles")
                this.setState({
                articles: articles
          })
        });
    };

    updateEvent= (editedEventObj) => {
        return dbCalls.put(eventsURL,editedEventObj)
        .then(() => dbCalls.all(eventsURL))
            .then(events => {
                console.log("this is history",this.props.history)
                this.props.history.push("/events")
                this.setState({
                events: events
          })
        });
    };

    addTask = newTaskObj =>
        dbCalls
            .post(newTaskObj, tasksURL)
            .then(() => dbCalls.all(tasksURL))
            .then(tasks =>
                this.setState({
                    tasks: tasks
                })
            );


    render() {
        return (
            <>
                {/* location form route */}
                <Route
                    path="/articles/new"
                    render={props => {
                        return (
                            <ArticleForm
                                {...props}
                                addArticle={this.addArticle}
                                articles={this.state.articles}
                            />
                        );
                    }}
                />
                <Route
                    exact
                    path="/articles"
                    render={props => {
                        return (
                            <ArticleList
                                {...props}
                                articles={this.state.articles}
                                deleteArticle={this.deleteArticle}
                            />
                        );
                    }}
                />
                <Route
                    path="/articles/:articleId(\d+)/edit" render={props => {
                        return <ArticleEditForm {...props} articles={this.state.articles} updateArticle={this.updateArticle}/>
                    }} />
                <Route
                    path="/events/new"
                    render={props => {
                        return (
                            <EventForm
                                {...props}
                                addEvent={this.addEvent}
                                events={this.state.events}
                            />
                        );
                    }}
                />
                <Route
                    path="/events/:eventId(\d+)/edit" render={props => {
                        return <EventEditForm {...props} events={this.state.events} updateEvent={this.updateEvent}/>
                    }} />

                <Route
                    exact
                    path="/events"
                    render={props => {
                        return <EventList events={this.state.events} {...props} deleteEvent={this.deleteEvent} />;
                    }}
                />

                <Route
                    exact path="/tasks"
                    render={props => {
                        return (
                            <TaskList
                                {...props}
                                tasks={this.state.tasks}
                                deleteTask={this.deleteTask}
                            />
                        );
                    }}
                />
                <Route
                    path="/tasks/new"
                    render={props => {
                        return (
                            <TaskForm
                                {...props}
                                tasks={this.state.tasks}
                                addTask={this.addTask}
                            />
                        );
                    }}
                />
            </>
        );
    }
}

export default withRouter(ApplicationViews)
