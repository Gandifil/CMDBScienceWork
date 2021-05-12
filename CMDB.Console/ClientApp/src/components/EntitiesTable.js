import React from 'react';
import { Button, Container, ModalHeader, Table } from 'reactstrap';
import { ItemsTable } from './ItemsTable';
import { LoadingData } from './LoadingData';

export function EntitiesTable(props) {
    const renderTable = (data) => 
        <ItemsTable headers={props.headers} items={data} render={ props.renderItem } />

    return (
        <Container>
            <LoadingData resource={props.resource} render={renderTable} />
        </Container>
    );
}