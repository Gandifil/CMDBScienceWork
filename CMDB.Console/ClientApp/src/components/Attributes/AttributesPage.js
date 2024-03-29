import React, { Component, useRef } from 'react';
import { AttributeRow } from './AttributeRow';
import { Container, ModalHeader } from 'reactstrap';
import { EditAttributeModal } from './EditAttributeModal';
import { EntitiesTable } from '../EntitiesTable';
import { AddButton } from '../Buttons/AddButton';

export function AttributesPage(props) {
    const headers = ["Название", "Тип", "Действия"]

    const modal = useRef()

    const renderItem = (data) =>
        <AttributeRow item={data} />

    const handleAdd = (e) => modal.current.show()

    const handleAccept = (e) => window.location.reload()

    return (
        <Container>
            <ModalHeader>Список атрибутов</ModalHeader>
            <AddButton onClick={handleAdd} />
            <EditAttributeModal ref={modal} onAccept={handleAccept} />
            <EntitiesTable headers={headers} renderItem={renderItem} resource={`/api/attributes`}/>
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
//                
//                <Loading visible={this.state.loading}>
//                    <ItemsTable headers={headers} items={this.state.items} render={(x) => <AttributeRow item={x} />} />
//                </Loading>
//            </div>
//        )
//    }
//}
