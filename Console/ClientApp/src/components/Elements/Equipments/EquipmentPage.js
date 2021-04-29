import React, { Component } from 'react';
import { ElementPage } from '../ElementPage';
import { EquipmentMainTab } from './EquipmentMainTab';
import { EquipmentAttributesTab } from './EquipmentAttributesTab';
import { EquipmentMetricsTab } from './EquipmentMetricsTab';
import { ModalHeader } from 'reactstrap';

export function EquipmentPage(props) {
    return (
        <div>
            <ModalHeader>Оборудование</ModalHeader>
            <ElementPage items={[
                {
                    name: "Основное",
                    render: () => (<EquipmentMainTab /> ),
                },
                {
                    name: "Атрибуты",
                    render: () => (<EquipmentAttributesTab />),
                },
                {
                    name: "Метрики",
                    render: () => (<EquipmentMetricsTab />),
                },
            ]} />
        </div>
    );
}