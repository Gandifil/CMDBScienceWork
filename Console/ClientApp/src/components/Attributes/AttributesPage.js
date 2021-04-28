import React, { Component } from 'react';
import { Loading } from '../Loading';
import { Button } from 'reactstrap';
import { AttributesTable } from './AttributesTable';
import { EditAttributeModal } from './EditAttributeModal';
import { AddButton } from '../AddButton';

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
        const contents = this.state.loading
            ? <Loading />
            : <AttributesTable items={this.state.items} />;

        return (
            <div>
                <AddButton name="Добавить атрибут" onClick={this.handleCreateClick}/>
                <EditAttributeModal ref={this.createModal} onAccept={this.handleCreateAccept} />
                {contents}
            </div>
            );
    }

    async populateData() {
        this.setState({ items: [], loading: true });

        fetch('api/attributes')
            .then(response => response.json())
            .then(result => this.setState({ items: result, loading: false }))
    }
}
