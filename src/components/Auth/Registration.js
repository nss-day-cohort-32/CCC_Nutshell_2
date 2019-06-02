import React, { Component } from "react"
import "./Login.css"





export default class Register extends Component {

    // Set initial state
    state = {
        name: "",
        email: ""
        // id:""
        //  commented out id: ""
    }

    // Update state whenever an input field is edited
    handleFieldChange = (evt) => {
        evt.preventDefault(); // added evt.preventDefault();
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }


    // Simplistic handler for login submit
    handleRegister = (e) => {
        e.preventDefault()

        /*
            For now, just store the email and username that
            the customer enters into local storage.
        */
        sessionStorage.setItem(
            "credentials",
            JSON.stringify({        //The JSON.stringify() method converts a JavaScript object or value to a JSON string, 
                name: this.state.name,
                email: this.state.email,
                // id: this.state.id
            })
        )
    }


    constructNewUser = () => {
            const user = {
                name: this.state.name,
                email: this.state.email,
                id: this.state.id
            }

            this.props.addUser(user).then(response => {
                console.log(response)
                this.props.history.push("/articles")
            })
    }

    render() {
        return (
            <section className="register">
                <form onSubmit={this.handleRegister}>

                    <h2>Sign up</h2>
                    <label htmlFor="inputUsername">
                    </label><br></br>
                    <input onChange={this.handleFieldChange} type="text"
                        id="name"
                        placeholder="Enter your username"
                        required autoFocus="" />
                        <br></br>
                    <label htmlFor="inputEmail">
                    </label>
                    <br></br>
                    <input onChange={this.handleFieldChange} type="email"
                        id="email"
                        placeholder="Enter your email"
                        required />
                        <br></br>

                    <button type="submit" onClick={() => this.constructNewUser()} className="btn btn-primary signIn">
                        Sign Up
                    </button>
                </form>
            </section>
        )
    }
}