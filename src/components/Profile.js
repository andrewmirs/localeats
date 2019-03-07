import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth, databse, f } from '../../config/config';
import styles from '../styles/profileStyles';

class Profile extends Component {

    static navigationOptions = {
        header: null,
    }

    signOutUser = () => {
        auth.signOut()
        .then(() => {
            this.props.navigation.navigate('Landing');
            console.log('Signed out!!!')
        }).catch((err) => {
            console.log('Error', err);
        }); 
    }

    render(){
        return(
            <View style={styles.profilepage}>
                <Text style={styles.font}>This is my Profile</Text>
                <TouchableOpacity 
                    style={styles.signOutButton}
                    onPress={this.signOutUser}
                >
                    <Text style={styles.signOutText}>Sign Out</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default Profile;