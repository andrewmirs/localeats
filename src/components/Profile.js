import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
            <View style={{flex: 1}}>
                <View style={{ height: 70, padding: 30, backgroundColor: 'white', borderColor: 'lightgrey', borderBottomWidth: 0.5, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{paddingTop: 10}}>Profile</Text>
                </View>
                <View style={styles.profileInfoContainer}>
                    <Image source={{ uri: 'https://api.adorable.io/avatars/285/test@user.m.png' }} style={styles.picture} />
                    <View style={{ marginRight: 10 }}>
                        <Text>{this.state.firstname}</Text>
                        <Text>@username</Text>
                        <Text>Costa Mesa, CA</Text>
                    </View>
                </View>
            </View>
        );
    }
}

export default Profile;