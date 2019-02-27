import React, { Component } from 'react';
import { Image, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import styles from '../styles/landingstyles';
import logo from '../../assets/images/favfood.png';
import Signin from './Signin';
import Signup from './Signup';

class Landing extends Component {

    handleShowRegisterController = () => {
        
    }

    render() {
        return (
            <View style={styles.landingPage}>
                <StatusBar barStyle="light-content" />
                <View style={styles.title}>
                    <Text style={styles.titleText}>Local Eats</Text>
                </View>
                <View style={styles.iconContainer}>
                    <Image 
                        style={styles.icon}
                        source={logo}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={styles.signInButton}
                        onPress={() => this.props.navigation.navigate('Signin')}
                    >
                        <Text style={styles.signInText}>Sign In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.signUpButton}
                        onPress={() => this.props.navigation.navigate('Signup')}
                    >
                        <Text style={styles.signUpText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const LandingStack = createStackNavigator(
    {
      Landing,
      Signin,
      Signup
    },
    {
      initialRouteName: 'Landing',
    }
);

const LandingContainer = createAppContainer(LandingStack);

export default LandingContainer;