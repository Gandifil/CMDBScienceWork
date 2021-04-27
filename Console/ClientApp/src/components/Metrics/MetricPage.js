import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import { Button } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { MetricsTable } from './MetricsTable';
//import { EditMetricModal } from './EditMetricModal';

export class MetricPage extends Component {
    constructor(props) {
        super(props);
        this.state = { item: null, loading: true };

        this.handleName = this.setName.bind(this)
        this.handlePlugin = this.setPlugin.bind(this)
        this.handleCron = this.setCron.bind(this)
    }

    setName(e) {
        this.state.item.name = e.target.value
        this.setState(this.state)
    }

    setPlugin(e) {
        this.state.item.plugin = e.target.value
        this.setState(this.state)
    }

    setCron(e) {
        this.state.item.cron = e.target.value
        this.setState(this.state)
    }

    componentDidMount() {
        this.populateData();
    }

    renderMetric() {
        const item = this.state.item;
        return (
            <AvForm>
                <AvField label="Наименование" name="name" bsSize="lg" onChange={this.handleName} value={item.name} required />
                <AvField label="Плагин" name="name" bsSize="lg" onChange={this.handlePlugin} value={item.plugin} required />
                <AvField label="Cron-расписание" name="name" bsSize="lg" onChange={this.handleCron} value={item.cron} required />
            </AvForm >
        )
    } 

    render() {
        if (this.state.loading)
            return (<ReactLoading type="cylon" color="black" height={667} width={375} />)
        else
            return this.renderMetric();
    }

    populateData() {
        this.setState({ item: null, loading: true });

        const id = this.props.match.params.id;
        fetch('api/metrics/' + id)
            .then(responce => responce.ok ? responce.json() : Promise.reject(responce))
            .then(result => this.setState({ item: result, loading: false }))
            .catch(e => console.log(e))
    }
}
