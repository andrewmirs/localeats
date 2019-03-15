import React, { Component } from 'react';
import { Alert, Button, Dimensions, Picker, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


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
        console.log('State in Notes Component:', this.state);
        return (
            <View style={styles.container}>
                    <View>
                        <Text>I've reached the notes page!!</Text>
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
        backgroundColor: '#CAE7B9',
        justifyContent: 'center', 
        alignItems: 'center'
    },
});

export default Notes;