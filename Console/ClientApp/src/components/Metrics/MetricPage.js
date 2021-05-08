import React, { Component, useState } from 'react';
import { Button, Container, Label, ModalHeader} from 'reactstrap';
import { LoadingData } from '../LoadingData';
import { MetricForm } from './MetricForm';

export function MetricElement(props) {
    const [editing, setEditing] = useState(false)

    return (
        <Container>
            <Button color="warning" size="lg" className="m-2" disabled={editing} onClick={setEditing.bind(true)}>Изменить</Button>
            <Button color="secondary" size="lg" className="m-2" disabled={!editing} onClick={e => setEditing(false)}>Отменить изменение</Button>
            <MetricForm readOnly={!editing} item={props.item} />
        </Container>
    )
}

class MetricForm1 extends Component {

    hasError() {
        const form = this.formEl.current._inputs;
        return (
            form.name.context.FormCtrl.hasError() ||
            form.plugin.context.FormCtrl.hasError() ||
            form.cron.context.FormCtrl.hasError() ||
            form.history.context.FormCtrl.hasError()
            )
    }
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