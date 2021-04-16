import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button } from 'reactstrap';

export class AttributeRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const item = this.props.item;
        return (
            <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.type}</td>
                <td>

                </td>
            </tr>
        );
    }
}
//<td><Button color="danger">Удалить</Button></td><Link to={'/article/' + article.id} className="btn btn-primary">Открыть</Link>