import React, { Component } from 'react';
import { ActivityIndicator, Dimensions, Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LocalPick from './LocalPick';


class Notes extends Component {
   
    constructor(props){
        super(props);

        this.state={
            favoritesList: [],
            favorite: null,
            details: null,
            notes: '',
        };
      
    }

    componentDidMount = () => {
        const { navigation } = this.props;
        const favorite = navigation.getParam('favorite', "Favorite didn't make it");
        const details = navigation.getParam('details', "Details didn't make it");

        this.setState({
            details,
            favorite
        });
    }

    render(){
        const { height, width } = Dimensions.get('window');
        const { details, favorite } = this.state;
        console.log('State in Notes Component:', this.state);
        return (
            <View style={styles.container}>
                {this.state.details !== null ? (
                    <View>
                        <View>
                            <Text>I've reached the notes page!!</Text>
                        </View>
                        <View style={{ paddingHorizontal: 20, marginTop: 20, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                            <LocalPick 
                                favorite={favorite} 
                                phonenumber={`9496449654`} 
                                name={details.name}
                                photo={details.photos[0].photo_reference}
                                rating={details.rating}
                                latitude={details.geometry.location.lat}
                                longitude={details.geometry.location.lng}
                                placeId={details.place_id}
                            />
                        </View>
                    </View>
                ) : (
                    <View style={styles.container}>
                        <ActivityIndicator />
                        <StatusBar barStyle="default" />
                    </View>
                )}
            </View>
        );
    }
}


const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width,
        height,
        backgroundColor: 'white',
        justifyContent: 'center', 
    },
});

export default Notes;