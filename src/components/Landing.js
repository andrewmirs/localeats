import React, { Component } from 'react';
import { Image, ImageBackground, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Icon from '@expo/vector-icons/EvilIcons';
import IosIcon from '@expo/vector-icons/Ionicons';
import styles from '../styles/landingstyles';
import logo from '../../assets/images/localpicks.png';
import bgImage from '../../assets/images/landing-background.jpg'
import Home from './Home';
import HomeAppContainer from './Navigation';
import Signup from './Signup';


class Landing extends Component {

   state = {
       showPass: true,
       press: false
   }

   showPass = () => {
       if(this.state.press == false) {
            this.setState({
                showPass: false, 
                press: true
            });
       } else {
            this.setState({
                showPass: true, 
                press: false
            });
       }
   }

   static navigationOptions = {
        header: null,
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
                        name='email'
                        style={styles.input}
                        placeholder='Email'
                        placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                        underlineColorAndroid='transparent'
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name={'lock'} size={30} color={'rgba(255, 255, 255, 0.7)'} style={styles.inputIcon} />
                    <TextInput
                        name='password'
                        style={styles.input}
                        placeholder='Password'
                        secureTextEntry={this.state.showPass}
                        placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                        underlineColorAndroid='transparent'
                    />
                    <TouchableOpacity 
                        style={styles.btnEye}
                        onPress={this.showPass}
                    >
                        <IosIcon name={this.state.press == false ? 'ios-eye' : 'ios-eye-off'} size={26} color={'rgba(255, 255, 255, 0.6)'} />
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
                            onPress={() => this.props.navigation.navigate('Signup')}
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
        Home: HomeAppContainer,
        Landing,
        Signup
    },
    {
      initialRouteName: 'Landing',
    }
);

const LandingContainer = createAppContainer(LandingStack);

export default LandingContainer;