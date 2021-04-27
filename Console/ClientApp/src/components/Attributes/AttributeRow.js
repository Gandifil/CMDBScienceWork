import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button } from 'reactstrap';
import { EditAttributeModal } from './EditAttributeModal';
import { AcceptModal } from '../AcceptModal';

export class AttributeRow extends Component {
    constructor(props) {
        super(props);

        this.state = { deleted: false }

        this.editModal = React.createRef()
        this.deleteModal = React.createRef()

        this.handleEditClick = (e) => this.editModal.current.show()
        this.handleDeleteClick = (e) => this.deleteModal.current.show()

        this.handleDeleteAccept = (e) => this.deleteAttribute()
    }

    deleteAttribute() {
        fetch('api/attribute/' + this.props.item.id, { method: "DELETE" })
            .then(response => this.setState({ deleted: true }))
            .catch(e => console.log(e))
    }

    render() {
        const typeNames = ["Строка", "Проценты", "Вещественное", "Целое"]
        const item = this.props.item;
        if (this.state.deleted)
            return (null);
        else
        return (
            <tr key={item.id}>
                <td>{item.name}</td>
                <td>{typeNames[item.type]}</td>
                <td>
                    <EditAttributeModal ref={this.editModal} item={item} />
                    <AcceptModal ref={this.deleteModal} items={["Удаление атрибута"]} onAccept={ this.handleDeleteAccept } />
                    <Button className="ml-2" outline color="warning" onClick={this.handleEditClick }>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                        </svg>
                    </Button>

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