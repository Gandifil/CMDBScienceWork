import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
        <div>
            <NotificationContainer/>
            <NavMenu />
            <Container>
                {this.props.children}
            </Container>
        </div>
    );
  }
}
