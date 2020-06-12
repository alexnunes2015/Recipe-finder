import React from 'react';
import CardRecipe from './CardRecipe/CardRecipe';
import './ShowResults.css';

export default class ShowResults extends React.Component {
    render() {
        if (this.props.results === undefined) {
            return (
                <div className="ShowResultsError">
                    <center>Sem resultados</center>
                </div>
            )
        } else {
            const results = this.props.results.slice();
            let resultsDATA = results.map(function (item) {
                return <CardRecipe rname={item.name} rid={item.id} key={item.id}></CardRecipe>;
            })
            return (
                <div className="ResultsData">
                    {resultsDATA}
                </div>);
        }
    }
}