import React from 'react';
import { Button } from '@material-ui/core';
import IngrdientsList from '../../Components/IngredientsList/IngrdientsList';

export default class RecipesResults extends React.Component {
    render() {
        return (
            <div>
                <p style={{ marginLeft: 14 }}> O que eu tenho</p>
                <div style={{
                    position: "fixed",
                    right: 0,
                    left: 0,
                    top: 100,
                    bottom: 50,
                    overflowY: 'auto'
                }}>
                    <IngrdientsList
                        addItem={this.props.addItem}
                        ingredientes={this.props.ingredientes}
                    />
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.props.onSearch}
                    style={{
                        position: 'fixed',
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        height: 50
                    }}
                >
                    Procurar
                </Button>
            </div>
        )
    }
}