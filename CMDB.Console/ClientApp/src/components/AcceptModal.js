import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, List } from 'reactstrap';

export class AcceptModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        }

        this.discard = this.hide.bind(this)
        this.accept = this.submit.bind(this)
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
        console.log("User is accepting actions", this.props.items);
        this.props.onAccept();
        this.hide();
    }

    render() {
        const typeNames = ["Строка", "Проценты", "Вещественное", "Целое"]
        return (
            <Modal isOpen={this.state.visible} >
                <ModalHeader>Подтверждение действия</ModalHeader>
                <ModalBody>
                    <List type="unstyled">
                        <li>Вы уверены, что хотите совершить:
                            <ul>
                                {this.props.items.map(x => <li>{ x }</li>)}
                            </ul>
                        </li>
                    </List>
    </ModalBody>
    <ModalFooter>
        <Button color="secondary" onClick={this.discard}>Отмена</Button>
        <Button color="primary" onClick={this.accept}>Подтвердить</Button>
    </ModalFooter>
</Modal>
        );
    }
}