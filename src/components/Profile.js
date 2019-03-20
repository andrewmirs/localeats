import React, { Component } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth, database, f } from '../../config/config';
import styles from '../styles/profileStyles';
import EditProfile from './EditProfile';
import LocalPick from './LocalPick';

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
            favorites: [],
        }
    }

    componentDidMount = () => {
        const that = this;
        f.auth().onAuthStateChanged(function(user) {
            if(user){
                that.fetchUserInfo(user.uid);
                that.fetchFavorites(user.uid);
            } else {
                console.log('No user data! Either not logged in or database error')
            }
        });
    }

    fetchFavorites = (userId) => {
        var that = this;
        database.ref('favorites').child(userId).once('value').then(function(snapshot){
            const exists = (snapshot.val() !== null);
            if(exists) data = snapshot.val();
                var arrayOfData = Object.values(data);
                that.setState({
                    favorites: arrayOfData,
                });
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
        
        const localpicks = this.state.favorites.map(( pick, index ) => (
            <LocalPick 
                favorite={pick.favorite} 
                phonenumber={pick.phonenumber} 
                name={pick.name}
                photo={pick.photo}
                rating={pick.rating}
                latitude={pick.latitude}
                longitude={pick.longitude}
                placeId={pick.placeId}
            />
        ));

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
                <ScrollView>
                    { this.state.favorites.length == 0 ? (
                        <View style={{ paddingHorizontal: 20, marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>Local picks go here..</Text>
                        </View>
                    ) : (
                        <View style={{ paddingHorizontal: 20, marginTop: 20, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                            { localpicks }
                        </View>
                    )}
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
                </ScrollView> 
            </View>
        );
    }
}

export default Profile;