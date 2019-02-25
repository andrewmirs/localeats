import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AnimOne from '../animations/anim-one';
import Reviews from './Reviews';

class Home extends Component {
    render() {
        return (
        <View style={styles.homepage}>
         <AnimOne />
            <View style={styles.text}>
                <Text>New home screen!</Text>
            </View>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    homepage: {
        flex: 1,
        backgroundColor: 'purple',
    },
    text: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
    }
});

export default Home;
