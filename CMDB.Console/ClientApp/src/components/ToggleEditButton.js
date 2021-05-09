import React, { Component } from 'react';
import { Button, FormGroup } from 'reactstrap';

export class ToggleEditButton extends Component {
    constructor(props) {
        super(props);

        this.state = { editing: false }

        this.handleEdit = this.edit.bind(this)
        this.handleSave = this.save.bind(this)
    }

    edit() {
        this.setState({ editing: true })
    }

    save() {
        this.setState({ editing: false })
        this.props.onSave()
    }

    render() {
        return (
            <div>
                <Button color="warning" size="lg" className="m-2" disabled={this.state.editing} onClick={this.handleEdit}>Изменить</Button>
                <Button color="primary" size="lg" className="m-2" disabled={!this.state.editing} onClick={this.handleSave}>Сохранить</Button>
                {this.props.render(this.state)}
            </div>
        );
    }
}
//<td><Button color="danger">Удалить</Button></td><Link to={'/article/' + article.id} className="btn btn-primary">Открыть</Link>