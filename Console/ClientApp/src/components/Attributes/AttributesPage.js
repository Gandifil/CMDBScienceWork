import React, { Component } from 'react';
import { Loading } from '../Loading';
import { AttributeRow } from './AttributeRow';
import { Container, ModalHeader } from 'reactstrap';
import { ItemsTable } from '../ItemsTable';
import { AddButton } from '../Buttons/AddButton';
import { EditAttributeModal } from './EditAttributeModal';
import { EntitiesTable } from '../EntitiesTable';

export function AttributesPage(props) {
    const headers = ["Название", "Тип", "Действия"]

    const renderItem = (data) =>
        <AttributeRow item={data} />

    return (
        <Container>
            <ModalHeader>Список атрибутов</ModalHeader>
            <EntitiesTable headers={headers} renderItem={renderItem} resource={`/api/attributes`} />
        </Container>
    );
}

//export class AttributesPage extends Component {
//    constructor(props) {
//        super(props);
//        this.state = { items: [], loading: false };

//        this.createModal = React.createRef()

//        this.handleCreateClick = (e) => this.createModal.current.show()

//        this.handleCreateAccept = (e) => this.populateData()
//    }

//    render() {
//        return (
//            <div>
//                <ModalHeader>Список атрибутов</ModalHeader>
//                <AddButton name="Добавить атрибут" onClick={this.handleCreateClick} />
//                <EditAttributeModal ref={this.createModal} onAccept={this.handleCreateAccept} />
//                <Loading visible={this.state.loading}>
//                    <ItemsTable headers={headers} items={this.state.items} render={(x) => <AttributeRow item={x} />} />
//                </Loading>
//            </div>
//        )
//    }
//}
