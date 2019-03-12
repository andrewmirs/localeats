import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';
import MapView from 'react-native-maps';
import { api_key } from '../../config/google_maps_api';


class Profile extends Component {
   
    constructor(props){
        super(props);

        this.state={
            error: '',
            latitude: 33.6846,
            longitude: 117.8265,
            destination: '',
        };
    }

    onChangeDestination = async (destination) => {
        this.setState({
            destination
        });
        const apiUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${destination}&inputtype=textquery&fields=photos,formatted_address,name,rating&key=${api_key}`;
        try {
            const result = await fetch(apiUrl);
            const json = await result.json();
            console.log(json);
        } catch (err) {
            console.log(err);
        }
    }

    render(){
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map} 
                    region={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                    showUserLocation={true}
                />
                <TextInput 
                    placeholder="Search.." 
                    value={this.state.destination} 
                    onChangeText={destination => this.onChangeDestination(destination)}
                    style={styles.destinationInput}
                />
            </View>
        );
    }
}


const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
       ...StyleSheet.absoluteFillObject
    },
    destinationInput: {
        height: 40,
        borderWidth: 0.5,
        marginTop: 50,
        marginLeft: 5,
        marginRight: 5,
        padding: 5,
        backgroundColor: 'white',
        zIndex: 5,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    }
});

export default Profile;