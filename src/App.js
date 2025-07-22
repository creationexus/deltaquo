import React, { Component } from 'react';
//import {  } from 'react-router';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import ReactGA from 'react-ga';
import Analytics from 'react-router-ga';
import Legal from './components/legal';
import Landing from './components/landing';
import List from './components/list';
import LayoutDefault from './components/page/LayoutDefault';
import './index.css';
import Details from './components/details';
import { DeltaProvider } from './hooks/DeltaContext';

const history = createBrowserHistory();

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { w:800, h:600 }
    this.base_url = 'http://cnx.com';
    this.version = '0.3.8';
    ReactGA.initialize('UA-107183887-2');
    history.listen((location) => ReactGA.pageview(location.pathname + location.search));
  }

  //componentDidMount() {
  //  history.listen((location, action) => console.log('History changed!', location, action));
  //}

  componentWillUnmount() {
    window.removeEventListener('resize', () => { this.updateWindowDimensions(); });
  }

  updateWindowDimensions(){
    this.setState({ w:window.innerWidth });
    this.setState({ h:window.innerHeight });
  }

  render(){
    return (
      <DeltaProvider>
        <Router history={history}>
          <Switch>
            <LayoutDefault base_url={this.base_url} version={this.version} appBarOn={false} footerOn={true} history={history} width={window.innerWidth + 'px'} height={window.innerHeight + 'px'} path="/legal" component={Legal} />
            <LayoutDefault base_url={this.base_url} appBarOn={true} history={history} version={this.version} footerOn={true} path="/node/:id" component={() => <Details base_url={this.base_url} />} />
            <LayoutDefault base_url={this.base_url} appBarOn={true} history={history} version={this.version} footerOn={true} path="/offer/:id" component={() => <Details base_url={this.base_url} />} />
            <LayoutDefault base_url={this.base_url} appBarOn={true} history={history} version={this.version} footerOn={true} path="/position/:id" component={() => <Details base_url={this.base_url} />} />
            <LayoutDefault base_url={this.base_url} appBarOn={true} history={history} version={this.version} footerOn={true} path="/item/:id" component={() => <Details base_url={this.base_url} />} />
            <LayoutDefault base_url={this.base_url} appBarOn={true} history={history} path="/shopping" component={() => <List history={history} base_url={this.base_url} api="/node/json/list" />} />     
            <LayoutDefault base_url={this.base_url} version={this.version} exact appBarOn={false} footerOn={true} history={history} width={window.innerWidth + 'px'} height={window.innerHeight + 'px'} path="/" component={() => <Landing history={history} base_url={this.base_url} />} />

            <Redirect from="/:id" to="/node/:id" />
          </Switch>
        </Router>
      </DeltaProvider>
    );
  }
}

export default App;
