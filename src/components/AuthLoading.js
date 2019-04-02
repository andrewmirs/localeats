import React, { Component } from 'react';
import { auth, databse, f } from '../../config/config';
import {
  ActivityIndicator,
  Image,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import Icon from '../../assets/images/localpick-icon.png';


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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image 
              source={Icon}
              resizeMode='contain'
              style={{ height: 150, marginBottom: 30 }}
          />
          <ActivityIndicator size="large" color="#b23f2e" />
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