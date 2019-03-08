import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { currentUserInfo } from '../Store/actions';
import { bindActionCreators } from 'redux';

class User extends Component {

    componentDidMount(){
        this.props.currentUserInfo()
    }

    render(){
        console.log("PROPS!!!!!:", this.props);
        return(
            <View>
                <Text>User info goes here...</Text>
            </View>
        );
    }
}

function mapStateToProps(state){
    return {
        user: state.user
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({currentUserInfo}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(User);