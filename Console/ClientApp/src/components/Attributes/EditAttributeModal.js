import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup } from 'reactstrap';

export class EditAttributeModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: {
                name: "",
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
        this.state.item.type = e.currentTarget.value;
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

    submit() { 
        if (this.state.index == -1)
            return;
        console.log("Сохранить", this.state.item);
        this.hide();
    }

    renderTag(x, index) {
        return (<option value={index}> { x } </option>)
    }

    render() {
        const typeNames = ["Строка", "Проценты", "Вещественное", "Целое"]
        return (
<Modal isOpen={this.state.visible} >
    <ModalHeader>Аттрибут</ModalHeader>
    <ModalBody>
        <FormGroup>
            <Label>Название</Label>
            <Input name="tag" onChange={this.handleName} value={this.state.item.name} />
        </FormGroup>
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
</Modal>
        );
    }
}