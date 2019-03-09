import React, { Component } from 'react';
import { auth, databse, f } from '../../config/config';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';


class AuthLoadingScreen extends Component {
    constructor() {
      super();
      const that = this;
        f.auth().onAuthStateChanged(function(user) {
            that.props.navigation.navigate(user ? 'App' : 'Auth');
        });
    }
  
    // Render any loading content that you like here
    render() {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
      );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default AuthLoadingScreen;