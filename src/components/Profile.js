import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth, database, f } from '../../config/config';
import styles from '../styles/profileStyles';
import User from './User';

class Profile extends Component {

    constructor(props){
        super(props);
        this.state={
            avatar: '',
            firstname: '',
            lastname: '',
            userId: '',
            username: '',
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
                    lastname: data.lastname,
                    username: data.username,
                    avatar: data.avatar,
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
                <View style={styles.header}>
                    <Text style={{paddingTop: 10}}>Profile</Text>
                </View>
                <View style={styles.profileInfoContainer}>
                    <Image source={{uri: `${this.state.avatar}`}} style={styles.picture} />
                    <View style={{ marginRight: 10 }}>
                        <Text>{this.state.firstname}</Text>
                        <Text>{this.state.username}</Text>
                        <Text>Costa Mesa, CA</Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={styles.signOutButton}
                    >
                        <Text style={styles.signOutText}>Edit Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.signOutButton}
                        onPress={this.signOutUser}
                    >
                        <Text style={styles.signOutText}>Sign Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default Profile;