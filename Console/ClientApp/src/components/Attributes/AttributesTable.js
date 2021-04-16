import React, { Component } from 'react';
import { AttributeRow } from './AttributeRow';

export class AttributesTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Название</th>
                            <th>Тип</th>
                            <th>Действие</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.items.map(x => <AttributeRow item={x} />)}
                    </tbody>
                </table>
        );
    }
}