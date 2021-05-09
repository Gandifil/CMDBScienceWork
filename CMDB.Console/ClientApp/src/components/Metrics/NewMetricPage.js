import React, { Component, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Container, Label, ModalHeader} from 'reactstrap';
import { handleErrors } from '../HandleErrors';
import { MetricForm } from './MetricForm';
import { NotificationManager } from 'react-notifications';

export function NewMetricPage(props) {
    const item = {
        name: "",
        type: "0",
        plugin: "",
        cron: "",
        historyDays: 20,
    }

    const history = useHistory()

    const handleSave = (item) => {
        console.log("Сохранение метрики", item)

        fetch("api/metrics", {
            method: "POST",
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(handleErrors)
            .then(response => response.json())
            .then(data => history.push("/metrics/" + data))
            .catch(e => NotificationManager.error(e.message, "Ошибка при изменении/создании атрибута", 5000))
    }

    return (
        <Container>
            <ModalHeader>Создание метрики</ModalHeader>
            <MetricForm item={item} readOnly={false} onSave={handleSave} />
        </Container>
    );
}