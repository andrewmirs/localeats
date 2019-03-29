import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Feed from './Feed';


class Home extends Component {

    static navigationOptions = {
        title: 'Local Picks',
        headerStyle: {
            backgroundColor: '#b23f2e',
            fontFamily: 'horizon'
        },
        headerTintColor: '#fff',
    };

    render() {
        return (
                <View style={styles.homepage}>
                    <Feed />
                </View>
        );
    }
}

const styles = StyleSheet.create({
    homepage: {
        flex: 1,
        backgroundColor: '#C7CEDB',
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
