import React, { Component } from 'react';
import { Image, ImageBackground, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Icon from '@expo/vector-icons/EvilIcons';
import styles from '../styles/landingstyles';
import logo from '../../assets/images/localpicks.png';
import bgImage from '../../assets/images/landing-background.jpg'
import Home from './Home';
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

                <View style={styles.inputContainer}>
                    <Icon name={'envelope'} size={30} color={'rgba(255, 255, 255, 0.7)'} style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder='Email'
                        placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                        underlineColorAndroid='transparent'
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name={'lock'} size={30} color={'rgba(255, 255, 255, 0.7)'} style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder='Password'
                        secureTextEntry={true}
                        placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                        underlineColorAndroid='transparent'
                    />
                    <TouchableOpacity style={styles.btnEye}>
                        <Icon name={'eye'} size={28} color={'rgba(255, 255, 255, 0.7)'} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity 
                    style={styles.signInButton}
                    onPress={() => this.props.navigation.navigate('Home')}
                >
                    <Text style={styles.signInText}>Sign In</Text>
                </TouchableOpacity>


                <View style={styles.buttonContainer}>
                        <Text 
                            style={styles.signUpText}
                            onPress={() => this.props.navigation.navigate('Signup', {
                                handleSubmit
                            })}
                        >
                            Don't have an account? Sign Up!
                        </Text>
                </View>
            </ImageBackground>
        );
    }
}

const LandingStack = createStackNavigator(
    {
        Home,
        Landing,
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