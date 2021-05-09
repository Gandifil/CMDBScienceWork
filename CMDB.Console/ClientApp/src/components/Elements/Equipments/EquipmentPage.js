import React, { Component } from 'react';
import { ElementPage } from '../ElementPage';
import { EquipmentMainTab } from './EquipmentMainTab';
import { EquipmentAttributesTab } from './EquipmentAttributesTab';
import { EquipmentMetricsTab } from './EquipmentMetricsTab';
import { ModalHeader } from 'reactstrap';

export function EquipmentPage(props) {
    const id = props.match.params.id
    return (
        <div>
            <ModalHeader>Оборудование</ModalHeader>
            <ElementPage items={[
                {
                    name: "Основное",
                    render: () => (<EquipmentMainTab id={ id } /> ),
                },
                {
                    name: "Атрибуты",
                    render: () => (<EquipmentAttributesTab id={ id} />),
                },
                {
                    name: "Метрики",
                    render: () => (<EquipmentMetricsTab id={ id } />),
                },
            ]} />
        </div>
    );
}