import React, { Component } from 'react';
import { Alert, Button, Dimensions, Picker, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import GooglePlaces from './GooglePlaces';


class Favorites extends Component {
   
    constructor(props){
        super(props);

        this.state={
            favorites: [],
            addFavorite: null,
            details: null,
            notes: '',
        };
      
    }

    getSelectedPickerValue=()=>{
        this.setState({
            addFavorite: this.state.PickerSelectedVal,
        });
    }

    render(){
        return (
            <View style={styles.container}>
                {this.state.addFavorite == null ? (
                    <View>
                        <Text>Choose a place that has your:</Text>
                        <Picker
                            style={styles.pickerInput}
                            selectedValue={this.state.PickerSelectedVal}
                            onValueChange={(itemValue, itemIndex) => this.setState({PickerSelectedVal: itemValue})}
                        >

                            <Picker.Item label="Favorite Brunch" value="Brunch" />
                            <Picker.Item label="Favorite Cinnamon Rolls" value="Cinnamon Rolls" />
                            <Picker.Item label="Favorite Tacos" value="Tacos" />
                            <Picker.Item label="Favorite Ice Cream" value="Ice Cream" />
                            <Picker.Item label="Favorite Burgers" value="Burgers" />
                            <Picker.Item label="Favorite Sushi Rolls" value="Sushi Rolls" />

                        </Picker>

                        <Button title="Select" onPress={ this.getSelectedPickerValue } />
                    </View>
                    ) : (
                        <GooglePlaces favorite={this.state.addFavorite} />
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
        backgroundColor: '#CAE7B9',
        justifyContent: 'center', 
        alignItems: 'center'
    },
    pickerInput: {
        borderColor: 'rgba(191, 191, 191, 1)',
        borderStyle: 'solid',
        borderRadius: 5,
        borderWidth: 1,
        borderBottomWidth: 1,
        height: 50,
        width: width - 55,
        padding: 5,
        marginTop: 15,
    },
});

export default Favorites;