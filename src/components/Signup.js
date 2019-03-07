import React, { Component } from 'react';
import { View } from 'react-native';
import { auth, databse, f } from '../../config/config';
import SignUpForm from './SignupForm';


class Signup extends Component {

    static navigationOptions = {
        title: 'Sign Up',
        headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
        },
        headerTitleStyle: {
            flex: 1,
            alignSelf: 'center',
            textAlign: 'center',
        },
    }

    registerUser = ( email, password, firstname, lastname ) => {
        console.log('Im in the register function:', firstname, lastname, email, password)
        f.auth().createUserWithEmailAndPassword(email, password)
        .then((res) => {
            firebase.database().ref('users/' + res.user.uid).set({
                firstname: firstname,
                lastname: lastname,
                email: email,
            })
        }).catch((error) => {
            console.log(error);
        });
   }

    render(){
        return (
            <View>
                <SignUpForm  register={this.registerUser} />
            </View>
        );
    }
}

export default Signup;