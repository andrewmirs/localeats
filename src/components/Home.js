import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Reviews from './Reviews';

class Home extends Component {
    render() {
        return (
        <View style={styles.homepage}>
            <Text>New home screen!</Text>
            <Reviews />
        </View>
        );
    }
}

const styles = StyleSheet.create({
    homepage: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: 'purple',
    },
})

export default Home;
