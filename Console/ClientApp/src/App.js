import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { EquipmentSearch } from './components/EquipmentSearch';
import { AttributesPage } from './components/Attributes/AttributesPage';
import { MetricsPage } from './components/Metrics/MetricsPage';
import { MetricPage } from './components/Metrics/MetricPage';
import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
        <Layout>
            <Route exact path='/' component={Home} />
            <Route path='/equipment-search' component={EquipmentSearch} />
            <Route path='/attributes' component={AttributesPage} />
            <Route exact path='/metrics' component={MetricsPage} />
            <Route exact path="/metrics/:id" component={MetricPage} />
        </Layout>
    );
  }
}
