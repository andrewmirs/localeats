import React, { Component } from 'react';
import { ActivityIndicator, Dimensions, Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth, database, f } from '../../config/config';
import LocalPick from './LocalPick';


class Notes extends Component {
   
    constructor(props){
        super(props);

        this.state={
            favoritesList: [],
            favorite: null,
            details: null,
            notes: '',
            uid: null
        };
      
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

        const { navigation } = this.props;
        const favorite = navigation.getParam('favorite', "Favorite didn't make it");
        const details = navigation.getParam('details', "Details didn't make it");

        that.setState({
            details,
            favorite
        });
    
    }

    savePick = () => {
        const { details, favorite, notes } = this.state;

        try {
            f.database().ref('favorites/' + this.state.uid+'/' + favorite).set({
                favorite: favorite,
                phonenumber: details.formatted_phone_number, 
                name: details.name,
                photo: details.photos[0].photo_reference,
                rating: details.rating,
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                placeId: details.place_id,
                notes: notes,
            });
        }
        catch(err){
            console.log(err);
        }

    }

    discardPick = () => {
        this.setState({
            favoritesList: [],
            favorite: null,
            details: null,
            notes: '',
        });
        this.props.navigation.navigate('Favorites');
    }

    render(){
        const { height, width } = Dimensions.get('window');
        const { details, favorite } = this.state;
        return (
            <View style={styles.container}>
                {this.state.details !== null && this.state.uid !== null ? (
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10 }}>
                            <Text>Before we add {details.name} to your Local Picks,</Text>
                        </View>
                        <View style={{ paddingHorizontal: 20, marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                            <LocalPick 
                                favorite={favorite} 
                                phonenumber={details.formatted_phone_number} 
                                name={details.name}
                                photo={details.photos[0].photo_reference}
                                rating={details.rating}
                                latitude={details.geometry.location.lat}
                                longitude={details.geometry.location.lng}
                                placeId={details.place_id}
                            />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Text>Tell us why this is your Local Pick for {favorite}:</Text>
                            <TextInput
                                style={styles.textAreaContainer}
                                placeholder="Share with us.."
                                placeholderTextColor= "lightgrey"
                                multiline={true}
                                numberOfLines={5}
                                onChangeText={(text) => this.setState({
                                    notes: text
                                })}
                                value={this.state.notes}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity 
                                style={styles.button}
                                onPress={this.savePick}
                            >
                                <Text style={styles.buttonText}>Save</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={styles.button}
                                onPress={this.discardPick}
                            >
                                <Text style={styles.buttonText}>Discard</Text>
                            </TouchableOpacity>
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
    button: {
        width: width - 55,
        height: 45,
        borderRadius: 20,
        borderColor: 'grey',
        borderWidth: 1.5,
        backgroundColor: 'white',
        justifyContent: 'center',
        marginTop: 10,
        paddingVertical: 15
    },
    buttonContainer: {
        paddingBottom: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: "grey",
        fontSize: 18,
        margin: 5,
        textAlign: 'center',
    },
    container: {
        flex: 1,
        width,
        height,
        backgroundColor: '#EB9486',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textAreaContainer: {
        marginTop: 10,
        borderColor: 'lightgrey',
        borderWidth: 1,
        padding: 5,
        backgroundColor: 'white',
        justifyContent: "flex-start"
    },
});

export default Notes;