import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import reducers from './src/Store/reducers';
import AppContainer from './src/components/Navigation';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore)

class App extends Component {
  render(){
    return(
      <Provider store={createStoreWithMiddleware(reducers)}>
        <AppContainer/>
      </Provider>
    );
  }
}

export default App;