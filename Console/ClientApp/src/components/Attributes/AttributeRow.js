import React, { useState } from 'react';
import { NotificationManager } from 'react-notifications';
import { handleErrors } from '../HandleErrors';
import { DeleteButton } from '../Buttons/DeleteButton';
import { OpenModalButton } from '../Buttons/OpenModalButton';
import { EditAttributeModal } from './EditAttributeModal';


export function AttributeRow(props) {
    const [deleted, setDeleted] = useState(false);

    const typeNames = ["Строка", "Проценты", "Вещественное", "Целое"]

    const deleteAttribute = () => {
        fetch('api/attributes/' + props.item.id, { method: "DELETE" })
            .then(handleErrors)
            .then(response => setDeleted(true))
            .catch(e => {
                NotificationManager.error(e.message, "Ошибка при удалении атрибута", 5000)
            })
    }

    const item = props.item;
    if (deleted)
        return (null);
    else
        return (
            <tr key={item.id}>
                <td>{item.name}</td>
                <td>{typeNames[item.type]}</td>
                <td>
                    <OpenModalButton>
                        <EditAttributeModal item={item} />
                    </OpenModalButton>
                    <DeleteButton items={["Удаление атрибута", "Удаление всех связанных с ним значений"]} onDelete={deleteAttribute} />
                </td>
            </tr>
        );
}

//this.handleEditAccept = (e) => this.setState({ item: e.state.item, deleted: false })
//<OpenModalButton>
                    //    <EditAttributeModal item={item} />
                    //</OpenModalButton>
