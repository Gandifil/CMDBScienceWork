import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { EquipmentSearch } from './components/EquipmentSearch';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
         <Route path='/equipment-search' component={EquipmentSearch} />
      </Layout>
    );
  }
}
