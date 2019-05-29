import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import "./Article.css"


class ArticleEditForm extends Component {







    render() {
        return (
            <React.Fragment >
                <form className="articleForm">
                    <div className="form-group">
                        <label htmlFor="articleName">Article Name:</label>
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
                        <label htmlFor="summary">Summary</label>
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
                        <label htmlFor="URL">URL</label>
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

export default ArticleEditForm;
