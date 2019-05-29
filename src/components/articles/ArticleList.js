import React, { Component } from 'react'
import { withRouter } from "react-router"
import ArticleItem from "./ArticleItem"

class ArticleList extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="articleButton">
                    <button type="button"
                        className="btn btn-success"
                        onClick={() => {
                            this.props.history.push("/articles/new")
                        }}>
                        Add New Article
                    </button>
                </div>
                {
                    this.props.articles.map(article => {
                        return <ArticleItem key={article.id} article={article}
                            deleteArticle={this.props.deleteArticle} {...this.props} />
                    })
                }
            </React.Fragment>
        )
    }
}

export default withRouter(ArticleList)
