import React, { Component, useState } from 'react';
import { Button, Container, Label, ModalHeader} from 'reactstrap';
import { MetricForm } from './MetricForm';

export function NewMetricPage(props) {
    const item = {
        name: "",
        type: 0,
        plugin: "",
        cron: "",
        historyDays: 20,
    }

    const handleSave = (item) => console.log(item)

    return (
        <Container>
            <ModalHeader>Создание метрики</ModalHeader>
            <MetricForm item={item} readOnly={false} onSave={handleSave} />
        </Container>
    );
}