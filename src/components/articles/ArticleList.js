import React, { Component } from 'react'
import { withRouter } from "react-router"
import ArticleItem from "./ArticleItem"
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import "./Article.css"


class ArticleList extends Component {
    render() {
        return (
            <React.Fragment>
                <Card className="articleButton">
                    <Button  variant="outlined" color="primary" size="large" type="button"
                        className="btn btn-success"
                        onClick={() => {
                            this.props.history.push("/articles/new")
                        }
                        }>
                        Add New Article
                    </Button>
                </Card>
                <Card className="articles">
                {
                    this.props.articles.map(article => {
                        return <ArticleItem key={article.id} article={article}
                            deleteArticle={this.props.deleteArticle} {...this.props} />
                    })
                    }
                    </Card>
            </React.Fragment>
        )
    }
}

export default withRouter(ArticleList)
