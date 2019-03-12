import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Dimensions, Picker, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import renderField from './Field';
import renderPicker from './Picker';
import styles from '../styles/signupStyles';

const validate = values => {
    const errors = {};      
    if (!values.firstname) {
        errors.firstname = 'Required'
    } else if (values.firstname.length < 2 || values.firstname.length > 15) {
        errors.firstname = 'Must be between 2 and 15 characters'
    } 

    if (!values.lastname) {
        errors.lastname = 'Required'
    } else if (values.lastname.length < 2 || values.lastname.length > 20) {
        errors.lastname = 'Must be between 2 and 20 characters'
    }  

    if (!values.username) {
        errors.username = 'Required'
    } else if (values.username.length < 3 || values.username.length > 20) {
        errors.username = 'Must be between 3 and 20 characters'
    }  

    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email format. Example: test@mail.com'
    } 
    
    if (!values.password) {
        errors.password = 'Required'
    } else if (values.password.length < 6 || values.password.length > 20) {
        errors.password = 'Must be between 6 and 20 characters'
    }

    if (!values.confirmpassword) {
        errors.confirmpassword = 'Required'
    } else if (values.confirmpassword !== values.password){
        errors.password = 'Passwords must match!'
        errors.confirmpassword = 'Passwords must match!'
    }

    return errors
}

class Signup extends Component {

    submit = newUser => {
        const { register } = this.props;
        register(newUser.email, newUser.password, newUser.firstname, newUser.lastname, newUser.username, newUser.location );  
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <ScrollView keyboardShouldPersistTaps={'handled'}>
                <View style={styles.formContainer}>
                    <Field keyboardType="default" placeholder="First Name" component={renderField} name="firstname" customStyles={fieldStyles.input} />
                    <Field keyboardType="default" placeholder="Last Name" component={renderField} name="lastname" customStyles={fieldStyles.input} />
                    <Field keyboardType="default" placeholder="Username" component={renderField} name="username" autoCapitalize="none" customStyles={fieldStyles.input} />
                    <View style={{borderBottomColor: 'rgba(191, 191, 191, 1)', borderBottomWidth: 1}}>
                        <Field
                            name="location"
                            component={ renderPicker }
                            iosHeader="Select one"
                            mode="dropdown"
                        >
                            <Picker.Item label="Anaheim, CA" value="Anaheim" />
                            <Picker.Item label="Fullerton, CA" value="Fullerton" />
                            <Picker.Item label="Irvine, CA" value="Irvine" />
                            <Picker.Item label="Los Angeles, CA" value="Los Angeles" />
                            <Picker.Item label="Santa Ana, CA" value="Santa Ana" />
                        </Field>
                    </View>
                    <Field keyboardType="email-address" placeholder="Email" component={renderField} name="email" autoCapitalize="none" customStyles={fieldStyles.input} />
                    <Field 
                        keyboardType="default" 
                        placeholder="Password" 
                        component={renderField} 
                        name="password" 
                        secureTextEntry={true}
                        autoCapitalize="none"
                        customStyles={fieldStyles.input} 
                    />
                    <Field 
                        keyboardType="default" 
                        placeholder="Confirm Password" 
                        component={renderField} 
                        name="confirmpassword" 
                        secureTextEntry={true}
                        autoCapitalize="none"
                        customStyles={fieldStyles.input} 
                    />
                    <TouchableOpacity 
                        onPress={handleSubmit(this.submit)} 
                        style={styles.submitButton}
                    >
                        <Text style={styles.submitText}>Get Started</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

const { height, width } = Dimensions.get('window');
const fieldStyles = StyleSheet.create({
    input: {
        borderBottomColor: 'rgba(191, 191, 191, 1)',
        borderBottomWidth: 1,
        height: 50,
        width: width - 55,
        padding: 5,
    },
});

const SignupForm = reduxForm({
    form: 'signup',
    validate
})(Signup);

export default SignupForm;