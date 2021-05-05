import React from 'react';
import { Button, Container, ModalHeader, Table } from 'reactstrap';
import { useAsync, useFetch } from "react-async"
import ReactLoading from 'react-loading';
import { AddButton } from './AddButton';
import { ItemsTable } from './ItemsTable';

function LoadingData(props) {
    const { data, error, isPending } = useFetch(props.resource, {
        headers: { accept: "application/json" },
    })
    if (isPending) return <ReactLoading type="cylon" color="black" className="m-auto" height={'30%'} width={'30%'} />
    if (error) return `Something went wrong: ${error.message}`
    if (data)
        return props.render(data)
    return null
}

export function EntitiesTable(props) {
    const renderTable = (data) => 
        <ItemsTable headers={props.headers} items={data} render={ props.renderItem } />

    return (
        <Container>
            <AddButton name="Добавить" onClick={props.onAddClick} />
            <LoadingData resource={props.resource} render={renderTable}/>
        </Container>
    );
}