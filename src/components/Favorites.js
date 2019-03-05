import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

class Profile extends Component {

    static navigationOptions = {
        header: null,
    }

    render(){
        return(
            <View style={styles.profilepage}>
                <Text style={styles.font}>These are my favorites!!</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    profilepage: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#CAE7B9'
    },
    font: {
        color: '#EB9486'
    }
})

export default Profile;