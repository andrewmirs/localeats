import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';


class Home extends Component {

    static navigationOptions = {
        header: null,
    }

    render() {
        return (
                <View style={styles.homepage}>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>New home screen!</Text>
                    </View>
                </View>
        );
    }
}

const styles = StyleSheet.create({
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
