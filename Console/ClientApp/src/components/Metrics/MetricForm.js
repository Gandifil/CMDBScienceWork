import React, { useState } from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { ValueTypeField } from '../ValueTypeField';
import { Button } from 'reactstrap';

export function MetricForm(props) {
    const [name, setName] = useState(props.item.name)
    const [type, setType] = useState(props.item.type)
    const [plugin, setPlugin] = useState(props.item.plugin)
    const [cron, setCron] = useState(props.item.cron)
    const [historyDays, setHistoryDays] = useState(props.item.historyDays)
    const readOnly = props.readOnly

    const handleClick = (e) => props.onSave({name, type, plugin, cron, historyDays})

    return (
        <AvForm onValidSubmit={handleClick}>
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