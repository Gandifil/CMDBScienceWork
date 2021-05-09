import React from 'react';
import { Table } from 'reactstrap';

export function ItemsTable(props) {
    return (
        <Table>
            <thead>
                <tr>
                    {props.headers.map(x => <th>{ x }</th>)}
                </tr>
            </thead>
            <tbody>
                {props.items.map(x => props.render(x))}
            </tbody>
        </Table>
    );
}