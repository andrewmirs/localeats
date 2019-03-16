import React, { Component } from 'react';
import { Dimensions, Image, Linking, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Popup } from 'react-native-map-link';
import StarRating from 'react-native-star-rating';
import { Ionicons } from '@expo/vector-icons';
import { api_key } from '../../config/google_maps_api';


const { height, width } = Dimensions.get('window');

class LocalPick extends Component {

    constructor(props){
        super(props);

        this.state = {
            isVisible: false
        }
    }

    render(){
        return(
            <View style={{ width: width / 2 - 30, height: width / 2 - 30, borderWidth: 0.5, borderColor: '#dddddd', borderRadius: 5, marginTop: 10 }}>
                <View style={{ flex: 1 }}>
                    <Image
                        style={{ flex: 1, width: null, height: null, resizeMode: 'cover',
                        borderTopLeftRadius: 5, borderTopRightRadius: 5, }} 
                        source={{uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${this.props.photo}&key=${api_key}`}} 
                    />
                </View>
                <View style={{ flex: -1, alignItems: 'flex-start', justifyContent: 'space-evenly', paddingLeft: 10, paddingVertical: 5 }}>
                    <Text style={{ fontSize: 12, color: '#b63838'}}>Favorite {this.props.favorite}</Text>
                    <Text style={{ fontSize: 11, fontWeight: 'bold' }}>{this.props.name}</Text>
                    <StarRating 
                        disabled={true}
                        maxStars={5}
                        rating={this.props.rating}
                        starSize={10}
                    />
                </View>
                <View style={{ flex: -1, height: 30, flexDirection: 'row', borderBottomLeftRadius: 5, borderBottomRightRadius: 5, backgroundColor: 'grey'}}>
                    <TouchableOpacity 
                        style={{ width: '50%', height: '100%', backgroundColor: 'grey', borderBottomLeftRadius: 5, justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => Linking.openURL(`tel:${this.props.phonenumber}`)}
                    >
                        <Ionicons name={`ios-call`} size={18} color='darkgrey' />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{ width: '50%', height: '100%', backgroundColor: 'darkgrey', borderBottomRightRadius: 5, justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => this.setState({isVisible: true})}
                    >
                        <Ionicons name={`ios-pin`} size={18} color='grey' />
                    </TouchableOpacity>
                </View>
                <Popup
                    isVisible={this.state.isVisible}
                    onCancelPressed={() => this.setState({ isVisible: false })}
                    onAppPressed={() => this.setState({ isVisible: false })}
                    onBackButtonPressed={() => this.setState({ isVisible: false })}
                    modalProps={{ // you can put all react-native-modal props inside.
                        animationIn: 'slideInUp'
                    }}
                    appsWhiteList={[ /* Array of apps (apple-maps, google-maps, etc...) that you want
                    to show in the popup, if is undefined or an empty array it will show all supported apps installed on device.*/ ]}
                    options={{
                        latitude: this.props.latitude,
                        longitude: this.props.longitude,
                        title: this.props.name,
                        googlePlaceId: this.props.placeId
                    }}
                    style={{ /* Optional: you can override default style by passing your values. */ }}
                />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width,
        height,
        backgroundColor: 'white',
        justifyContent: 'center', 
    },
});

export default LocalPick;