import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class ArticleItem extends Component {
    render() {
        return (
            <div key={this.props.article.id} className="card">
                <div className="card-body">
                    <h3>{this.props.article.name}</h3>
                    <Link className="nav-link" to={`/articles/${this.props.article.id}`}>Details</Link>
                    <button
                        type="button"
                        className="btn btn-success btn--edit"
                        onClick={() => {
                            this.props.history.push(`/articles/${this.props.article.id}/edit`);
                        }}>
                        Edit
                    </button>
                    <button onClick={this.handleClick}>Delete</button>
                </div>
            </div>
        )
    }
}
