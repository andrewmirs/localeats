import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';
import MapView from 'react-native-maps';



class GooglePlacesInput extends Component {

    constructor(props){
        super(props);

        this.state={
            error: '',
            latitude: 0,
            longitute: 0,
            destination: '',
        };
    }

    onChangeDestination = (destination) => {
        this.setState({
            destination
        });
        const apiUrl = `AIzaSyAArullsm1GrTYfPx6PQflP2nLjspF2vQE`;
    }

    render(){
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map} 
                    region={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitute,
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

export default GooglePlacesInput;