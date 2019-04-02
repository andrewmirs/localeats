import React, { Component } from 'react';
import { YellowBox } from 'react-native'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import reducers from './src/Store/reducers';
import { Font } from 'expo'
import _ from 'lodash';
import LandingContainer from './src/components/Landing';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore)

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

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