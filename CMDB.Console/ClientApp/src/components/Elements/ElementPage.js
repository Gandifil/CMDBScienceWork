import React, { Component, useState  } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Container } from 'reactstrap';
import classnames from 'classnames';


export function ElementPage(props) {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    return (
        <Container>
              <Row>
                <Col xs="auto">
                    
                    <Nav tabs vertical>
                        {props.items.map((x, i) => 
                            <NavItem className="ng-white border-bottom box-shadow mb-3">
                                  <NavLink
                                    className={classnames({ active: activeTab === i.toString(), 'text-dark': true })}
                                    onClick={() => { toggle(i.toString()); }}
                                  >
                                    {x.name}
                                  </NavLink>
                            </NavItem>)}
                    </Nav>
                    
                </Col>
                <Col>
                    <TabContent activeTab={activeTab}>
                        {props.items.map((x, i) => <TabPane tabId={i.toString()}>{x.render()}</TabPane>)}
                    </TabContent>     
                </Col>
              </Row>
        </Container>
    );
}   