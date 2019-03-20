import React, { Component } from 'react';
import { Image, ImageBackground, Text, View } from 'react-native';
import styles from '../styles/profileStyles';

class ProfileHeader extends Component {
    render(){
        return(
            <ImageBackground style={styles.headerBackground} source={require('../../assets/images/profile-header-bg.jpg')}>

                <View style={styles.header}>
                
                    <View style={styles.profilePicWrap}>
                        <Image style={styles.profilePic} source={{ uri: `${this.props.avatar}`}} />
                    </View>

                    <Text style={styles.name}>{this.props.firstname} {this.props.lastname}</Text>
                    <Text style={styles.username}>{this.props.username}</Text>
                    <Text style={styles.location}>{this.props.location}</Text>

                </View>
                
            </ImageBackground>
        );
    }
}

export default ProfileHeader;
