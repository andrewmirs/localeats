import React, { Component } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth, database, f, storage } from '../../config/config';
import { Ionicons } from '@expo/vector-icons';
import { Header } from 'react-native-elements';
import styles from '../styles/profileStyles';
import ProfileHeader from './ProfileHeader';
import LocalPick from './LocalPick';
import Icon from '../../assets/images/localpick-icon.png';


class UserProfile extends Component {

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
            uid: '',
            username: '',
            loggedin: false,
            editProfile: false,
            favorites: [],
            loading: true,
        }
    }

    componentDidMount = () => {
        this.checkParams();
    }

    checkParams =()=> {
        const params = this.props.navigation.state.params;
        if(params){
            if(params.uid){
                this.setState({
                    uid: params.uid,
                });
                this.fetchUserInfo(params.uid);
                this.fetchFavorites(params.uid);
            } 
        }
    }


    fetchFavorites = (uid) => {
        var that = this;
        database.ref('users').child(uid).child('favorites').once('value').then(function(snapshot){
            const exists = (snapshot.val() !== null);
            if(exists) data = snapshot.val();
            var arrayOfData = [];
                for(var user in data){
                    if (data[user].author == uid){
                        arrayOfData.push(data[user]);
                    }
                }
                
                that.setState({
                    favorites: arrayOfData,
                    loading: false,
                });
        });
    }

    fetchUserInfo = (uid) => {
        var that = this;
        database.ref('users').child(uid).once('value').then(function(snapshot){
            const exists = (snapshot.val() !== null);
            if(exists) data = snapshot.val();
                that.setState({
                    firstname: data.firstname,
                    lastname: data.lastname,
                    username: data.username,
                    location: data.location,
                    avatar: data.avatar,
                    uid: uid,
                    loggedin: true,
                    loading: false,
                });
        });
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
                key={index}
            />
        ));

        return(
            <View style={{ flex: 1 }}>
                {this.state.loading == true ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image 
                            source={Icon}
                            resizeMode='contain'
                            style={{ height: 150, marginBottom: 30 }}
                        />
                        <ActivityIndicator size="large" color="#b23f2e" />
                    </View>
                ) : (
                <View style={styles.profilepage}>
                    <TouchableOpacity
                        style={{ position: 'absolute', top: 35, left: 25, zIndex: 10 }}
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Ionicons name={`md-arrow-round-back`} size={30} color='white' />
                    </TouchableOpacity>

                    <ProfileHeader
                        avatar={this.state.avatar}
                        firstname={this.state.firstname}
                        lastname={this.state.lastname}
                        username={this.state.username}
                        location={this.state.location}
                    />

                    <View style={{ borderTopWidth: 5, borderColor: '#b23f2e', zIndex: 3 }}></View>
                    <ScrollView style={{ flex: 1 }}>
                    
                        { this.state.favorites.length == 0 ? (
                            <View style={{ paddingVertical: 20, marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                                <Text>{this.state.username} hasn't added any picks yet.</Text>
                            </View>
                        ) : (
                            <View style={{ paddingHorizontal: 20, paddingBottom: 20, marginTop: 20, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                { localpicks }
                            </View>
                        )}
            
                    </ScrollView>
                </View>
                )}
            </View>
        );
    }
}

export default UserProfile;