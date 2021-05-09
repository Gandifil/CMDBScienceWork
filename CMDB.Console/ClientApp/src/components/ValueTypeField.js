import React, { Component } from 'react';
import { AvField } from 'availity-reactstrap-validation';

export function ValueTypeField(props) {
    const renderTag = (x, index) => (<option value={index}> { x } </option>)
    const typeNames = ["Строка", "Проценты", "Вещественное", "Целое"]

    const handleChange = (e) => props.onChange(parseInt(e.currentTarget.value))

    return (
        <AvField label="Тип значения" name="selectType" bsSize="lg" style={{ backgroundColor: "#fff" }} type="select"
            disabled={props.readOnly} onChange={handleChange} value={props.value} required>
            {typeNames.map(renderTag)}
        </AvField>
    );
}