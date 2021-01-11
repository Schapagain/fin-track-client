import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppNavbar from './components/AppNavbar';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

import MainContainer from './components/MainContainer';

class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render(){
    return (
      <Provider store = {store}>
        <div className="App">
          <AppNavbar />
          <MainContainer />
        </div>
      </Provider>
    );
  }
}

export default App;
