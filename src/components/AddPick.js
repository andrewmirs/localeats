import React, { Component } from 'react';
import { Dimensions, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Textarea from 'react-native-textarea';
import { auth, database, f } from '../../config/config';
import { Overlay } from 'react-native-elements';
import { api_key } from '../../config/google_maps_api';
import _ from 'lodash';

class AddPick extends Component {

    constructor(props){
        super(props);

        this.state={
            error: '',
            favorite: '',
            latitude: 0,
            longitude: 0,
            location: '',
            predictions: [],
            placeid: '',
            details: null,
            caption: '',
        };
        this.onChangeLocationDebounced = _.debounce(this.onChangeLocation, 1000)
    }

    componentDidMount = () => {

        const that = this;
        f.auth().onAuthStateChanged(function(user) {
            if(user){
                that.setState({
                    uid: user.uid,
                });
            } else {
                console.log('No user data! Either not logged in or database error')
            }
        });

        navigator.geolocation.getCurrentPosition(
            position => {
                that.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            error => that.setState({ error: error.message }),
            { enableHighAccuracy: true, maximumAge: 2000, timeout: 20000 }
        );

    }

    onChangeLocation = async (location) => {
        this.setState({
            location
        });
        const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${api_key}&input=${location}&location=${this.state.latitude},${this.state.longitude}&radius=2000`;
        try {
            const result = await fetch(apiUrl);
            const json = await result.json();
            this.setState({
                predictions: json.predictions,
            });
        } catch (err) {
            console.log(err);
        }
    }

    selectLocation = async (placeid) => {
        this.setState({
            placeid
        });
        const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?key=${api_key}&placeid=${placeid}&fields=name,geometry,photo,place_id,rating,website,id,formatted_phone_number`;
        try {
            const result = await fetch(apiUrl);
            const json = await result.json();
            this.setState({
                details: json.result,
                destination: json.result.name,
                predictions: [],
            });
        } catch (err) {
            console.log(err);
        }
    }

    clearModal = () => {
        const { closeModal } = this.props;
        this.setState({
            destination: null,
            error: '',
            favorite: '',
            location: '',
            predictions: [],
            placeid: '',
            details: null,
            caption: '',
        });
        closeModal();
    }

    generateId = () => {
       
        var keys = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-0123456789";
    
        var id = "";
    
        for (var i = 0; i < 30; i++) {
        var random = Math.floor(Math.random() * keys.length);
        id += keys[random];
        }
        return id;

    }

    savePick = () => {
        const { details, favorite, caption} = this.state;
        const favId = this.generateId();
        let dateTime = Date.now();
        const timestamp = Math.floor(dateTime / 1000);

        try {
            f.database().ref('favorites/' + favId).set({
                favorite: favorite,
                phonenumber: details.formatted_phone_number, 
                name: details.name,
                photo: details.photos[0].photo_reference,
                rating: details.rating,
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                placeId: details.place_id,
                caption: caption,
                author: this.state.uid,
                posted: timestamp,
            });
            f.database().ref('users/' + this.state.uid + '/favorites/' + favId).set({
                favorite: favorite,
                phonenumber: details.formatted_phone_number, 
                name: details.name,
                photo: details.photos[0].photo_reference,
                rating: details.rating,
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                placeId: details.place_id,
                caption: caption,
                author: this.state.uid,
                posted: timestamp,
            });
        }
        catch(err){
            console.log(err);
        }

        this.clearModal();

    }

    render() {

        const predictions = this.state.predictions.map(( prediction, index ) => (
            <TouchableOpacity
                style={index == 4 ? styles.suggestionsRoundedBottom : styles.suggestions}
                onPress={() => this.selectLocation(prediction.place_id)}
                key={prediction.id}
                index={index}
            >
                <Text >{prediction.description}</Text>
            </TouchableOpacity>
        ));

        return(
            <Overlay
                animationType="slide"
                transparent={false}
                isVisible={this.props.isVisible}
                onRequestClose={this.props.onRequestClose}
                windowBackgroundColor="rgba(0,0,0,0.7)"
                onBackdropPress={this.props.onBackdropPress}
                containerStyle={{ padding: 0 }}
            >
                <View style={{ flex: 1 }}>
                    <View style={{ width: '100%', height: 60, backgroundColor: '#b23f2e', flex: -1, alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
                        <Text style={{ fontFamily: 'horizon', fontSize: 26, color: 'white' }}>Add Your Local Pick</Text>
                    </View>

                    <ScrollView style={{ marginTop: 10 }}>

                        <Text>1. Name your pick type</Text>
                        <Text style={{ fontSize: 10 }}>(ex. Breakfast Buritto, Stout Beer, etc..)</Text>
                        <TextInput 
                            placeholder="Pick type" 
                            value={this.state.favorite} 
                            onChangeText={pick => this.setState({favorite: pick})}
                            style={styles.pickInput}
                            autoCapitalize="words"
                        />

                        <Text>2. Choose the location</Text>
                        <TextInput 
                            placeholder="Search.." 
                            value={this.state.destination} 
                            onChangeText={location => this.onChangeLocationDebounced(location)}
                            style={this.state.predictions.length == 0 ? styles.locationInput : styles.locationInputWithPredictions}
                        />

                        { predictions }

                        <Text>3. Leave a comment or feedback</Text>
                        <Textarea
                            placeholder={"Share some feedback.." }
                            value={this.state.caption} 
                            onChangeText={caption => this.setState({caption})}
                            style={styles.pickInput}
                            autoCapitalize={"sentences"}
                            containerStyle={styles.textareaContainer}
                            style={styles.textarea}
                            maxLength={120}
                            placeholderTextColor={'#c7c7c7'}
                            underlineColorAndroid={'transparent'}
                        />

                        <View style={{ flex: -1, height: 60, flexDirection: 'row', borderRadius:5, backgroundColor: 'grey', marginTop: 10 }}>
                            <TouchableOpacity 
                                style={{ width: '50%', height: '100%', backgroundColor: '#b23f2e', borderBottomLeftRadius: 5, borderTopLeftRadius: 5, justifyContent: 'center', alignItems: 'center' }}
                                onPress={() => this.savePick()}
                            >
                                <Text style={{ fontFamily: 'horizon', color: 'white' }}>Save</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={{ width: '50%', height: '100%', backgroundColor: 'darkgrey', borderBottomRightRadius: 5, borderTopRightRadius: 5, justifyContent: 'center', alignItems: 'center' }}
                                onPress={this.clearModal}
                            >
                                <Text style={{ fontFamily: 'horizon', color: 'white' }}>Cancel</Text>
                            </TouchableOpacity>
                        </View>

                    </ScrollView>
                </View>
            </Overlay>

        );
    }
}

const styles = StyleSheet.create({
    locationInput: {
        height: 40,
        borderWidth: 0.5,
        borderColor: 'darkgrey',
        borderRadius: 5,
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 10,
        padding: 5,
        backgroundColor: 'white',
        zIndex: 5,
    },
    locationInputWithPredictions: {
        height: 40,
        borderWidth: 0.5,
        borderColor: 'darkgrey',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
        padding: 5,
        backgroundColor: 'white',
        zIndex: 5,
    },
    pickInput: {
        height: 40,
        borderWidth: 0.5,
        borderColor: 'darkgrey',
        borderRadius: 5,
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 10,
        padding: 5,
        backgroundColor: 'white',
        zIndex: 5,
    },
    suggestions: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 5,
        fontSize: 16,
        borderWidth: 0.5,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 0,
        borderColor: 'darkgrey',
    },
    suggestionsRoundedBottom: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 5,
        fontSize: 16,
        borderWidth: 0.5,
        marginLeft: 5,
        marginRight: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderColor: 'darkgrey',
    },
    textareaContainer: {
        height: 180,
        padding: 8,
        backgroundColor: '#fcfcfc',
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: 'darkgrey',
        marginTop: 10
    },
    textarea: {
        textAlignVertical: 'top',
        height: 170,
        fontSize: 14,
        color: '#333',
    },
});


export default AddPick;