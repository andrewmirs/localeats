import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

class Profile extends Component {
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
    },
    font: {
        color: 'purple'
    }
})

export default Profile;