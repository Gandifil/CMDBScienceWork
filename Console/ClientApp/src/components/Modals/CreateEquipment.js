import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export class CreateEquipment extends Component {
    constructor(props) {
        super(props);
        this.state = {visible: false}
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

    render() {
        return (
                <Modal isOpen={this.state.visible} >
                    <ModalHeader>Modal title</ModalHeader>
                    <ModalBody>
                    I will not close if you click outside me. Don't even try to press
                    escape key.
        </ModalBody>
                    <ModalFooter>
                    <Button variant="secondary" onClick={() => this.hide()}>
                        Close
          </Button>
                        <Button variant="primary">Understood</Button>
                    </ModalFooter>
                </Modal>
        );
    }
}