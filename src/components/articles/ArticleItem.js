import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';

export default class ArticleItem extends Component {

    render() {
        return (
            <div key={this.props.article.id} className="card">
                <CardActions>
                    <Card className="card-body">
                        <CardContent> <h1>{this.props.article.name} </h1></CardContent>
                        <Typography variant="body2" color="textPrimary" component="p">{this.props.article.summary}</Typography>
                        <Typography variant="body2" color="textPrimary" component="p"> {this.props.article.URL} </Typography>
                        <Button size="small" color="primary"
                            type="button"
                            className="btn btn-success btn--edit"
                            onClick={() => {
                                this.props.history.push(`/articles/${this.props.article.id}/edit`);
                            }}>
                            Edit
                    </Button>
                        <Button size="small" color="primary"
                            onClick={() => this.props.deleteArticle(this.props.article.id)}
                            className="card-link">Delete</Button>
                    </Card>
                </CardActions>
            </div>
        )
    }
}
