import React, { Component } from 'react';
import { Button } from 'reactstrap';

export class EquipmentRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: { name: "", cost: 0 },
            visible: false
        }
    }

    static table(equipments) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Имя</th>
                        <th>Цена (в руб.)</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {equipments.map(e => <EquipmentRow equipment={e} />)}
                </tbody>
            </table>
        );
    }

    render() {
        const equipment = this.props.equipment;
        return (
            <tr key={equipment.id}>
                <td>{equipment.id}</td>
                <td>{equipment.name}</td>
                <td>{equipment.cost}</td>
                <td><Button color="danger">Удалить</Button></td>
            </tr>
        );
    }
}