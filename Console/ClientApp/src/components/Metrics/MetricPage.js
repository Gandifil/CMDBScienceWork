import React, { Component, useState } from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { ValueTypeField } from '../ValueTypeField';
import { ToggleEditButton } from '../ToggleEditButton';
import { Button, Container, Label, ModalHeader} from 'reactstrap';
import { LoadingData } from '../LoadingData';


export function MetricForm(props) {
    const [name, setName] = useState(props.item.name)
    const [type, setType] = useState(props.item.type)
    const [plugin, setPlugin] = useState(props.item.plugin)
    const [cron, setCron] = useState(props.item.cron)
    const [historyDays, setHistoryDays] = useState(props.item.historyDays)
    const readOnly = props.readOnly

    return (
        <AvForm onValidSubmit={e => props.onSubmit()}>
            <AvField
                label="Наименование"
                name="name"
                bsSize="lg"
                style={{ backgroundColor: "#fff" }}
                readOnly={readOnly}
                onChange={e => setName(e.currentTarget.value)}
                value={name} required />

            <ValueTypeField
                readOnly={readOnly}
                onChange={e => setType(e.currentTarget.value)}
                value={type}
                required />

            <AvField label="Плагин" name="plugin" bsSize="lg" style={{ backgroundColor: "#fff" }} readOnly={readOnly}
                onChange={e => setPlugin(e.currentTarget.value)}
                value={plugin} required />
            <AvField label="Cron-расписание" name="cron" bsSize="lg" style={{ backgroundColor: "#fff" }} readOnly={readOnly}
                onChange={e => setCron(e.currentTarget.value)} value={cron} required />
            <AvField
                label="История храниться в течении (д.)"
                name="history" bsSize="lg"
                style={{ backgroundColor: "#fff" }}
                readOnly={readOnly}
                onChange={e => setHistoryDays(e.currentTarget.value)} value={historyDays}
                type="number" min="1" max="30" required />
            {readOnly ? "" : <Button color="primary" size="lg" className="m-2">Сохранить</Button>}
        </AvForm >
    )
}

export function MetricElement(props) {
    const [editing, setEditing] = useState(false)

    return (
        <Container>
            <Button color="warning" size="lg" className="m-2" disabled={editing} onClick={setEditing.bind(true)}>Изменить</Button>
            <Button color="secondary" size="lg" className="m-2" disabled={!editing} onClick={e => setEditing(false)}>Отменить изменение</Button>
            <MetricForm readOnly={!editing} item={props.item}/>
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