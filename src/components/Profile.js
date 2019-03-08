import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth, database, f } from '../../config/config';
import styles from '../styles/profileStyles';
import User from './User';

class Profile extends Component {

    constructor(props){
        super(props);
        this.state={
            firstname: '',
            lastname: '',
            userId: '',
            loggedin: false,
        }
    }

    componentDidMount = () => {
        const that = this;
        f.auth().onAuthStateChanged(function(user) {
            if(user){
                that.fetchUserInfo(user.uid)
            } else {
                console.log('No user data! Either not logged in or database error')
            }
        });
    }

    fetchUserInfo = (userId) => {
        var that = this;
        database.ref('users').child(userId).once('value').then(function(snapshot){
            const exists = (snapshot.val() !== null);
            if(exists) data = snapshot.val();
                that.setState({
                    firstname: data.firstname,
                    lastname: database.lastname,
                    userId: userId,
                    loggedin: true,
                });
        });
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
                <Text style={styles.font}>This is {this.state.firstname}'s Profile</Text>
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