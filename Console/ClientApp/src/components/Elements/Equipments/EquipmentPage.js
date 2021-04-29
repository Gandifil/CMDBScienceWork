import React, { Component } from 'react';
import { ElementPage } from '../ElementPage';
import { EquipmentMainTab } from './EquipmentMainTab';
import { EquipmentAttributesTab } from './EquipmentAttributesTab';
import { EquipmentMetricsTab } from './EquipmentMetricsTab';

export function EquipmentPage(props) {
    return (
        <div>
            <h6>Оборудование</h6>
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