import React, { Component } from 'react';
import { Image, ImageBackground, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import styles from '../styles/landingstyles';
import logo from '../../assets/images/localpicks.png';
import bgImage from '../../assets/images/landing-background.jpg'
import Signin from './Signin';
import Signup from './Signup';

    const handleSubmit = (values) => {
        alert(`form submitting`);
    }

class Landing extends Component {

    handleShowRegisterController = () => {
        
    }

    render() {
        return (
            <ImageBackground source={bgImage} style={styles.landingPage}>
                <StatusBar barStyle="light-content" />
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
                        onPress={() => this.props.navigation.navigate('Signup', {
                            handleSubmit
                        })}
                    >
                        <Text style={styles.signUpText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
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
      headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }
);

const LandingContainer = createAppContainer(LandingStack);

export default LandingContainer;