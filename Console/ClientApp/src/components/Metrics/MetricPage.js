import React, { Component, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Container, Label, ModalHeader} from 'reactstrap';
import { handleErrors } from '../HandleErrors';
import { LoadingData } from '../LoadingData';
import { MetricForm } from './MetricForm';
import { NotificationManager } from 'react-notifications';

export function MetricElement(props) {
    const [editing, setEditing] = useState(false)
    const [item, setItem] = useState(props.item)

    const history = useHistory()

    const handleSave = (item) => {
        console.log("Сохранение метрики", item)

        const id = props.item.id

        item.id = id

        fetch("api/metrics/" + id, {
            method: "PUT",
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(handleErrors)
            .then(response => history.push("/metrics/" + id))
            .catch(e => NotificationManager.error(e.message, "Ошибка при изменении/создании атрибута", 5000))
    }

    const handleCancel = (e) => {
        setItem(props.item)
        setEditing(false)
    }

    return (
        <Container>
            <Button color="warning" size="lg" className="m-2" disabled={editing} onClick={setEditing.bind(true)}>Изменить</Button>
            <Button color="secondary" size="lg" className="m-2" disabled={!editing} onClick={handleCancel}>Отменить изменение</Button>
            <MetricForm readOnly={!editing} item={item} onSave={handleSave}/>
        </Container>
    )
}

export function MetricPage(props) {

    const id = props.match.params.id;

    const renderForm = (data) => <MetricElement item={ data } />

    return (
        <Container>
            <ModalHeader>Метрика</ModalHeader>
            <LoadingData resource={`/api/metrics/${id}`} render={renderForm} />
        </Container>
    );
}