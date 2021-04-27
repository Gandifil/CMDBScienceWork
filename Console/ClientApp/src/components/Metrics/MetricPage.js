import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import { Button } from 'reactstrap';
import { MetricsTable } from './MetricsTable';
//import { EditMetricModal } from './EditMetricModal';

export class MetricPage extends Component {
    constructor(props) {
        super(props);
        //this.state = { items: [], loading: false };
    }

    render() {
        const id = this.props.match.params.id;
        return (<div>{ id }</div>)
    }
}
