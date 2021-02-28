import React, { Component } from 'react';
import SearchField from "react-search-field";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { CreateEquipment } from './Modals/CreateEquipment'; 

export class EquipmentSearch extends Component {
    static displayName = EquipmentSearch.name;

    constructor(props) {
        super(props);
        this.state = { equipments:[], loading: true, modalVisible: false};
        this.search = this.search.bind(this)
        this.modal = React.createRef();
    }

    componentDidMount() {
        this.populateData("");
    }

    search(value, event) {
        this.populateData(value);
    }

    static renderEquipmentsTable(equipments) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Имя</th>
                        <th>Цена (в руб.)</th>
                    </tr>
                </thead>
                <tbody>
                    {equipments.map(equipment =>
                        <tr key={equipment.id}>
                            <td>{equipment.id}</td>
                            <td>{equipment.name}</td>
                            <td>{equipment.cost}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Загрузка...</em></p>
            : EquipmentSearch.renderEquipmentsTable(this.state.equipments);

        return (
            <div>
                <SearchField
                    placeholder='Имя'
                    onEnter={this.search}
                    onSearchClick={this.search}
                    onBlur={this.search}
                />
                <CreateEquipment ref={this.modal} />
                <Button variant="outline-primary" onClick={() => this.openModal()}>Добавить</Button>
                { contents }
            </div>
        );
    }

    async closeModal() {
        this.state.modalVisible = false
        this.setState(this.state)
    }

    async openModal() {
        this.modal.current.show()
    }

    async populateData(value) {
        let url = 'equipment';
        if (value)
            url = url + '?name=' + value;
        this.setState({ equipments: [], loading: true, modalVisible: false });
        const response = await fetch(url);
        const data = await response.json();
        this.setState({ equipments: data, loading: false, modalVisible: false });
    }
}
