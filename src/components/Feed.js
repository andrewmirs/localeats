import React, { Component } from 'react';
import { Dimensions, ImageBackground, FlatList, Linking, StyleSheet, Text, View } from 'react-native';
import { Entypo, FontAwesome, Feather } from '@expo/vector-icons';
import { auth, database, f } from '../../config/config';
import { api_key } from '../../config/google_maps_api';
import DirectionsPopup from './DirectionsPopup';



class Feed extends Component {
    constructor(props){
        super(props);
        this.popupModal = React.createRef();

        this.state = {
            favorites_feed: [],
            refresh: false,
            loading: true,
        }
    }

    componentDidMount = () => {

        // Load Feed
        this.loadFeed();

    }

    pluralCheck = (s) => {
        if(s == 1){
            return ' ago';
        } else {
            return 's ago';
        }
    }

    timeConverter = (timestamp) => {

        var a = new Date(timestamp * 1000);
        var seconds = Math.floor((new Date() - a) / 1000);

        // Years
        var interval = Math.floor(seconds / 31536000);
        if(interval >= 1){
            return interval + ' year' + this.pluralCheck(interval);
        }

        // Months
        interval = Math.floor(seconds / 2592000);
        if(interval >= 1){
            return interval + ' month' + this.pluralCheck(interval);
        }

        // Days
        interval = Math.floor(seconds / 86400);
        if(interval >= 1){
            return interval + ' day' + this.pluralCheck(interval);
        }

        // Hours
        interval = Math.floor(seconds / 3600);
        if(interval >= 1){
            return interval + ' hour' + this.pluralCheck(interval);
        }

        // Minutes
        interval = Math.floor(seconds / 60);
        if(interval >= 1){
            return interval + ' minute' + this.pluralCheck(interval);
        }

        return Math.floor(seconds) + ' second' + this.pluralCheck(seconds);
    }

    addToFlatList = (favorites_feed, data, fav) => {

        var that = this;
        var favObj = data[fav];
        database.ref('users').child(favObj.author).once('value').then(function(snapshot) {
            const exists = (snapshot.val() !== null);
            if (exists) data = snapshot.val();
                favorites_feed.push({
                    id: fav,
                    favorite: favObj.favorite,
                    latitude: favObj.latitude,
                    longitude: favObj.longitude,
                    name: favObj.name,
                    phonenumber: favObj.phonenumber,
                    photo: favObj.photo,
                    posted: that.timeConverter(favObj.posted),
                    placeId: favObj.placeId,
                    rating: favObj.rating,
                    author: data.username,
                });


                that.setState({
                    refresh: false,
                    loading: false,
                });

        }).catch(error => console.log(error));
    }

    loadFeed = () => {
        
        this.setState({
            refresh: true,
            favorites_feed: [],
        });

        var that = this;
        database.ref('favorites').orderByChild('posted').once('value').then(function(snapshot) {
            const exists = (snapshot.val() !== null);
            if (exists) data = snapshot.val();
                var favorites_feed = that.state.favorites_feed;

                for(var fav in data){
                   
                    that.addToFlatList(favorites_feed, data, fav);

                }
        }).catch(error => console.log(error));

    }

    loadNew = () => {

         // Load Feed
         this.loadFeed();

    }

    handleClick = () => {
        this.popupModal.current.modalOpen();
    }

    render() {

        return(
            <View style={styles.feedContainer}>

                {this.state.loading == true ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text>Loading...</Text>
                    </View>
                ) : (
                    <FlatList
                        refreshing={this.state.refresh}
                        onRefresh={this.loadNew}
                        data={this.state.favorites_feed}
                        keyExtractor={(item, index) => index.toString()}
                        style={styles.flatlist}
                        renderItem={({ item, index }) => (
                            <View key={index} style={styles.pickComponent}>
                                <View style={styles.pickHeader}>
                                    <Text style={styles.place}>{item.posted}</Text>
                                    <Text style={styles.username}>{item.author}</Text>
                                </View>
                                <View>
                                    <ImageBackground 
                                        source={{uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photo}&key=${api_key}`}}
                                        style={styles.image}
                                    >
                                        <View style={styles.titleContainer}>
                                            <Text style={styles.titleText}>{item.favorite}</Text>
                                            <Text style={styles.subtitleText}>{item.name}</Text>
                                        </View>
                                    </ImageBackground>
                                </View>
                                <View style={styles.pickFooter}>
                                    <FontAwesome name={`comments-o`} size={21} color='grey' />
                                    <Feather name={`phone`} size={20} color='grey' onPress={() => Linking.openURL(`tel:${item.phonenumber}`)} />
                                    <Entypo name={`location-pin`} size={21} color='grey' onPress={() => this.handleClick() } />
                                </View>

                                <DirectionsPopup
                                    ref={this.popupModal} 
                                    name={item.name}
                                    latitude={item.latitude}
                                    longitude={item.longitude}
                                    placeId={item.placeId}
                                    isVisibile={this.state.isVisibile}
                                />

                            </View>
                        )}
                    />
                )}
                
            </View>
        );
    }
}

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
    feedContainer: {
        flex: 1,
    },
    flatlist: {
        flex: 1,
        backgroundColor: '#eee'
    },
    image: {
        resizeMode: 'cover',
        width: '100%',
        height: 225,
    },
    pickComponent: {
        width: '100%',
        overflow: 'hidden',
        marginBottom: 1,
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: 'grey',
    },
    pickFooter: {
        padding: 5,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'white',
    },
    pickHeader: {
        padding: 5,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'darkgrey',
    },
    place: {
        color: 'white',
    },
    subtitleText: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.85)',
        paddingTop: 0,
    },
    titleContainer: {
        width: '100%',
        paddingTop: 2,
        paddingBottom: 4,
        backgroundColor: 'rgba(0,0,0,0.4)',
        alignItems: 'center',
        marginTop: 20,
    },
    titleText: {
        fontSize: 25,
        color: 'rgba(255,255,255,0.85)',
        fontFamily: 'lobster',
        padding: 0,
        margin: 0,
        lineHeight: 28,
    },
    username: {
        fontWeight: 'bold',
        color: 'white',
    },
});

export default Feed;

