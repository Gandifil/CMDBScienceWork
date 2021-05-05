import React, { Component } from 'react';
import { EntitiesTable } from '../../EntitiesTable';

export function EquipmentAttributesTab(props) {
    const typeNames = ["Строка", "Проценты", "Вещественное", "Целое"]

    const renderItem = (item) =>
        <tr key={item.id}>
            <td>{item.name}</td>
            <td>{typeNames[item.type]}</td>
            <td>{item.value}</td>
        </tr>

    return <EntitiesTable headers={["Имя", "Тип", "Значение"]} renderItem={renderItem} resource={`/api/equipments/${props.id}/attributes`} />
}