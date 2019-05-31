import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import ArticleForm from "./articles/ArticleForm";
import ArticleList from "./articles/ArticleList";
import EventList from "./events/EventList";
import TaskList from "./tasks/TaskList";
import MessageList from "./Messages/MessageList"
import dbCalls from "../modules/dbCalls";
import EventForm from "./events/EventForm";
import TaskForm from "./tasks/TaskForm";
import MessageForm from "./Messages/MessageForm"
import ArticleEditForm from "./articles/ArticleEditForm";
import EventEditForm from "./events/EventEditForm";
import TaskEditForm from "./tasks/TaskEditForm";
import Login from "./Auth/Login"
import Registeration from "./Auth/Registration"


const now = new Date();
const today =
    now.getFullYear() +
    "-" +
    ((now.getMonth() < 9 ? `0` : ``) + (now.getMonth() + 1)) +
    "-" +
    now.getDate();

const remoteURL = "http://localhost:5002";
const articlesURL = `${remoteURL}/articles`;
const tasksURL = `${remoteURL}/tasks`;
const eventsURL = `${remoteURL}/events`;
const usersURL = `${remoteURL}/users`
const getEventsURL = `${remoteURL}/events?_sort=date&_order=asc&date_gte=${today}`;

class ApplicationViews extends Component {
    isAuthenticated = () => sessionStorage.getItem("username") !== null
    state = {
        articles: [],
        events: [],
        tasks: [],
        messages: [],
        friends: [],
        users: [],
        sessionId: sessionStorage.getItem("userId")
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
    updateArticle = editedArticleObj => {
        return dbCalls
            .put(articlesURL, editedArticleObj)
            .then(() => dbCalls.all(articlesURL))
            .then(articles => {
                console.log("this is history", this.props.history);
                this.props.history.push("/articles");
                this.setState({
                    articles: articles
                });
            });
    };

    updateEvent = editedEventObj => {
        return dbCalls
            .put(eventsURL, editedEventObj)
            .then(() => dbCalls.all(eventsURL))
            .then(events => {
                console.log("this is history", this.props.history);
                this.props.history.push("/events");
                this.setState({
                    events: events
                });
            });
    };

    updateTask = editedTaskObj => {
        return dbCalls
            .put(tasksURL, editedTaskObj)
            .then(() => dbCalls.all(tasksURL))
            .then(tasks => {
                console.log("this is history", this.props.history);
                this.props.history.push("/tasks");
                this.setState({
                    tasks: tasks
                });
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

    patchTask = editObj => {
        console.log(editObj);
        dbCalls
            .patch(editObj, tasksURL)
            .then(() => dbCalls.all(tasksURL))
            .then(tasks =>
                this.setState({
                    tasks: tasks
                })
            );
    };

    // update users
    updateComponent = () => {

        dbCalls.getUsers().then(allUsers => {
            this.setState({ users: allUsers });
            console.log(allUsers)
        })
        dbCalls.getUsers(this.state.sessionId)
            .then(allIdea => {
                this.setState({     //the method setstate stores the result in the local component state by using React 
                    idea: allIdea
                })
            })
    }
    // add users here
    addUser = (user) => dbCalls.post(user, usersURL)
        .then(() => dbCalls.all(usersURL))
        .then(Allusers => this.setState({
            users: Allusers             //added this three line of codes today to set the new user.
        }))

    render() {
        return (
            <>
                <Route path="/login" render={(props) => {
                    return <Login {...props}
                        users={this.state.users}
                        updateComponent={this.updateComponent} />
                }} />
                <Route path="/register" render={(props) => {
                    return <Registeration {...props}
                        users={this.state.users}
                        addUser={this.addUser} />
                }} />

                {/* location form route */}
                <Route
                    path="/articles/new"
                    render={props => {
                        return (
                            <ArticleForm
                                {...props}
                                addArticle={this.addArticle}
                                articles={this.state.articles}
                                sessionId={this.state.sessionId}
                            />
                        );
                    }}
                />
                <Route
                    exact
                    path="/articles"
                    render={props => {
                        if (this.isAuthenticated()) {
                            return (
                                <ArticleList
                                    {...props}
                                    articles={this.state.articles}
                                    deleteArticle={this.deleteArticle}
                                />
                            );
                        } else {
                            return <Redirect to="/login" />
                        }
                    }}
                />
                <Route
                    path="/articles/:articleId(\d+)/edit"
                    render={props => {
                        return (
                            <ArticleEditForm
                                {...props}
                                articles={this.state.articles}
                                updateArticle={this.updateArticle}
                            />
                        );
                    }}
                />
                <Route
                    path="/events/new"
                    render={props => {
                        return (
                            <EventForm
                                {...props}
                                addEvent={this.addEvent}
                                events={this.state.events}
                                sessionId={this.state.sessionId}
                            />
                        );
                    }}
                />
                <Route
                    path="/events/:eventId(\d+)/edit"
                    render={props => {
                        return (
                            <EventEditForm
                                {...props}
                                events={this.state.events}
                                updateEvent={this.updateEvent}
                            />
                        );
                    }}
                />

                <Route
                    exact
                    path="/events"
                    render={props => {
                        if (this.isAuthenticated()) {
                            return (
                                <EventList
                                    events={this.state.events}
                                    {...props}
                                    deleteEvent={this.deleteEvent}
                                />
                            );
                        } else {
                            return <Redirect to="/login" />
                        }
                    }}
                />

                <Route
                    exact
                    path="/tasks"
                    render={props => {
                        if (this.isAuthenticated()) {
                            return (
                                <TaskList
                                    {...props}
                                    tasks={this.state.tasks}
                                    patchTask={this.patchTask}
                                    deleteTask={this.deleteTask}
                                />
                            );
                        } else {
                            return <Redirect to="/login" />
                        }
                    }}
                />

                <Route
                    path="/tasks/:tasksId(\d+)/edit"
                    render={props => {
                        return (
                            <TaskEditForm
                                {...props}
                                tasks={this.state.tasks}
                                updateTask={this.updateTask}
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
                                sessionId={this.state.sessionId}
                            />
                        );
                    }}
                />
                <Route
                    exact
                    path="/messages"
                    render={props => {
                        if (this.isAuthenticated()) {
                            return (
                                <MessageList
                                    {...props}
                                    messages={this.state.messages}
                                // patch={this.patchTask}
                                // deleteTask={this.deleteTask}
                                />
                            );
                        } else {
                            return <Redirect to="/login" />
                        }
                    }}
                />
            </>
        );
    }
}

export default withRouter(ApplicationViews);
