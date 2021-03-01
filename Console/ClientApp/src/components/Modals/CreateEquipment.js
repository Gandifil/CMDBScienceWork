import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup } from 'reactstrap';

export class CreateEquipment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: { name: "", cost: 0 },
            visible: false
        }

        this.handleName = (e) => this.setName(e.target.value)
        this.handleCost = (e) => this.setCost(e.target.value)
    }

    setName(value) {
        this.setState({ item: { name: value, cost: this.state.item.cost }})
    }

    setCost(value) {
        this.setState({ item: {name: this.state.item.name, cost: value } })
    }

    show() {
        this.setState({visible: true})
    }

    hide() {
        this.setState({ visible: false })
    }

    toggle() {
        this.setState({ visible: !this.state.visible })
    }

    async submit() {
        console.log("Creating equipment", this.state.item)
        this.hide();
    }

    render() {
        return (
<Modal isOpen={this.state.visible} >
    <ModalHeader>Добавление оборудования</ModalHeader>
    <ModalBody>
        <FormGroup>
                        <Label>Имя</Label>
                        <Input name="name" placeholder="0001abcd02" onChange={this.handleName} />
        </FormGroup>
        <FormGroup>
            <Label>Цена</Label>
                        <Input type="number" name="cost" placeholder="1000" onChange={this.handleCost} />
        </FormGroup>
    </ModalBody>
    <ModalFooter>
    <Button variant="secondary" onClick={() => this.hide()}>Назад</Button>
                    <Button variant="primary" onClick={() => this.submit()}>Создать</Button>
    </ModalFooter>
</Modal>
        );
    }
}