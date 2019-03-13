import React, { Component } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';


class SignInErrorModal extends Component {
    render(){
        return(
            <Modal style={styles.container}>
                Sign In Error
            </Modal>
        );
    }
}

var screen = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        borderRadius: 30,
        shadowRadius: 10,
        width: screen.width - 80,
        height: 280,
    },
});

export default SignInErrorModal;