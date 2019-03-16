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
                            photo={'CmRaAAAAWyyP1y_p9lc8X_8dx8JClrB9ZJitKLJC5Wa5WteFoL39lGpAaHLCjHC3VFu-MKd3N2QLMapg-WYODhUUgbyub0n_OUUqLl94f1QmRUvzjcX4LR3OrLqE1Co1HRMz8SwwEhC_IezrFzD2hbv9f6aQflovGhR4S_s0a1Fh3txALkRHhQZrLraAwQ'}
                            rating={4.4}
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