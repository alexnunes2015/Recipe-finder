import React from 'react';
import { REST_URL } from '../../REST_URL';
import './ShowRecipe.css';

export default class ShowRecipe extends React.Component {
    render() {
        return (<div className="ShowRecipe">
            <iframe
                frameBorder="0"
                src={REST_URL + "/DIRECTORY/" + this.props.currentRecipe + "/recipe.html"}
                title="recipe"
                className="ShowRecipeFrame"
            />
        </div>)
    }
}