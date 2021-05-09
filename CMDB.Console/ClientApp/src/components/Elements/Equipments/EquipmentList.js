import React, { Component } from 'react';
import { ModalHeader } from 'reactstrap';
import { ItemsTable } from '../../ItemsTable';
import { Loading } from '../../Loading';
import { EquipmentRow } from './EquipmentRow';

export class EquipmentList extends Component {
    constructor(props) {
        super(props);

        this.state = { items: [], loading: false };

    }

    componentDidMount() {
        this.populateData();
    }

    render() {
        const headers = ["Хост", "Серийный номер", "Действия"]
        return (
            <div>
                <ModalHeader>Список оборудований</ModalHeader>
                <Loading visible={this.state.loading}>
                    <ItemsTable headers={headers} items={this.state.items} render={(x) => <EquipmentRow item={x} />} />
                </Loading>
            </div>
        )
    }

    populateData() {
        this.setState({ items: [], loading: true });

        const query = this.props.location.search

        fetch('api/equipments' + query)
            .then(responce => responce.ok ? responce.json() : Promise.reject(responce))
            .then(results => this.setState({ items: results, loading: false }))
            .catch(e => console.log(e))
    }
}
