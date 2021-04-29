import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button } from 'reactstrap';

export class EquipmentRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const item = this.props.item; //<td><Button color="danger">Удалить</Button></td>
        console.log(item)
        return (
            <tr key={item.id}>
                <td>{item.hostName}</td>
                <td>{item.serialNumber}</td>
                <td><Link to={'/equipments/' + item.id} className="btn btn-primary">Открыть</Link></td>
            </tr>
        );
    }
}