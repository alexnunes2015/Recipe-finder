import React from 'react';
import CardRecipe from './CardRecipe/CardRecipe';
import './ShowResults.css';

export default class ShowResults extends React.Component {
    constructor(props) {
        super(props);

        this.onOpenRecipe = this.onOpenRecipe.bind(this);
    }

    onOpenRecipe(id) {
        this.props.onOpenRecipe(id);
    }

    render() {
        if (this.props.results === undefined) {
            return (
                <div className="ShowResultsError">
                    <center>Sem resultados</center>
                </div>
            )
        } else {
            const results = this.props.results.slice();
            let resultsDATA = results.map((item) => {
                return <CardRecipe onOpenRecipe={this.onOpenRecipe} rname={item.name} rid={item.id} key={item.id}></CardRecipe>;
            })
            return (
                <div className="ResultsData">
                    {resultsDATA}
                </div>);
        }
    }
}