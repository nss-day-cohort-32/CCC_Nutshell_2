import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import "./Article.css"


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
    let userId = sessionStorage.getItem('userId')
      const article = {
        name: this.state.articleName,
        summary: this.state.articleSummary,
        URL: this.state.articleURL,
        userId: parseInt(userId)
      };

      // Create the article and redirect user to article list
      this.props
        .addArticle(article)
        .then(() => this.props.history.push("/articles"));
  }

  render() {

    return (
      <React.Fragment >
        <form className="articleForm">
          <div className="form-group">

            <TextField
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="articleName"
              placeholder="Article Name"
            />
          </div>
          <div className="form-group">

            <TextField
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="articleSummary"
              placeholder="summary"
            />
          </div>
          <div className="form-group">

            <TextField
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="articleURL"
              placeholder="URL"
            />
          </div>
          <Button variant="outlined" color="primary" size="large"
            type="submit"
            onClick={this.constructNewArticle}
            className="btn btn-primary"
          >
            Submit New Article
          </Button>
        </form>
      </React.Fragment>
    );
  }
}