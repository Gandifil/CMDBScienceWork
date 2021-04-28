import React, { Component } from 'react';
import { MetricsTable } from './MetricsTable';
import { AddButton } from '../AddButton';
import { Loading } from '../Loading';
//import { EditMetricModal } from './EditMetricModal';

export class MetricsPage extends Component {
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
            : <MetricsTable items={this.state.items} />;//<EditMetricModal ref={this.createModal} onAccept={this.handleCreateAccept} />

        return (
            <div>
                <AddButton name="Добавить метрику" onClick={this.handleCreateClick}/>
                {contents}
            </div>
            );
    }

    populateData() {
        this.setState({ items: [], loading: true });
        
        fetch('api/metrics')
            .then(responce => responce.ok ? responce.json() : Promise.reject(responce))
            .then(results => this.setState({ items: results, loading: false }))
            .catch(e => console.log(e))
    }
}
