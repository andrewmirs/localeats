import React, { Component } from 'react';
import { Image, ImageBackground, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { createAppContainer, createStackNavigator, createSwitchNavigator  } from "react-navigation";
import { auth, database, f } from '../../config/config';
import Icon from '@expo/vector-icons/EvilIcons';
import IosIcon from '@expo/vector-icons/Ionicons';
import styles from '../styles/landingStyles';
import logo from '../../assets/images/localpicks.png';
import bgImage from '../../assets/images/landing-background.jpg';
import AuthLoading from './AuthLoading';
import Home from './Home';
import HomeAppContainer from './Navigation';
import Signup from './Signup';


class Landing extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showPass: true,
            press: false,
            loggedin: false,
            email: 'andrewmirs@gmail.com',
            password: 'password',
        }

        const that = this;
        f.auth().onAuthStateChanged(function(user) {
            if(user){
                that.setState({ 
                    loggedin: true
                });
                that.props.navigation.navigate('App');
            } else {
                that.setState({ 
                    loggedin: false
                });
                console.log('Logged out!');
            }
        });
    }

    signInUser = async(email, password) => {

        if(email !== '' && password !== ''){
            try {
                let user = await auth.signInWithEmailAndPassword(email, password);
                console.log(user);
            } catch(err) {
                alert('Unauthorized: Either your email or password was incorrect. Please try again.');
            }
        } else {
            alert('Missing email or password');
        }
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
                        placeholder='Email address'
                        placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => this.setState({email: text})}
                        value={this.state.email}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name={'lock'} size={30} color={'rgba(255, 255, 255, 0.7)'} style={styles.inputIcon} />
                    <TextInput
                        name='password'
                        style={styles.input}
                        placeholder='Password (8+ characters)'
                        secureTextEntry={this.state.showPass}
                        placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => this.setState({password: text})}
                        autoCapitalize="none"
                        value={this.state.password}
                    />
                    <TouchableOpacity 
                        style={styles.btnEye}
                        onPress={this.showPass}
                    >
                        <IosIcon name={this.state.press == false ? 'ios-eye-off' : 'ios-eye'} size={26} color={'rgba(255, 255, 255, 0.6)'} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity 
                    style={styles.signInButton}
                    onPress={() => this.signInUser(this.state.email, this.state.password)}
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

const AppStack = createStackNavigator({
    Home: {
        screen: HomeAppContainer,
        navigationOptions: {
            header: null,
        }
    },
});

const AuthStack = createStackNavigator({
        Landing:{
            screen: Landing,
            navigationOptions: {
                header: null,
            }
        },
        Signup: {
            screen: Signup
        }
    },
    {
        initialRouteName: 'Landing',
    },
);

const LandingContainer = createAppContainer(createSwitchNavigator(
    {
        AuthLoading: AuthLoading,
        App: AppStack,
        Auth: AuthStack,
    }
));

export default LandingContainer;