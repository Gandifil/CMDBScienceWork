import React, { Component } from 'react';
import { ModalHeader } from 'reactstrap';
import { handleErrors } from '../../HandleErrors';
import { Loading } from '../../Loading';

export class EquipmentMainTab extends Component {
    constructor(props) {
        super(props);

        this.state = { item: null, loading: true}
    }

    componentDidMount() {
        this.populateData();
    }

    render() {
        const item = this.state.item;

        return (
            <Loading visible={this.state.loading}>
                
                
            </Loading>
        );
    }
    //item
    //<ModalHeader>{item.hostName}</ModalHeader><ModalHeader>{"Серийный номер" + item.serialNumber}</ModalHeader>

    populateData() {
        //this.setState({ item: null, loading: true })

        const id = this.props.id;
        fetch("api/equipments/" + id)
            //.then(handleErrors)
            .then(response => this.setState({ item: response.json(), loading: false }))
    }
}