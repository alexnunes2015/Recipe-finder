import React from 'react';
import { Checkbox } from '@material-ui/core';

export default class IngrdientsList extends React.Component {
    render() {
        return (
            this.props.ingredientes.map((item, i) => {
                return <p key={i}><Checkbox onChange={this.props.addItem} id={item} />{item}</p>
            })
        );
    }
}