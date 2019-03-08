import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth, database, f } from '../../config/config';
import styles from '../styles/profileStyles';
import User from './User';

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
                <User />
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