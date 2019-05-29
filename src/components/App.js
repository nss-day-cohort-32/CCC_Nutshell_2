import React, { Component } from "react"
import NavBar from "./navbar/NavBar"
import { BrowserRouter as Router } from 'react-router-dom'
import ApplicationViews from "./ApplicationViews"
import SearchApp from "./navbar/SearchApp"

import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"


class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <SearchApp />
          <ApplicationViews />
        </React.Fragment>
      </Router>
    )
  }
}

export default App