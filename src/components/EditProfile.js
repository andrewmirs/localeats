import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import renderField from './Field';
import styles from '../styles/profileStyles';

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

    return errors
}

class EditProfile extends Component {

    submit = update => {
        const { updateProfile } = this.props;
        updateProfile(update.firstname, update.lastname, update.username);  
    }

    render(){
        const { handleSubmit } = this.props;
        return(
            <View style={{ alignItems: 'center', justifyContent: 'center',paddingTop: 20}}>
                <Text>Edit Profile</Text>
                <Field keyboardType="default" placeholder="First Name" component={renderField} name="firstname" customStyles={fieldStyles.input} />
                <Field keyboardType="default" placeholder="Last Name" component={renderField} name="lastname" customStyles={fieldStyles.input} />
                <Field keyboardType="default" placeholder="Username" component={renderField} name="username" autoCapitalize="none" customStyles={fieldStyles.input} />
                <TouchableOpacity 
                        onPress={handleSubmit(this.submit)} 
                        style={styles.signOutButton}
                    >
                        <Text style={styles.signOutText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this.props.cancelEdit}
                    style={styles.signOutButton}
                >
                    <Text style={styles.signOutText}>Cancel</Text>
                </TouchableOpacity>

            </View>
        );
    }
}

const { height, width } = Dimensions.get('window');
const fieldStyles = StyleSheet.create({
    input: {
        borderBottomColor: 'darkgray',
        borderBottomWidth: 1,
        height: 50,
        width: width - 55,
        padding: 5,
    },
});
    
const EditForm = reduxForm({
    form: 'editProfile',
    validate
})(EditProfile);

export default EditForm;