import React, { Component } from "react"

import { Link } from "react-router-dom"



export default class Login extends Component {
    // Set initial state
    state = {
        email: "",
        username: ""
    }

    // Update state whenever an input field is edited
    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    // Simplistic handler for login submit
    handleLogin = (e) => {
        e.preventDefault()

    //    Setting username in session storage. Grabbing the username from session 
    //storage and searching through "users" in the datatbase. The .find attempts to find 
    //a username that matches the username in session storage. If able to find a match, 
    //log in under that user. If not, display message that username not found.

        sessionStorage.setItem(
            "username",
            this.state.username)

        let currentUser = sessionStorage.getItem("username")
        //we get the current user from the session storage.
        console.log(this.props.users)
        console.log(this.state)
        let authenticated = this.props.users.find(user =>   //The find() method returns the value of the first element in the array that satisfies the provided testing function. Otherwise undefined is returned.
            user.name === this.state.username )
            console.log(currentUser)
            console.log(this.props.users)

            console.log(authenticated)
// authenticated is not getting the updated props. thats why is throwing an arror.and it's also undefined.
            // sessionStorage.setItem(
            //     "userId",
            //     authenticated.id)

            if (authenticated === undefined){
                alert("Please re-renter a valid username and email or sign up below!")
        //if the user is not registered direct them to the registeration page.
                this.props.history.push("/register")
            } else {
                sessionStorage.setItem(
                    "userId",
                    authenticated.id)

                          // UPDATING THE COMPONENT WITHOUT REFRESHING THE PAGE
                         this.props.updateComponent()
                         // Taking user to idea page
                         this.props.history.push("/articles")

                    }

    }
    //if the username is not equal to null remove everything in the session storage.
   componentDidMount() {
       if(sessionStorage.getItem("username") !== null){
           sessionStorage.removeItem("username")
           sessionStorage.removeItem("userId")
           sessionStorage.removeItem("credentials")
       }
   }

    render()
    {


        return (
             //The onSubmit handler of the form is used to execute the class method
            <section className="login">
                <form className="registerContainer" onSubmit={this.handleLogin}>   
                    <h2>Please sign in</h2>
                    <label htmlFor="inputUsername">
                    </label> <br></br>
                    <input onChange={this.handleFieldChange} type="text"
                        id="username"
                        placeholder="Username"
                        required autoFocus="" />
                        <br></br>
                    <label htmlFor="inputEmail">
                    </label>
                    <br></br>
                    <input onChange={this.handleFieldChange} type="email" //onchange is a listener
                        id="email"
                        placeholder="Email"
                        required />
                        <br></br>
                    <button type="submit" className="btn btn-primary signIn" >Sign in </button>

                    <p className="signUp">Don't have an account? <Link className="nav-link signUpLink" to="/register">Sign Up</Link></p>
                </form>
            </section>
        )
    }
}