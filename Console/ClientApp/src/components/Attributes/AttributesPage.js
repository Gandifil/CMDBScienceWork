import React, { Component } from 'react';
import { Loading } from '../Loading';
import { AttributeRow } from './AttributeRow';
import { ModalHeader } from 'reactstrap';
import { ItemsTable } from '../ItemsTable';
import { AddButton } from '../Buttons/AddButton';
import { EditAttributeModal } from './EditAttributeModal';

export class AttributesPage extends Component {
    constructor(props) {
        super(props);
        this.state = { items: [], loading: false };

        this.createModal = React.createRef()

        this.handleCreateClick = (e) => this.createModal.current.show()

        this.handleCreateAccept = (e) => this.populateData()
    }

    componentDidMount() {
        this.populateData();
    }

    render() {
        const headers = ["Название", "Тип", "Действия"]
        return (
            <div>
                <ModalHeader>Список атрибутов</ModalHeader>
                <AddButton name="Добавить атрибут" onClick={this.handleCreateClick} />
                <EditAttributeModal ref={this.createModal} onAccept={this.handleCreateAccept} />
                <Loading visible={this.state.loading}>
                    <ItemsTable headers={headers} items={this.state.items} render={(x) => <AttributeRow item={x} />} />
                </Loading>
            </div>
        )
    }

    async populateData() {
        this.setState({ items: [], loading: true });

        fetch('api/attributes')
            .then(response => response.json())
            .then(result => this.setState({ items: result, loading: false }))
    }
}
