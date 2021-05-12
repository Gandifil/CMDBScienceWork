import React, { Component, useState } from 'react';
import { Button, Container, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { AddButton } from '../../Buttons/AddButton';
import { EntitiesTable } from '../../EntitiesTable';
import { handleErrors } from '../../HandleErrors';
import { NotificationManager } from 'react-notifications';
import { DeleteButton } from '../../Buttons/DeleteButton';
import { LinkButton } from '../../Buttons/LinkButton';

function EquipmentMetricsAddModal(props) {
    const typeNames = ["Строка", "Проценты", "Вещественное", "Целое"]

    const handleAdd = (id) => {
        fetch(`/api/equipments/${props.id}/parameters/${id}`, { method: "POST" })
            .then(handleErrors)
            .then(data => document.location.reload())
            .catch(e => NotificationManager.error(e.message, "Ошибка при добавлении параметра", 5000))
    }

    const renderItem = (item) =>
        <tr key={item.id}>
            <td>{item.name}</td>
            <td>{typeNames[item.type]}</td>
            <td>{item.cron}</td>
            <td><AddButton onClick={handleAdd.bind(null, item.id)} /></td>
        </tr>

    return <EntitiesTable headers={["Имя", "Тип", "Расписание"]} renderItem={renderItem} resource={`/api/metrics`} />

}

function EquipmentMetricsRow(props) {
    const [deleted, setDeleted] = useState(false);
    const item = props.item

    const deleteParameter = () => {
        fetch(`/api/equipments/${props.id}/parameters/${item.id}`, { method: "DELETE" })
            .then(handleErrors)
            .then(response => setDeleted(true))
            .catch(e => {
                NotificationManager.error(e.message, "Ошибка при удалении параметра", 5000)
            })
    }

    if (deleted)
        return (null);
    else
        return (
            <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.value}</td>
                <td>{item.updateTime}</td>
                <td>
                    <LinkButton to={`/parameters/`+item.id}/>
                    <DeleteButton items={["Удаление параметра"]} onDelete={deleteParameter} />
                </td>
            </tr>
        )
}

export function EquipmentMetricsTab(props) {
    const typeNames = ["Строка", "Проценты", "Вещественное", "Целое"]

    const [modal, setModal] = useState(false)

    const handleAdd = (e) => setModal(true)
    const handleCancel = (e) => setModal(false)

    const renderItem = (item) => <EquipmentMetricsRow id={props.id} item={item}/>

    return (
        <Container>
            <Modal isOpen={modal} >
                <ModalHeader>Добавление параметра</ModalHeader>
                <ModalBody>
                    <EquipmentMetricsAddModal id={props.id}/>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={handleCancel}>Отмена</Button>
                </ModalFooter>
            </Modal>
            <AddButton onClick={handleAdd}/>
            <EntitiesTable headers={["Имя", "Значение", "Сбор произошел в", "Действия"]} renderItem={renderItem} resource={`/api/equipments/${props.id}/parameters`} />
        </Container>
    )

}