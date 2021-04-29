import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button } from 'reactstrap';
import { EditMetricModal } from './EditMetricModal';
import { AcceptModal } from '../AcceptModal';

export class MetricRow extends Component {
    constructor(props) {
        super(props);

        this.state = { item: this.props.item, deleted: false }

        this.deleteModal = React.createRef()
        this.handleDeleteClick = (e) => this.deleteModal.current.show()
        this.handleDeleteAccept = (e) => this.deleteMetric()
    }

    deleteMetric() {
        fetch('api/metrics/' + this.props.item.id, { method: "DELETE" })
            .then(responce => responce.ok ? responce : Promise.reject(responce))
            .then(response => this.setState({ deleted: true }))
            .catch(e => console.log(e))
    }

    render() {
        const typeNames = ["Строка", "Проценты", "Вещественное", "Целое"]
        const item = this.state.item;
        if (this.state.deleted)
            return (null);
        else
        return (
            <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.plugin}</td>
                <td>{item.cron}</td>
                <td>
                    <Link to={'/metrics/' + item.id} className="btn btn-primary">Открыть</Link>
                    <AcceptModal ref={this.deleteModal} items={["Удаление метрики", "Удаление всех связанных параметров"]} onAccept={ this.handleDeleteAccept } />

                    <Button className="ml-2" outline color="danger" onClick={this.handleDeleteClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                    </Button>
                </td>
            </tr>
        );
    }
}
//<td><Button color="danger">Удалить</Button></td><Link to={'/article/' + article.id} className="btn btn-primary">Открыть</Link>