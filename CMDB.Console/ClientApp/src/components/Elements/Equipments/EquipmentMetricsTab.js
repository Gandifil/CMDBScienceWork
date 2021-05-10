import React, { Component } from 'react';
import { EntitiesTable } from '../../EntitiesTable';

export function EquipmentMetricsTab(props) {
    const typeNames = ["Строка", "Проценты", "Вещественное", "Целое"]

    const renderItem = (item) =>
        <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.value}</td>
            <td>{item.updateTime}</td>
        </tr>

    return <EntitiesTable headers={["Имя", "Значение", "Сбор произошел в"]} renderItem={renderItem} resource={`/api/equipments/${props.id}/parameters`} />
}