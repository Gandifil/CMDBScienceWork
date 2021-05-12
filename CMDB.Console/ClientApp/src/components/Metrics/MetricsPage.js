import React, { Component } from 'react';
import { Container, Label, ModalHeader } from 'reactstrap';
import { MetricRow } from './MetricRow';
import { EntitiesTable } from '../EntitiesTable';
import { useHistory } from 'react-router-dom';
import { AddButton } from '../Buttons/AddButton';

export function MetricsPage(props) {
    const renderItem = (data) =>
        <MetricRow item={data} />

    const history = useHistory()

    const handleAdd = (e) => history.push("/metrics/new")

    return (
        <Container>
            <ModalHeader>Список метрик</ModalHeader>
            <AddButton onClick={handleAdd} />
            <EntitiesTable headers={["Имя", "Плагин", "Расписание", "Действия"]} renderItem={renderItem} resource={`/api/metrics`}/>
        </Container>
    );
}
