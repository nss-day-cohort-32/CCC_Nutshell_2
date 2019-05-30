import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import "./Article.css"
import dbCalls from '../../modules/dbCalls';



const remoteURL = "http://localhost:5002";
const articlesURL = `${remoteURL}/articles`;
class ArticleEditForm extends Component {

    state = {
        articleName: "",
        articleSummary: "",
        articleURL: "",
        name: "",
        summary: "",
        URL: ""
      }
      handleFieldChange = (evt) => {
          const stateToChange = {};
          stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
        console.log(stateToChange)
      }
      updateExisitingArticle = (evt) => {

          evt.preventDefault()
          const editArticle = {
        id: this.props.match.params.articleId,
        name: this.state.articleName,
        summary: this.state.articleSummary,
            URL: this.state.articleURL
        };
        console.log("edit articles", editArticle)
          this.props.updateArticle(editArticle)
      }
    componentDidMount() {
          dbCalls.get(articlesURL,this.props.match.params.articleId)
          .then(article => {
            this.setState({
                name: article.name,
                summary: article.summary,
                URL: article.URL
            });
          })
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
                            placeholder={this.state.name}
                        />
                    </div>
                    <div className="form-group">
                        <TextField
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="articleSummary"
                            placeholder={this.state.summary}
                        />
                    </div>
                    <div className="form-group">
                        <TextField
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="articleURL"
                            placeholder={this.state.URL}
                        />
                    </div>
                    <Button variant="outlined" color="primary" size="large"
                        type="submit"
                        onClick={this.updateExisitingArticle}
                        className="btn btn-primary"
                    >
                        Update
                </Button>
                </form>
            </React.Fragment>
        );
    }
}

export default ArticleEditForm;
