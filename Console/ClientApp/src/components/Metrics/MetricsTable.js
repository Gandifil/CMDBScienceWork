import React, { Component } from 'react';
import { MetricRow } from './MetricRow';

export class MetricsTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Название</th>
                        <th>Плагин</th>
                        <th>Расписание</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.items.map(x => <MetricRow item={x} />)}
                </tbody>
            </table>
        );
    }
}