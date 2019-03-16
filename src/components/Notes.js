import React, { Component } from 'react';
import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
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

    // componentDidMount = () => {
    //     const { navigation } = this.props;
    //     const favorite = navigation.getParam('favorite', "Favorite didn't make it");
    //     const details = navigation.getParam('details', "Details didn't make it");

    //     this.setState({
    //         details,
    //         favorite
    //     });
    // }

    render(){
        const { height, width } = Dimensions.get('window');
        console.log('State in Notes Component:', this.state);
        return (
            <View style={styles.container}>
                    <View>
                        <Text>I've reached the notes page!!</Text>
                    </View>
                    <View style={{ paddingHorizontal: 20, marginTop: 20, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        <LocalPick 
                            favorite={'Pasta'} 
                            phonenumber={'(862) 224-5850'} 
                            name={'North Italia'}
                            photo={'CmRaAAAASqh4AQkhKyIeoNfVtGURDXhJVxfwiMtG8DRgGBkaYWD2vqVvqrqa2YevSEKCEnwNtzES02KEe22bpbBLhiL6Tvdxr1TLru6UP0DeU6TOarnU67iOSG1iyd1-uLZhQOW8EhBve7-4k1eT9wW7456S3Xa2GhSo0MVmQlrYXOa8kHMolpk6k6qixg'}
                            rating={4.4}
                            latitude={33.6717498}
                            longitude={-117.8450232}
                            placeId={'ChIJH-B6kmLe3IARltKe7Pe0CSg'}
                        />
                    </View>
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