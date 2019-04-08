import React, { Component } from 'react';
import { Image, FlatList, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Header } from 'react-native-elements';
import { Icon } from 'react-native-elements'
import { auth, database, f, storage } from '../../config/config';


class Comments extends Component {

    constructor(props){
        super(props);

        this.state = {
            comments_list: [],
        }

    }

    componentDidMount = () => {
        this.checkParams();
    }

    checkParams = () => {
        const params = this.props.navigation.state.params;
        if(params){
            if(params.favId){
                this.setState({
                    favId: params.favId,
                });
                this.fetchComments(params.favId);
            } 
        }
    }

    addCommentToList = (comments_list, data, comment) => {
        console.log(comments_list, data, comment);
    }

    fetchComments = (favId) => {

        var that = this;

        database.ref('comments').child(favId).orderByChild('posted').once('value').then(function(snapshot){
            const exists = (snapshot.val() !== null);
            if(exists){
                data = snapshot.val();
                var comments_list = that.state.comments_list;

                for( var comment in data ){
                    that.addCommentToList(comments_list, data, comment);
                }


            } else {
                // no comments found
                that.setState({
                    comments_list: [],
                });
            }
        }).catch(error => console.log(error));
    }

    s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    uniqueId = () => {
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
        this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4();
    }

    pluralCheck = (s) => {
        if(s == 1){
            return ' ago';
        } else {
            return 's ago';
        }
    }

    timeConverter = (timestamp) => {

        var a = new Date(timestamp * 1000);
        var seconds = Math.floor((new Date() - a) / 1000);

        // Years
        var interval = Math.floor(seconds / 31536000);
        if(interval >= 1){
            return interval + ' year' + this.pluralCheck(interval);
        }

        // Months
        interval = Math.floor(seconds / 2592000);
        if(interval >= 1){
            return interval + ' month' + this.pluralCheck(interval);
        }

        // Days
        interval = Math.floor(seconds / 86400);
        if(interval >= 1){
            return interval + ' day' + this.pluralCheck(interval);
        }

        // Hours
        interval = Math.floor(seconds / 3600);
        if(interval >= 1){
            return interval + ' hour' + this.pluralCheck(interval);
        }

        // Minutes
        interval = Math.floor(seconds / 60);
        if(interval >= 1){
            return interval + ' minute' + this.pluralCheck(interval);
        }

        return Math.floor(seconds) + ' second' + this.pluralCheck(seconds);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                 <Header
                        leftComponent={{ icon: 'arrow-back', color: '#fff', onPress: () => this.props.navigation.goBack() }}
                        centerComponent={{ text: 'Comments', style: { color: '#fff', fontFamily: 'horizon', fontSize: 30 } }}
                        rightComponent={{ color: '#fff' }}
                        containerStyle={{
                            backgroundColor: '#b23f2e',
                          }}
                    />
                <View>
                    { this.state.comments_list.length == 0 ? (
                        // no comments show empty state
                        <Text>no comments found</Text>
                    ) : (
                        // comments available
                        <FlatList 
                            data={this.state.comments_list}
                        />
                    )}
                </View>
            </View>
        );
    }
}

export default Comments;