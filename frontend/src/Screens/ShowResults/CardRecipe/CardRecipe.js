import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { REST_URL } from '../../../REST_URL';

export default class CardRecipe extends React.Component {
    constructor(props) {
        super(props);

        this.onOpenRecipe = this.onOpenRecipe.bind(this);
    }

    onOpenRecipe() {
        this.props.onOpenRecipe(this.props.rid);
    }

    render() {
        return (
            <Card style={{ maxWidth: "95%", minWidth: "95%", float: "left", margin: 10 }}>
                <CardActionArea onClick={this.onOpenRecipe}>
                    <CardMedia
                        style={{ height: 140 }}
                        image={REST_URL + "/DIRECTORY/" + this.props.rid + "/img.jpg"}
                        title={this.props.name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {this.props.rname}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card >
        );
    }
}
