import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth, database, f } from '../../config/config';
import styles from '../styles/profileStyles';
import EditProfile from './EditProfile';

class Profile extends Component {

    static navigationOptions = {
        title: 'Profile',
        headerStyle: {
            backgroundColor: '#b23f2e',
        },
        headerTintColor: '#fff',
    };

    constructor(props){
        super(props);
        this.state={
            avatar: 'https://api.adorable.io/avatars/285/test@user.r.png',
            firstname: '',
            lastname: '',
            location: '',
            userId: '',
            username: '',
            loggedin: false,
            editProfile: false,
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
                    location: data.location,
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

    editProfile = () => {
        this.setState({
            editProfile: true,
        })
    }

    cancelEdit = () => {
        this.setState({
            editProfile: false,
        })
    }

    updateProfile = (firstname, lastname, username) => {

        var un = username.toLowerCase();
        database.ref('users').child(this.state.userId).child('firstname').set(firstname);
        database.ref('users').child(this.state.userId).child('lastname').set(lastname);
        database.ref('users').child(this.state.userId).child('username').set(`@${un}`);
        this.setState({
            editProfile: false,
        })
        this.fetchUserInfo(this.state.userId);
    }

    render(){
        return(
            <View style={styles.profilepage}>
                <View style={styles.profileInfoContainer}>
                    <Image source={{uri: `${this.state.avatar}`}} style={styles.picture} />
                    <View style={{ marginRight: 10 }}>
                        <Text>{this.state.firstname}</Text>
                        <Text>{this.state.username}</Text>
                        <Text>{`${this.state.location}, CA`}</Text>
                    </View>
                </View>
                { this.state.editProfile == true ? (
                    <EditProfile cancelEdit={() => this.cancelEdit()} updateProfile={this.updateProfile} />
                ) : (
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity 
                            style={styles.signOutButton}
                            onPress={this.editProfile}
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
                )}  
            </View>
        );
    }
}

export default Profile;