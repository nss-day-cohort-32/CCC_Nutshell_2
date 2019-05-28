import React, { Component } from "react";



export default class ArticleForm extends Component {
 
    // Set initial state
  state = {
    articleName: "",
    articleSummary: "",
    articleURL: ""
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
  constructNewArticle = e => {
    e.preventDefault();
    if (this.state.articleID === "") {
      window.alert("Please select a caretaker");
    } else {
      const article = {
        name: this.state.articleName,
        summary: this.state.articleSummary,
        URL: this.state.articleURL
      };

      // Create the article and redirect user to article list
      this.props
        .addArticle(article)
        .then(() => this.props.history.push("/articles/new"));
    }
  };

  render() {
    return (
      <React.Fragment>
        <form className="articleForm">
          <div className="form-group">
            <label htmlFor="articleName">Article Name:</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="articleName"
              placeholder="Article Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="summary">Summary</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="summary"
              placeholder="summary"
            />
          </div>
          <div className="form-group">
            <label htmlFor="URL">URL</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="URL"
              placeholder="URL"
            />
          </div>
          <button
            type="submit"
            onClick={this.constructNewArticle}
            className="btn btn-primary"
          >
            Submit New Article
          </button>
        </form>
      </React.Fragment>
    );
  }
}