import React, { Component } from 'react';
import { AvField } from 'availity-reactstrap-validation';

export function ValueTypeField(props) {
    const renderTag = (x, index) => (<option value={index}> { x } </option>)
    const typeNames = ["Строка", "Проценты", "Вещественное", "Целое"]

    return (
        <AvField label="Тип значения" name="selectType" bsSize="lg" type="select" onChange={props.onChange} value={props.value} required>
            {typeNames.map(renderTag)}
        </AvField>
    );
}