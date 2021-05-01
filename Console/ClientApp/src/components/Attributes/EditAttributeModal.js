import React, { Component } from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup } from 'reactstrap';
import { NotificationManager } from 'react-notifications';
import { handleErrors } from '../HandleErrors';

export class EditAttributeModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: {
                name: "Тест",
                type: 0,
            },
            visible: false,
        }

        if (this.props.item)
            this.state.item = this.props.item

        this.handleName = this.handleName.bind(this)
        this.handleType = this.handleType.bind(this)

        this.handleNo = this.hide.bind(this)
        this.handleYes = this.submit.bind(this)
    }

    handleName(e) {
        this.state.item.name = e.currentTarget.value;
        this.setState(this.state);
    }

    handleType(e) {
        this.state.item.type = parseInt(e.currentTarget.value);
        this.setState(this.state);
    }

    show() {
        this.state.visible = true;
        this.setState(this.state);
    }

    hide() {
        this.state.visible = false;
        this.setState(this.state);
    }

    fetchRequest() {
        if (this.state.item.id)
            return fetch("api/attributes/" + this.state.item.id, {
                method: "PUT",
                body: JSON.stringify(this.state.item),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
        else
            return fetch("api/attributes", {
                method: "POST",
                body: JSON.stringify(this.state.item),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
    }

    submit() { 
        if (this.state.item.name === "")
            return;
        console.log("Сохранить", this.state.item);
        this.fetchRequest()
            .then(handleErrors)
            .then(responce => this.props.onAccept(this))
            .catch(e => NotificationManager.error("", "Ошибка при изменении/создании атрибута", 5000))
        this.hide();
    }

    renderTag(x, index) {
        return (<option value={index}> { x } </option>)
    }

    render() {
        const typeNames = ["Строка", "Проценты", "Вещественное", "Целое"]
        return (
            <Modal isOpen={this.state.visible} >
                <AvForm>
                <ModalHeader>Атрибут</ModalHeader>
                <ModalBody>
                        <Label>Название</Label>
                        <AvField name="tag" bsSize="lg" onChange={this.handleName} value={this.state.item.name} required  />
                    <FormGroup>
                        <Label>Тип</Label>
                        <Input type="select" bsSize="lg" value={this.state.item.type} onChange={this.handleType}>
                            {typeNames.map(this.renderTag)}
                        </Input>
                    </FormGroup>

                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.handleNo}>Отмена</Button>
                    <Button color="primary" onClick={this.handleYes}>Сохранить</Button>
                    </ModalFooter>
                </AvForm >
            </Modal>
        );
    }
}