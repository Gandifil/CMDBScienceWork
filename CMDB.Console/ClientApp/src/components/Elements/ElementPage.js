import React, { Component, useState  } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';


export function ElementPage(props) {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    return (
        <div class="row">
            <Nav tabs vertical>
                {props.items.map((x, i) => 
                    <NavItem>
                          <NavLink
                            className={classnames({ active: activeTab === i.toString() })}
                            onClick={() => { toggle(i.toString()); }}
                          >
                            {x.name}
                          </NavLink>
                    </NavItem>)}
            </Nav>
            <TabContent activeTab={activeTab}>
                {props.items.map((x, i) => <TabPane tabId={ i.toString() }>{ x.render() }</TabPane>)}
            </TabContent>
        </div>
    );
}   