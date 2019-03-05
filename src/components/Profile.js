import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

class Profile extends Component {

    static navigationOptions = {
        header: null,
    }

    render(){
        return(
            <View style={styles.profilepage}>
                <Text style={styles.font}>This is my Profile</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    profilepage: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#EB9486',
    },
    font: {
        color: 'white'
    }
})

export default Profile;