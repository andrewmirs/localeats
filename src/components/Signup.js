import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import renderField from './Field';
import styles from '../styles/signupStyles';


class Signup extends Component {

    static navigationOptions = {
        title: 'Sign Up'
    }

    handleSubmit = (values) => {
        alert(`form submitting with values: ${values}`);
    }

    render() {
        return (
            <View style={styles.formContainer}>
                <Field keyboardType="default" placeholder="First Name" component={renderField} name="Fullname" />
                <Field keyboardType="default" placeholder="Last Name" component={renderField} name="Displayname" />
                <Field keyboardType="email-address" placeholder="Email" component={renderField} name="Email" />
                <Field keyboardType="default" placeholder="Password" component={renderField} name="Password" secureTextEntry={true} />
                <Field keyboardType="default" placeholder="Confirm Password" component={renderField} name="Confirmpassword" secureTextEntry={true} />
                <TouchableOpacity 
                    onPress={this.handleSubmit} 
                    style={styles.submitButton}
                >
                    <Text style={styles.submitText}>Get Started</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const SignupForm = reduxForm({
    form: 'signup'
})(Signup);

export default SignupForm;