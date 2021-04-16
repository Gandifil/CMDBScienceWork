import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import { Button } from 'reactstrap';
import { AttributesTable } from './AttributesTable';

export class AttributesPage extends Component {
    constructor(props) {
        super(props);
        this.state = { items: [], loading: false };
        //this.modal = React.createRef();

        //this.handleClick = (e) => this.modal.current.show();
        //this.handleModalSubmit = (e) => this.populateData();
    }

    componentDidMount() {
        this.populateData();
    }

    render() {
        const contents = this.state.loading
            ? <ReactLoading type="cylon" color="black" height={667} width={375} />
            : <AttributesTable items={this.state.items} />;

               // <Button color="primary" size="lg" block onClick={this.handleClick}>Фильтрация</Button>
               // <ArticleSearchModal ref={this.modal} onSubmit={ this.handleModalSubmit } />
        return (
            <div>
                {contents}
            </div>
            );
    }

    async populateData() {
        this.setState({ items: [], loading: true });

        fetch('attributes')
            .then(response => response.json())
            .then(result => this.setState({ items: result, loading: false }))
        ;
    }
}
