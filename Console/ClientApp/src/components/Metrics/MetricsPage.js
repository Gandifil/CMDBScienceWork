import React, { Component } from 'react';
import { Button, Container, Label, ModalHeader } from 'reactstrap';
import { MetricRow } from './MetricRow';
import { EntitiesTable } from '../EntitiesTable';
//import { EditMetricModal } from './EditMetricModal';

export function MetricsPage(props) {
    const renderItem = (data) =>
        <MetricRow item={data} />

    return (
        <Container>
            <ModalHeader>Список метрик</ModalHeader>
            <EntitiesTable headers={["Имя", "Плагин", "Расписание", "Действия"]} renderItem={renderItem} resource={`/api/metrics`} />
        </Container>
    );
}
