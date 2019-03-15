import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Notes from './Notes';


class Home extends Component {

    render() {
        return (
                <View style={styles.homepage}>
                    <View style={styles.header}>
                        <Text style={{paddingTop: 10}}>Local Picks</Text>
                    </View>


                    <View style={styles.textContainer}>
                        <Notes />
                    </View>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        height: 70, 
        padding: 30, 
        backgroundColor: 'white', 
        borderColor: 'lightgrey', 
        borderBottomWidth: 0.5, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    homepage: {
        flex: 1,
        backgroundColor: '#F3DE8A',
    },
    text: {
        color: '#7E7F9A',
    },
    textContainer: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
    }
});

export default Home;
