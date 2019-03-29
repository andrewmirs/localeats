import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import reducers from './src/Store/reducers';
import { Font } from 'expo'
import LandingContainer from './src/components/Landing';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore)

class App extends Component {

  componentDidMount() {
    Font.loadAsync({
      'lobster': require('./assets/fonts/Lobster-Regular.ttf'),
      'horizon': require('./assets/fonts/horizonn.ttf'),
    });
  }

  render(){
    return(
      <Provider store={createStoreWithMiddleware(reducers)}>
        <LandingContainer />
      </Provider>
    );
  }
}

export default App;