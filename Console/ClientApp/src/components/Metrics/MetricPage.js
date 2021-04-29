import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { ValueTypeField } from '../ValueTypeField';
import { ToggleEditButton } from '../ToggleEditButton';
import { Button, Label, ModalHeader} from 'reactstrap';
//import { EditMetricModal } from './EditMetricModal';

class MetricForm extends Component {
    constructor(props) {
        super(props);
        this.state = { item: this.props.item };

        this.formEl = React.createRef()

        this.handleName = this.setName.bind(this)
        this.handleType = this.setType.bind(this)
        this.handlePlugin = this.setPlugin.bind(this)
        this.handleCron = this.setCron.bind(this)
        this.handleHistory = this.setHistory.bind(this)
    }

    hasError() {
        const form = this.formEl.current._inputs;
        return (
            form.name.context.FormCtrl.hasError() ||
            form.plugin.context.FormCtrl.hasError() ||
            form.cron.context.FormCtrl.hasError() ||
            form.history.context.FormCtrl.hasError()
            )
    }

    setName(e) {
        this.state.item.name = e.target.value
        this.setState(this.state)
    }

    setType(e) {
        this.state.item.type = parseInt(e.currentTarget.value);
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

    setHistory(e) {
        this.state.item.historyDays = e.target.value
        this.setState(this.state)
    }

    render() {
        const item = this.state.item;
        return (
            <AvForm ref={this.formEl}>
                <AvField label="Наименование" name="name" bsSize="lg" style={{ backgroundColor: "#fff" }} readOnly={!this.props.editing}
                    onChange={this.handleName} value={item.name} required />
                <ValueTypeField readOnly={!this.props.editing}
                    onChange={this.handleType} value={item.type} required />
                <AvField label="Плагин" name="plugin" bsSize="lg" style={{ backgroundColor: "#fff" }} readOnly={!this.props.editing} onChange={this.handlePlugin}
                    value={item.plugin} required />
                <AvField label="Cron-расписание" name="cron" bsSize="lg" style={{ backgroundColor: "#fff" }} readOnly={!this.props.editing}
                    onChange={this.handleCron} value={item.cron} required />
                <AvField
                    label="История храниться в течении (д.)"
                    name="history" bsSize="lg"
                    style={{ backgroundColor: "#fff" }}
                    readOnly={!this.props.editing}
                    onChange={this.handleHistory} value={item.historyDays}
                    type="number" min="1" max="30" required />
            </AvForm >
        )
    }
}

export class MetricPage extends Component {
    constructor(props) {
        super(props);
        this.state = { item: null, loading: true };

        this.formEl = React.createRef()

        this.toggleEdit = React.createRef()
        this.handleSave = this.save.bind(this)
        this.handleRender = (state) => (<MetricForm ref={this.formEl} item={this.state.item} editing={ state.editing } />)
        }

    save() {
        if (this.formEl.current.hasError())
            return

        const id = this.props.match.params.id;
        fetch('api/metrics/' + id)
            .then(responce => responce.ok ? responce.json() : Promise.reject(responce))
            .then(result => this.setState({ item: result, loading: false }))
            .catch(e => console.log(e))
    }

    componentDidMount() {
        this.populateData();
    }

    render() {
        if (this.state.loading)
            return (<ReactLoading type="cylon" color="black" height={667} width={375} />)
        else
            return (<div>
                <ModalHeader>Метрика</ModalHeader>
                <ToggleEditButton onSave={this.handleSave} render={this.handleRender} />
                </div>);
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
