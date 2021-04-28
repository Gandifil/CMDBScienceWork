import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import { Button } from 'reactstrap';
import { MetricsTable } from './MetricsTable';
import { AddButton } from '../AddButton';
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
            ? <ReactLoading type="cylon" color="black" height={667} width={375} />
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
