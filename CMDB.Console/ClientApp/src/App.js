import React, { Component } from 'react';
import { Route, Switch   } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { EquipmentSearch } from './components/Elements/Equipments/EquipmentSearch';
import { AttributesPage } from './components/Attributes/AttributesPage';
import { MetricsPage } from './components/Metrics/MetricsPage';
import { MetricPage } from './components/Metrics/MetricPage';
import './custom.css'
import { EquipmentPage } from './components/Elements/Equipments/EquipmentPage';
import { EquipmentList } from './components/Elements/Equipments/EquipmentList';
import { NewMetricPage } from './components/Metrics/NewMetricPage';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
        <Layout>
            <Route exact path='/' component={Home} />
            <Route exact path='/attributes' component={AttributesPage} />
            <Switch>
                <Route exact path='/metrics' component={MetricsPage} />
                <Route exact path="/metrics/new" component={NewMetricPage} />
                <Route exact path="/metrics/:id" component={MetricPage} />
            </Switch>
            <Switch>
                <Route exact path='/equipments/search' component={EquipmentSearch} />
                <Route exact path="/equipments/list" component={EquipmentList} />
                <Route exact path="/equipments/:id" component={EquipmentPage} />
            </Switch>
        </Layout>
    );
  }
}