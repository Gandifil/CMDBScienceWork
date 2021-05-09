import React, { useState } from 'react';
import { DeleteButton } from '../Buttons/DeleteButton';
import { LinkButton } from '../Buttons/LinkButton';
import { handleErrors } from '../HandleErrors';

export function MetricRow(props) {
    const [deleted, setDeleted] = useState(false);

    const deleteMetric = () => {
        fetch('api/metrics/' + props.item.id, { method: "DELETE" })
            .then(handleErrors)
            .then(response => setDeleted(true))
            .catch(e => console.log(e.message))
    }

    if (deleted)
        return (null);
    else
        return (
            <tr key={props.item.id}>
                <td>{props.item.name}</td>
                <td>{props.item.plugin}</td>
                <td>{props.item.cron}</td>
                <td>
                    <LinkButton to={'/metrics/' + props.item.id} />
                    <DeleteButton items={["Удаление метрики", "Удаление всех связанных параметров"]} onDelete={deleteMetric} />
                </td>
            </tr>
        );
}