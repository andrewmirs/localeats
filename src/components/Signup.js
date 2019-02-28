import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import renderField from './Field';
import styles from '../styles/signupStyles';


class Signup extends Component {

    render() {
        const { handleSubmit } = this.props.navigation;
        return (
            <View style={styles.formContainer}>
                <Text style={styles.formTitle}>Register</Text>
                <Field keyboardType="default" label="Full Name: " component={renderField} name="Fullname" />
                <Field keyboardType="default" label="Display Name: " component={renderField} name="Displayname" />
                <Field keyboardType="email-address" label="Email: " component={renderField} name="Email" />
                <Field keyboardType="default" label="Password: " component={renderField} name="Password" secureTextEntry={true} />
                <Field keyboardType="default" label="Confirm Password: " component={renderField} name="Confirmpassword" secureTextEntry={true} />
                <TouchableOpacity onPress={this.handleSubmit} style={{ margin: 10, alignItems: 'center'}}>
                    <Text style={styles.submitButton}>
                        Submit
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const SignupForm = reduxForm({
    form: 'signup'
})(Signup);

export default SignupForm;